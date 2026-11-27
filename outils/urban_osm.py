"""Extraction et dédoublonnage des objets urbains OSM."""
FURNITURE_CODES = {"bench": 0, "lamp": 3, "bollard": 4}

def classify_node_feature(tags, x, y):
    kind = None
    if tags.get("natural") == "tree": kind = "tree"
    elif tags.get("amenity") == "bench": kind = "bench"
    elif tags.get("amenity") == "fountain": kind = "fountain"
    elif tags.get("barrier") == "bollard": kind = "bollard"
    elif tags.get("highway") == "street_lamp": kind = "lamp"
    if kind is None: return None
    return {"kind": kind, "x": round(float(x), 2), "y": round(float(y), 2)}

def deduplicate_features(features, existing_trees=(), existing_furniture=(), radius=2.0):
    r2 = float(radius) ** 2
    trees = list(zip(existing_trees[::2], existing_trees[1::2]))
    furniture = {}
    for item in existing_furniture:
        if len(item) >= 3:
            code, x, y = item[:3]
            furniture.setdefault(int(code), []).append((float(x), float(y)))
    kept, duplicates = [], 0
    for feature in features:
        kind, x, y = feature["kind"], float(feature["x"]), float(feature["y"])
        candidates = trees if kind == "tree" else furniture.get(FURNITURE_CODES.get(kind), ())
        if any((x-px)**2 + (y-py)**2 <= r2 for px, py in candidates):
            duplicates += 1
        else:
            kept.append(feature)
            if kind == "tree": trees.append((x, y))
            elif kind in FURNITURE_CODES: furniture.setdefault(FURNITURE_CODES[kind], []).append((x, y))
    return kept, duplicates

def is_closed_area(refs, pts):
    return len(refs) >= 4 and refs[0] == refs[-1] and len(pts) == len(refs)
