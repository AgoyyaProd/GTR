"""Street profiles: carriageways sized to the real street (OSM sidewalks, facade-to-facade gap),
living streets get a cobbled carriageway with kerbs, plus steps and barriers for every tile.
Writes rp (asphalt), rq (setts), cb (kerbs), st (steps), fn (fences/walls). Replaces curbs.py output."""
import json, glob, os, math, pickle, numpy as np
import shapely
from shapely.geometry import LineString, Polygon, Point, box, MultiPolygon, MultiLineString
from shapely.geometry.polygon import orient
from shapely.ops import unary_union
from shapely.strtree import STRtree
from street_geometry import merge_corridors
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
                same_name = bool(r[3] and source.get('name') == r[3])
                if not same_name or dist > 12:
                    continue
                score = dist
                if score < best_score:
                    best, best_score = source, score
            if best is not None:
                r[0] = round(road_width(best), 2)
                profiled_ways += 1
            elif r[3]:
                unmatched_named += 1
print('OSM road profiles matched', profiled_ways, 'unmatched named tile roads', unmatched_named, flush=True)

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
    offset = half + 1.5
    for side, value in zip(('left', 'right'), sides):
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
UA = merge_corridors(polys_a); US = merge_corridors(polys_s).difference(UA.buffer(0.01))
U = unary_union([UA, US])
water = unary_union([Polygon(list(zip(w[::2], w[1::2]))).buffer(0) for w in gd['water'] if len(w) >= 6]).buffer(0.8)
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
kerbs = shapely.segmentize(MultiLineString(rings_of(U)).difference(cut), 4.0)

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
KIND = {'fence': 0, 'railing': 1, 'guard_rail': 1, 'handrail': 1, 'wall': 2, 'retaining_wall': 3, 'city_wall': 3, 'hedge': 4}
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
