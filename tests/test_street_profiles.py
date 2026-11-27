#!/usr/bin/env python3
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "outils"))
from street_profiles import metres, road_width, sidewalk_sides

assert metres("6.5") == 6.5
assert metres("20 ft") == 6.096
assert abs(metres("5' 6\"") - 1.6764) < 1e-9
assert metres("variable") is None
assert road_width({"highway": "residential", "width": "7.2 m"}) == 7.2
assert road_width({"highway": "primary", "lanes": "2"}) == 6.0
assert road_width({"highway": "residential"}) == 5.0
assert sidewalk_sides({"sidewalk": "both"}) == (True, True)
assert sidewalk_sides({"sidewalk:left": "no", "sidewalk:right": "yes"}) == (False, True)
print("Profils routiers OSM : OK")
