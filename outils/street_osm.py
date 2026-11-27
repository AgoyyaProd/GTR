"""Extraction OSM pour les détails piétons et barrières des rues.
Conserve le référentiel métrique du jeu et supporte les identifiants OSM longs.
"""
import xml.etree.ElementTree as ET
import math
import pickle
import collections
import json

# Référentiel historique du jeu : compatible avec les tuiles existantes.
LAT0 = (48.1055 + 48.1192) / 2
LON0 = (-1.6905 - 1.6625) / 2
KX = math.cos(math.radians(LAT0)) * 111320
KY = 110540

nodes = {}
way_ids = set()
turn_restrictions = []
steps = []
roads = []  # complete OSM highway ways for visible street profiles
crossings = []  # OSM marked crossing nodes
medians = []  # explicitly mapped traffic islands
pedestrian_areas = []  # closed OSM pedestrian plazas / public squares
water_areas = []  # closed OSM water polygons, used to clip urban ground
waterway_lines = []  # OSM river / canal / stream axes
bollards = []
barriers = []
kerbs = []
sidewalks = []
cnt = collections.Counter()

# Utilise la variable d'environnement pour permettre les builds reproductibles
# depuis différents postes et CI, sans chemin absolu propre à une machine.
import os
OSM_FILE = os.environ.get("GTR_OSM_FILE", "/mnt/user-data/uploads/map")
OUT_FILE = os.environ.get("GTR_STREET_OSM_PICKLE", "/home/claude/tools/street_osm.pkl")

for _, el in ET.iterparse(OSM_FILE, events=("end",)):
    if el.tag == "node":
        node_id = el.get("id")
        x = (float(el.get("lon")) - LON0) * KX
        y = (float(el.get("lat")) - LAT0) * KY
        nodes[node_id] = (x, y)
        t = {c.get("k"): c.get("v") for c in el if c.tag == "tag"}
        if t.get("barrier") in ("bollard", "block"):
            bollards.append((round(x, 2), round(y, 2)))
        if t.get("barrier") == "kerb" or t.get("kerb"):
            kerbs.append((x, y, t.get("kerb")))
        if t.get("highway") == "crossing":
            crossings.append({"id": node_id, "x": x, "y": y, "crossing": t.get("crossing"), "markings": t.get("crossing:markings"), "kerb": t.get("kerb"), "lowered": t.get("kerb:lowered")})
        if t.get("highway") == "traffic_island" or t.get("traffic_calming") == "island":
            medians.append({"pts": [(x, y)], "kind": "node", "surface": t.get("surface"), "landuse": t.get("landuse"), "material": "grass" if t.get("surface") == "grass" or t.get("landuse") == "grass" else "paved"})
        el.clear()

    elif el.tag == "way":
        way_ids.add(el.get("id"))
        t = {c.get("k"): c.get("v") for c in el if c.tag == "tag"}
        # Tous les nœuds de la voie doivent être présents : une voie partielle
        # produit une géométrie trompeuse et peut rompre trottoirs / escaliers.
        refs = [c.get("ref") for c in el if c.tag == "nd"]
        pts = [nodes[r] for r in refs if r in nodes]
        if len(pts) >= 2 and len(pts) == len(refs):
            if refs[0] == refs[-1] and (
                t.get("natural") == "water" or t.get("waterway") == "riverbank" or
                t.get("landuse") in ("reservoir", "basin")
            ):
                water_areas.append({"pts": pts, "name": t.get("name"), "water": t.get("water"), "natural": t.get("natural")})
            if t.get("waterway") in ("river", "canal", "stream", "ditch", "drain") and len(pts) >= 2:
                waterway_lines.append({"pts": pts, "name": t.get("name"), "waterway": t.get("waterway"), "width": t.get("width")})
            if refs[0] == refs[-1] and (
                t.get("area:highway") == "pedestrian" or
                (t.get("highway") == "pedestrian" and t.get("area") == "yes") or
                t.get("place") == "square" or t.get("landuse") == "plaza" or
                t.get("leisure") == "plaza" or t.get("amenity") == "marketplace"
            ):
                pedestrian_areas.append({"pts": pts, "name": t.get("name"), "surface": t.get("surface"), "landuse": t.get("landuse"), "kind": t.get("area:highway") or t.get("highway") or t.get("place") or t.get("landuse") or t.get("leisure") or t.get("amenity")})
            if refs[0] == refs[-1] and (t.get("area:highway") == "traffic_island" or t.get("highway") == "traffic_island" or t.get("traffic_calming") == "island" or t.get("landuse") == "grass"):
                medians.append({"pts": pts, "kind": "area", "tagged": t.get("area:highway") == "traffic_island" or t.get("highway") == "traffic_island" or t.get("traffic_calming") == "island", "surface": t.get("surface"), "landuse": t.get("landuse"), "material": "grass" if t.get("surface") == "grass" or t.get("landuse") == "grass" else "paved"})
            hw = t.get("highway")
            if hw and hw != "steps":
                roads.append({
                    "id": el.get("id"), "name": t.get("name"), "highway": hw,
                    "width": t.get("width"), "est_width": t.get("est_width"), "lanes": t.get("lanes"),
                    "turn_lanes": t.get("turn:lanes"), "turn_lanes_forward": t.get("turn:lanes:forward"), "turn_lanes_backward": t.get("turn:lanes:backward"),
                    "sidewalk": t.get("sidewalk"), "sidewalk_left": t.get("sidewalk:left"),
                    "sidewalk_right": t.get("sidewalk:right"),
                    "sidewalk_left_width": t.get("sidewalk:left:width"), "sidewalk_right_width": t.get("sidewalk:right:width"),
                    "surface": t.get("surface"),
                    "oneway": t.get("oneway"), "layer": t.get("layer"),
                    "bridge": t.get("bridge"), "tunnel": t.get("tunnel"), "pts": pts,
                })
            if hw == "steps":
                steps.append({
                    "pts": pts, "n": t.get("step_count"), "inc": t.get("incline"),
                    "w": t.get("width"), "hand": t.get("handrail"),
                    "conv": t.get("conveying")
                })
                cnt["steps"] += 1
            barrier_kind = t.get("barrier")
            if barrier_kind in ("fence", "railing", "wall", "retaining_wall",
                                "guard_rail", "handrail", "bollard", "hedge", "city_wall"):
                barriers.append({
                    "k": barrier_kind, "pts": pts, "h": t.get("height"),
                    "mat": t.get("material") or t.get("fence_type")
                })
                cnt["b_" + barrier_kind] += 1
            if t.get("man_made") == "quay" or t.get("embankment") in ("yes", "quay"):
                barriers.append({"k": "quay", "pts": pts, "h": t.get("height"), "mat": t.get("material") or "stone"})
                cnt["b_quay"] += 1
            if hw and (t.get("width") or t.get("est_width")):
                cnt["width"] += 1
            if hw and any(k.startswith("sidewalk") for k in t):
                cnt["sidewalk"] += 1
            if hw == "footway" and t.get("footway") == "sidewalk":
                sidewalks.append({"pts": pts, "w": t.get("width"), "surf": t.get("surface")})
                cnt["sw_ways"] += 1
            if hw:
                cnt["surface_" + (t.get("surface") or "-")] += 1
        el.clear()

    elif el.tag == "relation":
        t = {c.get("k"): c.get("v") for c in el if c.tag == "tag"}
        if t.get("type") == "restriction":
            members = [
                {"type": c.get("type"), "ref": c.get("ref"), "role": c.get("role")}
                for c in el if c.tag == "member"
            ]
            # Conserve chaque variante par mode : restriction:bicycle, :bus,
            # :motorcar, :motor_vehicle, etc. Le champ historique "restriction"
            # reste prioritaire pour les consommateurs existants.
            restriction_by_mode = {
                key[len("restriction:"):]: value
                for key, value in t.items()
                if key.startswith("restriction:") and key != "restriction:conditional"
            }
            primary = (t.get("restriction") or t.get("restriction:motorcar")
                       or t.get("restriction:motor_vehicle"))
            turn_restrictions.append({
                "id": el.get("id"),
                "restriction": primary,
                "restriction_by_mode": restriction_by_mode,
                "restriction_conditional": t.get("restriction:conditional"),
                "except": t.get("except"),
                "tags": t,
                "members": members,
            })
        el.clear()

# Vérifie les références des relations de restriction après lecture de tous les ways.
for rel in turn_restrictions:
    missing = []
    for m in rel["members"]:
        if m["type"] == "way" and m["ref"] not in way_ids:
            missing.append(m)
        elif m["type"] == "node" and m["ref"] not in nodes:
            missing.append(m)
    rel["missing_members"] = missing
    rel["complete"] = not missing

print(len(bollards), "bollards", len(kerbs), "kerb nodes")
print(cnt.most_common(40))
print(len(turn_restrictions), "turn restrictions;", sum(not r["complete"] for r in turn_restrictions), "incomplete")
os.makedirs(os.path.dirname(OUT_FILE) or '.', exist_ok=True)
with open(OUT_FILE, "wb") as f:
    pickle.dump({"steps": steps, "bollards": bollards, "barriers": barriers,
                 "sidewalks": sidewalks, "roads": roads, "crossings": crossings, "medians": medians,
                 "pedestrian_areas": pedestrian_areas, "water_areas": water_areas,
                 "waterway_lines": waterway_lines,
                 "turn_restrictions": turn_restrictions},
                f, protocol=pickle.HIGHEST_PROTOCOL)

# Sidecar JSON lisible : le graphe runtime devra encore conserver les way IDs
# pour pouvoir appliquer ces règles au routage (ce script ne modifie pas global.json).
restriction_file = os.environ.get(
    "GTR_TURN_RESTRICTIONS_JSON",
    os.path.splitext(OUT_FILE)[0] + ".restrictions.json"
)
os.makedirs(os.path.dirname(restriction_file) or ".", exist_ok=True)
with open(restriction_file, "w", encoding="utf-8") as f:
    json.dump({"source": os.path.basename(OSM_FILE), "count": len(turn_restrictions),
               "complete": sum(r["complete"] for r in turn_restrictions),
               "incomplete": sum(not r["complete"] for r in turn_restrictions),
               "relations": turn_restrictions}, f, ensure_ascii=False, separators=(",", ":"))
