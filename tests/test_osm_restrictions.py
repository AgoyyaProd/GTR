#!/usr/bin/env python3
"""Test autonome de l'extraction des relations OSM de restriction de virage."""
import json
import os
import pathlib
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "outils" / "street_osm.py"

OSM = """<?xml version="1.0" encoding="UTF-8"?>
<osm version="0.6">
  <node id="1" lat="48.1150" lon="-1.6800"/>
  <node id="2" lat="48.1151" lon="-1.6799"/>
  <node id="3" lat="48.1152" lon="-1.6798"/>
  <way id="100"><nd ref="1"/><nd ref="2"/><tag k="highway" v="residential"/></way>
  <way id="101"><nd ref="2"/><nd ref="3"/><tag k="highway" v="residential"/></way>
  <way id="102"><nd ref="1"/><nd ref="3"/><tag k="highway" v="service"/></way>
  <relation id="9001">
    <member type="way" ref="100" role="from"/>
    <member type="node" ref="2" role="via"/>
    <member type="way" ref="101" role="to"/>
    <tag k="type" v="restriction"/><tag k="restriction" v="no_left_turn"/>
  </relation>
  <relation id="9002">
    <member type="way" ref="100" role="from"/>
    <member type="node" ref="2" role="via"/>
    <member type="way" ref="999" role="to"/>
    <tag k="type" v="restriction"/><tag k="restriction" v="no_u_turn"/>
  </relation>
  <relation id="9003">
    <member type="way" ref="100" role="from"/>
    <member type="way" ref="102" role="via"/>
    <member type="way" ref="101" role="to"/>
    <tag k="type" v="restriction"/><tag k="restriction" v="only_straight_on"/>
  </relation>
  <relation id="9004">
    <member type="way" ref="100" role="from"/>
    <member type="node" ref="2" role="via"/>
    <member type="way" ref="101" role="to"/>
    <tag k="type" v="restriction"/><tag k="restriction:bicycle" v="only_straight_on"/>
  </relation>
</osm>
"""


def main():
    with tempfile.TemporaryDirectory() as tmp:
        src = pathlib.Path(tmp) / "fixture.osm"
        pkl = pathlib.Path(tmp) / "street.pkl"
        out = pathlib.Path(tmp) / "restrictions.json"
        src.write_text(OSM, encoding="utf-8")
        env = os.environ.copy()
        env.update({
            "GTR_OSM_FILE": str(src),
            "GTR_STREET_OSM_PICKLE": str(pkl),
            "GTR_TURN_RESTRICTIONS_JSON": str(out),
        })
        subprocess.run([sys.executable, str(SCRIPT)], env=env, check=True, capture_output=True, text=True)
        data = json.loads(out.read_text(encoding="utf-8"))
        assert data["count"] == 4, data
        assert data["complete"] == 3, data
        assert data["incomplete"] == 1, data
        by_id = {r["id"]: r for r in data["relations"]}
        assert by_id["9001"]["restriction"] == "no_left_turn"
        assert by_id["9002"]["missing_members"] == [{"type": "way", "ref": "999", "role": "to"}]
        assert any(m["role"] == "via" and m["type"] == "way" for m in by_id["9003"]["members"])
        assert by_id["9004"]["tags"]["restriction:bicycle"] == "only_straight_on"
        assert by_id["9004"]["restriction"] is None
        assert by_id["9004"]["restriction_by_mode"] == {"bicycle": "only_straight_on"}
        assert pkl.exists()
    print("OK — 4 restrictions extraites, relation incomplète signalée, via-way et restriction vélo conservés.")


if __name__ == "__main__":
    main()
