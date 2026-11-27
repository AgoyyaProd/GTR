#!/usr/bin/env python3
"""Build a provenance-preserving directed OSM routing graph for GTR.

Output is deliberately separate from global.json: it is an auditable candidate
graph, not yet consumed by the browser runtime.
"""
import argparse
import json
import math
import xml.etree.ElementTree as ET
from collections import defaultdict

LAT0 = (48.1055 + 48.1192) / 2
LON0 = (-1.6905 - 1.6625) / 2
KX = math.cos(math.radians(LAT0)) * 111320
KY = 110540
FOOT, CAR, BICYCLE = 1, 2, 4
MODE_BITS = {"foot": FOOT, "motorcar": CAR, "bicycle": BICYCLE}
ROAD_CLASSES = {
    "motorway", "motorway_link", "trunk", "trunk_link", "primary",
    "primary_link", "secondary", "secondary_link", "tertiary",
    "tertiary_link", "unclassified", "residential", "living_street",
    "service", "road", "track", "pedestrian", "footway", "path",
    "cycleway", "steps", "bridleway"
}
CAR_DENY = {"motorway", "motorway_link", "footway", "pedestrian",
            "cycleway", "steps", "bridleway", "path"}
WALK_DENY = {"motorway", "motorway_link"}


def tags_of(el):
    return {c.get("k"): c.get("v") for c in el if c.tag == "tag"}


def denied(value):
    return value in {"no", "private"}


def mode_allowed(tags, mode):
    hw = tags.get("highway", "")
    if hw not in ROAD_CLASSES:
        return False
    if mode == "foot" and hw in WALK_DENY:
        return False
    if mode == "motorcar" and hw in CAR_DENY:
        return False
    generic = tags.get("access")
    specific = tags.get({"foot": "foot", "motorcar": "motor_vehicle",
                         "bicycle": "bicycle"}[mode])
    if denied(generic) and specific not in {"yes", "permissive", "designated"}:
        return False
    if denied(specific):
        return False
    if mode == "motorcar" and tags.get("motorcar") == "no":
        return False
    if mode == "bicycle" and tags.get("bicycle") == "no":
        return False
    if mode == "foot" and tags.get("foot") == "no":
        return False
    return True


def layer_of(tags):
    # Explicit OSM layer wins. bridge/tunnel defaults prevent false junctions
    # where a crossing has no shared topological connection in the source.
    try:
        if "layer" in tags:
            return int(tags["layer"])
    except ValueError:
        pass
    if tags.get("bridge") not in (None, "no", "false", "0"):
        return 1
    if tags.get("tunnel") not in (None, "no", "false", "0"):
        return -1
    return 0


def one_way(tags):
    value = tags.get("oneway")
    if value in {"yes", "1", "true"} or tags.get("junction") == "roundabout":
        return 1
    if value == "-1":
        return -1
    return 0


def direction_allowed(tags, mode, direction):
    ow = one_way(tags)
    if mode == "foot":
        return True
    if mode == "bicycle" and tags.get("oneway:bicycle") in {"no", "0"}:
        return True
    if mode == "bicycle" and tags.get("oneway:bicycle") in {"yes", "1", "-1"}:
        ow = -1 if tags.get("oneway:bicycle") == "-1" else 1
    if mode == "motorcar" and tags.get("oneway:motor_vehicle") in {"no", "0"}:
        return True
    return ow == 0 or (ow == 1 and direction == 1) or (ow == -1 and direction == -1)


def parse_osm(path):
    nodes, ways, restrictions = {}, [], []
    for _, el in ET.iterparse(path, events=("end",)):
        if el.tag == "node":
            nodes[el.get("id")] = (float(el.get("lon")), float(el.get("lat")))
        elif el.tag == "way":
            tags = tags_of(el)
            refs = [c.get("ref") for c in el if c.tag == "nd"]
            if tags.get("highway") in ROAD_CLASSES and len(refs) >= 2:
                ways.append({"id": el.get("id"), "refs": refs, "tags": tags})
        elif el.tag == "relation":
            tags = tags_of(el)
            if tags.get("type") == "restriction":
                members = [{"type": c.get("type"), "ref": c.get("ref"),
                            "role": c.get("role")} for c in el if c.tag == "member"]
                by_mode = {k[len("restriction:"):]: v for k, v in tags.items()
                           if k.startswith("restriction:") and k != "restriction:conditional"}
                restrictions.append({
                    "id": el.get("id"),
                    "restriction": tags.get("restriction") or tags.get("restriction:motorcar")
                                   or tags.get("restriction:motor_vehicle"),
                    "restriction_by_mode": by_mode,
                    "restriction_conditional": tags.get("restriction:conditional"),
                    "except": tags.get("except"), "tags": tags,
                    "members": members
                })
        el.clear()
    return nodes, ways, restrictions


def build_graph(nodes, ways):
    # Same OSM node at different layer values is intentionally not connected.
    key_to_index, xy, osm_ids, layers = {}, [], [], []
    edges = []
    skipped = {"missing_node_refs": 0, "zero_length": 0, "no_access_mode": 0}

    def vertex(osm_id, layer):
        key = (osm_id, layer)
        if key not in key_to_index:
            lon, lat = nodes[osm_id]
            key_to_index[key] = len(osm_ids)
            osm_ids.append(osm_id)
            layers.append(layer)
            xy.extend([(lon - LON0) * KX, (lat - LAT0) * KY])
        return key_to_index[key]

    for way in ways:
        tags, refs = way["tags"], way["refs"]
        layer = layer_of(tags)
        modes = [m for m in MODE_BITS if mode_allowed(tags, m)]
        if not modes:
            skipped["no_access_mode"] += 1
            continue
        for a, b in zip(refs, refs[1:]):
            if a not in nodes or b not in nodes:
                skipped["missing_node_refs"] += 1
                continue
            va, vb = vertex(a, layer), vertex(b, layer)
            ax, ay, bx, by = xy[2*va], xy[2*va+1], xy[2*vb], xy[2*vb+1]
            length = math.hypot(bx-ax, by-ay)
            if length <= 0:
                skipped["zero_length"] += 1
                continue
            mask_ab = sum(MODE_BITS[m] for m in modes if direction_allowed(tags, m, 1))
            mask_ba = sum(MODE_BITS[m] for m in modes if direction_allowed(tags, m, -1))
            common = {"way_id": way["id"], "length": round(length, 3),
                      "highway": tags["highway"], "layer": layer,
                      "name": tags.get("name"), "bridge": tags.get("bridge"),
                      "tunnel": tags.get("tunnel")}
            if mask_ab:
                edges.append({"from": va, "to": vb, "mask": mask_ab, **common})
            if mask_ba:
                edges.append({"from": vb, "to": va, "mask": mask_ba, **common})

    edges.sort(key=lambda e: (e["from"], e["to"], e["way_id"]))
    offsets = [0] * (len(osm_ids) + 1)
    for edge in edges:
        offsets[edge["from"] + 1] += 1
    for i in range(1, len(offsets)):
        offsets[i] += offsets[i-1]
    return {
        "schema": "gtr-osm-routing-graph-v1",
        "projection": {"lat0": LAT0, "lon0": LON0, "kx": KX, "ky": KY},
        "modes": MODE_BITS,
        "nodes": {"osm_id": osm_ids, "layer": layers, "xy": [round(v, 3) for v in xy]},
        "csr": {"off": offsets, "to": [e["to"] for e in edges],
                "mask": [e["mask"] for e in edges],
                "way_id": [e["way_id"] for e in edges],
                "length": [e["length"] for e in edges]},
        "edge_metadata": [{"highway": e["highway"], "name": e["name"],
                           "layer": e["layer"], "bridge": e["bridge"],
                           "tunnel": e["tunnel"]} for e in edges],
        "stats": {"nodes": len(osm_ids), "directed_edges": len(edges),
                  "ways_considered": len(ways), "skipped": skipped}
    }


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--input", required=True)
    p.add_argument("--output", required=True)
    args = p.parse_args()
    nodes, ways, restrictions = parse_osm(args.input)
    graph = build_graph(nodes, ways)
    way_ids = {w["id"] for w in ways}
    node_ids = set(nodes)
    for r in restrictions:
        r["missing_members"] = [m for m in r["members"]
            if (m["type"] == "way" and m["ref"] not in way_ids)
            or (m["type"] == "node" and m["ref"] not in node_ids)]
        r["complete"] = not r["missing_members"]
    graph["restrictions"] = restrictions
    graph["restriction_stats"] = {
        "count": len(restrictions),
        "complete": sum(r["complete"] for r in restrictions),
        "incomplete": sum(not r["complete"] for r in restrictions)
    }
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(graph, f, ensure_ascii=False, separators=(",", ":"))
    print(json.dumps({**graph["stats"], "restrictions": graph["restriction_stats"]},
                     ensure_ascii=False))


if __name__ == "__main__":
    main()
