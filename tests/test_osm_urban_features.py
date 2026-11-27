#!/usr/bin/env python3
import pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / "outils"))
from urban_osm import classify_node_feature, deduplicate_features, is_closed_area

def main():
    assert classify_node_feature({"natural":"tree"}, 1, 2)["kind"] == "tree"
    assert classify_node_feature({"amenity":"bench"}, 1, 2)["kind"] == "bench"
    assert classify_node_feature({"amenity":"fountain"}, 1, 2)["kind"] == "fountain"
    assert classify_node_feature({"barrier":"bollard"}, 1, 2)["kind"] == "bollard"
    assert classify_node_feature({"highway":"street_lamp"}, 1, 2)["kind"] == "lamp"
    assert classify_node_feature({"amenity":"cafe"}, 1, 2) is None
    features = [
        {"kind":"tree","x":10.5,"y":20}, {"kind":"tree","x":30,"y":20},
        {"kind":"bench","x":40,"y":20}, {"kind":"lamp","x":50,"y":20},
        {"kind":"fountain","x":60,"y":20}, {"kind":"bollard","x":70,"y":20}]
    kept, duplicates = deduplicate_features(features, [10,20],
        [[0,40.5,20],[3,50.5,20]], radius=2)
    assert duplicates == 3 and [f["kind"] for f in kept] == ["tree","fountain","bollard"]
    kept, duplicates = deduplicate_features([{"kind":"bench","x":5,"y":5}], [[5,5]], [[4,5,5]])
    assert len(kept) == 1 and duplicates == 0
    assert is_closed_area(["1","2","3","1"], [(0,0),(1,0),(1,1),(0,0)])
    assert not is_closed_area(["1","2","3"], [(0,0),(1,0),(1,1)])
    print("Objets urbains OSM : classification et dédoublonnage OK")

if __name__ == "__main__": main()
