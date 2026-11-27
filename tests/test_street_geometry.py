import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "outils"))

from shapely.geometry import LineString, Point
from street_geometry import merge_corridors


class JunctionUnionTests(unittest.TestCase):
    def test_t_junction_is_one_valid_polygon(self):
        roads = [
            LineString([(-20, 0), (20, 0)]).buffer(3, cap_style=2),
            LineString([(0, 0), (0, 20)]).buffer(2.5, cap_style=2),
            LineString([(0, 0), (-12, -12)]).buffer(2.2, cap_style=2),
        ]
        junction = merge_corridors(roads)
        self.assertTrue(junction.is_valid)
        self.assertEqual(junction.geom_type, "Polygon")
        self.assertTrue(junction.covers(Point(0, 0)))
        self.assertGreater(junction.area, max(p.area for p in roads))

    def test_empty_input(self):
        self.assertTrue(merge_corridors([]).is_empty)


if __name__ == "__main__":
    unittest.main()
