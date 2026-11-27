"""Robust polygon union for adjacent carriageways and junctions."""
from shapely.ops import unary_union


def merge_corridors(polygons, close_distance=2.0, simplify_tolerance=0.05):
    """Merge overlapping road-corridor pieces into valid junction surfaces."""
    if not polygons:
        from shapely.geometry import GeometryCollection
        return GeometryCollection()
    merged = unary_union(polygons)
    if merged.is_empty:
        return merged
    merged = merged.buffer(close_distance, quad_segs=4).buffer(-close_distance, quad_segs=4)
    merged = merged.simplify(simplify_tolerance, preserve_topology=True)
    if merged.geom_type == "Polygon":
        return merged if merged.is_valid else merged.buffer(0)
    parts = [g for g in getattr(merged, "geoms", []) if g.geom_type == "Polygon" and g.area > 0.25]
    if not parts:
        from shapely.geometry import GeometryCollection
        return GeometryCollection()
    result = unary_union(parts)
    return result if result.is_valid else result.buffer(0)
