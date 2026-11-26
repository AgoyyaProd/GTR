import pickle, json, glob
from shapely.geometry import Polygon, Point
from shapely.strtree import STRtree
X = pickle.load(open('/home/claude/tools/osmextra.pkl', 'rb'))
polys = []
kinds = []
CH = ('église', 'eglise', 'chapelle', 'cathédrale', 'basilique', 'temple', 'notre-dame', 'saint-', 'sainte-')
for name, f in X['monuments']:
    try:
        p = Polygon(list(zip(f[::2], f[1::2]))).buffer(1.0)
        if p.area > 30: polys.append(p); kinds.append(2 if (any(k in (name or '').lower() for k in CH) and 'palais' not in (name or '').lower()) or not name else 1)
    except Exception: pass
tree = STRtree(polys); n = 0
for f in glob.glob('/home/claude/g2/tiles/t*.json'):
    d = json.load(open(f)); ch = False
    for rec in d.get('lb', []):
        ff = rec['f']; c = Polygon(list(zip(ff[::2], ff[1::2]))).buffer(0).representative_point()
        hits = [k for k in tree.query(c) if polys[k].contains(c)]
        hit = bool(hits); kind = kinds[hits[0]] if hits else 0
        if hit and rec.get('mo') != kind: rec['mo'] = kind; ch = True; n += 1
        elif not hit and rec.get('mo'): del rec['mo']; ch = True
    if ch: json.dump(d, open(f, 'w'), separators=(',', ':'), ensure_ascii=False)
print('monument buildings', n)
