#!/usr/bin/env python3
"""Complète un extrait OSM avec les ways absents des relations de quartiers et restrictions.

Exemple :
  python tests/geospatial_osm.py --input map --output controle/osm-audit.json
  python outils/street_osm.py
  python outils/complete_osm_extract.py --input map --audit controle/osm-audit.json \
      --restrictions /home/claude/tools/street_osm.restrictions.json \
      --output map-complete.osm

Le script ne modifie jamais l'extrait source. Il récupère uniquement les ways
manquants et leurs nœuds via Overpass, puis écrit un nouvel OSM XML.
"""
import argparse
import json
import os
import tempfile
import urllib.parse
import urllib.request
from xml.sax.saxutils import quoteattr
import xml.etree.ElementTree as ET


OVERPASS = "https://overpass-api.de/api/interpreter"


def collect_missing_way_ids(audit, restrictions):
    missing = set()
    for key in ("districts", "subdistricts"):
        for row in audit.get(key, {}).get("items", []):
            missing.update(row.get("missing_way_ids", []))
    for relation in restrictions.get("relations", []):
        for member in relation.get("missing_members", []):
            if member.get("type") == "way" and member.get("ref"):
                missing.add(member["ref"])
    return sorted(missing, key=int)


def make_query(way_ids):
    ids = ",".join(way_ids)
    return (
        "[out:xml][timeout:180];"
        f"way(id:{ids});"
        "(._;>;);"
        "out body;"
    )


def fetch_overpass(query, endpoint=OVERPASS):
    body = urllib.parse.urlencode({"data": query}).encode("utf-8")
    request = urllib.request.Request(
        endpoint, data=body,
        headers={"User-Agent": "GTR-geospatial-audit/1.0"},
    )
    with urllib.request.urlopen(request, timeout=240) as response:
        return response.read()


def parse_supplement(xml_bytes):
    root = ET.fromstring(xml_bytes)
    nodes, ways = {}, {}
    for element in root:
        if element.tag == "node":
            nodes[element.get("id")] = element
        elif element.tag == "way":
            ways[element.get("id")] = element
    return nodes, ways


def merge_osm(source, output, extra_nodes, extra_ways):
    """Écriture en flux : pas de chargement mémoire de l'extrait complet."""
    source_node_ids, source_way_ids = set(), set()
    output_dir = os.path.dirname(os.path.abspath(output))
    os.makedirs(output_dir, exist_ok=True)
    fd, temporary = tempfile.mkstemp(prefix="gtr-osm-", suffix=".xml", dir=output_dir)
    os.close(fd)
    try:
        stack = []
        root_attributes = None
        with open(temporary, "wb") as out:
            out.write(b'<?xml version="1.0" encoding="UTF-8"?>\n')
            for event, element in ET.iterparse(source, events=("start", "end")):
                if event == "start":
                    stack.append(element)
                    if len(stack) == 1:
                        root_attributes = dict(element.attrib)
                        attrs = " ".join(
                            f"{key}={quoteattr(value)}" for key, value in root_attributes.items()
                        )
                        out.write(("<osm " + attrs + ">\n").encode("utf-8"))
                    continue
                parent = stack[-2] if len(stack) > 1 else None
                if parent is not None and parent.tag == "osm":
                    if element.tag == "node":
                        source_node_ids.add(element.get("id"))
                    elif element.tag == "way":
                        source_way_ids.add(element.get("id"))
                    elif element.tag not in ("bounds", "note", "meta", "changeset"):
                        pass
                    out.write(ET.tostring(element, encoding="utf-8"))
                    out.write(b"\n")
                    element.clear()
                elif parent is None and element.tag == "osm":
                    for node_id, node in extra_nodes.items():
                        if node_id not in source_node_ids:
                            out.write(ET.tostring(node, encoding="utf-8") + b"\n")
                    for way_id, way in extra_ways.items():
                        if way_id not in source_way_ids:
                            out.write(ET.tostring(way, encoding="utf-8") + b"\n")
                    out.write(b"</osm>\n")
                stack.pop()
        os.replace(temporary, output)
    except Exception:
        if os.path.exists(temporary):
            os.unlink(temporary)
        raise
    return source_node_ids, source_way_ids


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True)
    parser.add_argument("--audit", required=True)
    parser.add_argument("--restrictions", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    with open(args.audit, encoding="utf-8") as f:
        audit = json.load(f)
    with open(args.restrictions, encoding="utf-8") as f:
        restrictions = json.load(f)
    missing = collect_missing_way_ids(audit, restrictions)
    if not missing:
        raise SystemExit("Aucun way manquant dans les rapports fournis.")

    supplement = fetch_overpass(make_query(missing))
    extra_nodes, extra_ways = parse_supplement(supplement)
    absent = sorted(set(missing) - set(extra_ways), key=int)
    if absent:
        raise SystemExit("Overpass n'a pas retourné ces ways : " + ", ".join(absent))

    extra_node_refs = {
        child.get("ref")
        for way in extra_ways.values()
        for child in way if child.tag == "nd"
    }
    missing_nodes = sorted(extra_node_refs - set(extra_nodes), key=int)
    if missing_nodes:
        raise SystemExit("Nœuds des ways absents de la réponse Overpass : "
                         + ", ".join(missing_nodes[:30]))

    merge_osm(args.input, args.output, extra_nodes, extra_ways)
    print(json.dumps({
        "source": args.input,
        "output": args.output,
        "ways_requested": len(missing),
        "ways_returned": len(extra_ways),
        "nodes_returned": len(extra_nodes),
        "status": "ok",
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
