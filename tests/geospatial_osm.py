#!/usr/bin/env python3
"""Audit structurel d'un export OSM pour GTR (sans dépendance externe).

Usage:
  python tests/geospatial_osm.py --input map --output controle/osm-audit.json
  python tests/geospatial_osm.py --input map --strict

Le mode strict retourne un code non nul si des ways membres des relations
quartiers ne sont pas présents dans l'extrait. Cela évite de publier des
frontières administratives silencieusement incomplètes.
"""
import argparse
import collections
import datetime
import json
import os
import sys
import xml.etree.ElementTree as ET


DISTRICT_COLLECTION = "5833095"      # Rennes - quartiers, admin_level=10
SUBDISTRICT_COLLECTION = "6796360"   # Rennes - sous-quartiers, admin_level=11


def tags_of(element):
    return {child.get("k"): child.get("v")
            for child in element if child.tag == "tag"}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", default=os.environ.get("GTR_OSM_FILE", "map"))
    parser.add_argument("--output", default=None)
    parser.add_argument("--strict", action="store_true",
                        help="échec si des ways membres des relations quartiers manquent")
    args = parser.parse_args()

    node_ids = set()
    way_refs = {}
    relations = {}
    counts = collections.Counter()
    highway = collections.Counter()
    relation_types = collections.Counter()
    admin_levels = collections.Counter()
    named_roads = set()
    address_objects = 0
    bounds = None
    extent = [float("inf"), float("inf"), float("-inf"), float("-inf")]

    stack = []
    for event, element in ET.iterparse(args.input, events=("start", "end")):
        if event == "start":
            stack.append(element)
            continue

        parent = stack[-2] if len(stack) > 1 else None
        if parent is not None and parent.tag == "osm":
            if element.tag == "bounds":
                bounds = dict(element.attrib)
            elif element.tag == "node":
                counts["nodes"] += 1
                node_ids.add(element.get("id"))
                lat, lon = float(element.get("lat")), float(element.get("lon"))
                extent[0] = min(extent[0], lat)
                extent[1] = min(extent[1], lon)
                extent[2] = max(extent[2], lat)
                extent[3] = max(extent[3], lon)
                if "addr:housenumber" in tags_of(element):
                    address_objects += 1
            elif element.tag == "way":
                counts["ways"] += 1
                refs = [child.get("ref") for child in element if child.tag == "nd"]
                way_refs[element.get("id")] = refs
                tags = tags_of(element)
                if tags.get("highway"):
                    highway[tags["highway"]] += 1
                    if tags.get("name"):
                        named_roads.add(tags["name"])
                if "addr:housenumber" in tags:
                    address_objects += 1
            elif element.tag == "relation":
                counts["relations"] += 1
                tags = tags_of(element)
                members = [(child.get("type"), child.get("ref"), child.get("role", ""))
                           for child in element if child.tag == "member"]
                relations[element.get("id")] = {"tags": tags, "members": members}
                if tags.get("type"):
                    relation_types[tags["type"]] += 1
                if tags.get("admin_level"):
                    admin_levels[tags["admin_level"]] += 1
            element.clear()
        stack.pop()

    missing_node_refs = sum(
        1 for refs in way_refs.values() for ref in refs if ref not in node_ids
    )

    def child_relations(parent_id):
        relation = relations.get(parent_id)
        if not relation:
            return []
        return [ref for kind, ref, _ in relation["members"]
                if kind == "relation" and ref in relations]

    def audit_collection(parent_id):
        children = child_relations(parent_id)
        rows = []
        missing_total = 0
        for relation_id in children:
            relation = relations[relation_id]
            tags = relation["tags"]
            member_ways = [ref for kind, ref, _ in relation["members"] if kind == "way"]
            missing = [ref for ref in member_ways if ref not in way_refs]
            missing_total += len(missing)
            rows.append({
                "id": relation_id,
                "name": tags.get("name", ""),
                "admin_level": tags.get("admin_level", ""),
                "member_ways": len(member_ways),
                "missing_member_ways": len(missing),
                "missing_way_ids": missing,
                "complete": not missing,
            })
        return {
            "collection_id": parent_id,
            "collection_name": relations.get(parent_id, {}).get("tags", {}).get("name", ""),
            "count": len(rows),
            "complete_count": sum(row["complete"] for row in rows),
            "incomplete_count": sum(not row["complete"] for row in rows),
            "missing_member_ways": missing_total,
            "items": sorted(rows, key=lambda row: row["name"].casefold()),
        }

    districts = audit_collection(DISTRICT_COLLECTION)
    subdistricts = audit_collection(SUBDISTRICT_COLLECTION)
    rennes = [
        {"id": relation_id, "name": relation["tags"].get("name", ""),
         "admin_level": relation["tags"].get("admin_level", "")}
        for relation_id, relation in relations.items()
        if relation["tags"].get("name") == "Rennes"
        and relation["tags"].get("boundary") == "administrative"
    ]

    result = {
        "generated_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "source_file": os.path.basename(args.input),
        "counts": dict(counts),
        "declared_bounds": bounds,
        "actual_node_extent": {
            "minlat": extent[0], "minlon": extent[1],
            "maxlat": extent[2], "maxlon": extent[3],
        },
        "reference_integrity": {
            "missing_way_node_refs": missing_node_refs,
            "interpretation": (
                "Les nœuds hors de <bounds> peuvent être des dépendances "
                "géométriques de ways traversant l'emprise ; ce n'est pas "
                "à lui seul une erreur d'extraction."
            ),
        },
        "roads": {
            "highway_way_counts": dict(sorted(highway.items())),
            "distinct_named_highway_values": len(named_roads),
            "addressed_objects": address_objects,
        },
        "relations": {
            "types": dict(sorted(relation_types.items())),
            "admin_levels": dict(sorted(admin_levels.items())),
            "rennes_administrative_relations": rennes,
        },
        "districts": districts,
        "subdistricts": subdistricts,
    }

    serialized = json.dumps(result, ensure_ascii=False, indent=2)
    if args.output:
        os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
        with open(args.output, "w", encoding="utf-8") as output:
            output.write(serialized + "\n")
    print(json.dumps({
        "counts": result["counts"],
        "missing_way_node_refs": missing_node_refs,
        "districts": {k: v for k, v in districts.items() if k != "items"},
        "subdistricts": {k: v for k, v in subdistricts.items() if k != "items"},
    }, ensure_ascii=False, indent=2))

    if args.strict and (missing_node_refs or districts["incomplete_count"]
                        or subdistricts["incomplete_count"]):
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
