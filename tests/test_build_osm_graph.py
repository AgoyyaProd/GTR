#!/usr/bin/env python3
"""Synthetic tests for the provenance-preserving OSM graph builder."""
import importlib.util
import pathlib
import tempfile
import os

ROOT = pathlib.Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("build_osm_graph", ROOT / "outils" / "build_osm_graph.py")
MOD = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MOD)

def main():
    nodes = {"1": (-1.68, 48.115), "2": (-1.679, 48.115),
             "3": (-1.678, 48.115), "4": (-1.679, 48.116)}
    ways = [
        {"id": "10", "refs": ["1", "2", "3"],
         "tags": {"highway": "residential", "oneway": "yes", "name": "Rue A"}},
        {"id": "11", "refs": ["2", "4"],
         "tags": {"highway": "footway", "layer": "1"}},
        {"id": "12", "refs": ["1", "4"],
         "tags": {"highway": "service", "access": "no"}},
    ]
    g = MOD.build_graph(nodes, ways)
    assert g["stats"]["nodes"] == 5  # OSM node 2 split by layer
    assert g["stats"]["directed_edges"] == 6
    c = g["csr"]
    assert len(c["off"]) == g["stats"]["nodes"] + 1
    assert c["off"][0] == 0 and c["off"][-1] == len(c["to"])
    assert all(a <= b for a, b in zip(c["off"], c["off"][1:]))
    assert all(0 <= n < g["stats"]["nodes"] for n in c["to"])
    assert set(c["way_id"]) == {"10", "11"}
    # One-way residential: only forward edges, all modes allowed there.
    way10_masks = [c["mask"][i] for i, way in enumerate(c["way_id"]) if way == "10"]
    assert any(mask & MOD.CAR for mask in way10_masks)
    assert any(not (mask & MOD.CAR) for mask in way10_masks)  # reverse foot-only arcs
    # Layer split means node 2 appears twice.
    assert sum(1 for n in g["nodes"]["osm_id"] if n == "2") == 2
    assert "12" not in c["way_id"]

    # bridge=yes without explicit layer must preserve shared endpoint topology.
    bridge_graph = MOD.build_graph(
        {"1": (-1.68, 48.115), "2": (-1.679, 48.115), "3": (-1.678, 48.115)},
        [
            {"id": "20", "refs": ["1", "2"],
             "tags": {"highway": "residential", "bridge": "yes"}},
            {"id": "21", "refs": ["2", "3"],
             "tags": {"highway": "residential"}},
        ],
    )
    assert bridge_graph["stats"]["nodes"] == 3
    assert bridge_graph["stats"]["directed_edges"] == 4
    assert any(meta["bridge"] == "yes" for meta in bridge_graph["edge_metadata"])

    # XML parser must retain child tags, nd refs and relation members until
    # the enclosing primitive has been consumed.
    xml = """<osm version="0.6">
      <node id="1" lon="-1.68" lat="48.115"/>
      <node id="2" lon="-1.679" lat="48.115"/>
      <way id="30"><nd ref="1"/><nd ref="2"/>
        <tag k="highway" v="residential"/><tag k="name" v="Rue XML"/>
      </way>
      <relation id="40"><member type="way" ref="30" role="from"/>
        <tag k="type" v="restriction"/><tag k="restriction" v="no_left_turn"/>
      </relation>
    </osm>"""
    with tempfile.NamedTemporaryFile("w", suffix=".osm", delete=False, encoding="utf-8") as f:
        f.write(xml)
        xml_path = f.name
    try:
        parsed_nodes, parsed_ways, parsed_restrictions = MOD.parse_osm(xml_path)
    finally:
        os.unlink(xml_path)
    assert len(parsed_nodes) == 2
    assert parsed_ways[0]["refs"] == ["1", "2"]
    assert parsed_ways[0]["tags"]["name"] == "Rue XML"
    assert parsed_restrictions[0]["members"][0]["ref"] == "30"
    assert parsed_restrictions[0]["restriction"] == "no_left_turn"

    print("OK — CSR, provenance, sens unique, accès, couches, ponts et parsing XML testés.")

if __name__ == "__main__":
    main()
