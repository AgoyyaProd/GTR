#!/usr/bin/env python3
"""Synthetic tests for the provenance-preserving OSM graph builder."""
import importlib.util
import pathlib
import tempfile

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
    assert g["stats"]["directed_edges"] == 4
    c = g["csr"]
    assert len(c["off"]) == g["stats"]["nodes"] + 1
    assert c["off"][0] == 0 and c["off"][-1] == len(c["to"])
    assert all(a <= b for a, b in zip(c["off"], c["off"][1:]))
    assert all(0 <= n < g["stats"]["nodes"] for n in c["to"])
    assert set(c["way_id"]) == {"10", "11"}
    # One-way residential: only forward edges, all modes allowed there.
    for i, way in enumerate(c["way_id"]):
        if way == "10":
            assert c["mask"][i] & MOD.CAR
    # Layer split means node 2 appears twice.
    assert sum(1 for n in g["nodes"]["osm_id"] if n == "2") == 2
    assert not any(m["way_id"] == "12" for m in g.get("edges", []))
    print("OK — CSR cohérent, provenance OSM conservée, sens unique, accès et niveaux testés.")

if __name__ == "__main__":
    main()
