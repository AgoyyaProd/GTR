'use strict';
/* ===== core: utilities, spatial structures, road graph, collision ===== */
const $ = id => document.getElementById(id);
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[(Math.random() * a.length) | 0];
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const angWrap = a => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
function srand(seed) { let s = seed >>> 0 || 1; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const hash2 = (x, y) => (Math.imul((x * 10) | 0, 73856093) ^ Math.imul((y * 10) | 0, 19349663)) >>> 0;

class Grid {
  constructor(cell) { this.c = cell; this.m = new Map(); }
  key(i, j) { return i * 100003 + j; }
  add(x0, y0, x1, y1, v) {
    const c = this.c;
    for (let i = Math.floor(x0 / c); i <= Math.floor(x1 / c); i++)
      for (let j = Math.floor(y0 / c); j <= Math.floor(y1 / c); j++) {
        const k = this.key(i, j); let a = this.m.get(k); if (!a) this.m.set(k, a = []); a.push(v);
      }
  }
  query(x0, y0, x1, y1, out) {
    const c = this.c;
    for (let i = Math.floor(x0 / c); i <= Math.floor(x1 / c); i++)
      for (let j = Math.floor(y0 / c); j <= Math.floor(y1 / c); j++) {
        const a = this.m.get(this.key(i, j)); if (a) for (const v of a) out.add(v);
      }
    return out;
  }
}
function polyBox(p, o) { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (let i = o || 0; i < p.length; i += 2) { const x = p[i], y = p[i + 1]; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } return [x0, y0, x1, y1]; }
function inPoly(p, x, y) {
  let c = false;
  for (let i = 0, j = p.length - 2; i < p.length; j = i, i += 2) {
    const xi = p[i], yi = p[i + 1], xj = p[j], yj = p[j + 1];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}
function segNear(x, y, ax, ay, bx, by, out) {
  const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
  const t = l ? clamp(((x - ax) * dx + (y - ay) * dy) / l, 0, 1) : 0;
  out[0] = ax + t * dx; out[1] = ay + t * dy; out[2] = t; return Math.hypot(x - out[0], y - out[1]);
}
function polyArea(p) { let a = 0; const n = p.length / 2; for (let i = 0, j = n - 1; i < n; j = i++) a += p[j * 2] * p[i * 2 + 1] - p[i * 2] * p[j * 2 + 1]; return a / 2; }

/* ---------- global data ---------- */
let GD, BX0, BY0, BX1, BY1, TILE;
let GXY, GOFF, GNB, GFL, NN;
const nodeGrid = new Grid(60);
const waterList = [], waterGrid = new Grid(80);

function initGlobal(gd) {
  GD = gd;[BX0, BY0, BX1, BY1] = gd.bounds; TILE = gd.tile;
  GXY = Float32Array.from(gd.g.xy); GOFF = Int32Array.from(gd.g.off); GNB = Int32Array.from(gd.g.nb); GFL = Uint8Array.from(gd.g.fl);
  NN = GXY.length / 2;
  for (let i = 0; i < NN; i++) nodeGrid.add(GXY[i * 2], GXY[i * 2 + 1], GXY[i * 2], GXY[i * 2 + 1], i);
  for (const w of gd.water) { const b = polyBox(w); const o = { p: w, b }; waterList.push(o); waterGrid.add(b[0], b[1], b[2], b[3], o); }
}
const nx = i => GXY[i * 2], ny = i => GXY[i * 2 + 1];
function outEdges(i, mask) { const r = []; if (!Number.isInteger(i) || i < 0 || i >= NN) return r; for (let k = GOFF[i]; k < GOFF[i + 1]; k++) if (GFL[k] & mask) r.push(k); return r; }
function nearestNode(x, y, mask) {
  const s = new Set();
  for (let rad = 60; rad <= 960; rad *= 2) {
    s.clear(); nodeGrid.query(x - rad, y - rad, x + rad, y + rad, s);
    let best = -1, bd = 1e9;
    for (const i of s) { if (mask && !outEdges(i, mask).length) continue; const d = Math.hypot(nx(i) - x, ny(i) - y); if (d < bd) { bd = d; best = i; } }
    if (best >= 0) return best;
  }
  return -1; // aucun nœud compatible dans le rayon : ne jamais rabattre vers le nœud 0 (faux point d'ancrage)
}
/* A* with binary heap; mask filters edges */
function astar(s, g, mask, limit) {
  if (!Number.isInteger(s) || !Number.isInteger(g) || s < 0 || g < 0 || s >= NN || g >= NN) return null;
  if (s === g) return [g];
  const gx = nx(g), gy = ny(g);
  const cost = new Map([[s, 0]]), came = new Map([[s, -1]]);
  const heap = [[Math.hypot(nx(s) - gx, ny(s) - gy), s]];
  const push = e => { heap.push(e); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break;[heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = i * 2 + 1, r = l + 1; let m = i; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === i) break;[heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } } return top; };
  let n = 0; limit = limit || 30000;
  while (heap.length && n++ < limit) {
    const [, c] = pop();
    if (c === g) break;
    const cc = cost.get(c), cx = nx(c), cy = ny(c);
    for (let k = GOFF[c]; k < GOFF[c + 1]; k++) {
      if (!(GFL[k] & mask)) continue;
      const nb = GNB[k]; const nc = cc + Math.hypot(nx(nb) - cx, ny(nb) - cy) * (GFL[k] & 4 ? 0.6 : 1);
      if (!cost.has(nb) || nc < cost.get(nb)) { cost.set(nb, nc); came.set(nb, c); push([nc + Math.hypot(nx(nb) - gx, ny(nb) - gy) * 0.6, nb]); }
    }
  }
  if (!came.has(g)) return null;
  const path = []; for (let c = g; c !== -1; c = came.get(c)) path.push(c);
  return path.reverse();
}

/* ---------- loaded tiles registry (collision & roads) ---------- */
const tiles = new Map(); // key -> tile object {i,j,obs:Grid, seg:Grid, ...}
const tkey = (i, j) => i * 1000 + j;
function tilesIn(x0, y0, x1, y1, fn) {
  const i0 = Math.floor((x0 - BX0) / TILE), i1 = Math.floor((x1 - BX0) / TILE), j0 = Math.floor((y0 - BY0) / TILE), j1 = Math.floor((y1 - BY0) / TILE);
  for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) { const t = tiles.get(tkey(i, j)); if (t && t.ready) fn(t); }
}
const _s = new Set(), _q = [0, 0, 0];
const XOBS = new Grid(20); /* obstacles that do not belong to a tile (metro stairwells) */
function obstaclesNear(x0, y0, x1, y1) { _s.clear(); tilesIn(x0 - 30, y0 - 30, x1 + 30, y1 + 30, t => t.obs.query(x0, y0, x1, y1, _s)); XOBS.query(x0, y0, x1, y1, _s); return _s; }
function insideBuilding(x, y, minH) {
  for (const o of obstaclesNear(x, y, x, y)) if (x > o.b[0] && x < o.b[2] && y > o.b[1] && y < o.b[3] && (!minH || o.h > minH) && inPoly(o.p, x, y)) return o;
  return null;
}
function roadAt(x, y, skip) {
  let best = null, bd = 1e9; _s.clear();
  tilesIn(x - 20, y - 20, x + 20, y + 20, t => t.seg.query(x, y, x, y, _s));
  for (const s of _s) { if (s === skip) continue; const d = segNear(x, y, s[0], s[1], s[2], s[3], _q); if (d < s[4] && d < bd) { bd = d; best = s; } }
  return best;
}
/* walking-surface height: carriageways sit 15 cm below the raised sidewalks */
const SW = 0.15, _gs = new Set(), _gq = [0, 0, 0];
/* the lowered carriageway, as real polygons (sized to each street) */
function inTri(x, y, q) { const d1 = (x - q[2]) * (q[1] - q[3]) - (q[0] - q[2]) * (y - q[3]), d2 = (x - q[4]) * (q[3] - q[5]) - (q[2] - q[4]) * (y - q[5]), d3 = (x - q[0]) * (q[5] - q[1]) - (q[4] - q[0]) * (y - q[1]); return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0)); }
const _cw = new Set();
function inCW(x, y) {
  _cw.clear(); tilesIn(x, y, x, y, t => { if (t.cw) t.cw.query(x, y, x, y, _cw); });
  for (const q of _cw) if (x >= q[6] && x <= q[8] && y >= q[7] && y <= q[9] && inTri(x, y, q)) return true;
  return false;
}
/* steps: a smooth ramp for whoever walks them, the geometry shows the treads */
const _st = new Set();
function stairH(x, y) {
  _st.clear(); tilesIn(x, y, x, y, t => { if (t.stairs) t.stairs.query(x, y, x, y, _st); });
  for (const s of _st) { if (s.fn) { const h = s.fn(x, y); if (h !== null) return h - th(x, y) + SW; continue; } const d = segNear(x, y, s.ax, s.ay, s.bx, s.by, _gq); if (d < s.hw) return s.h0 + (s.h1 - s.h0) * _gq[2] - th(x, y) + SW; }
  return null;
}
function groundH(x, y, prev) {
  _gs.clear(); tilesIn(x, y, x, y, t => t.seg.query(x, y, x, y, _gs));
  let deck = null, bd = 1e9;
  for (const s of _gs) {
    const d = segNear(x, y, s[0], s[1], s[2], s[3], _gq);
    if (s[9] != null && d < s[8] / 2 + 0.3) { if (d < bd) { bd = d; deck = s[9] + (s[10] - s[9]) * _gq[2] - th(x, y) + (s[5] === 0 || s[5] === 3 ? 0 : SW); } }
  }
  const st = stairH(x, y); if (st !== null) return st;
  const base = inCW(x, y) ? 0 : SW;
  /* on a bridge footprint keep whichever level the walker/driver is already on (deck vs. road underneath) */
  if (deck !== null && (prev === undefined ? deck < base + 1.2 : Math.abs(deck - prev) < Math.abs(base - prev) + 0.3)) return deck;
  return base;
}
function liftTo(e, dt) { const h = groundH(e.x, e.y, e.gy); e.gy = e.gy === undefined || dt > 0.5 || Math.abs(h - e.gy) > 2.5 ? h : e.gy + (h - e.gy) * Math.min(1, dt * 14); return e.gy; }
function nearestNamedRoad(x, y) {
  let best = null, bd = 1e9; const set = new Set();
  tilesIn(x - 40, y - 40, x + 40, y + 40, t => t.seg.query(x - 30, y - 30, x + 30, y + 30, set));
  for (const s of set) { if (!s[6]) continue; const d = segNear(x, y, s[0], s[1], s[2], s[3], _q); if (d < bd) { bd = d; best = s; } }
  return best && bd < 30 ? best[6] : '';
}
function inWater(x, y) {
  const s = new Set(); waterGrid.query(x, y, x, y, s);
  for (const w of s) if (x > w.b[0] && x < w.b[2] && y > w.b[1] && y < w.b[3] && inPoly(w.p, x, y)) return !roadAt(x, y);
  return false;
}
/* push circle e (x,y) out of obstacles. returns hit */
function resolve(e, r) {
  let hit = false;
  for (let it = 0; it < 2; it++) {
    for (const o of obstaclesNear(e.x - r, e.y - r, e.x + r, e.y + r)) {
      if (e.x + r < o.b[0] || e.x - r > o.b[2] || e.y + r < o.b[1] || e.y - r > o.b[3]) continue;
      const p = o.p; let best = 1e9, bx = 0, by = 0;
      for (let i = 0, j = p.length - 2; i < p.length; j = i, i += 2) {
        const d = segNear(e.x, e.y, p[j], p[j + 1], p[i], p[i + 1], _q);
        if (d < best) { best = d; bx = _q[0]; by = _q[1]; }
      }
      const ins = inPoly(p, e.x, e.y), d = best || 1e-3;
      if (ins) { e.x = bx + (bx - e.x) / d * r; e.y = by + (by - e.y) / d * r; hit = true; }
      else if (best < r) { e.x = bx + (e.x - bx) / d * r; e.y = by + (e.y - by) / d * r; hit = true; }
    }
  }
  e.x = clamp(e.x, BX0 + 20, BX1 - 20); e.y = clamp(e.y, BY0 + 20, BY1 - 20);
  return hit;
}
function freeSpot(x, y, r) { return !insideBuilding(x, y) && !inWater(x, y) && !insideBuilding(x + r, y) && !insideBuilding(x - r, y) && !insideBuilding(x, y + r) && !insideBuilding(x, y - r); }
/* can a walker of radius r get from (sx,sy) to within rad of (tx,ty)? flood fill on a 0.5 m grid with the real obstacles (mission items must never end up fenced in) */
function reachable(sx, sy, tx, ty, rad = 2.5, r = 0.4) {
  const S = 0.5, R = Math.min(260, Math.hypot(tx - sx, ty - sy) + 40), x0 = Math.min(sx, tx) - 40, y0 = Math.min(sy, ty) - 40, NX = Math.ceil((Math.max(sx, tx) + 40 - x0) / S), NY = Math.ceil((Math.max(sy, ty) + 40 - y0) / S);
  if (Math.hypot(tx - sx, ty - sy) > R) return true;
  const st = new Int8Array(NX * NY), free = (i, j) => { const k = j * NX + i; if (st[k]) return st[k] > 0; const x = x0 + i * S, y = y0 + j * S; let f = !inWater(x, y);
    if (f) for (const o of obstaclesNear(x - r, y - r, x + r, y + r)) { if (x + r < o.b[0] || x - r > o.b[2] || y + r < o.b[1] || y - r > o.b[3]) continue; if (inPoly(o.p, x, y)) { f = false; break; } const p = o.p; let b = 1e9; for (let a = 0, c = p.length - 2; a < p.length; c = a, a += 2) b = Math.min(b, segNear(x, y, p[c], p[c + 1], p[a], p[a + 1], _q)); if (b < r) { f = false; break; } }
    st[k] = f ? 1 : -1; return f; };
  const seen = new Uint8Array(NX * NY), i0 = Math.round((sx - x0) / S), j0 = Math.round((sy - y0) / S), q = [j0 * NX + i0]; seen[q[0]] = 1;
  for (let h = 0; h < q.length && h < 400000; h++) { const k = q[h], i = k % NX, j = (k / NX) | 0; if (Math.hypot(x0 + i * S - tx, y0 + j * S - ty) <= rad) return true;
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const a = i + di, b = j + dj; if (a < 0 || b < 0 || a >= NX || b >= NY) continue; const kk = b * NX + a; if (seen[kk]) continue; seen[kk] = 1; if (free(a, b)) q.push(kk); } }
  return false;
}
/* nearest free walkable point (sidewalk/footway) */
function fp(x, y) {
  if (freeSpot(x, y, 1.2)) return { x, y };
  for (let r = 2; r < 60; r += 2) for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2 + r; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; if (freeSpot(px, py, 1.2)) return { x: px, y: py }; }
  return { x, y };
}
