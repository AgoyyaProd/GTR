"""Extraction OSM pour les détails piétons et barrières des rues.
Conserve le référentiel métrique du jeu et supporte les identifiants OSM longs.
"""
import xml.etree.ElementTree as ET
import math
import pickle
import collections

# Référentiel historique du jeu : compatible avec les tuiles existantes.
LAT0 = (48.1055 + 48.1192) / 2
LON0 = (-1.6905 - 1.6625) / 2
KX = math.cos(math.radians(LAT0)) * 111320
KY = 110540

nodes = {}
steps = []
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
        el.clear()

    elif el.tag == "way":
        t = {c.get("k"): c.get("v") for c in el if c.tag == "tag"}
        # Tous les nœuds de la voie doivent être présents : une voie partielle
        # produit une géométrie trompeuse et peut rompre trottoirs / escaliers.
        refs = [c.get("ref") for c in el if c.tag == "nd"]
        pts = [nodes[r] for r in refs if r in nodes]
        if len(pts) >= 2 and len(pts) == len(refs):
            hw = t.get("highway")
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
        # Les relations (notamment frontières / quartiers) sont traitées par
        # le pipeline géographique principal, pas par cet export de détails.
        el.clear()

print(len(bollards), "bollards", len(kerbs), "kerb nodes")
print(cnt.most_common(40))
os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
with open(OUT_FILE, "wb") as f:
    pickle.dump({"steps": steps, "bollards": bollards, "barriers": barriers,
                 "sidewalks": sidewalks}, f, protocol=pickle.HIGHEST_PROTOCOL)
