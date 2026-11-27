"""OSM road profile parsing and conservative width defaults for visible street meshes."""
import re

HIGHWAY_WIDTH = {
    "motorway": 12.0, "motorway_link": 6.0, "trunk": 10.0, "trunk_link": 6.0,
    "primary": 8.0, "primary_link": 5.5, "secondary": 7.0, "secondary_link": 5.0,
    "tertiary": 6.0, "tertiary_link": 4.5, "unclassified": 5.0,
    "residential": 5.0, "living_street": 4.5, "service": 3.5,
    "track": 3.0, "pedestrian": 4.0, "footway": 2.0, "cycleway": 2.0,
    "path": 2.0, "bridleway": 2.0, "steps": 1.8,
}

def metres(value):
    """Parse common OSM width values in metres or imperial units."""
    if value is None:
        return None
    s = str(value).strip().lower().replace(",", ".")
    if not s or ";" in s or "-" in s:
        return None
    try:
        if "'" in s or "ft" in s:
            m = re.fullmatch(r"\s*(\d+(?:\.\d+)?)\s*(?:'|ft)(?:\s*(\d+(?:\.\d+)?)\s*(?:\"|in))?\s*", s)
            if not m:
                return None
            return float(m.group(1)) * 0.3048 + float(m.group(2) or 0) * 0.0254
        n = float(re.sub(r"\s*m(?:eters?)?\s*$", "", s))
        return n if 1.0 <= n <= 40.0 else None
    except ValueError:
        return None

def road_width(tags):
    """Explicit width wins, then lane count, then a conservative highway default."""
    explicit = metres(tags.get("width")) or metres(tags.get("est_width"))
    if explicit is not None:
        return explicit
    try:
        lanes = float(str(tags.get("lanes", "")).replace(",", "."))
        if 1 <= lanes <= 12:
            return lanes * (3.0 if tags.get("highway") in ("motorway", "trunk", "primary", "secondary") else 2.8)
    except ValueError:
        pass
    return HIGHWAY_WIDTH.get(tags.get("highway"), 5.0)

def sidewalk_sides(tags):
    """Return explicit sidewalk presence per side; None is kept as unmapped."""
    common = tags.get("sidewalk")
    left = tags.get("sidewalk:left", common)
    right = tags.get("sidewalk:right", common)
    return tuple(v not in ("no", "none") for v in (left, right))
