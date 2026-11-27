# Cut gaps in fences, railings, low walls and hedges wherever a street, path or footway crosses them
# (OSM draws the park fence continuous across its gates; the game must stay walkable).
import json, glob, math, os
from collections import defaultdict
T = sorted(glob.glob(os.environ.get('GTR_ROOT', '/home/claude/g2') + '/tiles/t*.json'))
D = {f: json.load(open(f)) for f in T}
C = 20.0; grid = defaultdict(list); segs = []
for f, d in D.items():
    for r in d.get('r', []):
        w, k, p = r[0], r[1], r[4:]
        for i in range(0, len(p) - 2, 2):
            s = (p[i], p[i+1], p[i+2], p[i+3], w); idx = len(segs); segs.append(s)
            for gx in range(int(min(s[0], s[2]) // C), int(max(s[0], s[2]) // C) + 1):
                for gy in range(int(min(s[1], s[3]) // C), int(max(s[1], s[3]) // C) + 1): grid[(gx, gy)].append(idx)
def cross(ax, ay, bx, by):
    out = []; seen = set()
    for gx in range(int(min(ax, bx) // C), int(max(ax, bx) // C) + 1):
        for gy in range(int(min(ay, by) // C), int(max(ay, by) // C) + 1):
            for idx in grid.get((gx, gy), ()):
                if idx in seen: continue
                seen.add(idx); cx, cy, dx_, dy_, w = segs[idx]
                r_ = (bx - ax, by - ay); s_ = (dx_ - cx, dy_ - cy); den = r_[0] * s_[1] - r_[1] * s_[0]
                if abs(den) < 1e-9: continue
                t = ((cx - ax) * s_[1] - (cy - ay) * s_[0]) / den; u = ((cx - ax) * r_[1] - (cy - ay) * r_[0]) / den
                if 0 <= t <= 1 and 0 <= u <= 1:
                    L = math.hypot(*r_); sinA = abs(den) / (L * math.hypot(*s_) + 1e-9)
                    out.append((t * L, max(2.6, w + 0.6) / max(0.35, sinA) / 2))
    return out
ncut = 0; nrec = 0
for f, d in D.items():
    new = []
    for it in d.get('fn', []):
        k, h, p = it[0], it[1], it[2:]
        if k == 3: new.append(it); continue
        pieces = []; cur = [p[0], p[1]]
        for i in range(0, len(p) - 2, 2):
            ax, ay, bx, by = p[i], p[i+1], p[i+2], p[i+3]; L = math.hypot(bx - ax, by - ay)
            if L < 1e-6: continue
            cuts = sorted(cross(ax, ay, bx, by))
            ivs = []
            for c, hw in cuts:
                a, b = max(0, c - hw), min(L, c + hw)
                if ivs and a <= ivs[-1][1]: ivs[-1][1] = max(ivs[-1][1], b)
                else: ivs.append([a, b])
            ux, uy = (bx - ax) / L, (by - ay) / L
            for a, b in ivs:
                ncut += 1
                if a > 0.05: cur += [ax + ux * a, ay + uy * a]
                if len(cur) >= 4: pieces.append(cur)
                cur = [ax + ux * b, ay + uy * b]
            cur += [bx, by]
        if len(cur) >= 4: pieces.append(cur)
        for pc in pieces:
            if sum(math.hypot(pc[j+2]-pc[j], pc[j+3]-pc[j+1]) for j in range(0, len(pc)-2, 2)) > 0.4:
                new.append([k, h] + [round(v, 2) for v in pc])
        nrec += 1
    d['fn'] = new
    json.dump(d, open(f, 'w'), separators=(',', ':'), ensure_ascii=False)
print('barriers', nrec, 'gaps', ncut)
