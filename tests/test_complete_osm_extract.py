#!/usr/bin/env python3
"""Tests sans réseau de l'outil de complément OSM ciblé."""
import importlib.util
import pathlib
import tempfile
import xml.etree.ElementTree as ET

SCRIPT = pathlib.Path(__file__).resolve().parents[1] / "outils" / "complete_osm_extract.py"
spec = importlib.util.spec_from_file_location("complete_osm_extract", SCRIPT)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def main():
    audit = {
        "districts": {"items": [
            {"missing_way_ids": ["22", "11", "22"]},
        ]},
        "subdistricts": {"items": [
            {"missing_way_ids": ["33"]},
        ]},
    }
    restrictions = {"relations": [
        {"missing_members": [
            {"type": "way", "ref": "44"},
            {"type": "node", "ref": "999"},
        ]},
    ]}
    missing = module.collect_missing_way_ids(audit, restrictions)
    assert missing == ["11", "22", "33", "44"], missing
    query = module.make_query(missing)
    assert "way(id:11,22,33,44);" in query and "(._;>;);" in query

    source_xml = b'''<?xml version="1.0"?>
    <osm version="0.6" generator="fixture">
      <node id="1" lat="48.1" lon="-1.6"/>
      <way id="10"><nd ref="1"/></way>
      <relation id="90"><member type="way" ref="10" role="outer"/></relation>
    </osm>'''
    extra_nodes, extra_ways = module.parse_supplement(b'''<osm version="0.6">
      <node id="2" lat="48.2" lon="-1.7"/>
      <node id="3" lat="48.3" lon="-1.8"/>
      <way id="11"><nd ref="2"/><nd ref="3"/></way>
    </osm>''')
    with tempfile.TemporaryDirectory() as tmp:
        src = pathlib.Path(tmp) / "source.osm"
        dst = pathlib.Path(tmp) / "nested" / "merged.osm"
        src.write_bytes(source_xml)
        module.merge_osm(src, dst, extra_nodes, extra_ways)
        root = ET.parse(dst).getroot()
        assert root.attrib == {"version": "0.6", "generator": "fixture"}
        assert {e.get("id") for e in root.findall("node")} == {"1", "2", "3"}
        assert {e.get("id") for e in root.findall("way")} == {"10", "11"}
        assert root.find("relation").get("id") == "90"
        assert src.read_bytes() == source_xml
    print("OK — IDs manquants dédupliqués, requête récursive et fusion XML non destructive.")


if __name__ == "__main__":
    main()
