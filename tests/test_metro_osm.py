#!/usr/bin/env python3
import pathlib
import sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / "outils"))
from metro_osm import orient_stairway, footprint_samples, point_in_polygon, build_entrances


def main():
    nodes = {"top": (0.0, 0.0), "bottom": (8.0, 0.0), "bottom2": (0.0, 8.0)}
    down = {"refs": ["top", "bottom"], "tags": {"highway": "steps", "incline": "down"}}
    up = {"refs": ["bottom", "top"], "tags": {"highway": "steps", "incline": "up"}}
    a, length = orient_stairway("top", down, nodes)
    assert abs(a) < 1e-6 and abs(length - 8.0) < 1e-6
    a, length = orient_stairway("bottom", up, nodes)
    assert abs(a) < 1e-6 and abs(length - 8.0) < 1e-6
    plain = {"refs": ["top", "bottom2"], "tags": {"highway": "footway"}}
    a, _ = orient_stairway("top", plain, nodes)
    assert abs(a - 1.57079632679) < 1e-6
    a, _ = orient_stairway("bottom2", plain, nodes)
    assert abs(abs(a) - 1.57079632679) < 1e-6
    assert point_in_polygon(0.5, 0.5, [(0,0),(1,0),(1,1),(0,1)])
    assert not point_in_polygon(2, 2, [(0,0),(1,0),(1,1),(0,1)])
    samples = list(footprint_samples(0, 0, 0, 4, 2, 1))
    assert samples and any(abs(x-2)<1e-6 and abs(y+1)<1e-6 for x,y in samples)
    directed = list(footprint_samples(0, 0, 0, 4, 2, 1, start_at_node=True))
    assert directed and min(x for x,y in directed) >= 0 and max(x for x,y in directed) <= 4
    assert orient_stairway("missing", down, nodes) is None
    # Extraction complète synthétique : rattachement station, width, incline et ascenseur.
    osm_nodes = {
        "entry": (0.0, 0.0, {"railway":"subway_entrance","station":"République","wheelchair":"yes"}),
        "bottom": (8.0, 0.0, {}),
        "lift": (20.0, 10.0, {"highway":"elevator","wheelchair":"yes"}),
    }
    ways = [{"id":"42","refs":["entry","bottom"],"tags":{"highway":"steps","incline":"down","width":"2.4","conveying":"yes"}}]
    metro = {"stations":[
        {"name":"République","x":0.0,"y":0.0,"lines":"a"},
        {"name":"Gares","x":20.0,"y":10.0,"lines":"ab"}]}
    extracted = build_entrances(osm_nodes, ways, metro)
    stair = next(e for e in extracted if e["osm_id"]=="entry")
    lift = next(e for e in extracted if e["osm_id"]=="lift")
    assert stair["station"]=="République" and stair["line"]=="a"
    assert stair["kind"]=="stairs" and abs(stair["angle"])<1e-6
    assert abs(stair["length"]-8.0)<1e-6 and abs(stair["width"]-2.4)<1e-6
    assert stair["conveying"]=="yes" and stair["wheelchair"]=="yes" and stair["safe"]
    assert lift["kind"]=="elevator" and lift["station"]=="Gares" and lift["safe"]
    # Une entrée posée sur le contour du bâtiment doit être intégrée, sans trémie.
    building_nodes = {
        "door": (0.0, 0.0, {"railway":"subway_entrance","station":"République"}),
        "a": (-2.0,-2.0,{}), "b": (2.0,-2.0,{}), "c": (2.0,2.0,{}), "d": (-2.0,2.0,{})
    }
    building_ways = [{"id":"b1","refs":["a","b","c","d","a"],"tags":{"building":"yes"}}]
    integrated = build_entrances(building_nodes,building_ways,metro)
    assert integrated[0]["integrated"] and integrated[0]["safe"]

    # Deux accès proches et parallèles deviennent une trémie unique, centrée.
    paired_nodes = {
        "p1": (0.0, 0.0, {"railway":"subway_entrance","station":"République"}),
        "p1b": (14.0, 0.0, {}),
        "p2": (6.0, 1.0, {"railway":"subway_entrance","station":"République"}),
        "p2b": (20.0, 1.0, {}),
    }
    paired_ways = [
        {"id":"w1","refs":["p1","p1b"],"tags":{"highway":"steps","incline":"down"}},
        {"id":"w2","refs":["p2","p2b"],"tags":{"highway":"steps","incline":"down"}},
    ]
    paired = build_entrances(paired_nodes, paired_ways, metro)
    merged = [e for e in paired if e["kind"]=="stairs"]
    assert len(merged)==1 and merged[0]["merged_count"]==2
    assert abs(merged[0]["x"]-3.0)<1e-6 and abs(merged[0]["y"]-0.5)<1e-6
    assert merged[0]["width"]>2.0

    # Deux trémies non fusionnables mais sécantes : une seule reste active.
    overlap_nodes = {
        "o1": (0.0, 0.0, {"railway":"subway_entrance","station":"République"}),
        "o1b": (14.0, 0.0, {}),
        "o2": (11.0, 0.0, {"railway":"subway_entrance","station":"République"}),
        "o2b": (25.0, 4.0, {}),
    }
    overlap_ways = [
        {"id":"ow1","refs":["o1","o1b"],"tags":{"highway":"steps","incline":"down"}},
        {"id":"ow2","refs":["o2","o2b"],"tags":{"highway":"steps","incline":"down"}},
    ]
    overlaps = build_entrances(overlap_nodes, overlap_ways, metro)
    rejected = [e for e in overlaps if e.get("blocked_reason")=="overlap"]
    assert len(rejected)==1
    assert sum(e["safe"] for e in overlaps if e["kind"]=="stairs")==1

    print("Métro OSM : extraction, orientation, accessibilité et emprises OK")


if __name__ == "__main__": main()
