"""Street profiles: carriageways sized to the real street (OSM sidewalks, facade-to-facade gap),
living streets get a cobbled carriageway with kerbs, plus steps and barriers for every tile.
Writes rp (asphalt), rq (setts), cb (kerbs), st (steps), fn (fences/walls). Replaces curbs.py output."""
import json, glob, os, math, pickle, numpy as np
import shapely
from shapely.geometry import LineString, Polygon, Point, box, MultiPolygon, MultiLineString
from shapely.geometry.polygon import orient
from shapely.ops import unary_union, nearest_points
from shapely.strtree import STRtree
from street_geometry import merge_corridors
from urban_osm import deduplicate_features, FURNITURE_CODES
import mapbox_earcut as earcut

G = os.environ.get('GTR_ROOT', '/home/claude/g2')
gd = json.load(open(f'{G}/global.json'))
BX0, BY0, BX1, BY1 = gd['bounds']; T = gd['tile']
tiles = {}
for f in sorted(glob.glob(f'{G}/tiles/t*.json')):
    i, j = map(int, os.path.basename(f)[1:-5].split('_')); tiles[(i, j)] = json.load(open(f))
S = pickle.load(open(os.environ.get('GTR_STREET_OSM_PICKLE', '/home/claude/tools/street_osm.pkl'), 'rb'))
from street_profiles import road_width
# Match simplified tile centerlines back to their source OSM way. A name match
# is required: nearest geometry alone can silently assign a parallel street's width.
osm_road_lines = []
osm_road_records = []
for road in S.get('roads', []):
    if len(road.get('pts', [])) < 2:
        continue
    line = LineString(road['pts'])
    if line.length < 1:
        continue
    osm_road_lines.append(line)
    osm_road_records.append(road)
osm_road_tree = STRtree(osm_road_lines) if osm_road_lines else None
profiled_ways = 0
unmatched_named = 0
if osm_road_tree is not None:
    for d in tiles.values():
        for r in d['r']:
            if r[1] not in (0, 3) or len(r) < 8:
                continue
            pts = list(zip(r[4::2], r[5::2]))
            if len(pts) < 2:
                continue
            mid = LineString(pts).interpolate(0.5, normalized=True)
            candidates = osm_road_tree.query(mid.buffer(18))
            best = None
            best_score = float('inf')
            for ci in candidates:
                source = osm_road_records[int(ci)]
                dist = osm_road_lines[int(ci)].distance(mid)
                source_name = source.get('name')
                same_name = bool(r[3] and source_name == r[3])
                # Named roads must agree. Unnamed roads may be matched only at
                # very close range and with a clear geometric winner; this avoids
                # borrowing the width of a parallel carriageway.
                if r[3] and not same_name:
                    continue
                if dist > (12 if same_name else 3.0):
                    continue
                source_line = osm_road_lines[int(ci)]
                source_coords = list(source_line.coords)
                def heading(coords):
                    ax, ay = coords[0]; bx, by = coords[-1]
                    return math.atan2(by - ay, bx - ax)
                delta = abs((heading(pts) - heading(source_coords) + math.pi) % (2 * math.pi) - math.pi)
                alignment = min(delta, abs(math.pi - delta))
                if alignment > math.radians(22):
                    continue
                score = dist + (0 if same_name else 1.5) + alignment * 2
                if score < best_score:
                    best, best_score = source, score
            if best is not None:
                r[0] = round(road_width(best), 2)
                profiled_ways += 1
            elif r[3]:
                unmatched_named += 1
print('OSM road profiles matched', profiled_ways, 'unmatched named tile roads', unmatched_named, flush=True)

# ---- shared OSM nodes: real junction cores and approach zebra crossings ----
# OSM ways share the exact projected coordinate of a common node. Count distinct
# outward bearings (not merely ways) so a shaped bend is never mistaken for a junction.
node_arms = {}
for road in S.get('roads', []):
    pts = road.get('pts', [])
    if len(pts) < 2 or road.get('bridge') not in (None, '', 'no') or road.get('tunnel') not in (None, '', 'no'):
        continue
    # Seules les voies circulées forment des carrefours : un chemin ou un trottoir qui
    # rejoint une rue ne doit pas poser un disque d'asphalte dans un parc ou sur une place.
    if road.get('highway') in ('footway', 'path', 'cycleway', 'steps', 'pedestrian', 'track', 'bridleway', 'corridor', 'platform', 'traffic_island', None):
        continue
    width = road_width(road)
    for k, (x, y) in enumerate(pts):
        arms = []
        if k > 0:
            dx, dy = x - pts[k-1][0], y - pts[k-1][1]
            ll = math.hypot(dx, dy)
            if ll > 1: arms.append((dx/ll, dy/ll))
        if k + 1 < len(pts):
            dx, dy = pts[k+1][0] - x, pts[k+1][1] - y
            ll = math.hypot(dx, dy)
            if ll > 1: arms.append((dx/ll, dy/ll))
        if arms:
            node_arms.setdefault((round(x, 2), round(y, 2)), []).extend((a, b, width, road) for a, b in arms)
def tile_of(x, y): return (int((x - BX0) // T), int((y - BY0) // T))

junction_polys = []
junction_cores = []
node_arms = {}
for road in S.get('roads', []):
    pts = road.get('pts', [])
    if len(pts) < 2 or road.get('bridge') not in (None, '', 'no') or road.get('tunnel') not in (None, '', 'no'):
        continue
    if road.get('highway') in ('footway', 'path', 'cycleway', 'steps', 'pedestrian', 'track', 'bridleway', 'corridor', 'platform', None):
        continue
    width = road_width(road)
    for k, (x, y) in enumerate(pts):
        arms = []
        if k > 0:
            dx, dy = x - pts[k-1][0], y - pts[k-1][1]
            ll = math.hypot(dx, dy)
            if ll > 1: arms.append((dx/ll, dy/ll))
        if k + 1 < len(pts):
            dx, dy = pts[k+1][0] - x, pts[k+1][1] - y
            ll = math.hypot(dx, dy)
            if ll > 1: arms.append((dx/ll, dy/ll))
        if arms:
            node_arms.setdefault((round(x, 2), round(y, 2)), []).extend((a, b, width, road) for a, b in arms)
for (x, y), arms in node_arms.items():
    dirs = []
    for ax, ay, width, road in arms:
        if not any(ax*bx + ay*by > math.cos(math.radians(24)) for bx, by, _, _ in dirs):
            dirs.append((ax, ay, width, road))
    if len(dirs) < 3:
        continue
    radius = min(10.0, max(4.0, max(q[2] for q in dirs) * 0.72))
    core = Point(x, y).buffer(radius, quad_segs=12)
    approach = []
    for ax, ay, width, road in dirs:
        arm_len = radius + max(width, 4.0) * 0.8
        centreline = LineString([(x, y), (x + ax*arm_len, y + ay*arm_len)])
        approach.append(centreline.buffer(width/2 + 0.12, cap_style=2, join_style=2))
    footprint = unary_union(approach).intersection(core).buffer(0)
    if not footprint.is_empty and footprint.area > 5:
        junction_polys.append(footprint)
        junction_cores.append((round(x, 2), round(y, 2), round(radius, 2)))
junction_union = unary_union(junction_polys) if junction_polys else Polygon()
print('OSM junctions', len(junction_cores), flush=True)


# Zébras : uniquement les nœuds OSM explicitement marqués. Rattachement à la
# chaussée la plus proche et rejet des emprises qui se chevauchent.
crossing_records = {key: [] for key in tiles}
crossing_ramps = {key: [] for key in tiles}
crossing_gaps = []
crossing_centres = []
marked_nodes = []
for c in S.get('crossings', []):
    crossing = (c.get('crossing') or '').lower()
    markings = (c.get('markings') or '').lower()
    if not (crossing in ('zebra', 'marked') or markings in ('yes', 'zebra', 'marked')):
        continue
    marked_nodes.append(c)
accepted_footprints = []
accepted_centres = []
accepted_count = 0
for c in sorted(marked_nodes, key=lambda q: str(q.get('id', ''))):
    point = Point(c['x'], c['y'])
    candidates = osm_road_tree.query(point.buffer(24)) if osm_road_tree is not None else []
    best = None
    best_dist = float('inf')
    for ci in candidates:
        source = osm_road_records[int(ci)]
        if source.get('highway') in ('footway', 'path', 'cycleway', 'steps', 'pedestrian', 'track', 'bridleway', 'corridor', 'platform'):
            continue
        if source.get('bridge') not in (None, '', 'no') or source.get('tunnel') not in (None, '', 'no'):
            continue
        line = osm_road_lines[int(ci)]
        dist = line.distance(point)
        limit = max(8.0, road_width(source) * 0.5 + 5.0)
        # Le nœud highway=crossing appartient à la voie qu'il traverse : si l'un des
        # sommets de cette voie est le nœud lui-même, elle gagne toujours (sinon, près
        # d'un carrefour, la rue perpendiculaire voisine peut être choisie et le zèbre
        # part dans le mauvais sens).
        if min(math.hypot(px - c['x'], py - c['y']) for px, py in line.coords) < 0.05:
            dist = -1.0
        if dist <= limit and dist < best_dist:
            best, best_dist = (source, line), dist
    if best is None:
        continue
    road, line = best
    measure = line.project(point)
    centre = line.interpolate(measure)
    eps = min(1.0, max(0.25, line.length * 0.002))
    a = line.interpolate(max(0.0, measure - eps))
    b = line.interpolate(min(line.length, measure + eps))
    dx, dy = b.x - a.x, b.y - a.y
    ll = math.hypot(dx, dy)
    if ll < 0.1:
        continue
    ux, uy = dx/ll, dy/ll
    nx, ny = -uy, ux
    width = max(3.6, min(road_width(road), 18.0))
    half = width/2 - 0.18
    if half < 1.5:
        continue
    footprint = Polygon([
        (centre.x-ux*2.7-nx*(half+0.15), centre.y-uy*2.7-ny*(half+0.15)),
        (centre.x+ux*2.7-nx*(half+0.15), centre.y+uy*2.7-ny*(half+0.15)),
        (centre.x+ux*2.7+nx*(half+0.15), centre.y+uy*2.7+ny*(half+0.15)),
        (centre.x-ux*2.7+nx*(half+0.15), centre.y-uy*2.7+ny*(half+0.15))])
    overlap = False
    for old, (ox, oy) in zip(accepted_footprints, accepted_centres):
        ratio = footprint.intersection(old).area / max(0.1, min(footprint.area, old.area))
        if ratio > 0.10 or math.hypot(centre.x-ox, centre.y-oy) < 2.4:
            overlap = True
            break
    if overlap:
        continue
    accepted_footprints.append(footprint)
    accepted_centres.append((centre.x, centre.y))
    crossing_centres.append((centre.x, centre.y, math.hypot(2.9, width/2 + 0.45)))
    accepted_count += 1
    # Passage piéton à la française : bandes de 0,50 m, PARALLÈLES à la circulation,
    # longues de 2,50 m dans le sens de la rue, répétées en travers de la chaussée
    # (pas de 1,00 m : 0,50 m peint, 0,50 m vide).
    n_bars = max(2, int((2 * half + 0.5) // 1.0))
    start = -(n_bars - 1) * 0.5
    for band in range(n_bars):
        off = start + band * 1.0
        bx, by = centre.x + nx*off, centre.y + ny*off
        poly = Polygon([
            (bx-ux*1.25-nx*0.25, by-uy*1.25-ny*0.25),
            (bx+ux*1.25-nx*0.25, by+uy*1.25-ny*0.25),
            (bx+ux*1.25+nx*0.25, by+uy*1.25+ny*0.25),
            (bx-ux*1.25+nx*0.25, by-uy*1.25+ny*0.25)])
        minx, miny, maxx, maxy = poly.bounds
        ix0, iy0 = tile_of(minx, miny)
        ix1, iy1 = tile_of(maxx, maxy)
        for ti in range(ix0, ix1 + 1):
            for tj in range(iy0, iy1 + 1):
                if (ti, tj) in crossing_records:
                    crossing_records[(ti, tj)].append(poly)
    # La bordure est interrompue sur 2,3 m et une rampe relie chaussée/trottoir.
    gap = Polygon([
        (centre.x-ux*1.15-nx*(width/2+5.0), centre.y-uy*1.15-ny*(width/2+5.0)),
        (centre.x+ux*1.15-nx*(width/2+5.0), centre.y+uy*1.15-ny*(width/2+5.0)),
        (centre.x+ux*1.15+nx*(width/2+5.0), centre.y+uy*1.15+ny*(width/2+5.0)),
        (centre.x-ux*1.15+nx*(width/2+5.0), centre.y-uy*1.15+ny*(width/2+5.0))])
    crossing_gaps.append(gap)
    tk = tile_of(centre.x, centre.y)
    if tk in crossing_ramps:
        for side in (-1, 1):
            d0 = side * (width/2 + 0.12)
            d1 = side * (width/2 + 1.45)
            crossing_ramps[tk].append([
                round(centre.x-ux*0.95+nx*d0,2), round(centre.y-uy*0.95+ny*d0,2),
                round(centre.x+ux*0.95+nx*d0,2), round(centre.y+uy*0.95+ny*d0,2),
                round(centre.x+ux*0.95+nx*d1,2), round(centre.y+uy*0.95+ny*d1,2),
                round(centre.x-ux*0.95+nx*d1,2), round(centre.y-uy*0.95+ny*d1,2)])
print('OSM marked crossings', accepted_count, 'zebra bars', sum(map(len, crossing_records.values())), flush=True)

# (déplacé après les zèbres : les flèches évitent crossing_centres, qui doit exister)
# Flèches directionnelles : chaque branche OSM qui arrive à un cœur jc reçoit
# une flèche par voie. Sans turn:lanes, toutes sont "tout droit". Les carrefours
# peuvent être des nœuds intérieurs d'une way : on les parcourt tous.
junction_nodes = {(round(x, 2), round(y, 2)) for x, y, _ in junction_cores}
arrow_records = {key: [] for key in tiles}
def arrow_polygon(cx, cy, ux, uy, turn):
    vx, vy = ux*math.cos(turn)-uy*math.sin(turn), ux*math.sin(turn)+uy*math.cos(turn)
    nx, ny = -vy, vx
    coords = [(-2.0,-0.22), (0.45,-0.22), (0.45,-0.72), (2.0,0.0), (0.45,0.72), (0.45,0.22), (-2.0,0.22)]
    return Polygon([(cx+a*vx+b*nx, cy+a*vy+b*ny) for a,b in coords])
for road in S.get('roads', []):
    pts = road.get('pts', [])
    if len(pts) < 2 or road.get('highway') in ('footway','path','cycleway','steps','pedestrian','track','bridleway','corridor','platform'): continue
    if road.get('bridge') not in (None,'','no') or road.get('tunnel') not in (None,'','no'): continue
    try: total_lanes = max(0, int(float((road.get('lanes') or '0').split(';')[0])))
    except (ValueError, TypeError): total_lanes = 0
    oneway = road.get('oneway') in ('yes','1','true'); reverse_only = road.get('oneway') == '-1'
    f_tags, b_tags, generic_tags = road.get('turn_lanes_forward') or '', road.get('turn_lanes_backward') or '', road.get('turn_lanes') or ''
    f_count = len(f_tags.split('|')) if f_tags else 0; b_count = len(b_tags.split('|')) if b_tags else 0
    generic_count = len(generic_tags.split('|')) if generic_tags else 0
    if oneway or reverse_only:
        per_dir = total_lanes or generic_count; directions = [True] if oneway else [False]
    elif total_lanes >= 4:
        per_dir = total_lanes // 2; directions = [True, False]
    else:
        per_dir = max(f_count, b_count); directions = ([True] if f_count >= 2 else []) + ([False] if b_count >= 2 else [])
    if per_dir < 2 or not directions: continue
    width = road_width(road); lane_w = width / max(1, total_lanes or (per_dir if oneway or reverse_only else per_dir*2))
    for ni, node in enumerate(pts):
        if (round(node[0],2), round(node[1],2)) not in junction_nodes: continue
        for forward in directions:
            if forward and ni == 0: continue
            if not forward and ni == len(pts)-1: continue
            path = pts[:ni+1] if forward else list(reversed(pts[ni:]))
            approach = LineString(path); length = approach.length
            if length < 11: continue
            pos = approach.interpolate(max(0.0,length-8.0)); pa = approach.interpolate(max(0.0,length-9.0)); pb = approach.interpolate(max(0.0,length-7.0))
            dx,dy = pb.x-pa.x,pb.y-pa.y; ll=math.hypot(dx,dy)
            if ll < 0.1: continue
            ux,uy=dx/ll,dy/ll; nx,ny=-uy,ux
            lane_tags = (f_tags if forward else b_tags) or (generic_tags if oneway or reverse_only else '')
            turns = [q.strip() for q in lane_tags.split('|')] if lane_tags else []
            if len(turns) != per_dir: turns = ['through'] * per_dir
            for li,turn_tag in enumerate(turns[:per_dir]):
                turn = 0.42 if 'left' in turn_tag else -0.42 if 'right' in turn_tag else 0.0
                lateral = width/2-(li+0.5)*lane_w if oneway or reverse_only else -(li+0.5)*lane_w
                cx,cy=pos.x+nx*lateral,pos.y+ny*lateral
                if any(math.hypot(cx-qx,cy-qy)<radius+1.0 for qx,qy,radius in crossing_centres): continue
                pg=arrow_polygon(cx,cy,ux,uy,turn); tk=tile_of(cx,cy)
                if pg.area>0.1 and tk in arrow_records: arrow_records[tk].append(pg)
print('OSM approach arrows',sum(map(len,arrow_records.values())),flush=True)

# Ne jamais toucher à d['r'] : les indices sont partagés avec bh, t.seg,
# la conduite et l'IA. Les métadonnées topologiques sont exportées séparément.
for tk, d in tiles.items():
    ox0, oy0 = BX0 + tk[0] * T, BY0 + tk[1] * T
    d['jc'] = [[x, y, r] for x, y, r in junction_cores if ox0-r <= x <= ox0+T+r and oy0-r <= y <= oy0+T+r]
    d['xc'] = [[x, y, r] for x, y, r in crossing_centres if ox0-r <= x <= ox0+T+r and oy0-r <= y <= oy0+T+r]
    d['ar'] = []
    tilebox = box(ox0, oy0, ox0+T, oy0+T)
    for pg in arrow_records.get(tk, []):
        # Un zébra prime sur une flèche : ne jamais superposer les deux marquages.
        if any(pg.distance(Point(x, y)) < radius + 0.8 for x, y, radius in crossing_centres):
            continue
        part = pg.intersection(tilebox)
        parts = list(part.geoms) if hasattr(part, 'geoms') else [part]
        for ap in parts:
            if ap.geom_type == 'Polygon' and ap.area > 0.05:
                d['ar'].append([round(v,2) for xy in list(ap.exterior.coords)[:-1] for v in xy])
    d['xw'] = []
    for poly in crossing_records.get(tk, []):
        part = poly.intersection(tilebox)
        parts = list(part.geoms) if hasattr(part, 'geoms') else [part]
        for pg in parts:
            if pg.geom_type == 'Polygon' and pg.area > 0.03:
                d['xw'].append([round(v,2) for xy in list(pg.exterior.coords)[:-1] for v in xy])
    d['dr'] = crossing_ramps.get(tk, [])

# Îlots explicitement cartographiés : aucune médiane inventée entre deux voies.
median_grass_parts = []
median_paved_parts = []
for m in S.get('medians', []):
    pts = m.get('pts', [])
    if m.get('kind') == 'node' and pts:
        (median_grass_parts if m.get('material') == 'grass' else median_paved_parts).append(Point(pts[0]).buffer(1.15, quad_segs=6))
    elif len(pts) >= 4 and pts[0] == pts[-1]:
        pg = Polygon(pts).buffer(0)
        if pg.area >= 1.0 and pg.area <= 1800:
            rect = pg.minimum_rotated_rectangle
            sides = [math.hypot(rect.exterior.coords[i+1][0]-rect.exterior.coords[i][0], rect.exterior.coords[i+1][1]-rect.exterior.coords[i][1]) for i in range(4)]
            short_side, long_side = min(sides), max(sides)
            tagged_island = bool(m.get('tagged'))
            if tagged_island or (long_side >= 5.0 and short_side <= 8.0 and long_side >= short_side * 2.5):
                (median_grass_parts if m.get('material') == 'grass' else median_paved_parts).append(pg)
median_grass = unary_union(median_grass_parts) if median_grass_parts else Polygon()
median_paved = unary_union(median_paved_parts) if median_paved_parts else Polygon()

# Places et espaces piétons explicitement fermés dans OSM (pas de polygones
# déduits des rues). Les tags surface déterminent le revêtement rendu.
pedestrian_area_geoms = {0: [], 1: [], 2: []}  # dalles, pavés, asphalte
for area in S.get('pedestrian_areas', []):
    pts = area.get('pts', [])
    if len(pts) < 4 or pts[0] != pts[-1]:
        continue
    surface = (area.get('surface') or '').lower()
    if surface in ('grass', 'earth', 'dirt', 'mud', 'sand') or area.get('landuse') == 'grass':
        continue  # ne pas transformer un espace vert en place minérale
    try:
        pg = Polygon(pts).buffer(0)
        if pg.area < 20 or pg.area > 60000:
            continue
        if surface in ('sett', 'cobblestone', 'unhewn_cobblestone', 'cobble'):
            code = 1
        elif surface in ('asphalt', 'chipseal'):
            code = 2
        else:
            code = 0  # paving_stones, concrete, granite ou surface non renseignée
        pedestrian_area_geoms[code].append(pg)
    except Exception:
        continue
print('OSM pedestrian plazas', sum(map(len, pedestrian_area_geoms.values())), flush=True)
for tk, d in tiles.items():
    ox0, oy0 = BX0 + tk[0] * T, BY0 + tk[1] * T
    tilebox = box(ox0, oy0, ox0+T, oy0+T)
    d['md'] = []  # îlots minéraux : pavés / dalles, jamais MAT.grass
    d['mg'] = []  # uniquement landuse=grass ou surface=grass
    d['pa'] = []  # polygones de places piétonnes OSM : [matériau, coordonnées]
    for code, geoms in pedestrian_area_geoms.items():
        for geom in geoms:
            part = geom.intersection(tilebox)
            parts = list(part.geoms) if hasattr(part, 'geoms') else [part]
            for pg in parts:
                if pg.geom_type == 'Polygon' and pg.area > 1.0:
                    d['pa'].append([code] + [round(v,2) for xy in list(pg.exterior.coords)[:-1] for v in xy])
    for geom, key in ((median_paved, 'md'), (median_grass, 'mg')):
        part = geom.intersection(tilebox)
        parts = list(part.geoms) if hasattr(part, 'geoms') else [part]
        for pg in parts:
            if pg.geom_type == 'Polygon' and pg.area > 0.5:
                d[key].append([round(v,2) for xy in list(pg.exterior.coords)[:-1] for v in xy])

def living(r): return r[1] == 1 and (r[2] & 8) and abs(r[0] - 5.5) < 0.01
def pedestrian(r): return r[1] == 1 and (r[2] & 8) and abs(r[0] - 7) < 0.01 and not r[2] & 2
def lowered(r): return (r[1] in (0, 3) or living(r)) and not r[2] & 2
def profiled(r): return lowered(r) or pedestrian(r)

# ---- obstacles to measure the street: building footprints and mapped sidewalks ----
bpolys = []
for d in tiles.values():
    for rec in d.get('lb', []):
        f = rec.get('f')
        if f and len(f) >= 6:
            try:
                p = Polygon(list(zip(f[::2], f[1::2]))).buffer(0)
                if p.area > 4: bpolys.append(p)
            except Exception: pass
    for b in d.get('b', []):
        pass
print('buildings', len(bpolys), flush=True)
bedges = [p.exterior for p in bpolys]
btree = STRtree(bedges)
swl = [LineString(s['pts']) for s in S['sidewalks'] if len(s['pts']) >= 2]
# Explicit sidewalk=* on a road is a centreline offset from the carriageway edge.
# Only mapped sides are generated; "separate" is handled by the dedicated footway.
for road in S.get('roads', []):
    pts = road.get('pts', [])
    if len(pts) < 2:
        continue
    common = road.get('sidewalk')
    sides = (road.get('sidewalk_left', common), road.get('sidewalk_right', common))
    if not any(v not in (None, 'no', 'none', 'separate') for v in sides):
        continue
    line = LineString(pts)
    try:
        width = float(road.get('width') or road.get('est_width') or 0)
    except ValueError:
        width = 0
    try:
        lanes = float(road.get('lanes') or 0)
    except ValueError:
        lanes = 0
    half = width / 2 if width > 0 else (lanes * 1.4 if lanes > 0 else 2.5)
    for side, value, swidth in zip(('left', 'right'), sides, (road.get('sidewalk_left_width'), road.get('sidewalk_right_width'))):
        try: offset = half + max(0.6, float((swidth or '').replace('m', '').strip() or 3.0) / 2)
        except ValueError: offset = half + 1.5
        if value in (None, 'no', 'none', 'separate'):
            continue
        try:
            shifted = line.parallel_offset(offset, side, join_style='mitre')
            parts = list(shifted.geoms) if hasattr(shifted, 'geoms') else [shifted]
            swl.extend(g for g in parts if g.geom_type == 'LineString' and g.length > 1)
        except Exception:
            pass
swtree = STRtree(swl)
print('sidewalk lines', len(swl), flush=True)

def first_hit(tree, geoms, rays):
    """distance from each ray start to its first intersection with the geometries (inf if none)"""
    out = np.full(len(rays), np.inf)
    ri, gi = tree.query(rays, predicate='intersects')
    if len(ri) == 0: return out
    inter = shapely.intersection(np.array(rays)[ri], np.array(geoms)[gi])
    starts = shapely.points([list(r.coords[0]) for r in np.array(rays)[ri]])
    dist = shapely.distance(starts, inter)
    for k in range(len(ri)):
        if dist[k] < out[ri[k]]: out[ri[k]] = dist[k]
    return out

polys_a, polys_s, polys_f = [], [], []
samples = []  # (road idx, point, normal)
roads = []
for d in tiles.values():
    for r in d['r']:
        if not profiled(r): continue
        p = r[4:]; pts = list(zip(p[::2], p[1::2]))
        if len(pts) < 2: continue
        ls = shapely.segmentize(LineString(pts), 5.0); cs = list(ls.coords)
        if len(cs) < 2: continue
        roads.append((r, cs))
print('lowered roads', len(roads), flush=True)
rays_l, rays_r, meta = [], [], []
for ri, (r, cs) in enumerate(roads):
    for k, (x, y) in enumerate(cs):
        a = cs[max(0, k - 1)]; b = cs[min(len(cs) - 1, k + 1)]
        dx, dy = b[0] - a[0], b[1] - a[1]; l = math.hypot(dx, dy) or 1; nx, ny = -dy / l, dx / l
        rays_l.append(LineString([(x + nx * 0.5, y + ny * 0.5), (x + nx * 26, y + ny * 26)]))
        rays_r.append(LineString([(x - nx * 0.5, y - ny * 0.5), (x - nx * 26, y - ny * 26)]))
        meta.append((ri, k, nx, ny))
print('rays', len(meta), flush=True)
BL = first_hit(btree, bedges, rays_l) + 0.5; BR = first_hit(btree, bedges, rays_r) + 0.5
SL = first_hit(swtree, swl, rays_l) + 0.5; SR = first_hit(swtree, swl, rays_r) + 0.5
print('rays cast', flush=True)

prof = {}
for q, (ri, k, nx, ny) in enumerate(meta):
    r = roads[ri][0]; base = r[0] / 2; liv = living(r); ped = pedestrian(r)
    if ped: base = 2.6
    extra = 3.5 if liv else 6.0 if ped else (5.5 if r[1] == 0 else 2.0)
    gap = (BL[q] if BL[q] < 26 else 13) + (BR[q] if BR[q] < 26 else 13)
    out = []
    for db, ds in ((BL[q], SL[q]), (BR[q], SR[q])):
        if ds < 18 and ds < db and ds > base - 0.5: kerb = ds - 1.0          # OSM sidewalk centre line: kerb 1 m before it
        elif db < 26:
            sw = min(max(gap * (0.12 if ped else 0.13 if liv else 0.16), 1.2 if ped else 1.3 if liv else 1.6), 3.0 if ped else 2.6 if liv else 4.0)
            kerb = db - sw
        else: kerb = base
        lo = min(base, db - 0.9) if db < 26 else base
        out.append(min(max(kerb, lo), base + extra))
    prof.setdefault(ri, {})[k] = out
for ri, (r, cs) in enumerate(roads):
    pr = prof[ri]; n = len(cs)
    L = np.array([pr[k][0] for k in range(n)]); R = np.array([pr[k][1] for k in range(n)])
    if n >= 3:  # median smoothing so the kerb line does not wobble with every doorway
        L = np.array([np.median(L[max(0, k - 2):k + 3]) for k in range(n)]); R = np.array([np.median(R[max(0, k - 2):k + 3]) for k in range(n)])
    out = polys_f if pedestrian(r) else polys_s if living(r) else polys_a
    for k in range(n - 1):
        (ax, ay), (bx, by) = cs[k], cs[k + 1]; dx, dy = bx - ax, by - ay; l = math.hypot(dx, dy) or 1; nx, ny = -dy / l, dx / l
        q = Polygon([(ax + nx * L[k], ay + ny * L[k]), (bx + nx * L[k + 1], by + ny * L[k + 1]), (bx - nx * R[k + 1], by - ny * R[k + 1]), (ax - nx * R[k], ay - ny * R[k])])
        if q.is_valid and q.area > 0.01: out.append(q)
        out.append(Point(ax, ay).buffer(min(L[k], R[k]), quad_segs=4))
    out.append(Point(*cs[-1]).buffer(min(L[-1], R[-1]), quad_segs=4))
print('profiles built', flush=True)

def rings_of(u):
    ps = list(u.geoms) if hasattr(u, 'geoms') else [u]; out = []
    for p in ps:
        if p.geom_type != 'Polygon' or p.area < 1: continue
        p = orient(p, 1.0); out.append(LineString(p.exterior.coords)); out += [LineString(h.coords) for h in p.interiors]
    return out
UA = unary_union([merge_corridors(polys_a), junction_union]); US = merge_corridors(polys_s).difference(UA.buffer(0.01))
U = unary_union([UA, US])
water_parts = [Polygon(list(zip(w[::2], w[1::2]))).buffer(0) for w in gd['water'] if len(w) >= 6]
for wa in S.get('water_areas', []):
    pts = wa.get('pts', [])
    if len(pts) >= 4 and pts[0] == pts[-1]:
        try:
            wp = Polygon(pts).buffer(0)
            if wp.area > 2: water_parts.append(wp)
        except Exception: pass
water = unary_union(water_parts).buffer(0.8) if water_parts else Polygon()
# never into buildings
BU = unary_union(bpolys).buffer(0.6)
UA = UA.difference(BU); US = US.difference(BU); U = unary_union([UA, US])
UF = merge_corridors(polys_f).difference(BU).difference(U.buffer(0.3))
OLD = Point(-330, 40).buffer(900)
bedge = shapely.segmentize(MultiLineString(rings_of(UF.intersection(OLD))).difference(U.buffer(1.0)), 4.0) if not UF.is_empty else MultiLineString([])
UA = shapely.segmentize(UA, 4.0); US = shapely.segmentize(US, 4.0)
print('unions done', flush=True)
def rings_of(u):
    ps = list(u.geoms) if hasattr(u, 'geoms') else [u]; out = []
    for p in ps:
        if p.geom_type != 'Polygon' or p.area < 1: continue
        p = orient(p, 1.0); out.append(LineString(p.exterior.coords)); out += [LineString(h.coords) for h in p.interiors]
    return out
bridges = []
for d in tiles.values():
    for r in d['r']:
        if r[1] in (0, 3) and r[2] & 2:
            p = r[4:]; pts = list(zip(p[::2], p[1::2]))
            if len(pts) >= 2: bridges.append(LineString(pts).buffer(r[0] / 2 + 0.6, cap_style=2))
cut = unary_union([water] + bridges)
kerbs = shapely.segmentize(MultiLineString(rings_of(U)).difference(cut).difference(unary_union(crossing_gaps) if crossing_gaps else Polygon()), 4.0)

def tri(poly, ox, oy):
    v, idx = [], []
    for pg in (poly.geoms if hasattr(poly, 'geoms') else [poly]):
        if pg.geom_type != 'Polygon' or pg.area < 0.5: continue
        rs = [np.array(pg.exterior.coords[:-1])] + [np.array(h.coords[:-1]) for h in pg.interiors]
        rs = [r for r in rs if len(r) >= 3]
        if not rs: continue
        verts = np.concatenate(rs).astype(np.float64); ends = np.cumsum([len(r) for r in rs]).astype(np.uint32)
        ii = earcut.triangulate_float64(verts, ends); base = len(v) // 2
        for x, y in verts: v += [int(round((x - ox) * 10)), int(round((y - oy) * 10))]
        idx += [int(k) + base for k in ii]
    return v, idx

def tile_of(x, y): return (int((x - BX0) // T), int((y - BY0) // T))
for d in tiles.values(): d['st'] = []; d['fn'] = []
for s in S['steps']:
    pts = s['pts']; mx, my = pts[len(pts) // 2]; tk = tile_of(mx, my)
    if tk not in tiles: continue
    try: w = float((s['w'] or '').replace('m', '').strip() or 0)
    except Exception: w = 0
    try: n = int(s['n']) if s['n'] else 0
    except Exception: n = 0
    inc = 1 if s['inc'] in ('up',) else -1 if s['inc'] in ('down',) else 0
    tiles[tk]['st'].append([round(w or 2.2, 1), n, inc, 1 if s['hand'] in ('yes', 'both', 'left', 'right') else 0] + [round(c, 2) for p in pts for c in p])
KIND = {'fence': 0, 'railing': 1, 'guard_rail': 1, 'handrail': 1, 'wall': 2, 'retaining_wall': 3, 'city_wall': 3, 'hedge': 4, 'quay': 5}
for b in S['barriers']:
    k = KIND.get(b['k'])
    if k is None: continue
    if k == 0 and (b.get('mat') or '') in ('railing', 'metal_bars', 'bars', 'guard_rail'): k = 1
    pts = b['pts']
    try: h = float((b['h'] or '').replace('m', '').strip() or 0)
    except Exception: h = 0
    for a in range(0, len(pts) - 1, 12):  # chunks so long walls are split between tiles
        ch = pts[a:a + 13]; mx, my = ch[len(ch) // 2]; tk = tile_of(mx, my)
        if tk in tiles: tiles[tk]['fn'].append([k, round(h, 1)] + [round(c, 2) for p in ch for c in p])

# ---- mobilier urbain OSM : positions réelles, dédoublonnées avec t/f ----
urban_counts = {"extracted": len(S.get("urban_features", [])), "duplicates": 0, "exported": 0, "by_kind": {}}
for (i, j), d in tiles.items():
    d.setdefault("t", [])
    d.setdefault("f", [])
    ox, oy = BX0 + i * T, BY0 + j * T
    local = [f for f in S.get("urban_features", []) if ox <= f["x"] < ox + T and oy <= f["y"] < oy + T]
    kept, duplicates = deduplicate_features(local, d["t"], d["f"], radius=2.0)
    urban_counts["duplicates"] += duplicates
    for feature in kept:
        kind, x, y = feature["kind"], round(feature["x"], 2), round(feature["y"], 2)
        if kind == "tree":
            d["t"].extend([x, y])
        elif kind in FURNITURE_CODES:
            d["f"].append([FURNITURE_CODES[kind], x, y])
        elif kind == "fountain":
            d.setdefault("fo", []).append([x, y])
        urban_counts["exported"] += 1
        urban_counts["by_kind"][kind] = urban_counts["by_kind"].get(kind, 0) + 1

# Terrasses OSM fermées : seules les emprises explicitement cartographiées.
for area in S.get("outdoor_seating_areas", []):
    pts = area.get("pts", [])
    if len(pts) < 4 or pts[0] != pts[-1]:
        continue
    try:
        pg = Polygon(pts).buffer(0)
        if pg.area < 4 or pg.area > 2500:
            continue
    except Exception:
        continue
    minx, miny, maxx, maxy = pg.bounds
    for (i, j), d in tiles.items():
        ox, oy = BX0 + i * T, BY0 + j * T
        if maxx < ox or minx > ox + T or maxy < oy or miny > oy + T:
            continue
        part = pg.intersection(box(ox, oy, ox + T, oy + T))
        for piece in (part.geoms if hasattr(part, "geoms") else [part]):
            if piece.geom_type == "Polygon" and piece.area > 1:
                d.setdefault("os", []).append([round(c, 2) for xy in list(piece.exterior.coords)[:-1] for c in xy])

# Berges OSM natural=bank / landuse=grass, limitées au voisinage de l'eau.
bank_parts = []
for area in S.get("bank_areas", []):
    pts = area.get("pts", [])
    if len(pts) >= 4 and pts[0] == pts[-1]:
        try:
            pg = Polygon(pts).buffer(0)
            if pg.area > 2:
                bank_parts.append(pg)
        except Exception:
            pass
bank_union = unary_union(bank_parts) if bank_parts else Polygon()
near_water_banks = bank_union.intersection(water.buffer(12)) if not bank_union.is_empty and not water.is_empty else Polygon()
bank_count = bank_slope_count = 0
for (i, j), d in tiles.items():
    ox, oy = BX0 + i * T, BY0 + j * T
    part = near_water_banks.intersection(box(ox, oy, ox + T, oy + T))
    for pg in (part.geoms if hasattr(part, "geoms") else [part]):
        if pg.geom_type != "Polygon" or pg.area <= 1:
            continue
        d.setdefault("bk", []).append([round(c, 2) for xy in list(pg.exterior.coords)[:-1] for c in xy])
        bank_count += 1
        # Rampe de berge : face en pente entre la limite d'eau et le haut
        # de la zone natural=bank / landuse=grass, jamais un mur vertical.
        edge = shapely.segmentize(LineString(pg.exterior.coords), 3.0)
        coords = list(edge.coords)
        for a, b in zip(coords, coords[1:]):
            seg = LineString([a, b])
            if seg.length < 0.35 or seg.distance(water.boundary) > 10:
                continue
            wa = nearest_points(Point(a), water.boundary)[1]
            wb = nearest_points(Point(b), water.boundary)[1]
            if max(wa.distance(Point(a)), wb.distance(Point(b))) < 0.35:
                continue
            quad = Polygon([(wa.x, wa.y), (wb.x, wb.y), (b[0], b[1]), (a[0], a[1])]).buffer(0)
            if quad.is_empty or quad.area < 0.08:
                continue
            d.setdefault("bs", []).append([round(c, 2) for xy in list(quad.exterior.coords)[:-1] for c in xy])
            bank_slope_count += 1

# Audit des tabliers : aucun changement à d['r'] ou à l'indexation de bh.
bridge_total = bridge_with_bh = 0
for d in tiles.values():
    heights = d.get("bh") or {}
    for ri, road in enumerate(d["r"]):
        if len(road) > 2 and (road[2] & 2):
            bridge_total += 1
            has_bh = (bool(heights.get(str(ri)) or heights.get(ri))
                      if isinstance(heights, dict)
                      else (ri < len(heights) and bool(heights[ri])))
            if has_bh:
                bridge_with_bh += 1
print("OSM urban features", urban_counts, "outdoor seating", sum(len(d.get("os", [])) for d in tiles.values()),
      "bank polygons", bank_count, "bank slope faces", bank_slope_count, flush=True)
print("Bridge deck audit", bridge_with_bh, "/", bridge_total, "records with bh", flush=True)

for (i, j), d in tiles.items():
    ox, oy = BX0 + i * T, BY0 + j * T; bx = box(ox, oy, ox + T, oy + T)
    v, idx = tri(UA.intersection(bx), ox, oy); d['rp'] = {'v': v, 'i': idx}
    v, idx = tri(US.intersection(bx), ox, oy); d['rq'] = {'v': v, 'i': idx}
    v, idx = tri(UF.intersection(bx), ox, oy); d['rf'] = {'v': v, 'i': idx}
    bl = bedge.intersection(bx.buffer(-0.01)); d['bl'] = [[round(c, 2) for xy in ln.coords for c in xy] for ln in (bl.geoms if hasattr(bl, 'geoms') else [bl]) if ln.geom_type == 'LineString' and ln.length > 1]
    cl = kerbs.intersection(bx.buffer(-0.01)); out = []
    for ln in (cl.geoms if hasattr(cl, 'geoms') else [cl]):
        if ln.geom_type != 'LineString' or ln.length < 0.3: continue
        out.append([round(c, 2) for xy in ln.coords for c in xy])
    d['cb'] = out
    json.dump(d, open(f'{G}/tiles/t{i}_{j}.json', 'w'), separators=(',', ':'), ensure_ascii=False)
print('done', sum(len(d['st']) for d in tiles.values()), 'steps', sum(len(d['fn']) for d in tiles.values()), 'barriers')
