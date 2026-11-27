'use strict';
/* ===== world: tiled city builder ===== */
const OLDTOWN = { x: -330, y: 120, r: 280 };
const CENTER = { x: -150, y: -60 };

class GB { // geometry bucket builder
  constructor() { this.b = new Map(); }
  get(mat) { let o = this.b.get(mat); if (!o) this.b.set(mat, o = { p: [], n: [], u: [], c: [] }); return o; }
  tri(mat, a, b, c, ua, ub, uc, col) {
    const o = this.get(mat);
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    o.p.push(...a, ...b, ...c); o.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz); o.u.push(...ua, ...ub, ...uc);
    const k = col || 1, cr = typeof k === 'number' ? [k, k, k] : k; o.c.push(...cr, ...cr, ...cr);
  }
  /* quad with orientation fixed so that the face normal agrees with hint n (3D) */
  quad(mat, a, b, c, d, ua, ub, uc, ud, n, col) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    const fx = uy * vz - uz * vy, fy = uz * vx - ux * vz, fz = ux * vy - uy * vx;
    if (n && fx * n[0] + fy * n[1] + fz * n[2] < 0) { this.tri(mat, a, c, b, ua, uc, ub, col); this.tri(mat, a, d, c, ua, ud, uc, col); }
    else { this.tri(mat, a, b, c, ua, ub, uc, col); this.tri(mat, a, c, d, ua, uc, ud, col); }
  }
  /* horizontal polygon (flat array x,y) at height h (or per-vertex heights); uv scale s; faces up */
  poly(mat, p, h, s, up, col) {
    const v = []; for (let i = 0; i < p.length; i += 2) v.push(new THREE.Vector2(p[i], p[i + 1]));
    let tris; try { tris = THREE.ShapeUtils.triangulateShape(v, []); } catch (e) { return; }
    const hv = typeof h === 'number' ? null : h;
    for (const t of tris) {
      let P = t.map(k => [v[k].x, hv ? hv[k] : h, -v[k].y]), U = t.map(k => [v[k].x / s, v[k].y / s]);
      const ny = (P[1][2] - P[0][2]) * (P[2][0] - P[0][0]) - (P[1][0] - P[0][0]) * (P[2][2] - P[0][2]);
      if (ny < 0) { P = [P[0], P[2], P[1]]; U = [U[0], U[2], U[1]]; }
      this.tri(mat, P[0], P[1], P[2], U[0], U[1], U[2], col);
    }
  }
  meshes(group, opts) {
    for (const [mat, o] of this.b) {
      if (!o.p.length) continue;
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(o.p, 3));
      g.setAttribute('normal', new THREE.Float32BufferAttribute(o.n, 3));
      g.setAttribute('uv', new THREE.Float32BufferAttribute(o.u, 2));
      if (mat.vertexColors) g.setAttribute('color', new THREE.Float32BufferAttribute(o.c, 3));
      if (mat.normalMap) try { g.computeTangents && 0; } catch (e) { }
      const m = new THREE.Mesh(g, mat);
      m.castShadow = !!(opts && opts.cast); m.receiveShadow = true; m.matrixAutoUpdate = false; m.updateMatrix();
      if (mat.stencilWrite && mat.stencilFunc === THREE.AlwaysStencilFunc) m.renderOrder = -1;
      group.add(m);
    }
    this.b.clear();
  }
}

function ccw(p) { if (polyArea(p) < 0) { const q = []; for (let i = p.length - 2; i >= 0; i -= 2) q.push(p[i], p[i + 1]); return q; } return p; }
function insetPoly(p, d) {
  const n = p.length / 2, o = [];
  for (let i = 0; i < n; i++) {
    const a = (i + n - 1) % n, c = (i + 1) % n;
    const x = p[i * 2], y = p[i * 2 + 1];
    let e1x = x - p[a * 2], e1y = y - p[a * 2 + 1], e2x = p[c * 2] - x, e2y = p[c * 2 + 1] - y;
    const l1 = Math.hypot(e1x, e1y) || 1, l2 = Math.hypot(e2x, e2y) || 1; e1x /= l1; e1y /= l1; e2x /= l2; e2y /= l2;
    const n1x = -e1y, n1y = e1x, n2x = -e2y, n2y = e2x; // inward normals for CCW
    let bx = n1x + n2x, by = n1y + n2y; const bl = Math.hypot(bx, by);
    if (bl < 1e-3) { bx = n1x; by = n1y; } else { bx /= bl; by /= bl; }
    const cosh = bx * n1x + by * n1y; const m = Math.min(d / Math.max(cosh, 0.35), d * 2.5);
    o.push(x + bx * m, y + by * m);
  }
  return o;
}
function perimeter(p) { let s = 0; const n = p.length / 2; for (let i = 0; i < n; i++) { const j = (i + 1) % n; s += Math.hypot(p[j * 2] - p[i * 2], p[j * 2 + 1] - p[i * 2 + 1]); } return s; }

/* Palette urbaine continue : des ensembles cohérents à l'échelle des quartiers,
   sans modifier les textures, les volumes ni les données géographiques. */
function districtFacadeTint(x, y, style, R) {
  const old = Math.hypot(x - OLDTOWN.x, y - OLDTOWN.y);
  const centre = Math.hypot(x - CENTER.x, y - CENTER.y);
  let p;
  if (old < 430) p = [1.10, 1.015, 0.91];                 // centre ancien : enduits chauds
  else if (centre < 980) p = [1.055, 1.035, 0.985];      // centre XIXe : pierre claire
  else if (x > 650 && y < -350) p = [0.91, 0.965, 1.045]; // grands ensembles : gris froid
  else if (x < -1050 && y > 450) p = [1.035, 0.965, 0.90]; // ouest : brique et enduit
  else p = [0.985, 1.005, 0.99];                         // quartiers résidentiels
  // Les colombages conservent un fond minéral chaud, distinct des façades modernes.
  if (style === 2) p = [p[0] * 1.025, p[1] * 1.005, p[2] * 0.97];
  const variation = 0.975 + R() * 0.05;
  const shade = 0.94 + R() * 0.06;
  return [p[0] * variation * shade, p[1] * variation * shade, p[2] * variation * shade];
}

/* ---------- building ---------- */
function addBuilding(gb, t, h, code, p, R) {
  p = ccw(p);
  const n = p.length / 2; if (n < 3) return;
  let style = code >> 2; const roof = code & 3;
  const area = polyArea(p), per = perimeter(p), width = 2 * area / per;
  const cx = p.reduce((s, v, i) => i % 2 ? s : s + v, 0) / n, cy = p.reduce((s, v, i) => i % 2 ? s + v : s, 0) / n;
  const dc = Math.hypot(cx - CENTER.x, cy - CENTER.y);
  if (style === 5 && dc < 1300 && h > 6) style = 0;
  const soif = Math.hypot(cx + 384, cy - 124) < 260;
  const fm = facadeMats[style]; const mat = fm[(R() * fm.length) | 0];
  const districtTint = districtFacadeTint(cx, cy, style, R);
  const tintK = 0.91 + R() * 0.09;
  const tint = [districtTint[0] * tintK, districtTint[1] * tintK, districtTint[2] * tintK];
  const perU = mat.userData.perU, perV = mat.userData.perV;
  t.obs.add(...polyBox(p), { p, b: polyBox(p), h });
  if (style === 8) return addGrandstand(gb, p, h, mat);
  const city = style <= 3 && h >= 7 && dc < 2800;
  let u = R() * perU;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n, ax = p[i * 2], ay = p[i * 2 + 1], bx = p[j * 2], by = p[j * 2 + 1];
    const L = Math.hypot(bx - ax, by - ay); if (L < 0.05) continue;
    const nx = (by - ay) / L, ny = -(bx - ax) / L, N = [nx, 0, -ny];
    let z0 = 0;
    if (city && L > 3) {
      const mx = (ax + bx) / 2 + nx * 5, my = (ay + by) / 2 + ny * 5, rd = roadAtTile(t, mx, my);
      if (rd && rd[5] !== 3 && rd[5] !== 4) {
        const sm = soif && R() < 0.85 ? facadeMats.shop[0] : facadeMats.shop[(R() * facadeMats.shop.length) | 0];
        const su = u / sm.userData.perU, su1 = (u + L) / sm.userData.perU;
        gb.quad(sm, [ax, 0, -ay], [bx, 0, -by], [bx, 4.2, -by], [ax, 4.2, -ay], [su, 0], [su1, 0], [su1, 1], [su, 1], N, tint);
        z0 = 4.2;
      }
    }
    const u0 = u / perU, u1 = (u + L) / perU;
    gb.quad(mat, [ax, z0, -ay], [bx, z0, -by], [bx, h, -by], [ax, h, -ay], [u0, z0 / perV], [u1, z0 / perV], [u1, h / perV], [u0, h / perV], N, tint);
    /* Colombages bretons : sablières, potelets et décharges en bois en léger relief.
       Réservé aux façades à pans de bois du centre ancien, fusionné dans le bucket bois. */
    if (style === 2 && city && h > 5.5 && L > 2.8) {
      const beam = MAT.wood, depth = 0.055, bw = 0.105;
      const wallPoint = (f, z, off) => [ax + (bx - ax) * f + nx * off, z, -(ay + (by - ay) * f + ny * off)];
      const strip = (f0, z0b, f1, z1b, thick) => {
        const a = wallPoint(f0, z0b, depth), b = wallPoint(f1, z0b, depth), c = wallPoint(f1, z1b, depth), d = wallPoint(f0, z1b, depth);
        const w = thick / Math.max(L, 0.1);
        const aa = wallPoint(f0 - w, z0b, depth), bb = wallPoint(f1 + w, z0b, depth), cc = wallPoint(f1 + w, z1b, depth), dd = wallPoint(f0 - w, z1b, depth);
        gb.quad(beam, aa, bb, cc, dd, [0,0], [L,0], [L,z1b-z0b], [0,z1b-z0b], N, [0.72,0.61,0.46]);
      };
      const bays = Math.max(1, Math.floor(L / 1.65));
      for (let q = 0; q <= bays; q++) { const f = q / bays; strip(f, 0.08, f, h - 0.08, bw); }
      for (let z = 0.18; z < h; z += 2.65) strip(0, z, 1, z + 0.10, bw);
      for (let q = 0; q < bays; q++) {
        const f0 = q / bays + 0.08 / bays, f1 = (q + 1) / bays - 0.08 / bays;
        const z0b = 0.28, z1b = Math.min(h - 0.3, 2.35);
        if (z1b - z0b > 1.2 && f1 > f0) {
          const a = wallPoint(f0, z0b, depth + 0.008), b = wallPoint(f1, z1b, depth + 0.008);
          const dx = (f1 - f0) * L, dz = z1b - z0b, len = Math.hypot(dx, dz), half = 0.045;
          const px = -dz / len * half / L, pz = dx / len * half;
          gb.quad(beam, wallPoint(f0 + px, z0b + pz, depth + 0.01), wallPoint(f1 + px, z1b + pz, depth + 0.01), wallPoint(f1 - px, z1b - pz, depth + 0.01), wallPoint(f0 - px, z0b - pz, depth + 0.01), [0,0], [len,0], [len,0.09], [0,0.09], N, [0.68,0.55,0.4]);
        }
      }
    }
    /* Balcons résidentiels : dalle, joues latérales, garde-corps et main courante.
       Toute la géométrie passe dans les buckets GB existants pour limiter les draw calls. */
    if (city && style <= 3 && L > 7.2 && h > 10 && R() < 0.34) {
      const bw = Math.min(2.35, L * 0.42), mid = 0.5 + (R() - 0.5) * 0.18;
      const half = bw * 0.5, t0 = Math.max(0.12, mid - half / L), t1 = Math.min(0.88, mid + half / L);
      const bx0 = ax + (bx - ax) * t0, by0 = ay + (by - ay) * t0;
      const bx1 = ax + (bx - ax) * t1, by1 = ay + (by - ay) * t1;
      const floorY = Math.min(h - 2.4, Math.max(4.2, 2.8 + Math.floor(R() * Math.max(1, (h - 5) / 3.2)) * 3.05));
      const depth = 0.62, fx0 = bx0 + nx * depth, fy0 = by0 + ny * depth;
      const fx1 = bx1 + nx * depth, fy1 = by1 + ny * depth;
      gb.quad(MAT.stone, [bx0, floorY, -by0], [bx1, floorY, -by1], [fx1, floorY, -fy1], [fx0, floorY, -fy0], [0, 0], [bw, 0], [bw, depth], [0, depth], [0, 1, 0]);
      const railY = floorY + 0.92, postW = 0.045;
      const railAngle = Math.atan2(by1 - by0, bx1 - bx0);
      for (let q = 0; q <= 8; q++) {
        const f = q / 8, px = fx0 + (fx1 - fx0) * f, py = fy0 + (fy1 - fy0) * f;
        addBox(gb, MAT.metalLight, px, py, floorY + 0.08, postW, postW, 0.92, railAngle);
      }
      gb.quad(MAT.metalLight, [fx0 - nx * 0.025, railY, -(fy0 - ny * 0.025)], [fx1 - nx * 0.025, railY, -(fy1 - ny * 0.025)], [fx1 + nx * 0.025, railY, -(fy1 + ny * 0.025)], [fx0 + nx * 0.025, railY, -(fy0 + ny * 0.025)], [0, 0], [bw, 0], [bw, 0.08], [0, 0.08], [0, 1, 0]);
    }
    u += L;
  }
  /* Bandeaux de niveaux et encadrements d'angle : la façade ne repose plus
     uniquement sur sa texture. Les lignes suivent chaque segment du plan,
     avec une légère saillie pour accrocher la lumière sans créer de Mesh dédié. */
  if (city && style !== 2 && style <= 3 && h > 8) {
    const bandMat = MAT.coping || MAT.stone;
    const bandLevels = [];
    for (let level = 3.05; level < h - 0.8; level += 3.1) bandLevels.push(level);
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const ax = p[i * 2], ay = p[i * 2 + 1], bx = p[j * 2], by = p[j * 2 + 1];
      const L = Math.hypot(bx - ax, by - ay); if (L < 2.4) continue;
      const nx = (by - ay) / L, ny = -(bx - ax) / L;
      const point = (f, z, off) => [ax + (bx - ax) * f + nx * off, z, -(ay + (by - ay) * f + ny * off)];
      // Chaînage horizontal fin, interrompu sur les façades trop courtes.
      for (const level of bandLevels) {
        const z0 = level - 0.055, z1 = level + 0.055, off = 0.045;
        gb.quad(bandMat, point(0.015, z0, off), point(0.985, z0, off),
          point(0.985, z1, off), point(0.015, z1, off),
          [0, 0], [L / 2, 0], [L / 2, 0.11], [0, 0.11], [nx, 0, -ny],
          style === 1 ? [0.92, 0.91, 0.88] : [0.82, 0.80, 0.76]);
      }
      // Pilastres d'angle discrets : uniquement sur les deux extrémités visibles.
      if (h > 10 && L > 4.5) for (const f of [0.025, 0.975]) {
        const half = Math.min(0.075, 0.12 / L), z0 = 0.25, z1 = h - 0.35;
        gb.quad(MAT.stone, point(f - half, z0, 0.035), point(f + half, z0, 0.035),
          point(f + half, z1, 0.035), point(f - half, z1, 0.035),
          [0, 0], [0.15, 0], [0.15, z1 - z0], [0, z1 - z0], [nx, 0, -ny],
          [0.88, 0.86, 0.82]);
      }
    }
  }
  /* cornice */
  if ((style <= 3 && style !== 2) && h > 6) {
    const o = insetPoly(p, -0.28);
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n, A = [p[i * 2], p[i * 2 + 1]], B = [p[j * 2], p[j * 2 + 1]], C = [o[j * 2], o[j * 2 + 1]], D = [o[i * 2], o[i * 2 + 1]];
      const L = Math.hypot(B[0] - A[0], B[1] - A[1]), nx = (B[1] - A[1]) / (L || 1), ny = -(B[0] - A[0]) / (L || 1);
      const edgeH = h; /* bâtiments extrudés simples : pas de maillage CityJSON, donc pas de hauteur locale (fe n existe pas ici) */
      gb.quad(MAT.stone, [D[0], edgeH - 0.4, -D[1]], [C[0], edgeH - 0.4, -C[1]], [C[0], edgeH, -C[1]], [D[0], edgeH, -D[1]], [0, 0], [L / 2, 0], [L / 2, 0.2], [0, 0.2], [nx, 0, -ny]);
      gb.quad(MAT.stone, [A[0], edgeH - 0.4, -A[1]], [B[0], edgeH - 0.4, -B[1]], [C[0], edgeH - 0.4, -C[1]], [D[0], edgeH - 0.4, -D[1]], [0, 0], [1, 0], [1, 0.1], [0, 0.1], [0, -1, 0]);
      gb.quad(MAT.stone, [A[0], edgeH, -A[1]], [B[0], edgeH, -B[1]], [C[0], edgeH, -C[1]], [D[0], edgeH, -D[1]], [0, 0], [1, 0], [1, 0.1], [0, 0.1], [0, 1, 0]);
    }
  }
  /* roof */
  if (roof === 0 || width < 2.2) {
    gb.poly(style === 5 ? MAT.zinc : MAT.flatroof, p, h + 0.02, 4);
    if (h > 5 && style !== 5) { // parapet
      const o = insetPoly(p, 0.25);
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n, ax = p[i * 2], ay = p[i * 2 + 1], bx = p[j * 2], by = p[j * 2 + 1], L = Math.hypot(bx - ax, by - ay) || 1, nx = (by - ay) / L, ny = -(bx - ax) / L;
        gb.quad(MAT.stone, [ax, h, -ay], [bx, h, -by], [bx, h + 0.7, -by], [ax, h + 0.7, -ay], [0, 0], [L / 3, 0], [L / 3, 0.2], [0, 0.2], [nx, 0, -ny]);
        gb.quad(MAT.stone, [ax, h + 0.7, -ay], [bx, h + 0.7, -by], [o[j * 2], h + 0.7, -o[j * 2 + 1]], [o[i * 2], h + 0.7, -o[i * 2 + 1]], [0, 0], [1, 0], [1, 0.1], [0, 0.1], [0, 1, 0]);
        gb.quad(MAT.stone, [o[i * 2], h, -o[i * 2 + 1]], [o[j * 2], h, -o[j * 2 + 1]], [o[j * 2], h + 0.7, -o[j * 2 + 1]], [o[i * 2], h + 0.7, -o[i * 2 + 1]], [0, 0], [L / 3, 0], [L / 3, 0.2], [0, 0.2], [-nx, 0, ny]);
      }
    }
    if (area > 120 && R() < 0.82) for (let k = 0, K = 1 + (R() * 3 | 0); k < K; k++) {
      const bx = cx + (R() - 0.5) * width * 0.6, by = cy + (R() - 0.5) * width * 0.6;
      if (inPoly(p, bx, by)) {
        const rot = R() * Math.PI, rw = 0.85 + R() * 1.25, rd = 0.7 + R() * 0.9, rh = 0.65 + R() * 0.65;
        /* Socle technique + caisson HVAC + grilles de ventilation */
        addBox(gb, MAT.stone, bx, by, h + 0.02, rw + 0.16, rd + 0.16, 0.12, rot);
        addBox(gb, MAT.metal, bx, by, h + 0.14, rw, rd, rh, rot);
        const ca = Math.cos(rot), sa = Math.sin(rot);
        for (let f = -1; f <= 1; f++) {
          const ox = f * rw * 0.23, gx = bx + ox * ca, gy = by + ox * sa;
          addBox(gb, MAT.metalLight, gx, gy - rd * 0.5 - 0.012, h + 0.3, 0.035, 0.025, rh * 0.62, rot);
        }
        if (R() < 0.28) {
          const sx = bx + (R() - 0.5) * width * 0.22, sy = by + (R() - 0.5) * width * 0.22;
          if (inPoly(p, sx, sy)) addBox(gb, MAT.glassBus, sx, sy, h + 0.04, 1.1, 0.8, 0.22, rot);
        }
      }
    }
    return;
  }
  let d, rise;
  if (style === 7) { d = Math.min(width * 0.46, 3.4); rise = d * 0.95; }
  else if (style === 2) { d = Math.min(width * 0.45, 3); rise = d * 1.5; }
  else if (roof === 2 || style === 6) { d = width * 0.47; rise = width * 0.75; }
  else { d = Math.min(1.8, width * 0.35); rise = 3.0; }
  const inn = insetPoly(p, d);
  const okInner = polyArea(inn) > 0.5;
  const top = h + rise;
  /* Toitures à deux pans pour les volumes quadrangulaires allongés :
     profil fréquent des maisons mitoyennes et immeubles étroits du centre rennais.
     Les empreintes irrégulières conservent le toit en croupe existant. */
  let gableBuilt = false;
  if (n === 4 && (style <= 3 || style === 7)) {
    const edges = [];
    for (let q = 0; q < 4; q++) {
      const j = (q + 1) % 4, dx = p[j * 2] - p[q * 2], dy = p[j * 2 + 1] - p[q * 2 + 1];
      edges.push({ q, j, L: Math.hypot(dx, dy), dx, dy });
    }
    edges.sort((a, b) => b.L - a.L);
    const e0 = edges[0], e1 = edges.find(e => e.q === (e0.q + 2) % 4 && e.L > e0.L * 0.62);
    const short0 = edges.find(e => e.q === (e0.q + 1) % 4);
    const short1 = edges.find(e => e.q === (e0.q + 3) % 4);
    if (e1 && short0 && short1 && e0.L > short0.L * 1.35 && Math.abs(e0.L - e1.L) < e0.L * 0.3) {
      const mid = e => [(p[e.q * 2] + p[e.j * 2]) * 0.5, (p[e.q * 2 + 1] + p[e.j * 2 + 1]) * 0.5];
      const m0 = mid(short0), m1 = mid(short1);
      const rid = h + rise * (style === 2 ? 0.92 : 0.82);
      const A = [p[e0.q * 2], h, -p[e0.q * 2 + 1]], B = [p[e0.j * 2], h, -p[e0.j * 2 + 1]];
      const C = [p[e1.q * 2], h, -p[e1.q * 2 + 1]], D = [p[e1.j * 2], h, -p[e1.j * 2 + 1]];
      const R0 = [m0[0], rid, -m0[1]], R1 = [m1[0], rid, -m1[1]];
      const roofMat = MAT.slate;
      // Normales inclinées calculées depuis les triangles réels : le toit ne doit pas
      // être éclairé comme un plateau horizontal.
      const faceNormal = (a, b, c) => {
        const ux = b[0]-a[0], uy = b[1]-a[1], uz = b[2]-a[2];
        const vx = c[0]-a[0], vy = c[1]-a[1], vz = c[2]-a[2];
        let nx = uy*vz-uz*vy, ny = uz*vx-ux*vz, nz = ux*vy-uy*vx;
        const ll = Math.hypot(nx,ny,nz) || 1; nx/=ll; ny/=ll; nz/=ll;
        if (ny < 0) { nx=-nx; ny=-ny; nz=-nz; }
        return [nx,ny,nz];
      };
      gb.quad(roofMat, A, B, R1, R0, [0,0], [e0.L/3,0], [e0.L/3,rise/3], [0,rise/3], faceNormal(A,B,R1));
      gb.quad(roofMat, D, C, R0, R1, [0,0], [e1.L/3,0], [e1.L/3,rise/3], [0,rise/3], faceNormal(D,C,R0));
      // Pignons triangulaires : GB.tri calcule lui-même leur normale plane.
      const endA = [p[short0.q * 2], h, -p[short0.q * 2 + 1]];
      const endB = [p[short0.j * 2], h, -p[short0.j * 2 + 1]];
      const endC = [p[short1.q * 2], h, -p[short1.q * 2 + 1]];
      const endD = [p[short1.j * 2], h, -p[short1.j * 2 + 1]];
      gb.tri(mat, endA, R0, endB, [0,0], [0.5,1], [1,0]);
      gb.tri(mat, endC, R1, endD, [0,0], [0.5,1], [1,0]);
      // Faîtage en ardoise légèrement surélevé.
      const dx = m1[0] - m0[0], dy = m1[1] - m0[1], rl = Math.hypot(dx, dy) || 1, rw = 0.10;
      const nx = -dy / rl * rw, ny = dx / rl * rw;
      gb.quad(MAT.slate, [m0[0]+nx,rid+0.035,-(m0[1]+ny)], [m1[0]+nx,rid+0.035,-(m1[1]+ny)], [m1[0]-nx,rid+0.035,-(m1[1]-ny)], [m0[0]-nx,rid+0.035,-(m0[1]-ny)], [0,0], [rl,0], [rl,0.2], [0,0.2], [0,1,0]);
      // Cheminée sur le faîtage réel, avec solin et chaperon maçonné.
      if (style <= 3 && R() < 0.72) {
        const tx = (m0[0] + m1[0]) * 0.5, ty = (m0[1] + m1[1]) * 0.5;
        const cw = 0.58, cd = 0.68, ch = 1.75, rot = Math.atan2(dy, dx);
        addBox(gb, MAT.coping, tx, ty, rid - 0.12, cw + 0.16, cd + 0.16, 0.12, rot);
        addBox(gb, MAT.chimney, tx, ty, rid - 0.02, cw, cd, ch, rot);
        addBox(gb, MAT.coping, tx, ty, rid + ch - 0.02, cw + 0.18, cd + 0.18, 0.13, rot);
      }
      gableBuilt = true;
    }
  }
  let su = 0;
  if (!gableBuilt) for (let i = 0; i < n; i++) {
    const j = (i + 1) % n, ax = p[i * 2], ay = p[i * 2 + 1], bx = p[j * 2], by = p[j * 2 + 1];
    const ix = okInner ? inn[i * 2] : cx, iy = okInner ? inn[i * 2 + 1] : cy, jx = okInner ? inn[j * 2] : cx, jy = okInner ? inn[j * 2 + 1] : cy;
    const L = Math.hypot(bx - ax, by - ay) || 1, nx = (by - ay) / L, ny = -(bx - ax) / L;
    const sl = Math.hypot(d, rise) / 3;
    gb.quad(MAT.slate, [ax, h, -ay], [bx, h, -by], [jx, top, -jy], [ix, top, -iy], [su / 3, 0], [(su + L) / 3, 0], [(su + L) / 3, sl], [su / 3, sl], [nx * rise, d, -ny * rise]);
    /* Joints de couverture : fines nervures parallèles à la pente, pour casser les grands aplats d'ardoise. */
    if (style <= 3 || style === 7) {
      const ribs = Math.min(18, Math.max(2, Math.floor(L / 0.72)));
      for (let q = 1; q < ribs; q++) {
        const f = q / ribs, ex = ax + (bx - ax) * f, ey = ay + (by - ay) * f, ixq = ix + (jx - ix) * f, iyq = iy + (jy - iy) * f;
        const ox = nx * 0.018, oy = ny * 0.018, half = 0.018;
        const A = [ex - (bx-ax)/L*half + ox, h + 0.018, -(ey - (by-ay)/L*half + oy)];
        const B = [ex + (bx-ax)/L*half + ox, h + 0.018, -(ey + (by-ay)/L*half + oy)];
        const C = [ixq + (jx-ix)/Math.max(L,1)*half + ox, top + 0.018, -(iyq + (jy-iy)/Math.max(L,1)*half + oy)];
        const D = [ixq - (jx-ix)/Math.max(L,1)*half + ox, top + 0.018, -(iyq - (jy-iy)/Math.max(L,1)*half + oy)];
        gb.quad(MAT.slate, A, B, C, D, [0,0], [1,0], [1,sl], [0,sl], [nx * rise, d, -ny * rise], [0.78,0.78,0.78]);
      }
    }
    su += L;
    /* dormers on city mansards */
    if (style <= 3 && style !== 2 && rise >= 2.5 && L > 5 && okInner && h > 8) {
      const cnt = Math.floor((L - 1.5) / BAY);
      for (let k = 0; k < cnt; k++) {
        if (R() < 0.25) continue;
        const tt = (k + 0.5) / cnt, px = ax + (bx - ax) * tt, py = ay + (by - ay) * tt;
        const tin = d * 0.4, y0 = h + rise * 0.4 - 0.05, y1 = y0 + 1.5, tb = Math.min(d * 0.95, d * (y1 - h) / rise);
        const ex = (bx - ax) / L * 0.6, ey = (by - ay) / L * 0.6; // half width
        const fx = px - nx * tin, fy = py - ny * tin, kx = px - nx * tb, ky = py - ny * tb;
        const dm = MAT.dormer[R() < 0.3 ? 1 : 0];
        gb.quad(dm, [fx - ex, y0, -(fy - ey)], [fx + ex, y0, -(fy + ey)], [fx + ex, y1, -(fy + ey)], [fx - ex, y1, -(fy - ey)], [0, 0], [1, 0], [1, 1], [0, 1], [nx, 0, -ny]);
        for (const s of [-1, 1]) gb.quad(MAT.zinc, [fx + s * ex, y0, -(fy + s * ey)], [kx + s * ex, y0, -(ky + s * ey)], [kx + s * ex, y1, -(ky + s * ey)], [fx + s * ex, y1, -(fy + s * ey)], [0, 0], [1, 0], [1, 1], [0, 1], [s * ex, 0, -s * ey]);
        gb.quad(MAT.slate, [fx - ex * 1.15 + nx * 0.15, y1, -(fy - ey * 1.15 + ny * 0.15)], [fx + ex * 1.15 + nx * 0.15, y1, -(fy + ey * 1.15 + ny * 0.15)], [kx + ex * 1.15, y1 + 0.25, -(ky + ey * 1.15)], [kx - ex * 1.15, y1 + 0.25, -(ky - ey * 1.15)], [0, 0], [0.5, 0], [0.5, 0.4], [0, 0.4], [0, 1, 0]);
      }
    }
  }
  if (!gableBuilt && okInner) gb.poly(style === 7 || style === 2 || roof === 2 ? MAT.slate : MAT.zinc, inn, top, 3);
  /* Les cheminées aléatoires restent sur les toitures en croupe : sur un toit
     à deux pans, leur placement doit être calculé sur le pan réel, pas sur l'ancien faîtage inset. */
  if (!gableBuilt && style !== 6 && R() < 0.75 && okInner) {
    for (let k = 0, K = 1 + (R() * 2 | 0); k < K; k++) {
      const vi = (R() * n) | 0, qx = lerp(inn[vi * 2], cx, 0.25), qy = lerp(inn[vi * 2 + 1], cy, 0.25);
      const cw = 0.6 + R() * 0.5, cd = 0.9 + R() * 0.8, ch = 1.8, rot = R() * 3;
      // Solin périphérique : raccord visible entre la souche et la couverture.
      addBox(gb, MAT.coping, qx, qy, top - 0.045, cw + 0.16, cd + 0.16, 0.09, rot);
      addBox(gb, MAT.chimney, qx, qy, top - 0.6, cw, cd, ch, rot);
      // Chaperon débordant en pierre/béton, au lieu d'une souche coupée à plat.
      addBox(gb, MAT.coping, qx, qy, top - 0.6 + ch, cw + 0.18, cd + 0.18, 0.13, rot);
    }
  }
}
function addBox(gb, mat, x, y, z, w, d, h, rot) {
  const c = Math.cos(rot), s = Math.sin(rot), P = (dx, dy) => [x + dx * c - dy * s, y + dx * s + dy * c];
  const pts = [P(-w / 2, -d / 2), P(w / 2, -d / 2), P(w / 2, d / 2), P(-w / 2, d / 2)];
  for (let i = 0; i < 4; i++) {
    const a = pts[i], b = pts[(i + 1) % 4], L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = (b[1] - a[1]) / L, ny = -(b[0] - a[0]) / L;
    gb.quad(mat, [a[0], z, -a[1]], [b[0], z, -b[1]], [b[0], z + h, -b[1]], [a[0], z + h, -a[1]], [0, 0], [L, 0], [L, h], [0, h], [nx, 0, -ny]);
  }
  gb.quad(mat, [pts[0][0], z + h, -pts[0][1]], [pts[1][0], z + h, -pts[1][1]], [pts[2][0], z + h, -pts[2][1]], [pts[3][0], z + h, -pts[3][1]], [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
}
function addGrandstand(gb, p, h, mat) {
  const c = GD.stadium || { 0: 0, 1: 0 }, cx = c[0], cy = c[1], n = p.length / 2;
  const ds = []; for (let i = 0; i < n; i++) ds.push(Math.hypot(p[i * 2] - cx, p[i * 2 + 1] - cy));
  const dmin = Math.min(...ds), dmax = Math.max(...ds);
  const hv = ds.map(d => 5 + (d - dmin) / (dmax - dmin + 1e-3) * 19);
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n, ax = p[i * 2], ay = p[i * 2 + 1], bx = p[j * 2], by = p[j * 2 + 1], L = Math.hypot(bx - ax, by - ay) || 1, nx = (by - ay) / L, ny = -(bx - ax) / L;
    gb.quad(mat, [ax, 0, -ay], [bx, 0, -by], [bx, hv[j], -by], [ax, hv[i], -ay], [0, 0], [L / mat.userData.perU, 0], [L / mat.userData.perU, hv[j] / mat.userData.perV], [0, hv[i] / mat.userData.perV], [nx, 0, -ny]);
  }
  const v = []; for (let i = 0; i < n; i++) v.push(new THREE.Vector2(p[i * 2], p[i * 2 + 1]));
  const tris = THREE.ShapeUtils.triangulateShape(v, []);
  const pcx = v.reduce((s, q) => s + q.x, 0) / n, pcy = v.reduce((s, q) => s + q.y, 0) / n;
  const dx = pcx - cx, dy = pcy - cy, dl = Math.hypot(dx, dy) || 1, px = -dy / dl, py = dx / dl;
  for (const t of tris) {
    const P = t.map(k => [v[k].x, hv[k] + 0.02, -v[k].y]), U = t.map(k => [(v[k].x * px + v[k].y * py) / 4, ds[k] / 1.2]);
    gb.quad(MAT.seats, P[0], P[1], P[2], P[2], U[0], U[1], U[2], U[2], [0, 1, 0]);
  }
  /* canopy */
  const outer = []; for (let i = 0; i < n; i++) if (ds[i] > dmin + (dmax - dmin) * 0.5) outer.push(i);
  const can = p.slice(); gb.poly(MAT.metal, can, 26, 6, false);
}


let FACADE_PHOTO = false;
function setFacadePhoto(on) { FACADE_PHOTO = on; for (const t of tiles.values()) { if (t.photoG) t.photoG.visible = on; if (t.drawnG) t.drawnG.visible = !on; } }
/* ---------- real LOD2 buildings (Rennes Métropole 3D model) ---------- */
let PORTM = null;
function portalMats() {
  if (PORTM) return PORTM;
  const d = document.createElement('canvas'); d.width = 256; d.height = 410; const g = d.getContext('2d');
  g.fillStyle = '#b8ab92'; g.beginPath(); g.moveTo(0, 410); g.lineTo(0, 140); g.quadraticCurveTo(0, 0, 128, 0); g.quadraticCurveTo(256, 0, 256, 140); g.lineTo(256, 410); g.fill();
  g.fillStyle = '#9a8c74'; g.beginPath(); g.moveTo(22, 410); g.lineTo(22, 150); g.quadraticCurveTo(22, 26, 128, 24); g.quadraticCurveTo(234, 26, 234, 150); g.lineTo(234, 410); g.fill();
  g.fillStyle = '#6a2a20'; g.fillRect(44, 200, 168, 210); g.fillStyle = '#4a1a14'; g.fillRect(126, 200, 4, 210);
  for (let y = 220; y < 400; y += 40) for (const x of [56, 140]) g.strokeRect(x, y, 60, 30);
  g.fillStyle = '#3a3040'; g.beginPath(); g.moveTo(44, 196); g.quadraticCurveTo(44, 60, 128, 52); g.quadraticCurveTo(212, 60, 212, 196); g.fill();
  const r = document.createElement('canvas'); r.width = r.height = 256; const rg = r.getContext('2d');
  rg.fillStyle = '#b8ab92'; rg.beginPath(); rg.arc(128, 128, 126, 0, 7); rg.fill(); rg.fillStyle = '#2a3050'; rg.beginPath(); rg.arc(128, 128, 104, 0, 7); rg.fill();
  rg.strokeStyle = '#b8ab92'; rg.lineWidth = 7; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; rg.beginPath(); rg.moveTo(128, 128); rg.lineTo(128 + Math.cos(a) * 104, 128 + Math.sin(a) * 104); rg.stroke(); rg.fillStyle = ['#a03040', '#3050a0', '#d0a040'][k % 3]; rg.beginPath(); rg.arc(128 + Math.cos(a + 0.26) * 70, 128 + Math.sin(a + 0.26) * 70, 14, 0, 7); rg.fill(); }
  rg.beginPath(); rg.arc(128, 128, 26, 0, 7); rg.fillStyle = '#d0a040'; rg.fill();
  PORTM = { door: M({ map: canvasTex(d, true), transparent: true, alphaTest: 0.5, roughness: 0.8 }), rose: M({ map: canvasTex(r, true), transparent: true, alphaTest: 0.5, roughness: 0.6, emissive: 0x221a30, emissiveIntensity: 0.4 }) };
  return PORTM;
}
let CHURCHM = null;
function churchMat() {
  if (CHURCHM) return CHURCHM;
  const img = MAT.monument.map.image, c = document.createElement('canvas'); c.width = 512; c.height = 1024; const g = c.getContext('2d');
  for (let y = 0; y < 1024; y += img.height * 0.5) for (let x = 0; x < 512; x += img.width * 0.5) g.drawImage(img, x, y, img.width * 0.5, img.height * 0.5);
  g.fillStyle = 'rgba(235,225,205,.25)'; g.fillRect(0, 0, 512, 1024);
  /* buttress strip on each bay edge */
  for (const x of [0, 492]) { g.fillStyle = 'rgba(60,50,40,.28)'; g.fillRect(x, 0, 20, 1024); }
  /* lancet window: pointed arch, leaded dark glass with tracery */
  const lx = 256, w = 120, top = 260, bot = 800;
  g.fillStyle = '#cbbf a8'.replace(' ', ''); g.beginPath(); g.moveTo(lx - w / 2 - 14, bot + 14); g.lineTo(lx - w / 2 - 14, top + 60); g.quadraticCurveTo(lx - w / 2 - 14, top - 30, lx, top - 50); g.quadraticCurveTo(lx + w / 2 + 14, top - 30, lx + w / 2 + 14, top + 60); g.lineTo(lx + w / 2 + 14, bot + 14); g.fill();
  const gl = g.createLinearGradient(0, top, 0, bot); gl.addColorStop(0, '#2a3a5a'); gl.addColorStop(0.5, '#4a3a5a'); gl.addColorStop(1, '#2a2a3a');
  g.fillStyle = gl; g.beginPath(); g.moveTo(lx - w / 2, bot); g.lineTo(lx - w / 2, top + 60); g.quadraticCurveTo(lx - w / 2, top - 15, lx, top - 32); g.quadraticCurveTo(lx + w / 2, top - 15, lx + w / 2, top + 60); g.lineTo(lx + w / 2, bot); g.fill();
  g.strokeStyle = 'rgba(30,26,22,.9)'; g.lineWidth = 3; for (let y = top + 40; y < bot; y += 34) { g.beginPath(); g.moveTo(lx - w / 2, y); g.lineTo(lx + w / 2, y); g.stroke(); }
  g.lineWidth = 6; g.strokeStyle = '#b8ab92'; g.beginPath(); g.moveTo(lx, top - 30); g.lineTo(lx, bot); g.stroke();
  for (let k = 0; k < 30; k++) { g.fillStyle = `rgba(${pick(['200,60,60', '60,90,200', '220,180,60', '80,160,90'])},.35)`; g.fillRect(lx - w / 2 + Math.random() * w, top + Math.random() * (bot - top), 14, 14); }
  g.fillStyle = '#b8ab92'; g.fillRect(lx - w / 2 - 24, bot + 10, w + 48, 16);
  CHURCHM = M({ map: canvasTex(c, true), normalMap: MAT.monument.normalMap, vertexColors: true, roughness: 0.92 }); CHURCHM.userData.avg = [0.45, 0.43, 0.4];
  CHURCHM.emissiveMap = CHURCHM.map; CHURCHM.emissive = new THREE.Color(0x000000);
  return CHURCHM;
}
/* front steps of a church: on the short end along the main axis that opens onto the most free space */
function parvis(gb, t, f, h) {
  const PMh = h;
  const n = f.length / 2; let mx0 = 0, my0 = 0; for (let q = 0; q < n; q++) { mx0 += f[q * 2] / n; my0 += f[q * 2 + 1] / n; }
  let sxx = 0, syy = 0, sxy = 0; for (let q = 0; q < n; q++) { const dx = f[q * 2] - mx0, dy = f[q * 2 + 1] - my0; sxx += dx * dx; syy += dy * dy; sxy += dx * dy; }
  const ang = 0.5 * Math.atan2(2 * sxy, sxx - syy), best = [Math.cos(ang), Math.sin(ang)]; /* nave axis: principal direction of the footprint */
  const ccw = polyArea(f) > 0; let pick2 = null, pf = 0;
  for (let q = 0; q < n; q++) {
    const ax = f[q * 2], ay = f[q * 2 + 1], bx = f[((q + 1) % n) * 2], by = f[((q + 1) % n) * 2 + 1], L = Math.hypot(bx - ax, by - ay); if (L < 6) continue;
    let nx = (by - ay) / L, ny = -(bx - ax) / L; if (!ccw) { nx = -nx; ny = -ny; }
    if (Math.abs(nx * best[0] + ny * best[1]) < 0.8) continue;
    const mx = (ax + bx) / 2, my = (ay + by) / 2; let free = 0;
    for (let d = 1; d < 20; d += 1) { const x = mx + nx * d, y = my + ny * d; if (insideBuilding(x, y) || inCW(x, y)) break; free = d; }
    const sc = free + (lcSquare(mx + nx * 8, my + ny * 8) ? 15 : 0) + L * 0.3;
    if (free >= 3.5 && sc > pf) { pf = sc; pick2 = [ax, ay, bx, by, nx, ny, L]; }
  }
  if (!pick2) return;
  const [ax, ay, bx, by, nx, ny, L] = pick2, N = 5, RISE = 0.16, RUN = 0.42, ux = (bx - ax) / L, uy = (by - ay) / L, W = Math.min(L * 0.95, 26), mx = (ax + bx) / 2, my = (ay + by) / 2;
  for (let k = 0; k < N; k++) {
    const d0 = k * RUN, d1 = (N + 1) * RUN, top = SW + (N - k) * RISE, hw = W / 2 + (N - k) * 0.15;
    const c = [[mx - ux * hw + nx * d0, my - uy * hw + ny * d0], [mx + ux * hw + nx * d0, my + uy * hw + ny * d0], [mx + ux * hw + nx * (d0 + RUN), my + uy * hw + ny * (d0 + RUN)], [mx - ux * hw + nx * (d0 + RUN), my - uy * hw + ny * (d0 + RUN)]];
    gb.quad(MAT.stair, ...[c[0], c[3], c[2], c[1]].map(v => [v[0], top, -v[1]]), [0, 0], [RUN, 0], [RUN, W], [0, W], [0, 1, 0]);
    gb.quad(MAT.stairNose, [c[3][0], SW - 0.05, -c[3][1]], [c[2][0], SW - 0.05, -c[2][1]], [c[2][0], top, -c[2][1]], [c[3][0], top, -c[3][1]], [0, 0], [W, 0], [W, 0.2], [0, 0.2], [nx, 0, -ny]);
    for (const [e0, e1, sg] of [[c[0], c[3], -1], [c[2], c[1], 1]]) gb.quad(MAT.stairNose, [e0[0], SW - 0.05, -e0[1]], [e1[0], SW - 0.05, -e1[1]], [e1[0], top, -e1[1]], [e0[0], top, -e0[1]], [0, 0], [1, 0], [1, 1], [0, 1], [ux * sg, 0, -uy * sg]);
  }
  { /* portal and rose window on the west front */
    const PM = portalMats(), o = 0.06, top = SW + N * RISE, q = (u, z, w2) => [mx + ux * u + nx * o, z, -(my + uy * u + ny * o)];
    const pw = Math.min(4.2, L * 0.3), ph = pw * 1.6;
    gb.quad(PM.door, q(pw / 2, top, 0), q(-pw / 2, top, 0), q(-pw / 2, top + ph, 0), q(pw / 2, top + ph, 0), [0, 0], [1, 0], [1, 1], [0, 1], [nx, 0, -ny]);
    const rr = Math.min(1.8, L * 0.14), rz = top + ph + 2.2 + rr;
    if (rz + rr < h - 1) gb.quad(PM.rose, q(rr, rz - rr, 0), q(-rr, rz - rr, 0), q(-rr, rz + rr, 0), q(rr, rz + rr, 0), [0, 0], [1, 0], [1, 1], [0, 1], [nx, 0, -ny]);
  }
  const g0 = th(mx, my);
  t.stairs = t.stairs || new Grid(8);
  t.stairs.add(Math.min(mx - ux * W, mx + nx * N * RUN) - 1, Math.min(my - uy * W, my + ny * N * RUN) - 1, Math.max(mx + ux * W, mx + nx * N * RUN) + 1, Math.max(my + uy * W, my + ny * N * RUN) + 1, { ax: mx, ay: my, bx: mx + nx * N * RUN, by: my + ny * N * RUN, hw: W / 2, h0: g0 + N * RISE - SW, h1: g0 - SW + 0.0 });
}
let HALLM = null;
function hallMat() {
  if (HALLM) return HALLM;
  const c = document.createElement('canvas'); c.width = 512; c.height = 1024; const g = c.getContext('2d'), H = 1024, m = H / 12; /* 12 m of facade, 6 m wide */
  g.fillStyle = '#5a6a6a'; g.fillRect(0, 0, 512, H);
  /* zinc roof edge and cornice */
  g.fillStyle = '#4a5254'; g.fillRect(0, 0, 512, m * 3.2); g.fillStyle = '#d8d2c4'; g.fillRect(0, m * 3.2, 512, m * 0.35);
  /* iron and glass clerestory */
  g.fillStyle = '#26302e'; g.fillRect(0, m * 3.55, 512, m * 3.6);
  for (let x = 0; x < 512; x += 42) for (let y = m * 3.7; y < m * 7; y += m * 0.55) { g.fillStyle = `rgba(150,180,190,${0.55 + Math.random() * 0.2})`; g.fillRect(x + 4, y, 34, m * 0.48); }
  g.fillStyle = '#d8d2c4'; g.fillRect(0, m * 7.15, 512, m * 0.3);
  /* polychrome brick base: red with ochre and black diamonds */
  const y0 = m * 7.45;
  for (let y = y0; y < H; y += 9) for (let x = ((y - y0) / 9 % 2) * 13; x < 512; x += 26) { g.fillStyle = `hsl(${8 + Math.random() * 8},${45 + Math.random() * 15}%,${33 + Math.random() * 8}%)`; g.fillRect(x, y, 24, 7); }
  for (let cx = 32; cx < 512; cx += 64) for (let cy = y0 + 70; cy < H - 40; cy += 110) { g.fillStyle = Math.random() < 0.5 ? '#d8a848' : '#2a2420'; g.save(); g.translate(cx, cy); g.rotate(Math.PI / 4); g.fillRect(-14, -14, 28, 28); g.restore(); }
  g.fillStyle = '#cfc6b4'; g.fillRect(0, H - m * 0.5, 512, m * 0.5);
  HALLM = M({ map: canvasTex(c, true), roughness: 0.75 }); HALLM.userData.perU = 6; HALLM.userData.perV = 12; HALLM.userData.avg = [0.5, 0.5, 0.5];
  return HALLM;
}
/* ---------- Halles Martenot (the market halls of the Lices): open to walk in through their doors ---------- */
const HALLS = [], HALLDOORS = [];
function updateHallDoors(dt) {
  for (let i = HALLDOORS.length - 1; i >= 0; i--) { const d = HALLDOORS[i]; if (!d.g.parent) { HALLDOORS.splice(i, 1); continue; }
    let near = Math.hypot(player.x - d.x, player.y - d.y) < 3.2; if (!near) for (const p of peds) if (p.mesh && p.mesh.visible && Math.abs(p.x - d.x) < 2.5 && Math.abs(p.y - d.y) < 2.5) { near = true; break; }
    const o = clamp(d.open + (near ? dt * 2.5 : -dt * 1.2), 0, 1); if (o === d.open) continue; d.open = o; const a = (1 - Math.cos(o * Math.PI)) / 2 * 1.45;
    for (const l of d.leaves) l.pv.rotation.y = d.sIn * l.side * -a; }
}
function underRoof(x, y) { for (const hl of HALLS) if (x > hl.b[0] && x < hl.b[2] && y > hl.b[1] && y < hl.b[3] && inPoly(hl.f, x, y)) return true; return false; }
let HALLI = null;
function hallInteriorMats() {
  if (HALLI) return HALLI;
  const awn = [0xb8352a, 0x2f6a3a, 0x2a4f8a, 0xc98a1a, 0x7a2a5a].map(c => M({ color: c, roughness: 0.8, side: THREE.DoubleSide }));
  const prod = [0xd8402a, 0xe8a020, 0x6aa830, 0xf0e0b0, 0x8a3a8a, 0xc85a2a].map(c => M({ color: c, roughness: 0.7 }));
  HALLI = { awn, prod, wood: M({ ...MAT.groundTex.concrete, color: 0x8a6a48, roughness: 0.9 }), iron: M({ color: 0x2c3634, roughness: 0.5, metalness: 0.6 }),
    ceil: M({ color: 0x46524f, roughness: 0.8, side: THREE.DoubleSide }), glass: M({ color: 0xbcd8e0, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.28, depthWrite: false }), lantern: (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#20282a'; g.fillRect(0, 0, 256, 128); for (let x = 0; x < 256; x += 32) for (let y = 0; y < 128; y += 64) { g.fillStyle = '#8fb0b8'; g.fillRect(x + 4, y + 6, 24, 52); } const tx = canvasTex(c, true); const m = M({ map: tx, emissive: 0xffd8a0, emissiveMap: tx, emissiveIntensity: 0, roughness: 0.15, metalness: 0.3 }); m.userData.sign = true; return m; })(), lamp: new THREE.MeshBasicMaterial({ color: 0xfff0c8 }), steel: M({ color: 0xb8bcc0, roughness: 0.35, metalness: 0.7 }) };
  return HALLI;
}
function buildHall(gb, t, f0, h, hv = h) {
  const f = ccw(f0), n = f.length / 2, HM = hallMat(), I = hallInteriorMats(), Y0 = SW + 0.02, HW = h * 0.7;
  const HREC = { f, b: polyBox(f), doors: [] }; HALLS.push(HREC);
  /* edges with their running length: the painted doors are at the middle of every 6 m bay (see hallMat) */
  const cw0 = polyArea(f0) < 0, E = []; { let acc = 0; for (let q = 0; q < n; q++) { const ax = f0[q * 2], ay = f0[q * 2 + 1], bx = f0[((q + 1) % n) * 2], by = f0[((q + 1) % n) * 2 + 1], L = Math.hypot(bx - ax, by - ay); if (L < 0.05) continue; E.push({ ax, ay, dx: (bx - ax) / L, dy: (by - ay) / L, L, acc }); acc += L; } }
  const door = (e, d) => { const u = ((e.acc + d) / 6) % 1; return u > 0.39 && u < 0.61; };
  /* walls with one real doorway per side (glass double doors), the other painted doors stay shut */
  const DH = Math.min(0.35 * hv, 3.4), OW = 0.95, IX = 0.32, ORA = [];
  for (const e of E) {
    const nx = cw0 ? e.dy : -e.dy, ny = cw0 ? -e.dx : e.dx; /* inward (the edges keep the order the facade texture was laid in) */
    let de = null; if (e.L > 5) for (let d = 3 - (e.acc % 6); d < e.L; d += 6) if (d > 1.5 && d < e.L - 1.5 && (de === null || Math.abs(d - e.L / 2) < Math.abs(de - e.L / 2))) de = d;
    const P = (d, o) => [e.ax + e.dx * d + nx * o, e.ay + e.dy * d + ny * o], u = d => (e.acc + d) / 6;
    const wq = (d0, d1, y0, y1, o, sgn, top) => { const A = P(d0, o), B = P(d1, o); gb.quad(HM, [A[0], y0, -A[1]], [B[0], y0, -B[1]], [B[0], y1, -B[1]], [A[0], y1, -A[1]], [u(d0), y0 / hv], [u(d1), y0 / hv], [u(d1), y1 / hv], [u(d0), y1 / hv], [nx * sgn, 0, -ny * sgn]); };
    const segs = de === null ? [[0, e.L]] : [[0, de - OW], [de + OW, e.L]];
    for (const [d0, d1] of segs) {
      if (d1 - d0 < 0.05) continue;
      wq(d0, d1, -0.6, h, 0, -1); wq(d0, d1, Y0 - 0.1, HW, IX, 1);
      const c = [P(d0, 0), P(d1, 0), P(d1, 0.5), P(d0, 0.5)], bb = polyBox(c.flat()); t.obs.add(...bb, { p: c.flat(), b: bb, h });
    }
    if (de !== null) {
      wq(de - OW, de + OW, DH, h, 0, -1); wq(de - OW, de + OW, DH, HW, IX, 1);
      /* reveals of the opening */
      for (const [d, sg] of [[de - OW, 1], [de + OW, -1]]) { const A = P(d, 0), B = P(d, IX); gb.quad(I.iron, [A[0], -0.3, -A[1]], [B[0], -0.3, -B[1]], [B[0], DH, -B[1]], [A[0], DH, -A[1]], [0, 0], [1, 0], [1, 1], [0, 1], [e.dx * sg, 0, -e.dy * sg]); }
      { const A = P(de - OW, 0), B = P(de + OW, 0), C = P(de + OW, IX), D = P(de - OW, IX); gb.quad(I.iron, [A[0], DH, -A[1]], [B[0], DH, -B[1]], [C[0], DH, -C[1]], [D[0], DH, -D[1]], [0, 0], [1, 0], [1, 1], [0, 1], [0, -1, 0]); }
      HREC.doors.push([...P(de, 0), nx, ny]); ORA.push({ e, de, nx, ny });
    }
  }
  /* glass double doors, swinging in when someone comes close (see updateHallDoors) */
  for (const { e, de, nx, ny } of ORA) {
    const [cx, cy] = [e.ax + e.dx * de + nx * 0.16, e.ay + e.dy * de + ny * 0.16], g = new THREE.Group();
    g.position.set(cx, SW, -cy); g.rotation.y = Math.atan2(e.dy, e.dx); const sIn = (nx * -e.dy + ny * e.dx) > 0 ? 1 : -1; /* local -z is inward when the inward normal is to the left of the edge */
    const lw = OW - 0.03, lh = DH - 0.05, leaves = [];
    for (const side of [-1, 1]) {
      const pv = new THREE.Group(); pv.position.set(side * OW, 0, 0); g.add(pv);
      const glass = new THREE.Mesh(new THREE.BoxGeometry(lw - 0.1, lh - 0.12, 0.02), I.glass); glass.position.set(-side * lw / 2, lh / 2, 0); pv.add(glass);
      for (const [w2, h2, x2, y2] of [[lw, 0.06, -side * lw / 2, lh - 0.03], [lw, 0.1, -side * lw / 2, 0.05], [0.05, lh, -side * 0.03, lh / 2], [0.05, lh, -side * (lw - 0.03), lh / 2], [0.03, 0.4, -side * (lw - 0.12), lh * 0.48]]) { const fr = new THREE.Mesh(new THREE.BoxGeometry(w2, h2, 0.05), I.iron); fr.position.set(x2, y2, 0); pv.add(fr); }
      leaves.push({ pv, side });
    }
    t.group.add(g); g.updateMatrixWorld(true);
    HALLDOORS.push({ g, leaves, x: cx, y: cy, sIn, open: 0 });
  }
  /* roof: slate skirt from the wall top, a glazed lantern lit at night, zinc top */
  { const r0 = f, r1 = insetPoly(f, 3.6), r2 = insetPoly(f, 7.5), H0 = h, H1 = h + 2.2, H2 = H1 + 1.6, H3 = H2 + 1.5;
    const ring = (pa, ha, pb, hb, mat, uvs) => { const m = pa.length / 2; for (let q = 0; q < m; q++) { const q1 = (q + 1) % m, A = [pa[q * 2], ha, -pa[q * 2 + 1]], B = [pa[q1 * 2], ha, -pa[q1 * 2 + 1]], C = [pb[q1 * 2], hb, -pb[q1 * 2 + 1]], D = [pb[q * 2], hb, -pb[q * 2 + 1]], L = Math.hypot(B[0] - A[0], B[2] - A[2]), sl = Math.hypot(Math.hypot(D[0] - A[0], D[2] - A[2]), hb - ha);
      const nx = -(pa[q1 * 2 + 1] - pa[q * 2 + 1]), ny = pa[q1 * 2] - pa[q * 2], nl = Math.hypot(nx, ny) || 1; gb.quad(mat, A, B, C, D, [0, 0], [L / uvs, 0], [L / uvs, sl / uvs], [0, sl / uvs], [-nx / nl, 0.6, ny / nl]); } };
    ring(r0, H0, r1, H1, MAT.slate, 3);
    ring(r1, H1, r1, H2, HALLI.lantern, 2.4);
    ring(r1, H2, r2, H3, MAT.zinc, 3);
    gb.poly(MAT.zinc, r2, H3, 4, true);
    /* eaves: a zinc gutter along the wall top */
    ring(insetPoly(f, -0.5), H0 - 0.05, r0, H0, MAT.zinc, 3);
  }
  /* ceiling, lamps */
  const fi = insetPoly(f, 0.3); /* the floor is the ground itself (setts) */
  { const v = []; for (let i = 0; i < fi.length; i += 2) v.push(new THREE.Vector2(fi[i], fi[i + 1])); let tris = []; try { tris = THREE.ShapeUtils.triangulateShape(v, []); } catch (e) { }
    for (const tr of tris) gb.tri(I.ceil, ...tr.map(k => [v[k].x, HW, -v[k].y]), [0, 0], [1, 0], [0, 1]); }
  /* main axis = longest edge */
  let ax = 1, ay = 0, lmax = 0; for (const e of E) if (e.L > lmax) { lmax = e.L; ax = e.dx; ay = e.dy; }
  const bx = -ay, by = ax; let s0 = 1e9, s1 = -1e9, w0 = 1e9, w1 = -1e9; const cx0 = f[0], cy0 = f[1];
  for (let i = 0; i < f.length; i += 2) { const s = (f[i] - cx0) * ax + (f[i + 1] - cy0) * ay, w = (f[i] - cx0) * bx + (f[i + 1] - cy0) * by; s0 = Math.min(s0, s); s1 = Math.max(s1, s); w0 = Math.min(w0, w); w1 = Math.max(w1, w); }
  const P = (s, w) => [cx0 + ax * s + bx * w, cy0 + ay * s + by * w], wm = (w0 + w1) / 2, ww = w1 - w0;
  const box = (mat, s, w, ls, lw, z0, z1) => { const c = [P(s - ls / 2, w - lw / 2), P(s + ls / 2, w - lw / 2), P(s + ls / 2, w + lw / 2), P(s - ls / 2, w + lw / 2)];
    gb.quad(mat, ...c.map(p => [p[0], z1, -p[1]]), [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
    for (let k = 0; k < 4; k++) { const p = c[k], q = c[(k + 1) % 4], ex = q[0] - p[0], ey = q[1] - p[1], el = Math.hypot(ex, ey) || 1; gb.quad(mat, [p[0], z0, -p[1]], [q[0], z0, -q[1]], [q[0], z1, -q[1]], [p[0], z1, -p[1]], [0, 0], [el, 0], [el, z1 - z0], [0, z1 - z0], [ey / el, 0, ex / el]); } };
  /* cast-iron columns and tie beams every 6 m */
  for (let s = s0 + 6; s < s1 - 3; s += 6) {
    for (const w of [w0 + ww * 0.25, w0 + ww * 0.75]) if (inPoly(f, ...P(s, w))) box(I.iron, s, w, 0.22, 0.22, Y0, HW);
    box(I.iron, s, wm, 0.2, ww - 1, HW - 0.45, HW - 0.2);
    for (const w of [w0 + ww * 0.25, wm, w0 + ww * 0.75]) { const p = P(s + 3, w); if (inPoly(f, ...p)) { box(I.iron, s + 3, w, 0.03, 0.03, HW - 1.6, HW); box(I.lamp, s + 3, w, 0.35, 0.35, HW - 1.9, HW - 1.6); } }
  }
  /* two rows of market stalls along the hall, an aisle in the middle and along the walls */
  let k = 0;
  for (const w of [w0 + ww * 0.3, w0 + ww * 0.7]) for (let s = s0 + 4; s < s1 - 4; s += 3.4) {
    const p = P(s, w); if (!inPoly(fi, ...p) || !inPoly(fi, ...P(s + 1.5, w)) || !inPoly(fi, ...P(s - 1.5, w))) continue;
    k++; const side = w < wm ? -1 : 1;
    box(I.wood, s, w, 2.6, 1.1, Y0, Y0 + 0.9); /* counter */
    for (let j = 0; j < 4; j++) box(I.prod[(k * 3 + j) % I.prod.length], s - 0.95 + j * 0.63, w - side * 0.2, 0.5, 0.45, Y0 + 0.9, Y0 + 1.05 + ((k + j) % 3) * 0.04);
    box(I.steel, s - 1.25, w + side * 0.45, 0.06, 0.06, Y0 + 0.9, Y0 + 2.3); box(I.steel, s + 1.25, w + side * 0.45, 0.06, 0.06, Y0 + 0.9, Y0 + 2.3);
    { const a = I.awn[k % I.awn.length], c = [P(s - 1.35, w + side * 0.5), P(s + 1.35, w + side * 0.5), P(s + 1.35, w - side * 0.9), P(s - 1.35, w - side * 0.9)];
      gb.quad(a, [c[0][0], Y0 + 2.4, -c[0][1]], [c[1][0], Y0 + 2.4, -c[1][1]], [c[2][0], Y0 + 2.05, -c[2][1]], [c[3][0], Y0 + 2.05, -c[3][1]], [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]); }
    const q = [P(s - 1.35, w - 0.6), P(s + 1.35, w - 0.6), P(s + 1.35, w + 0.6), P(s - 1.35, w + 0.6)], bb = polyBox(q.flat()); t.obs.add(...bb, { p: q.flat(), b: bb, h: 1, low: true });
  }
}
function addLodBuilding(gb, t, rec, R, force) {
  const ox = BX0 + t.i * TILE, oy = BY0 + t.j * TILE;
  const f = rec.f, h = rec.h;
  if (!force && GD.stadium && Math.abs(polyArea(f)) > 15000) { const b = polyBox(f); if (Math.hypot((b[0] + b[2]) / 2 - GD.stadium[0], (b[1] + b[3]) / 2 - GD.stadium[1]) < 140) { t.stadiumRec = rec; return; } }
  const isHall = (() => { const bb = polyBox(f), cx = (bb[0] + bb[2]) / 2, cy = (bb[1] + bb[3]) / 2; return Math.abs(polyArea(f)) > 1000 && (Math.hypot(cx + 511, cy - 48) < 15 || Math.hypot(cx + 567, cy - 12) < 15); })();
  const v = rec.v, idx = rec.i, kinds = rec.k;
  if (isHall) { /* wall top = highest vertex standing on the outline (the generic roof is replaced) */
    let wt = 0; for (let q = 0; q < v.length / 3; q++) { const x = ox + v[q * 3] / 10, y = oy + v[q * 3 + 1] / 10; let dmin = 1e9; for (let k2 = 0; k2 < f.length; k2 += 2) dmin = Math.min(dmin, segNear(x, y, f[k2], f[k2 + 1], f[(k2 + 2) % f.length], f[(k2 + 3) % f.length], _q)); if (dmin < 0.3) wt = Math.max(wt, v[q * 3 + 2] / 10); }
    buildHall(gb, t, f, wt || h, h); } else t.obs.add(...polyBox(f), { p: f, b: polyBox(f), h });
  const P = q => [ox + v[q * 3] / 10, v[q * 3 + 2] / 10, -(oy + v[q * 3 + 1] / 10)];
  const photo = rec.uv && rec.a !== undefined && t.atlas && t.atlas[rec.a];
  if (photo) {
    const pm = t.atlas[rec.a], uv = rec.uv, U = q => [uv[q * 2] / 65535, uv[q * 2 + 1] / 65535];
    for (let k = 0; k < idx.length; k += 3) {
      t.gbPhoto.tri(pm, P(idx[k]), P(idx[k + 1]), P(idx[k + 2]), U(idx[k]), U(idx[k + 1]), U(idx[k + 2]));
    }
  }
  let style = rec.s; if (style === 2 && h > 14.5) style = h > 22 ? 4 : 0; /* half-timbering stops at 4-5 storeys in Rennes */
  const fm = facadeMats[style] || facadeMats[1];
  let mat = style === 2 && rec.bv !== undefined ? fm[rec.bv % fm.length] : fm[(R() * fm.length) | 0];
  const wallGB = photo ? t.gbDrawn : gb;
  let perU = mat.userData.perU, perV = mat.userData.perV;
  if (rec.mo && MAT.monument) { mat = MAT.monument; perU = perV = 3.2; } // landmarks: dressed stone, no window grid
  if (rec.mo === 2 && MAT.monument) { mat = churchMat(); perU = 7; perV = Math.max(9, Math.min(h, 22)); (t.churchQ = t.churchQ || []).push([f, h]); } /* churches: lancet windows and front steps */
  let hall = false;
  { const bb = polyBox(f), cx = (bb[0] + bb[2]) / 2, cy = (bb[1] + bb[3]) / 2; if (Math.abs(polyArea(f)) > 1000 && (Math.hypot(cx + 511, cy - 48) < 15 || Math.hypot(cx + 567, cy - 12) < 15)) { hall = true; mat = hallMat(); perU = mat.userData.perU; perV = h; } } /* Halles Martenot: polychrome brick, iron and glass */
  let tint;
  if (rec.c) { /* real wall colour measured on Rennes Métropole photos */
    const L = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }, avg = mat.userData.avg || [0.6, 0.6, 0.6];
    tint = rec.c.map((v, q) => clamp(L(v) / Math.max(0.05, avg[q]), 0.15, 1.7));
    const g = (tint[0] + tint[1] + tint[2]) / 3; tint = tint.map(v => g + (v - g) * 0.7); // tame photo saturation
  } else { const tk = 1 - R() * 0.14; tint = [tk, tk, tk]; }
  if (hall) tint = [1, 1, 1];
  /* facade u is measured along the footprint outline so every triangle of one wall shares the same window grid */
  /* Hauteur de rive locale mesurée sur le maillage CityJSON : rec.h peut
     être la hauteur du faîtage, pas celle du mur sous le rampant du pignon. */
  const fe = []; {
    let acc = 0;
    for (let q = 0, n = f.length / 2; q < n; q++) {
      const ax = f[q * 2], ay = f[q * 2 + 1], bx = f[((q + 1) % n) * 2], by = f[((q + 1) % n) * 2 + 1];
      const L = Math.hypot(bx - ax, by - ay); if (L < 0.05) continue;
      let wallTop = 0;
      for (let vi = 0; vi < v.length; vi += 3) {
        if (segNear(v[vi] / 10, v[vi + 1] / 10, ax, ay, bx, by, _q) <= 0.22)
          wallTop = Math.max(wallTop, v[vi + 2] / 10);
      }
      if (wallTop < 2) wallTop = h;
      fe.push([ax, ay, (bx - ax) / L, (by - ay) / L, L, acc, Math.min(h, wallTop), q]);
      acc += L;
    }
  }
  const ccwF = polyArea(f) > 0;
  const _bb = polyBox(f), cx = (_bb[0] + _bb[2]) / 2, cy = (_bb[1] + _bb[3]) / 2, dc = Math.hypot(cx - CENTER.x, cy - CENTER.y); /* centre and distance to the city centre (used by the facade details, were undefined here) */
  /* Relief architectural discret pour les façades historiques dessinées :
     des bandeaux de pierre très peu saillants matérialisent les planchers.
     Ils restent dans le groupe des façades dessinées (jamais sur les atlas photo),
     et sont limités au centre pour préserver le budget géométrique. */
  if (!hall && !rec.mo && dc < 1050 && h > 8.5 && h < 34 &&
      (style === 0 || style === 1 || style === 3) && MAT.coping) {
    // Rehausses discrètes des lignes de plancher : plinthe, bandeaux et corniche.
    // Géométrie regroupée dans le bucket de façade, jamais ajoutée aux bâtiments
    // hors du centre ni aux monuments / halles.
    const floors = Math.min(9, Math.floor((h - 0.8) / FLOOR));
    const stoneMat = MAT.coping;
    for (const e of fe) {
      const edgeH = e[6] || h;
      if (e[4] < 3.2 || edgeH < 5) continue;
      const nx = ccwF ? e[3] : -e[3], ny = ccwF ? -e[2] : e[2];
      const ax = e[0], ay = e[1], bx = ax + e[2] * e[4], by = ay + e[3] * e[4];
      const N = [nx, 0, -ny], uv = e[4] / 2.4;
      const face = (y0, y1, depth, mat = stoneMat) => {
        const A = [ax + nx * 0.018, y0, -(ay + ny * 0.018)];
        const B = [bx + nx * 0.018, y0, -(by + ny * 0.018)];
        const C = [bx + nx * depth, y1, -(by + ny * depth)];
        const D = [ax + nx * depth, y1, -(ay + ny * depth)];
        wallGB.quad(mat, A, B, C, D, [0, 0], [uv, 0], [uv, 0.12], [0, 0.12], N);
      };
      // Plinthe en pierre légèrement saillante, typique des façades maçonnées.
      face(0.12, 0.48, 0.105);
      // Bandeaux d'étage : alternance d'un filet sombre et d'un larmier clair.
      for (let fl = 1; fl <= floors; fl++) {
        const y = fl * FLOOR - 0.075;
        face(y, y + 0.055, 0.095);
        const A = [ax + nx * 0.095, y + 0.055, -(ay + ny * 0.095)];
        const B = [bx + nx * 0.095, y + 0.055, -(by + ny * 0.095)];
        const C = [bx + nx * 0.018, y + 0.055, -(by + ny * 0.018)];
        const D = [ax + nx * 0.018, y + 0.055, -(ay + ny * 0.018)];
        wallGB.quad(stoneMat, A, B, C, D, [0, 0], [uv, 0], [uv, 0.035], [0, 0.035], [0, 1, 0]);
      }
      // Corniche haute très fine : elle donne une vraie ligne d'ombre à la toiture.
      if (edgeH > 11) {
        const y = edgeH - 0.32;
        face(y, y + 0.12, 0.14);
        const A = [ax + nx * 0.14, y + 0.12, -(ay + ny * 0.14)];
        const B = [bx + nx * 0.14, y + 0.12, -(by + ny * 0.14)];
        const C = [bx + nx * 0.018, y + 0.12, -(by + ny * 0.018)];
        const D = [ax + nx * 0.018, y + 0.12, -(ay + ny * 0.018)];
        wallGB.quad(stoneMat, A, B, C, D, [0, 0], [uv, 0], [uv, 0.05], [0, 0.05], [0, 1, 0]);
      }
    }
  }
  // Encadrements de fenêtres en relief : uniquement sur un sous-ensemble
  // proche du joueur, afin de réserver le budget géométrique aux façades lisibles.
  if (!hall && !rec.mo && dc < 1050 && h >= 8 && h <= 32 &&
      (style === 0 || style === 1 || style === 3) && MAT.stone && MAT.glassBus) {
    const periodU = perU || 4 * BAY;
    const rows = Math.min(8, Math.floor((h - 0.65) / FLOOR));
    const frameMat = MAT.stone;
    for (const e of fe) {
      const L = e[4], edgeH = e[6] || h;
      if (L < 5.4 || edgeH < 8) continue;
      const nx = ccwF ? e[3] : -e[3], ny = ccwF ? -e[2] : e[2];
      const sg = e[2] * ny - e[3] * nx > 0 ? 1 : -1;
      const dirX = e[2], dirY = e[3], N = [nx, 0, -ny];
      const at = (along, y, depth = 0.085) => [
        e[0] + dirX * along + nx * depth,
        y,
        -(e[1] + dirY * along + ny * depth)
      ];
      // La texture de façade utilise 4 travées de BAY mètres par période.
      for (const c0 of [0.5 * BAY, 1.5 * BAY, 2.5 * BAY, 3.5 * BAY]) {
        let kMin, kMax;
        if (sg > 0) {
          kMin = Math.ceil((e[5] - c0) / periodU);
          kMax = Math.floor((e[5] + L - c0) / periodU);
        } else {
          kMin = Math.ceil((-e[5] - L - c0) / periodU);
          kMax = Math.floor((-e[5] - c0) / periodU);
        }
        for (let k = kMin; k <= kMax; k++) {
          const center = sg * (k * periodU + c0) - e[5];
          if (center < 0.95 || center > L - 0.95) continue;
          for (let fl = 0; fl < rows; fl++) {
            const y0 = fl * FLOOR + FLOOR * 0.2 - 0.16;
            const y1 = y0 + 2.25;
            if (y1 > edgeH - 0.22) continue;
            const half = 0.735, inner = 0.575, bar = 0.10;
            // Vitrage en retrait et tableaux latéraux : la baie ne se limite
            // plus à un cadre posé sur la texture de façade.
            const paneY0 = y0 + bar + 0.035, paneY1 = y1 - bar - 0.035;
            const paneL = center - inner + 0.035, paneR = center + inner - 0.035;
            wallGB.quad(MAT.glassBus,
              at(paneL, paneY0, 0.052), at(paneR, paneY0, 0.052),
              at(paneR, paneY1, 0.052), at(paneL, paneY1, 0.052),
              [0, 0], [1, 0], [1, 1], [0, 1], N);
            wallGB.quad(frameMat,
              at(center - inner, paneY0, 0.025), at(paneL, paneY0, 0.025),
              at(paneL, paneY1, 0.052), at(center - inner, paneY1, 0.052),
              [0, 0], [0.04, 0], [0.04, 2], [0, 2], N);
            wallGB.quad(frameMat,
              at(paneR, paneY0, 0.025), at(center + inner, paneY0, 0.025),
              at(center + inner, paneY1, 0.052), at(paneR, paneY1, 0.052),
              [0, 0], [0.04, 0], [0.04, 2], [0, 2], N);
            const strip = (s0, s1, v0, v1) => wallGB.quad(
              frameMat,
              at(s0, v0), at(s1, v0), at(s1, v1), at(s0, v1),
              [0, 0], [Math.max(0.1, s1 - s0) / 2, 0],
              [Math.max(0.1, s1 - s0) / 2, Math.max(0.1, v1 - v0) / 2],
              [0, Math.max(0.1, v1 - v0) / 2], N
            );
            strip(center - half, center - inner, y0, y1);
            strip(center + inner, center + half, y0, y1);
            strip(center - inner, center + inner, y1 - bar, y1);
            strip(center - inner, center + inner, y0, y0 + bar);
            // Appui en pierre avec une petite saillie et une face supérieure.
            wallGB.quad(frameMat,
              at(center - inner, y0 + 0.12, 0.09),
              at(center + inner, y0 + 0.12, 0.09),
              at(center + inner, y0 + 0.12, 0.19),
              at(center - inner, y0 + 0.12, 0.19),
              [0, 0], [0.5, 0], [0.5, 0.08], [0, 0.08], [0, 1, 0]
            );
            /* Volets battants en bois et jardinières : détails résidentiels
               fréquents dans le centre rennais. Ils sont intégrés au bucket
               de façade et restent limités au premier plan. */
            if (dc < 360 && fl >= 1 &&
                Math.abs(Math.sin(cx * 41.17 + cy * 13.73 + e[5] * 0.29 + center * 8.31 + fl * 5.17)) < 0.24) {
              const shutterY0 = y0 + 0.12, shutterY1 = y1 - 0.08;
              const shutterDepth = 0.115, sw = 0.19;
              for (const side of [-1, 1]) {
                const sc = side < 0 ? center - inner - sw * 0.58 : center + inner + sw * 0.58;
                const sl = sc - sw * 0.5, sr = sc + sw * 0.5;
                wallGB.quad(MAT.wood, at(sl, shutterY0, shutterDepth), at(sr, shutterY0, shutterDepth),
                  at(sr, shutterY1, shutterDepth), at(sl, shutterY1, shutterDepth),
                  [0, 0], [sw, 0], [sw, shutterY1 - shutterY0], [0, shutterY1 - shutterY0], N);
                // Trois lames horizontales donnent une lecture de volet à distance.
                for (let l = 1; l <= 3; l++) {
                  const yy = shutterY0 + (shutterY1 - shutterY0) * l / 4;
                  wallGB.quad(MAT.coping, at(sl + 0.018, yy, shutterDepth + 0.012),
                    at(sr - 0.018, yy, shutterDepth + 0.012),
                    at(sr - 0.018, yy + 0.025, shutterDepth + 0.012),
                    at(sl + 0.018, yy + 0.025, shutterDepth + 0.012),
                    [0, 0], [sw, 0], [sw, 0.025], [0, 0.025], N);
                }
              }
              if (dc < 240 && Math.abs(Math.sin(center * 17.3 + fl * 11.9 + e[5])) < 0.35) {
                const py = y0 - 0.11, pd = 0.24, pl = center - 0.53, pr = center + 0.53;
                wallGB.quad(MAT.wood, at(pl, py, 0.10), at(pr, py, 0.10),
                  at(pr, py + 0.17, 0.10), at(pl, py + 0.17, 0.10),
                  [0, 0], [1, 0], [1, 0.17], [0, 0.17], N);
                wallGB.quad(MAT.hedge, at(pl + 0.04, py + 0.17, 0.13), at(pr - 0.04, py + 0.17, 0.13),
                  at(pr - 0.04, py + 0.27, 0.13), at(pl + 0.04, py + 0.27, 0.13),
                  [0, 0], [1, 0], [1, 0.1], [0, 0.1], N);
              }
            }
            /* Linteau en pierre et clef discrète : relief court au-dessus
               de certaines baies du centre ancien, sans modifier la trame UV. */
            if (dc < 430 && Math.abs(Math.sin(cx * 31.71 + cy * 17.13 +
                e[5] * 0.41 + center * 5.73 + fl * 7.91)) < 0.34) {
              const lx = center - inner, rx = center + inner;
              const capY = y1 + 0.035, capTop = capY + 0.105;
              const capIn = 0.075, capOut = 0.205;
              // Dessus du linteau, légèrement débordant du tableau.
              wallGB.quad(MAT.coping,
                at(lx - 0.055, capTop, capIn), at(rx + 0.055, capTop, capIn),
                at(rx + 0.055, capTop, capOut), at(lx - 0.055, capTop, capOut),
                [0, 0], [0.7, 0], [0.7, 0.12], [0, 0.12], [0, 1, 0]);
              // Face avant du bandeau.
              wallGB.quad(MAT.coping,
                at(lx - 0.055, capY, capOut), at(rx + 0.055, capY, capOut),
                at(rx + 0.055, capTop, capOut), at(lx - 0.055, capTop, capOut),
                [0, 0], [0.7, 0], [0.7, 0.105], [0, 0.105], N);
              // Clef centrale très peu saillante, typique des encadrements en pierre.
              wallGB.quad(MAT.stone,
                at(center - 0.075, y1 - 0.015, capOut + 0.012),
                at(center + 0.075, y1 - 0.015, capOut + 0.012),
                at(center + 0.075, capTop + 0.025, capOut + 0.012),
                at(center - 0.075, capTop + 0.025, capOut + 0.012),
                [0, 0], [0.15, 0], [0.15, 0.14], [0, 0.14], N);
            }
            /* Balcons en ferronnerie : uniquement sur quelques travées des
               façades dessinées du centre. Le choix est déterministe (hash
               spatial), pour ne pas consommer le générateur aléatoire du jeu
               ni modifier la disposition des autres éléments. */
            if (dc < 430 && (fl === 1 || fl === 2) &&
                Math.abs(Math.sin(cx * 12.9898 + cy * 78.233 +
                  e[5] * 0.173 + center * 3.117 + fl * 19.19)) < 0.19) {
              const left = center - 0.82, right = center + 0.82;
              const innerD = 0.12, outerD = 0.68;
              const deckY = y0 + 0.18, railY = deckY + 0.92;
              const A = at(left, deckY, innerD), B = at(right, deckY, innerD);
              const C = at(right, deckY, outerD), D = at(left, deckY, outerD);
              // Dalle mince en pierre, avec nez visible depuis la rue.
              wallGB.quad(MAT.stone, A, B, C, D,
                [0, 0], [0.8, 0], [0.8, 0.28], [0, 0.28], [0, 1, 0]);
              wallGB.quad(MAT.stone,
                at(left, deckY - 0.12, outerD), at(right, deckY - 0.12, outerD),
                at(right, deckY, outerD), at(left, deckY, outerD),
                [0, 0], [0.8, 0], [0.8, 0.06], [0, 0.06], N);
              // Main courante supérieure et lisse intermédiaire.
              for (const yy of [deckY + 0.42, railY]) {
                wallGB.quad(MAT.fence,
                  at(left, yy - 0.025, outerD), at(right, yy - 0.025, outerD),
                  at(right, yy + 0.025, outerD), at(left, yy + 0.025, outerD),
                  [0, 0], [0.8, 0], [0.8, 0.05], [0, 0.05], N);
              }
              // Poteaux fins et retours latéraux de la rambarde.
              const post = (along, depth, bottom, top) => wallGB.quad(MAT.fence,
                at(along - 0.025, bottom, depth), at(along + 0.025, bottom, depth),
                at(along + 0.025, top, depth), at(along - 0.025, top, depth),
                [0, 0], [0.05, 0], [0.05, top - bottom], [0, top - bottom], N);
              for (let q = 0; q <= 4; q++) post(left + (right - left) * q / 4, outerD, deckY, railY);
              for (const side of [-1, 1]) {
                const along = side < 0 ? left : right;
                wallGB.quad(MAT.fence,
                  at(along, deckY, innerD), at(along, deckY, outerD),
                  at(along, railY, outerD), at(along, railY, innerD),
                  [0, 0], [0.56, 0], [0.56, 0.92], [0, 0.92], N);
              }
            }
          }
        }
      }
    }
  }
  /* Descentes d'eaux pluviales : tubes métalliques discrets aux angles
     de quelques façades du centre, avec coudes courts sous la corniche. */
  if (!hall && !rec.mo && dc < 390 && h > 7 && h < 30 && MAT.metal) {
    const roofCenter = polyBox(f), bcx = (roofCenter[0] + roofCenter[2]) * 0.5, bcy = (roofCenter[1] + roofCenter[3]) * 0.5;
    for (const e of fe) {
      const edgeH = e[6] || h;
      if (e[4] < 7 || edgeH < 5 || Math.abs(Math.sin(bcx * 7.13 + bcy * 19.71 + e[5] * 0.37)) > 0.22) continue;
      const nx = ccwF ? e[3] : -e[3], ny = ccwF ? -e[2] : e[2];
      const px = e[0] + e[2] * 0.34 + nx * 0.16;
      const py = e[1] + e[3] * 0.34 + ny * 0.16;
      const half = 0.045, z0 = 0.38, z1 = edgeH - 0.38;
      const A = [px - e[3] * half, z0, -(py + e[2] * half)];
      const B = [px + e[3] * half, z0, -(py - e[2] * half)];
      const C = [B[0], z1, B[2]], D = [A[0], z1, A[2]];
      wallGB.quad(MAT.metal, A, B, C, D, [0, 0], [1, 0], [1, z1 - z0], [0, z1 - z0], [nx, 0, -ny]);
      // Collier de fixation et coude de raccordement au niveau de la gouttière.
      for (const yy of [1.1, Math.min(3.2, edgeH * 0.45), edgeH - 1.0]) {
        const q0 = [px - e[3] * 0.075, yy, -(py + e[2] * 0.075)];
        const q1 = [px + e[3] * 0.075, yy, -(py - e[2] * 0.075)];
        wallGB.quad(MAT.metalLight, q0, q1, [q1[0], yy + 0.035, q1[2]], [q0[0], yy + 0.035, q0[2]], [0, 0], [0.15, 0], [0.15, 0.035], [0, 0.035], [nx, 0, -ny]);
      }
      break;
    }
  }
  let rtint = null, rmat = MAT.slateT, fmat = MAT.flatT;
  if (rec.rc) {
    const L = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }, c = rec.rc.map(L);
    const red = rec.rc[0] > rec.rc[2] * 1.25 && rec.rc[0] > rec.rc[1] * 1.08;
    rtint = c.map((v, q) => clamp(v * 0.75 / [0.171, 0.163, 0.143][q], 0.12, 1.6));
    if (red) rmat = MAT.tileRoofT;
  }
  const flatM = style === 5 ? MAT.zinc : MAT.flatroof, rtris = [];
  for (let k = 0; k < idx.length; k += 3) {
    const a = P(idx[k]), b = P(idx[k + 1]), c = P(idx[k + 2]);
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const nl = Math.hypot(nx, ny, nz) || 1; nx /= nl; ny /= nl; nz /= nl;
    const roof = kinds[k / 3] === '1' || ny > 0.35;
    const rgb = photo ? wallGB : gb;
    if (isHall) continue; /* the halls get their own walls (with real doorways) and roof: buildHall */
    if (roof) rtris.push([a, b, c, ny > 0.97]);
    if (!roof) {
      const hl = Math.hypot(nx, nz) || 1, wnx = nx / hl, wny = -nz / hl; // outward wall normal, world xy
      const cx = (a[0] + b[0] + c[0]) / 3, cy = -(a[2] + b[2] + c[2]) / 3;
      let best = null, bs = 1e9;
      for (const e of fe) {
        const enx = ccwF ? e[3] : -e[3], eny = ccwF ? -e[2] : e[2], al = enx * wnx + eny * wny; if (al < 0.8) continue;
        const d = segNear(cx, cy, e[0], e[1], e[0] + e[2] * e[4], e[1] + e[3] * e[4], _q) + (1 - al) * 20;
        if (d < bs) { bs = d; best = e; }
      }
      let UVw;
      if (best && bs < 3) { const sg = best[2] * wny - best[3] * wnx > 0 ? 1 : -1, e = best; UVw = p => [(e[5] * sg + ((p[0] - e[0]) * e[2] + (-p[2] - e[1]) * e[3]) * sg) / perU, p[1] / perV]; }
      else { const an = Math.round(Math.atan2(wny, wnx) / 0.01) * 0.01, tx = Math.sin(an), ty = -Math.cos(an), o0 = f[0], o1 = f[1]; UVw = p => [((p[0] - o0) * tx + (-p[2] - o1) * ty) / perU, p[1] / perV]; }
      wallGB.tri(mat, a, b, c, UVw(a), UVw(b), UVw(c), tint);
    } else if (ny > 0.97) {
      rgb.tri(rtint ? fmat : flatM, a, b, c, [a[0] / 4, -a[2] / 4], [b[0] / 4, -b[2] / 4], [c[0] / 4, -c[2] / 4], rtint ? rtint.map(v => v * 0.85) : undefined);
    } else {
      const hl = Math.hypot(nx, nz) || 1, tx = -nz / hl, tz = nx / hl, sl = 1 / Math.max(0.25, Math.sqrt(1 - ny * ny));
      const UVr = p => [(p[0] * tx + p[2] * tz) / 3, p[1] * sl / 3];
      rgb.tri(rtint ? rmat : MAT.slate, a, b, c, UVr(a), UVr(b), UVr(c), rtint || undefined);
    }
  }
  /* roof edges: eaves + fascia on pitched roofs, a parapet coping on flat roofs, so buildings don't end like cut boxes */
  if (rtris.length && MAT.eave) {
    const E = new Map(), K = p => Math.round(p[0] * 20) + ',' + Math.round(p[1] * 20) + ',' + Math.round(p[2] * 20), eg = photo ? wallGB : gb;
    for (const tr of rtris) for (let e = 0; e < 3; e++) { const A = tr[e], B = tr[(e + 1) % 3], k1 = K(A), k2 = K(B), key = k1 < k2 ? k1 + '|' + k2 : k2 + '|' + k1, o = E.get(key); if (o) o.n++; else E.set(key, { n: 1, A, B, tr }); }
    for (const { n, A, B, tr } of E.values()) {
      if (n !== 1) continue;
      /* Les arêtes inclinées sont les rampants des pignons, pas des rives :
         ne pas leur appliquer de fascia évite les traits flottants sur les toits. */
      if (!tr[3] && Math.abs(B[1] - A[1]) > 0.28) continue;
      const dx = B[0] - A[0], dz = B[2] - A[2], L = Math.hypot(dx, dz); if (L < 0.4) continue;
      let ox = -dz / L, oz = dx / L; const cx = (tr[0][0] + tr[1][0] + tr[2][0]) / 3, cz = (tr[0][2] + tr[1][2] + tr[2][2]) / 3;
      if ((cx - A[0]) * ox + (cz - A[2]) * oz > 0) { ox = -ox; oz = -oz; }
      const N = [ox, 0, oz];
      if (tr[3]) { /* flat: low parapet */
        const h = 0.4, ix = -ox * 0.22, iz = -oz * 0.22;
        eg.quad(MAT.coping, [A[0] + ox * 0.03, A[1] - 0.3, A[2] + oz * 0.03], [B[0] + ox * 0.03, B[1] - 0.3, B[2] + oz * 0.03], [B[0] + ox * 0.03, B[1] + h, B[2] + oz * 0.03], [A[0] + ox * 0.03, A[1] + h, A[2] + oz * 0.03], [0, 0], [L / 3, 0], [L / 3, 0.2], [0, 0.2], N);
        eg.quad(MAT.coping, [A[0] + ox * 0.03, A[1] + h, A[2] + oz * 0.03], [B[0] + ox * 0.03, B[1] + h, B[2] + oz * 0.03], [B[0] + ix, B[1] + h, B[2] + iz], [A[0] + ix, A[1] + h, A[2] + iz], [0, 0], [L / 3, 0], [L / 3, 0.1], [0, 0.1], [0, 1, 0]);
        eg.quad(MAT.coping, [A[0] + ix, A[1] + h, A[2] + iz], [B[0] + ix, B[1] + h, B[2] + iz], [B[0] + ix, B[1], B[2] + iz], [A[0] + ix, A[1], A[2] + iz], [0, 0], [L / 3, 0], [L / 3, 0.2], [0, 0.2], [-ox, 0, -oz]);
      } else { /* pitched: overhanging eave + fascia board */
        const ov = 0.38, A2 = [A[0] + ox * ov, A[1] - 0.12, A[2] + oz * ov], B2 = [B[0] + ox * ov, B[1] - 0.12, B[2] + oz * ov];
        eg.quad(MAT.eave, [A[0], A[1] + 0.03, A[2]], [B[0], B[1] + 0.03, B[2]], B2, A2, [0, 0], [L / 2, 0], [L / 2, 0.2], [0, 0.2], [ox * 0.4, 1, oz * 0.4]);
        eg.quad(MAT.eave, A2, B2, [B2[0], B2[1] - 0.22, B2[2]], [A2[0], A2[1] - 0.22, A2[2]], [0, 0], [L / 2, 0], [L / 2, 0.1], [0, 0.1], N);
        eg.quad(MAT.eave, [A2[0], A2[1] - 0.22, A2[2]], [B2[0], B2[1] - 0.22, B2[2]], [B[0], B[1] - 0.3, B[2]], [A[0], A[1] - 0.3, A[2]], [0, 0], [L / 2, 0], [L / 2, 0.1], [0, 0.1], [0, -1, 0]);
      }
    }
  }
  /* street-level shopfronts on walls that face a road */
  if (false && rec.sh) {
    const sh = rec.sh, cx = (f[0] + f[2]) / 2, cy = (f[1] + f[3]) / 2;
    const soif = Math.hypot(cx + 384, cy - 124) < 260;
    for (let q = 0; q < sh.length; q += 6) {
      const ax = ox + sh[q] / 10, ay = oy + sh[q + 1] / 10, bx = ox + sh[q + 2] / 10, by = oy + sh[q + 3] / 10, nx = sh[q + 4], ny = sh[q + 5];
      const L = Math.hypot(bx - ax, by - ay); if (L < 3) continue;
      const mx = (ax + bx) / 2 + nx * 5, my = (ay + by) / 2 + ny * 5, rd = roadAtTile(t, mx, my);
      if (!rd || rd[5] === 3 || rd[5] === 4) continue;
      const sm = soif && R() < 0.85 ? facadeMats.shop[0] : facadeMats.shop[(R() * facadeMats.shop.length) | 0];
      const o = 0.04, u0 = R() * 4, u1 = u0 + L / sm.userData.perU;
      wallGB.quad(sm, [ax + nx * o, 0, -(ay + ny * o)], [bx + nx * o, 0, -(by + ny * o)], [bx + nx * o, 4.2, -(by + ny * o)], [ax + nx * o, 4.2, -(ay + ny * o)], [u0, 0], [u1, 0], [u1, 1], [u0, 1], [nx, 0, -ny], tint);
    }
  }
}
function loadAtlases(t, n) {
  t.atlas = [];
  for (let a = 0; a < n; a++) {
    const tex = texLoader.load(`tiles/a${t.i}_${t.j}_${a}.jpg`); tex.encoding = THREE.sRGBEncoding; tex.anisotropy = MAXANISO;
    const m = M({ map: tex, roughness: 0.88, metalness: 0 }); m.userData.atlas = true; m.envMapIntensity = MODE.night ? 0.42 : 0.9;
    t.atlas.push(m);
  }
}

/* ---------- roads ---------- */
function roadAtTile(t, x, y) {
  const s = new Set(); t.seg.query(x, y, x, y, s);
  for (const r of s) { const d = segNear(x, y, r[0], r[1], r[2], r[3], _q); if (d < r[4]) return r; }
  return roadAt(x, y);
}
function roadMat(r, cx, cy) {
  const k = r[1], f = r[2];
  if (k === 3) return [MAT.highway, 0, 7];
  if (k === 0) return [MAT.road, 0, 7];
  if (k === 1) { if (f & 8) return Math.hypot(cx - OLDTOWN.x, cy - OLDTOWN.y) < 700 ? [MAT.cobble, SW + 0.008, 2.2] : [MAT.square, SW + 0.008, 3]; return [MAT.asphalt, SW + 0.006, 7]; }
  if (k === 4) return [MAT.ballast, SW + 0.005, 3];
  return [MAT.path, SW + 0.004, 3];
}
const isLiving = r => r[1] === 1 && (r[2] & 8) && Math.abs(r[0] - 5.5) < 0.01;
const isLowered = r => r[1] === 0 || r[1] === 3 || isLiving(r);
/* is (x,y) on a lowered street, with a margin of m metres beyond its kerb? */
function onCarriageway(t, x, y, m) {
  if (inCW(x, y)) return true;
  const e = Math.min(m, 1.2) - 0.6; if (e <= 0.05) return false;
  return inCW(x + e, y) || inCW(x - e, y) || inCW(x, y + e) || inCW(x, y - e);
}
/* Cœurs de carrefour issus d'OSM (outils/streets.py, clé jc) : pas de marquage dedans. */
function inJunction(t, x, y) {
  const J = t.jc; if (!J) return false;
  for (let i = 0; i < J.length; i++) { const dx = x - J[i][0], dy = y - J[i][1], rr = J[i][2] + 0.6; if (dx * dx + dy * dy < rr * rr) return true; }
  return false;
}
/* Comme inJunction, les zébras OSM définissent des zones où aucun trait axial
   ni séparateur de voie ne doit être dessiné. */
function inCrossing(t, x, y) {
  const C = t.xc; if (!C) return false;
  for (let i = 0; i < C.length; i++) { const dx=x-C[i][0], dy=y-C[i][1], rr=C[i][2]+0.45; if (dx*dx+dy*dy < rr*rr) return true; }
  return false;
}
function addRoad(gb0, t, r) {
  const w = r[0], kind = r[1], flags = r[2], p = r.slice(4), bridge = !!(flags & 2 && r.bh);
  const gb = bridge ? new GB() : gb0;
  if (kind === 2 && !(flags & 2) && !lcGrass((p[0] + p[p.length - 2]) / 2, (p[1] + p[p.length - 1]) / 2)) return;
  const [mat, y, s] = roadMat(r, p[0], p[1]);
  const hw = w / 2, low = isLowered(r) && t.hasRP && !(flags & 2);
  if (t.hasRF && kind === 1 && (flags & 8) && Math.abs(w - 7) < 0.01 && !(flags & 2)) return;
  for (let i = 0; i < p.length - 2; i += 2) {
    const ax = p[i], ay = p[i + 1], bx = p[i + 2], by = p[i + 3], dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy) || 1;
    const qx = -dy / l * hw, qy = dx / l * hw;
    const P = [[ax + qx, ay + qy], [bx + qx, by + qy], [bx - qx, by - qy], [ax - qx, ay - qy]];
    if (!low) { /* raised surfaces are cut where they cross a lowered carriageway */
      const nP = Math.max(1, Math.ceil(l / 2.5));
      for (let q = 0; q < nP; q++) {
        const f0 = q / nP, f1 = (q + 1) / nP, mx = ax + dx * (f0 + f1) / 2, my = ay + dy * (f0 + f1) / 2;
        if (t.hasRP && !bridge && onCarriageway(t, mx, my, hw)) continue;
        const Q = [[ax + dx * f0 + qx, ay + dy * f0 + qy], [ax + dx * f1 + qx, ay + dy * f1 + qy], [ax + dx * f1 - qx, ay + dy * f1 - qy], [ax + dx * f0 - qx, ay + dy * f0 - qy]];
        gb.quad(mat, ...Q.map(c => [c[0], y, -c[1]]), ...Q.map(c => [c[0] / s, c[1] / s]), [0, 1, 0]);
      }
    }
    if (kind === 4) for (const o of [-0.72, 0.72]) {
      const ox = -dy / l * o, oy = dx / l * o, rx = -dy / l * 0.04, ry = dx / l * 0.04;
      gb.quad(MAT.rail, [ax + ox - rx, SW + 0.15, -(ay + oy - ry)], [bx + ox - rx, SW + 0.15, -(by + oy - ry)], [bx + ox + rx, SW + 0.15, -(by + oy + ry)], [ax + ox + rx, SW + 0.15, -(ay + oy + ry)], [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
    }
    if ((flags & 2) && kind !== 2 && kind !== 4) {
      /* Bridge deck: thin soffit, visible edge fascia and pedestrian parapet.
         (qx, qy) vaut déjà hw : on repasse par le vecteur unitaire (ux2, uy2). */
      const ux2 = qx / hw, uy2 = qy / hw;
      const inner = Math.max(0.18, Math.min(0.32, w * 0.035));
      gb.quad(MAT.stone,
        [ax + ux2 * (hw - inner), y - 0.48, -(ay + uy2 * (hw - inner))],
        [bx + ux2 * (hw - inner), y - 0.48, -(by + uy2 * (hw - inner))],
        [bx - ux2 * (hw - inner), y - 0.48, -(by - uy2 * (hw - inner))],
        [ax - ux2 * (hw - inner), y - 0.48, -(ay - uy2 * (hw - inner))],
        [0, 0], [l / 3, 0], [l / 3, w / 3], [0, w / 3], [0, 1, 0]);
      for (const sg of [1, -1]) {
        const ex = ax + ux2 * sg * hw, ey = ay + uy2 * sg * hw;
        const fx = bx + ux2 * sg * hw, fy = by + uy2 * sg * hw;
        const ix = ax + ux2 * sg * (hw - inner), iy = ay + uy2 * sg * (hw - inner);
        const jx = bx + ux2 * sg * (hw - inner), jy = by + uy2 * sg * (hw - inner);
        const N = [qx * sg, 0, -qy * sg];
        gb.quad(MAT.stone,
          [ex, y - 0.48, -ey], [fx, y - 0.48, -fy],
          [fx, y, -fy], [ex, y, -ey],
          [0, 0], [l / 3, 0], [l / 3, 0.24], [0, 0.24], N);
        gb.quad(MAT.stone,
          [ex, y, -ey], [fx, y, -fy],
          [fx, y + 1.05, -fy], [ex, y + 1.05, -ey],
          [0, 0], [l / 3, 0], [l / 3, 0.35], [0, 0.35], N);
        const ox = ux2 * sg * 0.08, oy = uy2 * sg * 0.08;
        gb.quad(MAT.stone,
          [ex + ox, y + 1.05, -(ey + oy)], [fx + ox, y + 1.05, -(fy + oy)],
          [fx - ox, y + 1.05, -(fy - oy)], [ex - ox, y + 1.05, -(ey - oy)],
          [0, 0], [l / 3, 0], [l / 3, 0.12], [0, 0.12], [0, 1, 0]);
      }
    }
  }
  if ((kind < 2 || kind === 3) && !low && !bridge) for (let i = 0; i < p.length; i += 2) { // round joints
    const x = p[i], yy = p[i + 1];
    if (t.hasRP && onCarriageway(t, x, yy, hw)) continue;
    for (let k = 0; k < 10; k++) {
      const a0 = k / 10 * Math.PI * 2, a1 = (k + 1) / 10 * Math.PI * 2;
      const A = [x, y, -yy], B = [x + Math.cos(a0) * hw, y, -(yy + Math.sin(a0) * hw)], C = [x + Math.cos(a1) * hw, y, -(yy + Math.sin(a1) * hw)];
      gb.tri(mat, A, C, B, [x / s, yy / s], [(x + Math.cos(a1) * hw) / s, (yy + Math.sin(a1) * hw) / s], [(x + Math.cos(a0) * hw) / s, (yy + Math.sin(a0) * hw) / s]);
    }
  }
  /* Reprises d'enrobé irrégulières : petites plaques de réparation intégrées
     à la chaussée. Le placement est hashé sur les coordonnées, indépendant du
     RNG global et stable entre deux reconstructions de tuiles. */
  if (kind === 0 && w >= 5.2 && !bridge && MAT.asphaltRepair) {
    let accPatch = 0;
    for (let i = 0; i < p.length - 2; i += 2) {
      const ax = p[i], ay = p[i + 1], bx = p[i + 2], by = p[i + 3];
      const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
      const count = Math.floor(len / 15);
      for (let q = 0; q < count; q++) {
        const seed = Math.sin((ax + bx) * 12.9898 + (ay + by) * 78.233 + (q + accPatch) * 37.719) * 43758.5453;
        const rnd = seed - Math.floor(seed);
        if (rnd > 0.36) continue;
        const along = 4.5 + (q + rnd) * 15, lateral = (Math.sin(seed * 4.17) * 0.5) * Math.max(0, hw - 1.1);
        if (along > len - 1.8) continue;
        const cx = ax + ux * along + nx * lateral, cy = ay + uy * along + ny * lateral;
        if (Math.hypot(cx - CENTER.x, cy - CENTER.y) > 850) continue;
        const plen = 0.75 + rnd * 1.25, pw = 0.45 + (1 - rnd) * 0.5;
        const skew = Math.sin(seed * 2.3) * 0.18;
        const A = [cx - ux * plen - nx * (pw + skew), y + 0.018, -(cy - uy * plen - ny * (pw + skew))];
        const B = [cx + ux * plen - nx * (pw - skew), y + 0.018, -(cy + uy * plen - ny * (pw - skew))];
        const C = [cx + ux * plen + nx * pw, y + 0.018, -(cy + uy * plen + ny * pw)];
        const D = [cx - ux * plen + nx * pw, y + 0.018, -(cy - uy * plen + ny * pw)];
        gb.quad(MAT.asphaltRepair, A, B, C, D, [0, 0], [plen * 2, 0], [plen * 2, pw * 2], [0, pw * 2], [0, 1, 0]);
      }
      accPatch += count;
    }
  }
  /* Markings routiers : lignes axiales, séparateurs de voies et rives.
     Les tirets conservent leur phase d'un segment au suivant. */
  const ped = flags & 8;
  if ((kind === 0 && w >= 5.5 && !ped) || kind === 3) {
    const oneway = !!(flags & 1), lines = [];
    if (kind === 3) {
      lines.push([-(hw - 0.42), 0, 0.16], [hw - 0.42, 0, 0.16]);
      if (w >= 7) lines.push([0, 3, 0.13]);
    } else {
      if (oneway) { if (w >= 7.2) lines.push([0, 3, 0.12]); }
      else lines.push([0, 3, 0.13]);
      if (w >= 8.2) lines.push([-(hw - 0.38), 0, 0.10], [hw - 0.38, 0, 0.10]);
      if (w >= 10.2) { const laneOffset = w / 6; lines.push([-laneOffset, 3, 0.10], [laneOffset, 3, 0.10]); }
    }
    for (const [off, gap, lw] of lines) {
      let acc = 0;
      for (let i = 0; i < p.length - 2; i += 2) {
        const ax = p[i], ay = p[i + 1], bx = p[i + 2], by = p[i + 3];
        const dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy) || 1;
        const ux = dx / l, uy = dy / l, qx = -uy, qy = ux;
        const dash = gap ? 3 : l, per = gap ? dash + gap : l + 1;
        let s0 = 0;
        while (s0 < l - 0.001) {
          const ph = gap ? (acc + s0) % per : 0;
          if (gap && ph >= dash) { s0 += per - ph; continue; }
          let s1 = gap ? Math.min(l, s0 + dash - ph) : l;
          if (!gap && s1 - s0 > 1.5) s1 = Math.min(s1, s0 + 1.5); // traits continus découpés pour s'arrêter aux carrefours
          const mx = ax + ux * (s0 + s1) / 2 + qx * off, my = ay + uy * (s0 + s1) / 2 + qy * off;
          if (inJunction(t, mx, my) || inCrossing(t, mx, my)) { s0 = s1 + 0.001; continue; }
          const x0 = ax + ux * s0 + qx * off, y0 = ay + uy * s0 + qy * off;
          const x1 = ax + ux * s1 + qx * off, y1 = ay + uy * s1 + qy * off;
          gb.quad(MAT.mark,
            [x0 + qx * lw, y + 0.014, -(y0 + qy * lw)],
            [x1 + qx * lw, y + 0.014, -(y1 + qy * lw)],
            [x1 - qx * lw, y + 0.014, -(y1 - qy * lw)],
            [x0 - qx * lw, y + 0.014, -(y0 - qy * lw)],
            [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
          s0 = s1 + 0.001;
        }
        acc += l;
      }
    }
  }
  if (bridge) { /* lift the whole deck to a straight line between its two (embankment) ends, over whatever terrain lies below */
    const bh = r.bh;
    for (const [m, o] of gb.b) {
      const d = gb0.get(m);
      for (let v = 0; v < o.p.length; v += 3) {
        const x = o.p[v], yy = -o.p[v + 2]; let best = 1e9, hd = 0;
        for (let i = 0; i < p.length - 2; i += 2) { const dd = segNear(x, yy, p[i], p[i + 1], p[i + 2], p[i + 3], _q); if (dd < best) { best = dd; hd = bh[i / 2] + (bh[i / 2 + 1] - bh[i / 2]) * _q[2]; } }
        o.p[v + 1] += hd - th(x, yy);
      }
      d.p.push(...o.p); d.n.push(...o.n); d.u.push(...o.u); d.c.push(...o.c);
    }
  }
}
/* granite kerb along the carriageway outline (road on the left of the polyline), with gutter and corner bollards */
/* ---------- urban steps (OpenStreetMap highway=steps): treads, nosings, cheeks, handrails ---------- */
function buildSteps(gb, t, list) {
  t.stairs = t.stairs || new Grid(8);
  for (const s of list) {
    const w = Math.max(1.4, Math.min(s[0], 8)), n0 = s[1], inc = s[2], hand = s[3], p = s.slice(4);
    let L = 0; const cum = [0]; for (let i = 2; i < p.length; i += 2) { L += Math.hypot(p[i] - p[i - 2], p[i + 1] - p[i - 1]); cum.push(L); }
    if (L < 0.8) continue;
    if (licesOwns(p)) continue; /* built by hand, see buildLices */
    if (METRO.ent.some(e => Math.hypot((e.cx || e.x) - p[0], (e.cy || e.y) - p[1]) < 14 || Math.hypot((e.cx || e.x) - p[p.length - 2], (e.cy || e.y) - p[p.length - 1]) < 14)) continue; /* the métro stairs are built by the stations */
    /* ground level just beyond each end of the flight (the relief model is detailed around steps and retaining walls) */
    const ext = (i, j) => { const ex = p[i] - p[j], ey = p[i + 1] - p[j + 1], l = Math.hypot(ex, ey) || 1, s = (n0 && n0 < 8 ? [1, 2] : [1, 2, 3, 4]).map(d => th(p[i] + ex / l * d, p[i + 1] + ey / l * d)); return [Math.min(...s), Math.max(...s), s[0]]; };
    const e0 = ext(0, 2), e1 = ext(p.length - 2, p.length - 4); let up = e1[2] >= e0[2];
    let h0 = up ? e0[0] : e0[1], h1 = up ? e1[1] : e1[0];
    let R = Math.abs(h1 - h0);
    if (R < 0.35) { if (!n0) continue; R = Math.min(n0 * 0.16, 0.9); up = inc >= 0; if (up) h1 = h0 + R; else h0 = h1 + R; }
    else if (n0 && R < n0 * 0.1) { R = Math.min(n0 * 0.16, R + 0.5); if (up) h1 = h0 + R; else h0 = h1 + R; }
    if (n0 && R > n0 * 0.19) { R = n0 * 0.19; if (up) h1 = h0 + R; else h0 = h1 + R; } /* a short flight never climbs a whole wall */
    const N = Math.max(2, n0 || Math.round(R / 0.16)), base = Math.min(h0, h1);
    const hAt = u => { const f = Math.min(N - 1, Math.floor(u * N)); return up ? base + (f + 1) * R / N : base + R - f * R / N; };
    const P = u => { const d = u * L; let i = 1; while (i < cum.length - 1 && cum[i] < d) i++; const f = (d - cum[i - 1]) / (cum[i] - cum[i - 1] || 1); return [p[(i - 1) * 2] + (p[i * 2] - p[(i - 1) * 2]) * f, p[(i - 1) * 2 + 1] + (p[i * 2 + 1] - p[(i - 1) * 2 + 1]) * f, i]; };
    const hw = w / 2;
    for (let k = 0; k < N; k++) {
      const u0 = k / N, u1 = (k + 1) / N, A = P(u0), B = P(u1), dx = B[0] - A[0], dy = B[1] - A[1], l = Math.hypot(dx, dy) || 1, qx = -dy / l * hw, qy = dx / l * hw;
      const top = hAt((u0 + u1) / 2), rel = (x, y) => top - th(x, y) + SW, low = (x, y) => Math.min(base, th(x, y)) - th(x, y) + SW - 0.25;
      const c = [[A[0] + qx, A[1] + qy], [B[0] + qx, B[1] + qy], [B[0] - qx, B[1] - qy], [A[0] - qx, A[1] - qy]];
      gb.quad(MAT.stair, ...c.map(v => [v[0], rel(v[0], v[1]), -v[1]]), [0, 0], [l, 0], [l, w], [0, w], [0, 1, 0]);
      const riser = up ? [c[3], c[0]] : [c[1], c[2]], rx = up ? -dx / l : dx / l, ry = up ? -dy / l : dy / l;
      gb.quad(MAT.stairNose, [riser[0][0], low(...riser[0]), -riser[0][1]], [riser[1][0], low(...riser[1]), -riser[1][1]], [riser[1][0], rel(...riser[1]), -riser[1][1]], [riser[0][0], rel(...riser[0]), -riser[0][1]], [0, 0], [w, 0], [w, 0.2], [0, 0.2], [rx, 0, -ry]);
      for (const [e0, e1, sg] of [[c[0], c[1], 1], [c[2], c[3], -1]]) gb.quad(MAT.wallLow, [e0[0], low(...e0), -e0[1]], [e1[0], low(...e1), -e1[1]], [e1[0], rel(...e1), -e1[1]], [e0[0], rel(...e0), -e0[1]], [0, 0], [l, 0], [l, 0.3], [0, 0.3], [qx / hw * sg, 0, -qy / hw * sg]);
      t.stairs.add(Math.min(A[0], B[0]) - hw, Math.min(A[1], B[1]) - hw, Math.max(A[0], B[0]) + hw, Math.max(A[1], B[1]) + hw, { ax: A[0], ay: A[1], bx: B[0], by: B[1], hw, h0: up ? base + R * u0 : base + R * (1 - u0), h1: up ? base + R * u1 : base + R * (1 - u1) });
    }
    { /* top landing, retained by walls when the relief does not reach the top of the flight */
      const tEnd = up ? 1 : 0, E = P(tEnd), Bq = P(up ? 0.97 : 0.03), dx = E[0] - Bq[0], dy = E[1] - Bq[1], l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l, qx = -uy * hw, qy = ux * hw, topH = base + R;
      if (topH - th(E[0], E[1]) > 0.4) {
        const LL = 2.6, c = [[E[0] + qx, E[1] + qy], [E[0] + ux * LL + qx, E[1] + uy * LL + qy], [E[0] + ux * LL - qx, E[1] + uy * LL - qy], [E[0] - qx, E[1] - qy]];
        const rel = (x, y) => topH - th(x, y) + SW, low = (x, y) => -0.3 + SW;
        gb.quad(MAT.stair, ...[c[0], c[3], c[2], c[1]].map(v => [v[0], rel(...v), -v[1]]), [0, 0], [w, 0], [w, LL], [0, LL], [0, 1, 0]);
        for (const [e0, e1] of [[c[0], c[1]], [c[1], c[2]], [c[2], c[3]]]) { const ex = e1[0] - e0[0], ey = e1[1] - e0[1], el = Math.hypot(ex, ey) || 1; gb.quad(MAT.wallLow, [e0[0], low(), -e0[1]], [e1[0], low(), -e1[1]], [e1[0], rel(...e1), -e1[1]], [e0[0], rel(...e0), -e0[1]], [0, 0], [el / 2, 0], [el / 2, 1], [0, 1], [ey / el, 0, ex / el]); }
        t.stairs.add(Math.min(...c.map(v => v[0])), Math.min(...c.map(v => v[1])), Math.max(...c.map(v => v[0])), Math.max(...c.map(v => v[1])), { ax: E[0], ay: E[1], bx: E[0] + ux * LL, by: E[1] + uy * LL, hw, h0: topH, h1: topH });
        for (const sg of [1, -1]) { const o = hw + 0.05; for (let k = 0; k < 3; k++) { const a = [E[0] + ux * LL * k / 3 - uy * o * sg, E[1] + uy * LL * k / 3 + ux * o * sg], b2 = [E[0] + ux * LL * (k + 1) / 3 - uy * o * sg, E[1] + uy * LL * (k + 1) / 3 + ux * o * sg]; gb.quad(MAT.fence, [a[0], rel(...a) + 0.95, -a[1]], [b2[0], rel(...b2) + 0.95, -b2[1]], [b2[0], rel(...b2) + 1.0, -b2[1]], [a[0], rel(...a) + 1.0, -a[1]], [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]); } }
      }
    }
    if (hand || R > 1.2 || w > 3) for (const sg of [1, -1]) {
      const o = hw - 0.12;
      for (let k = 0; k < 12; k++) {
        const u0 = k / 12, u1 = (k + 1) / 12, A = P(u0), B = P(u1), dx = B[0] - A[0], dy = B[1] - A[1], l = Math.hypot(dx, dy) || 1, qx = -dy / l * o * sg, qy = dx / l * o * sg;
        const ha = (up ? base + R * u0 : base + R * (1 - u0)) + 0.95, hb = (up ? base + R * u1 : base + R * (1 - u1)) + 0.95;
        const a = [A[0] + qx, A[1] + qy], b = [B[0] + qx, B[1] + qy], ex = -qy / o * 0.03, ey = qx / o * 0.03;
        gb.quad(MAT.fence, [a[0], ha - th(...a) + SW, -a[1]], [b[0], hb - th(...b) + SW, -b[1]], [b[0], hb - th(...b) + SW + 0.05, -b[1]], [a[0], ha - th(...a) + SW + 0.05, -a[1]], [0, 0], [1, 0], [1, 1], [0, 1], [qx, 0, -qy]);
        if (k % 4 === 0) gb.quad(MAT.fence, [a[0] - ex, SW + ha - 0.95 - th(...a), -(a[1] - ey)], [a[0] + ex, SW + ha - 0.95 - th(...a), -(a[1] + ey)], [a[0] + ex, ha - th(...a) + SW, -(a[1] + ey)], [a[0] - ex, ha - th(...a) + SW, -(a[1] - ey)], [0, 0], [1, 0], [1, 1], [0, 1], [qx, 0, -qy]);
      }
    }
  }
}
/* ---------- Place des Lices: the flight of steps, the ramp and the granite terrace between the upper level (rue des Lices)
   and the cobbled lower square by the Halles, modelled from photographs; local frame: s up the flight, t to the left ---------- */
const LICES = { O: [-471.8, 93.8], u: [0.8417, 0.5399], L0: 0, T: 0 };
function licesW(s, t) { const [ux, uy] = LICES.u; return [LICES.O[0] + ux * s - uy * t, LICES.O[1] + uy * s + ux * t]; }
function licesL(x, y) { const [ux, uy] = LICES.u, dx = x - LICES.O[0], dy = y - LICES.O[1]; return [dx * ux + dy * uy, -dx * uy + dy * ux]; }
function licesOwns(p) { for (let i = 0; i < p.length; i += 2) { const [s, t] = licesL(p[i], p[i + 1]); if (s < -1.5 || s > 8 || t < -8 || t > 7.8) return false; } return true; }
const LZ = { STOP: 7.9, SB: 1.05, SL: 1.8, ST: 6.3, SR: 6.4, F0: -2.7, F1: 2.6, B1: 7.3, R0: -6.0, R1: -3.0, P0: -6.3, W0: -3.0, W1: -2.7, K0: -8.6, KS0: 4.0, KS1: 6.4 };
function licesH(x, y) {
  const [s, t] = licesL(x, y), { L0, T } = LICES;
  if (s < -0.02 || s > LZ.STOP) return null;
  if (s > LZ.SR && t >= LZ.P0 && t <= LZ.B1) return T;
  if (t >= LZ.P0 && t < LZ.W1) return t < LZ.R1 + 0.15 ? L0 + (T - L0) * Math.min(1, Math.max(0, s) / LZ.SR) : null;
  if (t < LZ.W1 || t > LZ.B1) return null;
  if (s < LZ.SB) return L0 + 0.45 * Math.max(0, s) / LZ.SB;
  if (s > LZ.ST + 0.05) return null;
  if (t > LZ.F1) return T;
  return s < LZ.SL ? L0 + 0.45 : L0 + 0.45 + (T - L0 - 0.45) * Math.min(1, (s - LZ.SL) / (LZ.ST - LZ.SL));
}
function buildLices(gb, t) {
  const { O } = LICES; t.stairs = t.stairs || new Grid(8);
  LICES.L0 = Math.min(th(...licesW(-1.5, 0)), th(...licesW(-1.5, 3)), th(...licesW(-1.5, -3)));
  { let m = -1e9; for (let a = 6.5; a <= 8.6; a += 0.5) for (let b = -6; b <= 7; b += 1) m = Math.max(m, th(...licesW(a, b))); LICES.T = m + 0.03; } /* just above the street: the landing masks the ground */
  const { L0, T } = LICES, [ux, uy] = LICES.u, U = [ux, 0, -uy], N = [-uy, 0, -ux], UP = [0, 1, 0];
  /* the structure masks the ground plane (stencil, like the carriageways): the relief model is only 2 m fine around it */
  if (!LICES.M) { LICES.M = {}; for (const k of ['stair', 'stairNose', 'wallLow', 'asphalt']) { const m = MAT[k].clone(); Object.assign(m, { stencilWrite: true, stencilRef: 1, stencilFunc: THREE.AlwaysStencilFunc, stencilZPass: THREE.ReplaceStencilOp }); allMats.push(m); LICES.M[k] = m; } }
  if (!LICES.cob) { LICES.cob = MAT.cobble.clone(); Object.assign(LICES.cob, { polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }); allMats.push(LICES.cob); }
  if (!LICES.F) { const sign = (txt, bg, fg, w, h, font) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); g.fillStyle = bg; g.fillRect(0, 0, w, h); g.fillStyle = fg; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, w / 2, h / 2 + 2); const tx = canvasTex(c, true); tx.wrapS = tx.wrapT = THREE.ClampToEdgeWrapping; return tx; };
    const doorC = document.createElement('canvas'); doorC.width = 128; doorC.height = 256; { const g = doorC.getContext('2d'); g.fillStyle = '#3a2a22'; g.fillRect(0, 0, 128, 256); g.strokeStyle = '#1e1612'; g.lineWidth = 6; g.strokeRect(6, 6, 56, 244); g.strokeRect(66, 6, 56, 244); g.fillStyle = '#9aa0a4'; g.fillRect(52, 120, 6, 30); g.fillRect(70, 120, 6, 30); }
    const shopC = document.createElement('canvas'); shopC.width = 256; shopC.height = 256; { const g = shopC.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#f4e2b8'); gr.addColorStop(1, '#b89a68'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); g.fillStyle = '#d8dcdc'; for (let x = 20; x < 256; x += 60) g.fillRect(x, 150, 40, 100); g.fillStyle = '#fff6d8'; for (let x = 30; x < 256; x += 50) g.fillRect(x, 20, 8, 8); g.strokeStyle = '#2a2a2a'; g.lineWidth = 8; g.strokeRect(0, 0, 256, 256); }
    const U2 = o => { const m = M(o); allMats.push(m); return m; }, tex = c => { const t2 = canvasTex(c, true); t2.wrapS = t2.wrapT = THREE.ClampToEdgeWrapping; return t2; };
    LICES.F = { glass: M({ color: 0x1c2a34, roughness: 0.08, metalness: 0.6 }), frame: M({ color: 0x2a2826, roughness: 0.5, metalness: 0.5 }), band: M({ color: 0xc8642a, roughness: 0.6 }),
      door: M({ map: tex(doorC), roughness: 0.7 }), shop: M({ map: tex(shopC), emissive: 0xffe0a8, emissiveIntensity: 0.25, emissiveMap: tex(shopC), roughness: 0.2 }),
      park: M({ map: sign('ACCÈS PARKING DES LICES', '#1a1a1a', '#f0f0f0', 512, 48, 'bold 30px sans-serif') }), bijou: M({ map: sign('BIJOUX', '#5a3a1e', '#e8c860', 256, 48, 'bold 30px serif') }),
      dark: M({ color: 0x141414, roughness: 1 }), tile: (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#9aa4a8'; g.fillRect(0, 0, 128, 128); g.fillStyle = '#eef2f2'; for (let x = 0; x < 128; x += 32) for (let y = 0; y < 128; y += 32) g.fillRect(x + 1, y + 1, 30, 30); const tx = canvasTex(c, true); return M({ map: tx, roughness: 0.25 }); })(), porc: M({ color: 0xf4f4f0, roughness: 0.15 }), lamp: new THREE.MeshBasicMaterial({ color: 0xfff6e0 }), wc: M({ map: sign('WC', '#2a4a8a', '#ffffff', 128, 64, 'bold 40px sans-serif') }), green: M({ color: 0x3ad050, emissive: 0x1a8a28, roughness: 0.4 }), num: M({ map: sign('13', '#1a1a1a', '#e8e8e8', 64, 64, 'bold 40px sans-serif') }) }; }
  const MS = LICES.M, base = m => { for (const k in MS) if (MS[k] === m) return MAT[k]; return m; };
  const V = (s, tt, h) => { const [x, y] = licesW(s, tt); return [x, h - th(x, y) + SW, -y]; };
  const neg = v => v.map(c => -c);
  /* one planar face given by 4 local corners [s,t,h]; uv in metres / 1.6 */
  const face = (mat, q, n) => { const P = q.map(c => V(...c)), horiz = n === UP;
    const uv = q.map((c, k) => horiz ? [P[k][0] / 1.6, -P[k][2] / 1.6] : [(n === U || n === neg(U) || Math.abs(n[0] * ux - n[2] * uy) > 0.7 ? c[1] : c[0]) / 1.6, c[2] / 1.6]);
    gb.quad(mat, ...P, ...uv, n); };
  const box = (mat, s0, s1, t0, t1, hb, ht, top = true) => { /* ht may be a function of s for a sloping top */
    const H = typeof ht === 'function' ? ht : () => ht, top0 = mat; mat = base(mat); /* only the walking surfaces mask the ground; walls reach below it */
    if (top) face(top0, [[s0, t0, H(s0)], [s1, t0, H(s1)], [s1, t1, H(s1)], [s0, t1, H(s0)]], UP);
    face(mat, [[s0, t0, hb], [s0, t1, hb], [s0, t1, H(s0)], [s0, t0, H(s0)]], neg(U));
    face(mat, [[s1, t0, hb], [s1, t1, hb], [s1, t1, H(s1)], [s1, t0, H(s1)]], U);
    const n = Math.max(1, Math.round((s1 - s0) / 0.8));
    for (let k = 0; k < n; k++) { const a = s0 + (s1 - s0) * k / n, b = s0 + (s1 - s0) * (k + 1) / n;
      face(mat, [[a, t0, hb], [b, t0, hb], [b, t0, H(b)], [a, t0, H(a)]], neg(N)); face(mat, [[a, t1, hb], [b, t1, hb], [b, t1, H(b)], [a, t1, H(a)]], N); }
  };
  const low = L0 - 0.4;
  /* the three wide bottom steps, in front of the flight and of the terrace */
  for (let k = 0; k < 3; k++) { const s0 = k * 0.35, s1 = LZ.SB, h = L0 + 0.15 * (k + 1);
    face(MS.stair, [[s0, LZ.W1, h], [s0 + 0.35, LZ.W1, h], [s0 + 0.35, LZ.B1, h], [s0, LZ.B1, h]], UP);
    face(MAT.stairNose, [[s0, LZ.W1, low], [s0, LZ.B1, low], [s0, LZ.B1, h], [s0, LZ.W1, h]], neg(U)); }
  /* landing, then the main flight */
  face(MS.stair, [[LZ.SB, LZ.F0, L0 + 0.45], [LZ.SL, LZ.F0, L0 + 0.45], [LZ.SL, LZ.F1, L0 + 0.45], [LZ.SB, LZ.F1, L0 + 0.45]], UP);
  const NS = 12, run = (LZ.ST - LZ.SL) / NS, rise = (T - L0 - 0.45) / NS;
  for (let k = 0; k < NS; k++) { const s0 = LZ.SL + k * run, h0 = L0 + 0.45 + k * rise, h1 = h0 + rise;
    face(MS.stairNose, [[s0, LZ.F0, h0], [s0, LZ.F1, h0], [s0, LZ.F1, h1], [s0, LZ.F0, h1]], neg(U));
    face(MS.stair, [[s0, LZ.F0, h1], [s0 + run, LZ.F0, h1], [s0 + run, LZ.F1, h1], [s0, LZ.F1, h1]], UP); }
  /* head of the flight: paved landing level with the upper square, over the whole width */
  box(MS.stair, LZ.ST, LZ.STOP, LZ.P0, LZ.B1, low, T);
  /* granite terrace on the left, level with the upper square, retained by walls; wall between flight and ramp; ramp; parapet */
  box(MS.wallLow, LZ.SB, LZ.ST, LZ.F1, LZ.B1, low, T);
  const rampH = s => L0 + (T - L0) * Math.min(1, Math.max(0, s) / LZ.SR);
  const flightH = s => s < LZ.SB ? L0 + 0.45 * s / LZ.SB : s < LZ.SL ? L0 + 0.45 : L0 + 0.45 + (T - L0 - 0.45) * Math.min(1, (s - LZ.SL) / (LZ.ST - LZ.SL));
  box(MS.wallLow, 0, LZ.SR, LZ.W0, LZ.W1, low, s => Math.max(rampH(s), flightH(s)) + 0.25);
  face(MS.wallLow, [[0, LZ.R0, rampH(0) + 0.01], [LZ.SR, LZ.R0, rampH(LZ.SR) + 0.01], [LZ.SR, LZ.R1, rampH(LZ.SR) + 0.01], [0, LZ.R1, rampH(0) + 0.01]], UP);
  box(MS.wallLow, -0.3, LZ.SR, LZ.P0, LZ.R0, low, s => rampH(s) + 0.55);
  /* public toilets: a granite bay of the building itself, next to the ramp, its doorway always open onto a tiled urinal room */
  { const S0 = 4.0, SB = 5.7, S1 = LZ.KS1, TA = LZ.P0, TB = LZ.K0, DA = -6.5, DB = -7.25, ZD = L0 + 2.2, ZT = L0 + 6.6, m = MAT.wallLow, FM = LICES.F;
    face(m, [[S0, TA, low], [S0, DA, low], [S0, DA, ZT], [S0, TA, ZT]], neg(U)); face(m, [[S0, DB, low], [S0, TB, low], [S0, TB, ZT], [S0, DB, ZT]], neg(U)); face(m, [[S0, DA, ZD], [S0, DB, ZD], [S0, DB, ZT], [S0, DA, ZT]], neg(U));
    face(m, [[S0, TA, low], [S1, TA, low], [S1, TA, ZT], [S0, TA, ZT]], N); face(m, [[S1, TA, low], [S1, TB, low], [S1, TB, ZT], [S1, TA, ZT]], U);
    face(m, [[S0, TA, ZT], [S1, TA, ZT], [S1, TB, ZT], [S0, TB, ZT]], UP);
    /* inside: white tiles, a urinal, a light */
    face(FM.tile, [[SB, DA, low], [SB, DB, low], [SB, DB, ZD], [SB, DA, ZD]], neg(U));
    face(FM.tile, [[S0, DA, low], [SB, DA, low], [SB, DA, ZD], [S0, DA, ZD]], neg(N)); face(FM.tile, [[S0, DB, low], [SB, DB, low], [SB, DB, ZD], [S0, DB, ZD]], N);
    face(FM.tile, [[S0, DA, ZD], [SB, DA, ZD], [SB, DB, ZD], [S0, DB, ZD]], [0, -1, 0]);
    box(FM.porc, SB - 0.35, SB - 0.02, -7.05, -6.7, L0 + 0.45, L0 + 1.15); box(FM.lamp, 4.9, 5.1, -6.95, -6.8, ZD - 0.05, ZD - 0.01);
    face(FM.wc, [[S0 - 0.02, -6.62, ZD + 0.15], [S0 - 0.02, -7.13, ZD + 0.15], [S0 - 0.02, -7.13, ZD + 0.45], [S0 - 0.02, -6.62, ZD + 0.45]], neg(U));
  }
  /* ground floor of the building on the square: granite arcades — car park entrance, two shops, the entrance hall */
  { const FM = LICES.F, sf = tt => 4.08 + 0.3 * (-7.4 - tt) / 13.0 - 0.06, T0 = -8.6, T1 = -20.4, HT = L0 + 6.6;
    const fq = (mat, ta, tb, za, zb, ds = 0, uv) => { const A = sf(ta) - ds, B = sf(tb) - ds; face(mat, [[A, ta, za], [B, tb, za], [B, tb, zb], [A, ta, zb]], neg(U)); };
    fq(MAT.wallLow, T0, T1, low, HT); /* granite cladding */
    const PW = 0.9, NB = 4, OW = (Math.abs(T1 - T0) - (NB + 1) * PW) / NB;
    for (let i = 0; i <= NB; i++) { const ta = T0 - i * (OW + PW); box(MAT.wallLow, sf(ta) - 0.28, sf(ta) + 0.02, ta - PW, ta, low, HT - 0.4); }
    for (let i = 0; i < NB; i++) {
      const ta = T0 - PW - i * (OW + PW), tb = ta - OW, ZS = L0 + 4.9, R = OW / 2, tm = (ta + tb) / 2;
      /* upper arched window: dark glass with a square frame, the arch as a fan */
      fq(FM.glass, ta, tb, L0 + 3.3, ZS, 0.03);
      for (let k = 0; k < 10; k++) { const a0 = Math.PI * k / 10, a1 = Math.PI * (k + 1) / 10, p0 = [tm + R * Math.cos(a0), ZS + R * Math.sin(a0)], p1 = [tm + R * Math.cos(a1), ZS + R * Math.sin(a1)];
        const V3 = (tt, z) => V(sf(tt) - 0.03, tt, z); gb.tri(FM.glass, V3(tm, ZS), V3(p1[0], p1[1]), V3(p0[0], p0[1]), [0, 0], [1, 0], [0, 1]); }
      fq(FM.frame, tm - 0.45, tm + 0.45, ZS - 0.25, ZS + 0.65, 0.05); fq(FM.glass, tm - 0.33, tm + 0.33, ZS - 0.13, ZS + 0.53, 0.06);
      fq(FM.band, ta, tb, L0 + 3.6, L0 + 3.85, 0.05);
      fq(FM.frame, ta, tb, L0 + 3.0, L0 + 3.3, 0.04); /* transom */
      /* ground level */
      if (i === 0) { fq(FM.door, ta - 0.15, tb + 0.15, L0, L0 + 2.45, 0.04); fq(FM.park, ta - 0.1, tb + 0.1, L0 + 2.5, L0 + 2.95, 0.05); }
      else if (i === 1) { fq(FM.shop, ta, tb, L0 + 0.3, L0 + 3.0, 0.04); fq(MAT.wallLow, ta, tb, L0, L0 + 0.3, 0.05); }
      else if (i === 2) { fq(FM.shop, ta, tb, L0, L0 + 3.0, 0.04); fq(FM.bijou, ta - 0.1, tb + 0.1, L0 + 2.45, L0 + 2.8, 0.05); fq(FM.green, ta - 0.1, tb + 0.1, L0 + 0.25, L0 + 0.4, 0.05); fq(FM.green, ta - 0.1, tb + 0.1, L0 + 0.55, L0 + 0.7, 0.05); }
      else { fq(FM.glass, ta, tb, L0, L0 + 3.0, 0.04); fq(FM.frame, tm - 0.04, tm + 0.04, L0, L0 + 2.9, 0.05); fq(FM.num, tb + 0.15, tb + 0.6, L0 + 2.4, L0 + 2.8, 0.05); }
    }
    /* bollards in front of the arcades */
    for (let i = 0; i <= NB; i++) { const tt = T0 - i * (OW + PW) - PW / 2; box(FM.frame, sf(tt) - 1.0, sf(tt) - 0.88, tt - 0.06, tt + 0.06, L0, L0 + 0.9); }
  }
  /* railings: rail + posts every ~1.2 m along a local polyline at a height function */
  const rail = (pts, hf, hh = 1.0) => { for (let k = 0; k < pts.length - 1; k++) { const [s0, t0] = pts[k], [s1, t1] = pts[k + 1], L = Math.hypot(s1 - s0, t1 - t0), n = Math.max(1, Math.round(L / 1.2));
      for (let j = 0; j < n; j++) { const a = j / n, b = (j + 1) / n, sa = s0 + (s1 - s0) * a, ta = t0 + (t1 - t0) * a, sb = s0 + (s1 - s0) * b, tb = t0 + (t1 - t0) * b, ha = hf(sa, ta), hb = hf(sb, tb);
        for (const z of [hh, hh * 0.45]) face(MAT.fence, [[sa, ta, ha + z - 0.03], [sb, tb, hb + z - 0.03], [sb, tb, hb + z + 0.03], [sa, ta, ha + z + 0.03]], N);
        face(MAT.fence, [[sa - 0.025, ta, ha], [sa + 0.025, ta, ha], [sa + 0.025, ta, ha + hh], [sa - 0.025, ta, ha + hh]], N);
        if (j === n - 1) face(MAT.fence, [[sb - 0.025, tb, hb], [sb + 0.025, tb, hb], [sb + 0.025, tb, hb + hh], [sb - 0.025, tb, hb + hh]], N); } } };
  rail([[LZ.SB + 0.1, LZ.B1 - 0.2], [LZ.SB + 0.1, LZ.F1 + 0.1], [LZ.ST, LZ.F1 + 0.1]], () => T);
  rail([[0.1, LZ.W0 + 0.15], [LZ.SR, LZ.W0 + 0.15]], s => Math.max(rampH(s), flightH(s)) + 0.25, 0.9);
  rail([[LZ.SL, 0], [LZ.ST, 0]], s => flightH(s), 0.95);
  rail([[0.2, LZ.P0 + 0.15], [LZ.SR, LZ.P0 + 0.15]], s => rampH(s) + 0.55, 0.6);
  /* walking surface and walls for collision */
  const [x0, y0] = licesW(-0.5, LZ.K0), corners = [[-0.5, LZ.K0], [-0.5, LZ.B1], [LZ.STOP + 0.5, LZ.B1], [LZ.STOP + 0.5, LZ.K0]].map(([a, b]) => licesW(a, b));
  t.stairs.add(Math.min(...corners.map(c => c[0])), Math.min(...corners.map(c => c[1])), Math.max(...corners.map(c => c[0])), Math.max(...corners.map(c => c[1])), { fn: licesH });
  const wall = (s0, s1, t0, t1, h) => { const c = [licesW(s0, t0), licesW(s1, t0), licesW(s1, t1), licesW(s0, t1)], b = [Math.min(...c.map(v => v[0])), Math.min(...c.map(v => v[1])), Math.max(...c.map(v => v[0])), Math.max(...c.map(v => v[1]))]; t.obs.add(...b, { p: c.flat(), b, h, low: true }); };
  wall(LZ.SB, LZ.SB + 0.25, LZ.F1, LZ.B1, 3); wall(LZ.SB, LZ.ST, LZ.F1, LZ.F1 + 0.25, 3); /* terrace front and side (railing on top) */
  wall(0, LZ.SR, LZ.W0, LZ.W1, 1.5); wall(-0.3, LZ.SR, LZ.P0, LZ.R0, 1.2); wall(5.7, LZ.KS1, LZ.K0, LZ.P0, 4); wall(4.0, 5.7, -6.5, LZ.P0, 4); wall(4.0, 5.7, LZ.K0, -7.25, 4);
  /* the lower square's setts are drawn by the ground shader (cobble mask, see buildGlobal) */
}
/* ---------- fences, railings, low walls and hedges (OpenStreetMap barrier=*) ---------- */
function buildBarriers(gb, t, list) {
  for (const f of list) {
    const k = f[0], p = f.slice(2), H = f[1] || [1.6, 1.0, 1.3, 1.2, 1.4][k];
    if (METRO.ent.some(e => Math.hypot((e.cx || e.x) - p[0], (e.cy || e.y) - p[1]) < 9)) continue; /* the station stairwell has its own balustrade */
    if (Math.hypot(p[0] - CENTER.x, p[1] - CENTER.y) > 2600 && k === 4) continue;
    if (k < 2 && licesOwns(p)) continue;
    for (let i = 0; i < p.length - 2; i += 2) {
      const ax = p[i], ay = p[i + 1], bx = p[i + 2], by = p[i + 3], dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy); if (l < 0.2) continue;
      const nx = -dy / l, ny = dx / l, sv = (x, y) => SW;
      if (k === 5) { /* quai OSM : mur de maçonnerie, sans garde-corps inventé */
        const hpA=th(ax+nx*1.6,ay+ny*1.6), hnA=th(ax-nx*1.6,ay-ny*1.6), hpB=th(bx+nx*1.6,by+ny*1.6), hnB=th(bx-nx*1.6,by-ny*1.6);
        const topA=Math.max(hpA,hnA,th(ax,ay))+0.12, topB=Math.max(hpB,hnB,th(bx,by))+0.12;
        const botA=Math.min(hpA,hnA,th(ax,ay))-Math.max(1.4,H||2.0), botB=Math.min(hpB,hnB,th(bx,by))-Math.max(1.4,H||2.0);
        const rel=(z,x,y)=>z-th(x,y)+SW, half=0.28;
        const A=[ax+nx*half,ay+ny*half],B=[bx+nx*half,by+ny*half],C=[bx-nx*half,by-ny*half],D=[ax-nx*half,ay-ny*half];
        gb.quad(MAT.stone,[A[0],rel(botA,...A),-A[1]],[B[0],rel(botB,...B),-B[1]],[B[0],rel(topB,...B),-B[1]],[A[0],rel(topA,...A),-A[1]],[0,0],[l/2,0],[l/2,Math.max(1,topB-botB)],[0,Math.max(1,topA-botA)],[nx,0,-ny]);
        gb.quad(MAT.stone,[C[0],rel(botA,...C),-C[1]],[D[0],rel(botB,...D),-D[1]],[D[0],rel(topB,...D),-D[1]],[C[0],rel(topA,...C),-C[1]],[0,0],[l/2,0],[l/2,Math.max(1,topB-botB)],[0,Math.max(1,topA-botA)],[-nx,0,ny]);
        gb.quad(MAT.stone,[A[0],rel(topA,...A),-A[1]],[B[0],rel(topB,...B),-B[1]],[C[0],rel(topB,...C),-C[1]],[D[0],rel(topA,...D),-D[1]],[0,0],[l/2,0],[l/2,0.25],[0,0.25],[0,1,0]);
      } else if (k === 3) { /* retaining wall: from the low ground up to the high ground, railing on top */
        /* wide enough to cover the metre on each side where the 2 m relief model still ramps between the two levels */
        if (!f._rw) { /* once per wall: which side is high, and mitred offsets at the joints */
          let dsum = 0; const m = p.length / 2, sn = [];
          for (let q = 0; q < m - 1; q++) { const ex = p[q * 2 + 2] - p[q * 2], ey = p[q * 2 + 3] - p[q * 2 + 1], el = Math.hypot(ex, ey) || 1, qx = -ey / el, qy = ex / el, mx2 = p[q * 2] + ex / 2, my2 = p[q * 2 + 1] + ey / 2; sn.push([qx, qy]); dsum += (th(mx2 + qx * 2, my2 + qy * 2) - th(mx2 - qx * 2, my2 - qy * 2)) * el; }
          const mit = []; for (let q = 0; q < m; q++) { const a1 = sn[Math.max(0, q - 1)], a2 = sn[Math.min(m - 2, q)]; let mx2 = a1[0] + a2[0], my2 = a1[1] + a2[1]; const ml = Math.hypot(mx2, my2) || 1; mx2 /= ml; my2 /= ml; const cs = Math.max(0.5, mx2 * a2[0] + my2 * a2[1]); mit.push([mx2 / cs, my2 / cs]); }
          let L2 = 0; for (let q = 0; q < m - 1; q++) L2 += Math.hypot(p[q * 2 + 2] - p[q * 2], p[q * 2 + 3] - p[q * 2 + 1]);
          f._rw = { posHigh: dsum > 0.35 * L2, negHigh: dsum < -0.35 * L2, mit };
        }
        const { posHigh, negHigh, mit } = f._rw, MA = mit[i / 2], MB = mit[i / 2 + 1];
        /* the low side is a little thicker: it hides the metre where the 1 m relief model ramps between the levels */
        const op = posHigh ? 0.25 : negHigh ? 0.75 : 0.25, on = negHigh ? 0.25 : posHigh ? 0.75 : 0.25;
        const c = [[ax + MA[0] * op, ay + MA[1] * op], [bx + MB[0] * op, by + MB[1] * op], [bx - MB[0] * on, by - MB[1] * on], [ax - MA[0] * on, ay - MA[1] * on]];
        const hi = (x, y) => Math.max(th(x + nx * 2, y + ny * 2), th(x - nx * 2, y - ny * 2), th(x, y)) + 0.12, lo = (x, y) => Math.min(th(x + nx * 2, y + ny * 2), th(x - nx * 2, y - ny * 2)) - 0.25;
        const tA = hi(ax, ay), tB = hi(bx, by), bA = lo(ax, ay), bB = lo(bx, by), rel = (v, x, y) => v - th(x, y) + SW;
        if (Math.max(tA - bA, tB - bB) < 0.9) { const HH = H; for (const [e0, e1, sg] of [[c[0], c[1], 1], [c[2], c[3], -1]]) gb.quad(MAT.wallLow, [e0[0], SW - 0.3, -e0[1]], [e1[0], SW - 0.3, -e1[1]], [e1[0], SW + HH, -e1[1]], [e0[0], SW + HH, -e0[1]], [0, 0], [l / 2, 0], [l / 2, HH / 2], [0, HH / 2], [nx * sg, 0, -ny * sg]); gb.quad(MAT.wallLow, ...c.map(v => [v[0], SW + HH, -v[1]]), [0, 0], [l / 2, 0], [l / 2, 0.2], [0, 0.2], [0, 1, 0]); }
        else {
          for (const [e0, e1, sg] of [[c[0], c[1], 1], [c[2], c[3], -1]]) { const t0 = e0 === c[0] || e0 === c[3] ? tA : tB, t1 = e1 === c[1] || e1 === c[2] ? tB : tA, b0 = e0 === c[0] || e0 === c[3] ? bA : bB, b1 = e1 === c[1] || e1 === c[2] ? bB : bA; gb.quad(MAT.wallLow, [e0[0], rel(b0, ...e0), -e0[1]], [e1[0], rel(b1, ...e1), -e1[1]], [e1[0], rel(t1, ...e1), -e1[1]], [e0[0], rel(t0, ...e0), -e0[1]], [0, 0], [l / 2, 0], [l / 2, (t0 - b0) / 2], [0, (t0 - b0) / 2], [nx * sg, 0, -ny * sg]); }
          gb.quad(MAT.wallLow, [c[0][0], rel(tA, ...c[0]), -c[0][1]], [c[3][0], rel(tA, ...c[3]), -c[3][1]], [c[2][0], rel(tB, ...c[2]), -c[2][1]], [c[1][0], rel(tB, ...c[1]), -c[1][1]], [0, 0], [0.5, 0], [0.5, l / 2], [0, l / 2], [0, 1, 0]);
          for (const z of [0.95, 0.5]) gb.quad(MAT.fence, [ax, rel(tA, ax, ay) + z - 0.03, -ay], [bx, rel(tB, bx, by) + z - 0.03, -by], [bx, rel(tB, bx, by) + z + 0.03, -by], [ax, rel(tA, ax, ay) + z + 0.03, -ay], [0, 0], [1, 0], [1, 1], [0, 1], [nx, 0, -ny]);
          const nb2 = Math.max(1, Math.round(l / 1.6)); for (let q2 = 0; q2 <= nb2; q2++) { const x = ax + dx * q2 / nb2, y = ay + dy * q2 / nb2, tt = tA + (tB - tA) * q2 / nb2, ex = dx / l * 0.025, ey = dy / l * 0.025; gb.quad(MAT.fence, [x - ex, rel(tt, x, y), -(y - ey)], [x + ex, rel(tt, x, y), -(y + ey)], [x + ex, rel(tt, x, y) + 1.0, -(y + ey)], [x - ex, rel(tt, x, y) + 1.0, -(y - ey)], [0, 0], [1, 0], [1, 1], [0, 1], [nx, 0, -ny]); }
        }
        { const qp = posHigh ? 0.25 : op, qn = negHigh ? 0.25 : on, c2 = [[ax + MA[0] * qp, ay + MA[1] * qp], [bx + MB[0] * qp, by + MB[1] * qp], [bx - MB[0] * qn, by - MB[1] * qn], [ax - MA[0] * qn, ay - MA[1] * qn]], hw = Math.max(qp, qn); /* the high side's top is walkable up to the railing */
          t.obs.add(Math.min(ax, bx) - hw, Math.min(ay, by) - hw, Math.max(ax, bx) + hw, Math.max(ay, by) + hw, { p: c2.flat(), b: [Math.min(...c2.map(v => v[0])), Math.min(...c2.map(v => v[1])), Math.max(...c2.map(v => v[0])), Math.max(...c2.map(v => v[1]))], h: 3, low: true }); }
        continue;
      }
      if (k === 2 || k === 4) { /* solid: wall or hedge */
        const hw = k === 4 ? 0.4 : 0.22, m = k === 4 ? MAT.hedge : MAT.wallLow;
        const c = [[ax + nx * hw, ay + ny * hw], [bx + nx * hw, by + ny * hw], [bx - nx * hw, by - ny * hw], [ax - nx * hw, ay - ny * hw]];
        for (const [e0, e1, sg] of [[c[0], c[1], 1], [c[2], c[3], -1]]) gb.quad(m, [e0[0], SW - 0.3, -e0[1]], [e1[0], SW - 0.3, -e1[1]], [e1[0], SW + H, -e1[1]], [e0[0], SW + H, -e0[1]], [0, 0], [l / 2, 0], [l / 2, H / 2], [0, H / 2], [nx * sg, 0, -ny * sg]);
        gb.quad(m, ...c.map(v => [v[0], SW + H, -v[1]]), [0, 0], [l / 2, 0], [l / 2, 0.2], [0, 0.2], [0, 1, 0]);
        t.obs.add(Math.min(ax, bx) - hw, Math.min(ay, by) - hw, Math.max(ax, bx) + hw, Math.max(ay, by) + hw, { p: c.flat(), b: [Math.min(...c.map(v => v[0])), Math.min(...c.map(v => v[1])), Math.max(...c.map(v => v[0])), Math.max(...c.map(v => v[1]))], h: H, low: true });
      } else if (k !== 5) { /* fence / railing: top rail, bottom rail, bars */
        for (const z of k === 1 ? [0.12, H] : [0.1, H - 0.05]) gb.quad(MAT.fence, [ax, SW + z - 0.03, -ay], [bx, SW + z - 0.03, -by], [bx, SW + z + 0.03, -by], [ax, SW + z + 0.03, -ay], [0, 0], [1, 0], [1, 1], [0, 1], [nx, 0, -ny]);
        const nb = Math.max(1, Math.round(l / (Math.hypot(ax - CENTER.x, ay - CENTER.y) > 1500 ? 0.6 : k === 1 ? 0.14 : 0.2)));
        for (let q = 0; q <= nb; q += 1) { const x = ax + dx * q / nb, y = ay + dy * q / nb, ex = dx / l * 0.012, ey = dy / l * 0.012; gb.quad(MAT.fence, [x - ex, SW, -(y - ey)], [x + ex, SW, -(y + ey)], [x + ex, SW + H, -(y + ey)], [x - ex, SW + H, -(y - ey)], [0, 0], [1, 0], [1, 1], [0, 1], [nx, 0, -ny]); }
        const hw = 0.08, c = [[ax + nx * hw, ay + ny * hw], [bx + nx * hw, by + ny * hw], [bx - nx * hw, by - ny * hw], [ax - nx * hw, ay - ny * hw]];
        t.obs.add(Math.min(ax, bx) - hw, Math.min(ay, by) - hw, Math.max(ax, bx) + hw, Math.max(ay, by) + hw, { p: c.flat(), b: [Math.min(...c.map(v => v[0])), Math.min(...c.map(v => v[1])), Math.max(...c.map(v => v[0])), Math.max(...c.map(v => v[1]))], h: H, low: true });
      }
    }
  }
}
function addKerb(gb, t, c, boll, bollGrid) {
  const n = c.length / 2; if (n < 2) return;
  const closed = Math.hypot(c[0] - c[n * 2 - 2], c[1] - c[n * 2 - 1]) < 0.05;
  const seg = [];
  for (let i = 0; i < n - 1; i++) { const dx = c[i * 2 + 2] - c[i * 2], dy = c[i * 2 + 3] - c[i * 2 + 1], l = Math.hypot(dx, dy) || 1e-6; seg.push([dx / l, dy / l, l]); }
  const nv = [], turn = [];
  for (let i = 0; i < n; i++) {
    let a = seg[i - 1], b = seg[i];
    if (closed) { if (i === 0) a = seg[n - 2]; if (i === n - 1) b = seg[0]; }
    a = a || b; b = b || a;
    let mx = -a[1] - b[1], my = a[0] + b[0]; const ml = Math.hypot(mx, my) || 1; mx /= ml; my /= ml;
    const ch = Math.max(0.4, mx * -b[1] + my * b[0]);
    nv.push([mx / ch, my / ch]); turn.push(Math.acos(clamp(a[0] * b[0] + a[1] * b[1], -1, 1)));
  }
  const TOP = 0.165, KW = 0.3, GW = 0.42;
  let s = 0;
  for (let i = 0; i < n - 1; i++) {
    const ax = c[i * 2], ay = c[i * 2 + 1], bx = c[i * 2 + 2], by = c[i * 2 + 3], na = nv[i], nb = nv[i + 1], s1 = s + seg[i][2];
    const N = [-seg[i][1], 0, -seg[i][0]];
    gb.quad(MAT.curb, [ax, -0.02, -ay], [bx, -0.02, -by], [bx, TOP, -by], [ax, TOP, -ay], [s / 1.2, 0], [s1 / 1.2, 0], [s1 / 1.2, 0.15], [s / 1.2, 0.15], N);
    gb.quad(MAT.curb, [ax, TOP, -ay], [bx, TOP, -by], [bx - nb[0] * KW, TOP, -(by - nb[1] * KW)], [ax - na[0] * KW, TOP, -(ay - na[1] * KW)], [s / 1.2, 0.2], [s1 / 1.2, 0.2], [s1 / 1.2, 0.45], [s / 1.2, 0.45], [0, 1, 0]);
    /* Joints de pose du granit : fines coupes verticales dans la face du
       bordure, visibles seulement dans le centre dense. Elles suivent la
       longueur cumulée du fil OSM et restent hors du dessus de bordure. */
    if (Math.hypot((ax + bx) * 0.5 - CENTER.x, (ay + by) * 0.5 - CENTER.y) < 950) {
      const ux = seg[i][0], uy = seg[i][1], nx = -uy, ny = ux;
      let joint = (Math.floor((s + 0.35) / 1.5) + 1) * 1.5;
      for (; joint < s1 - 0.25; joint += 1.5) {
        const d = joint - s, px = ax + ux * d + nx * 0.003, py = ay + uy * d + ny * 0.003;
        if (Math.hypot(px - CENTER.x, py - CENTER.y) > 950) continue;
        const half = 0.012;
        gb.quad(MAT.asphalt,
          [px - ux * half, -0.006, -(py - uy * half)],
          [px + ux * half, -0.006, -(py + uy * half)],
          [px + ux * half, TOP + 0.001, -(py + uy * half)],
          [px - ux * half, TOP + 0.001, -(py - uy * half)],
          [0, 0], [1, 0], [1, 1], [0, 1], N);
      }
    }
    gb.quad(MAT.curb, [ax - na[0] * KW, SW - 0.02, -(ay - na[1] * KW)], [bx - nb[0] * KW, SW - 0.02, -(by - nb[1] * KW)], [bx - nb[0] * KW, TOP, -(by - nb[1] * KW)], [ax - na[0] * KW, TOP, -(ay - na[1] * KW)], [s / 1.2, 0], [s1 / 1.2, 0], [s1 / 1.2, 0.02], [s / 1.2, 0.02], [-N[0], 0, -N[2]]);
    gb.quad(MAT.gutter, [ax, 0.004, -ay], [bx, 0.004, -by], [bx + nb[0] * GW, 0.004, -(by + nb[1] * GW)], [ax + na[0] * GW, 0.004, -(ay + na[1] * GW)], [s / 0.7, 0], [s1 / 0.7, 0], [s1 / 0.7, GW / 0.7], [s / 0.7, GW / 0.7], [0, 1, 0]);
    /* Rework 19 — caniveau en granit réellement lisible : deux filets
       longitudinaux creusés dans la bande d'écoulement, plus des avaloirs
       périodiques. Les détails restent coplanaires et dans les buckets GB. */
    const nearCenter = Math.hypot((ax + bx) * 0.5 - CENTER.x, (ay + by) * 0.5 - CENTER.y) < 760;
    if (nearCenter && seg[i][2] > 0.35) {
      const ux = seg[i][0], uy = seg[i][1], nx = na[0], ny = na[1];
      for (const off of [0.105, 0.285]) {
        const gx0 = ax + nx * off, gy0 = ay + ny * off, gx1 = bx + nb[0] * off, gy1 = by + nb[1] * off;
        const half = 0.012;
        gb.quad(MAT.asphalt,
          [gx0 - ux * half, 0.009, -(gy0 - uy * half)], [gx1 - ux * half, 0.009, -(gy1 - uy * half)],
          [gx1 + ux * half, 0.009, -(gy1 + uy * half)], [gx0 + ux * half, 0.009, -(gy0 + uy * half)],
          [s, 0], [s1, 0], [s1, 0.025], [s, 0.025], [0, 1, 0]);
      }
      let drain = (Math.floor((s + 3.5) / 8) + 1) * 8;
      for (; drain < s1 - 0.45; drain += 8) {
        const d = drain - s, px = ax + ux * d, py = ay + uy * d;
        const halfL = 0.19, inner = 0.08, outer = 0.34;
        gb.quad(MAT.metalLight,
          [px - ux * halfL + nx * inner, 0.014, -(py - uy * halfL + ny * inner)],
          [px + ux * halfL + nx * inner, 0.014, -(py + uy * halfL + ny * inner)],
          [px + ux * halfL + nx * outer, 0.014, -(py + uy * halfL + ny * outer)],
          [px - ux * halfL + nx * outer, 0.014, -(py - uy * halfL + ny * outer)],
          [0, 0], [0.38, 0], [0.38, 0.26], [0, 0.26], [0, 1, 0]);
        for (let bar = -2; bar <= 2; bar++) {
          const o = bar * 0.062, hx = px + nx * (inner + outer) * 0.5 + ux * o, hy = py + ny * (inner + outer) * 0.5 + uy * o;
          const bh = 0.012;
          gb.quad(MAT.asphalt,
            [hx - nx * bh, 0.017, -(hy - ny * bh)], [hx + nx * bh, 0.017, -(hy + ny * bh)],
            [hx + nx * bh + ux * 0.035, 0.017, -(hy + ny * bh + uy * 0.035)], [hx - nx * bh + ux * 0.035, 0.017, -(hy - ny * bh + uy * 0.035)],
            [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
        }
      }
      /* Joints transversaux des dalles de trottoir : trame de pierre
         de 1,2 m, distincte des joints de pose de la bordure. */
      let slab = (Math.floor((s + 0.6) / 1.2) + 1) * 1.2;
      for (; slab < s1 - 0.12; slab += 1.2) {
        const d = slab - s, px = ax + ux * d, py = ay + uy * d, half = 0.014;
        const a0 = [px - nx * 0.04, SW + 0.018, -(py - ny * 0.04)];
        const a1 = [px - nx * 1.22, SW + 0.018, -(py - ny * 1.22)];
        const b1 = [a1[0] + ux * half, a1[1], a1[2] - uy * half];
        const b0 = [a0[0] + ux * half, a0[1], a0[2] - uy * half];
        gb.quad(MAT.asphalt, a0, a1, b1, b0, [0, 0], [1, 0], [1, 0.025], [0, 0.025], [0, 1, 0]);
      }
    }
    if (seg[i][2] > 0.8) { const wa = 1.3, wx0 = ax - na[0] * wa, wy0 = ay - na[1] * wa, wx1 = bx - nb[0] * wa, wy1 = by - nb[1] * wa; if (!insideBuilding((wx0 + wx1) / 2, (wy0 + wy1) / 2)) t.walk.push([wx0, wy0, wx1, wy1]); }
    s = s1;
  }
  /* "potelets": anti-parking bollards around kerb corners in the centre */
  if (Math.hypot(c[0] - CENTER.x, c[1] - CENTER.y) > 1500) return;
  for (let i = 1; i < n - 1; i++) {
    if (turn[i] < 0.2 || turn[i] > 1.2) continue;
    const x = c[i * 2] - nv[i][0] * 0.55, y = c[i * 2 + 1] - nv[i][1] * 0.55;
    const nb = new Set(); bollGrid.query(x - 1.3, y - 1.3, x + 1.3, y + 1.3, nb); if (nb.size) continue;
    if (insideBuilding(x, y) || roadAtTile(t, x, y)) continue;
    bollGrid.add(x, y, x, y, 1); boll.push(MX(x, 0, -y));
  }
}
function addCrosswalk(gb, t, x, y) {
  const s = new Set(); t.seg.query(x - 4, y - 4, x + 4, y + 4, s);
  let best = null, bd = 4;
  for (const r of s) { if (r[5] !== 0 && r[5] !== 1) continue; const d = segNear(x, y, r[0], r[1], r[2], r[3], _q); if (d < bd) { bd = d; best = r; } }
  if (!best || best[7] & 8) return;
  const dx = best[2] - best[0], dy = best[3] - best[1], l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l, qx = -uy, qy = ux, w = best[8];
  const hy = isLowered(best) ? 0.012 : SW + 0.02;
  for (let o = -w / 2 + 0.55; o <= w / 2 - 0.45; o += 1.0) {
    const cx = x + qx * o, cy = y + qy * o;
    const P = [[cx - ux * 1.5 - qx * 0.25, cy - uy * 1.5 - qy * 0.25], [cx + ux * 1.5 - qx * 0.25, cy + uy * 1.5 - qy * 0.25], [cx + ux * 1.5 + qx * 0.25, cy + uy * 1.5 + qy * 0.25], [cx - ux * 1.5 + qx * 0.25, cy - uy * 1.5 + qy * 0.25]];
    gb.quad(MAT.mark, ...P.map(q => [q[0], hy, -q[1]]), [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
  }

  /* Lignes d'arrêt discrètes avant les passages piétons sur les rues
     carrossables à double sens. On les place sur le segment OSM lui-même,
     uniquement si le passage n'est pas trop proche d'une extrémité :
     cela évite de dessiner des lignes dans les zones de carrefour. */
  if (best[5] === 0 && w >= 5.5 && !(best[7] & 1)) {
    const vx = best[2] - best[0], vy = best[3] - best[1];
    const vl2 = vx * vx + vy * vy, vl = Math.sqrt(vl2) || 1;
    const along = ((x - best[0]) * vx + (y - best[1]) * vy) / vl;
    const remain = vl - along;
    if (along >= 4.2 && remain >= 4.2) {
      const stopOffset = 3.6, halfLine = 0.09;
      for (const sign of [-1, 1]) {
        const d = along + sign * stopOffset;
        if (d < 0.5 || d > vl - 0.5) continue;
        const cx = best[0] + vx / vl * d, cy = best[1] + vy / vl * d;
        const a = -w / 2 + 0.35, b = w / 2 - 0.35;
        const P = [
          [cx - ux * halfLine + qx * a, cy - uy * halfLine + qy * a],
          [cx + ux * halfLine + qx * a, cy + uy * halfLine + qy * a],
          [cx + ux * halfLine + qx * b, cy + uy * halfLine + qy * b],
          [cx - ux * halfLine + qx * b, cy - uy * halfLine + qy * b]
        ];
        gb.quad(MAT.mark, ...P.map(q => [q[0], hy + 0.004, -q[1]]),
          [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
      }
    }
  }

  /* Bandes podotactiles discrètes aux traversées déjà abaissées.
     Les dalles restent sur le trottoir, de part et d'autre de la chaussée.
     Leur géométrie suit l'orientation du segment routier OSM. */
  if (isLowered(best) && w >= 3.5 && w <= 16.5) {
    const padHalfAlong = 0.40, padHalfAcross = 0.30;
    const padOffset = w / 2 + 0.48;
    const padY = SW + 0.028;
    for (const side of [-1, 1]) {
      const cx = x + qx * padOffset * side;
      const cy = y + qy * padOffset * side;
      const point = (a, b) => [cx + ux * a + qx * b * side,
                               cy + uy * a + qy * b * side];
      const A = point(-padHalfAlong, -padHalfAcross);
      const B = point( padHalfAlong, -padHalfAcross);
      const C = point( padHalfAlong,  padHalfAcross);
      const D = point(-padHalfAlong,  padHalfAcross);
      gb.quad(MAT.pave,
        [A[0], padY, -A[1]], [B[0], padY, -B[1]],
        [C[0], padY, -C[1]], [D[0], padY, -D[1]],
        [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);

      /* Cinq nervures fines : elles restent légèrement au-dessus de la dalle
         pour éviter le z-fighting, sans produire de relief excessif. */
      for (let k = -2; k <= 2; k++) {
        const a = k * 0.13, halfRib = 0.014, edge = padHalfAcross - 0.035;
        const P0 = point(a - halfRib, -edge);
        const P1 = point(a + halfRib, -edge);
        const P2 = point(a + halfRib, edge);
        const P3 = point(a - halfRib, edge);
        gb.quad(MAT.curb,
          [P0[0], padY + 0.009, -P0[1]], [P1[0], padY + 0.009, -P1[1]],
          [P2[0], padY + 0.009, -P2[1]], [P3[0], padY + 0.009, -P3[1]],
          [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
      }
    }
  }
}
function addArea(gb, a) {
  const k = a[0];
  if (k === 1) { // pitch with stripes + lines
    const m = a[1], p = a.slice(2);
    gb.poly(MAT.grass, p, SW + 0.014, 4);
    addPitchLines(gb, m);
    return;
  }
  const p = a.slice(1);
  const [mat, y, s] = k === 0 ? [MAT.grass, SW + 0.012, 4] : k === 2 ? [MAT.asphalt, SW + 0.003, 7] : k === 3 ? [MAT.square, SW + 0.007, 3] : [MAT.ballast, SW + 0.002, 3];
  gb.poly(mat, p, y, s);
}
function addPitchLines(gb, m) {
  const c = [(m[0] + m[4]) / 2, (m[1] + m[5]) / 2];
  const e1 = [m[2] - m[0], m[3] - m[1]], e2 = [m[6] - m[0], m[7] - m[1]];
  let L = Math.hypot(...e1), Wd = Math.hypot(...e2), ux = e1[0] / L, uy = e1[1] / L;
  if (Wd > L) { [L, Wd] = [Wd, L]; ux = e2[0] / L; uy = e2[1] / L; }
  if (L < 40 || L > 130) return;
  const vx = -uy, vy = ux, hl = L / 2 - 1.5, hwid = Wd / 2 - 1.5, y = SW + 0.024;
  const P = (a, b) => [c[0] + ux * a + vx * b, c[1] + uy * a + vy * b];
  const line = (a0, b0, a1, b1) => { const A = P(a0, b0), B = P(a1, b1), dx = B[0] - A[0], dy = B[1] - A[1], l = Math.hypot(dx, dy) || 1, qx = -dy / l * 0.07, qy = dx / l * 0.07; gb.quad(MAT.mark, [A[0] + qx, y, -(A[1] + qy)], [B[0] + qx, y, -(B[1] + qy)], [B[0] - qx, y, -(B[1] - qy)], [A[0] - qx, y, -(A[1] - qy)], [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]); };
  /* mowing stripes */
  for (let a = -hl, k = 0; a < hl; a += 5.5, k++) if (k % 2) { const A = P(a, -hwid), B = P(a + 5.5, -hwid), C = P(a + 5.5, hwid), D = P(a, hwid); gb.quad(MAT.grassDark, [A[0], SW + 0.018, -A[1]], [B[0], SW + 0.018, -B[1]], [C[0], SW + 0.018, -C[1]], [D[0], SW + 0.018, -D[1]], [A[0] / 4, A[1] / 4], [B[0] / 4, B[1] / 4], [C[0] / 4, C[1] / 4], [D[0] / 4, D[1] / 4], [0, 1, 0]); }
  line(-hl, -hwid, hl, -hwid); line(-hl, hwid, hl, hwid); line(-hl, -hwid, -hl, hwid); line(hl, -hwid, hl, hwid); line(0, -hwid, 0, hwid);
  for (let k = 0; k < 24; k++) { const a0 = k / 24 * Math.PI * 2, a1 = (k + 1) / 24 * Math.PI * 2; line(Math.cos(a0) * 9.15, Math.sin(a0) * 9.15, Math.cos(a1) * 9.15, Math.sin(a1) * 9.15); }
  for (const s of [-1, 1]) { const g = s * hl, pb = s * (hl - 16.5), gbx = s * (hl - 5.5); line(pb, -20.15, pb, 20.15); line(g, -20.15, pb, -20.15); line(g, 20.15, pb, 20.15); line(gbx, -9.16, gbx, 9.16); line(g, -9.16, gbx, -9.16); line(g, 9.16, gbx, 9.16); }
}

/* ---------- instanced props ---------- */
const PROPS = {};
function mergeGeos(list) { // [{geo, m: Matrix4}]
  const out = []; for (const { geo, m } of list) { const g = geo.clone(); if (m) g.applyMatrix4(m); out.push(g.index ? g.toNonIndexed() : g); }
  const pos = [], nor = [], uv = [];
  for (const g of out) { pos.push(...g.attributes.position.array); nor.push(...g.attributes.normal.array); if (g.attributes.uv) uv.push(...g.attributes.uv.array); else uv.push(...new Array(g.attributes.position.count * 2).fill(0)); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return g;
}
const MX = (x, y, z, rx, ry, rz, sx, sy, sz) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)), new THREE.Vector3(sx || 1, sy || 1, sz || 1));
function buildProps() {
  /* boulevard lamp: pole + arm toward +x */
  PROPS.lampTallPole = mergeGeos([
    { geo: new THREE.CylinderGeometry(0.085, 0.15, 9, 12), m: MX(0, 4.5, 0) },
    { geo: new THREE.CylinderGeometry(0.105, 0.105, 0.16, 12), m: MX(0, 0.24, 0) },
    { geo: new THREE.CylinderGeometry(0.055, 0.055, 1.8, 10), m: MX(0.85, 8.9, 0, 0, 0, Math.PI / 2 - 0.2) },
    { geo: new THREE.CylinderGeometry(0.035, 0.045, 0.65, 8), m: MX(1.45, 9.02, 0, 0, 0, Math.PI / 2) },
    { geo: new THREE.BoxGeometry(0.8, 0.18, 0.36), m: MX(1.75, 9.05, 0) },
    { geo: new THREE.BoxGeometry(0.68, 0.035, 0.28), m: MX(1.75, 8.94, 0) }
  ]);
  PROPS.lampTallHead = new THREE.BoxGeometry(0.7, 0.06, 0.3).translate(1.75, 8.94, 0);
  /* old-town lantern on post */
  PROPS.lampPole = mergeGeos([
    { geo: new THREE.CylinderGeometry(0.055, 0.12, 4.2, 12), m: MX(0, 2.1, 0) },
    { geo: new THREE.CylinderGeometry(0.17, 0.17, 0.24, 12), m: MX(0, 0.12, 0) },
    { geo: new THREE.CylinderGeometry(0.09, 0.19, 0.22, 10), m: MX(0, 4.91, 0) },
    { geo: new THREE.CylinderGeometry(0.22, 0.12, 0.12, 10), m: MX(0, 4.3, 0) },
    { geo: new THREE.TorusGeometry(0.105, 0.018, 6, 12), m: MX(0, 4.72, 0, Math.PI/2) },
    { geo: new THREE.BoxGeometry(0.035, 0.55, 0.035), m: MX(0.15, 4.58, 0) },
    { geo: new THREE.BoxGeometry(0.035, 0.55, 0.035), m: MX(-0.15, 4.58, 0) }
  ]);
  PROPS.lampHead = mergeGeos([
    { geo: new THREE.CylinderGeometry(0.2, 0.14, 0.38, 12), m: MX(0,4.6,0) },
    { geo: new THREE.ConeGeometry(0.25,0.12,12), m: MX(0,4.85,0) },
    { geo: new THREE.CylinderGeometry(0.13,0.13,0.035,12), m: MX(0,4.39,0) }
  ]);
  /* Potelet urbain : fût, embase, collerette et deux bagues de visibilité intégrées. */
  PROPS.bollard = mergeGeos([
    { geo: new THREE.CylinderGeometry(0.075, 0.085, 0.95, 12), m: MX(0, 0.475, 0) },
    { geo: new THREE.SphereGeometry(0.076, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), m: MX(0, 0.95, 0) },
    { geo: new THREE.CylinderGeometry(0.105, 0.105, 0.055, 12), m: MX(0, 0.055, 0) },
    { geo: new THREE.CylinderGeometry(0.09, 0.09, 0.045, 12), m: MX(0, 0.79, 0) },
    { geo: new THREE.CylinderGeometry(0.079, 0.079, 0.055, 12), m: MX(0, 0.66, 0) },
    { geo: new THREE.CylinderGeometry(0.078, 0.078, 0.055, 12), m: MX(0, 0.76, 0) }
  ]);
  PROPS.bin = mergeGeos([
    { geo: new THREE.CylinderGeometry(0.25, 0.22, 0.8, 16, 2, true), m: MX(0, 0.75, 0) },
    { geo: new THREE.CylinderGeometry(0.265, 0.265, 0.055, 16), m: MX(0, 1.17, 0) },
    { geo: new THREE.CylinderGeometry(0.22, 0.22, 0.035, 16), m: MX(0, 1.205, 0) },
    { geo: new THREE.CylinderGeometry(0.205, 0.205, 0.025, 16), m: MX(0, 1.235, 0) },
    { geo: new THREE.BoxGeometry(0.18,0.025,0.045), m: MX(0,1.25,0.22) },
    { geo: new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8), m: MX(0, 0.55, -0.28) },
    { geo: new THREE.BoxGeometry(0.09,0.035,0.11), m: MX(0,0.1,-0.28) },
    ...Array.from({length: 8}, (_, k) => ({ geo: new THREE.BoxGeometry(0.018, 0.66, 0.018), m: MX(Math.cos(k * Math.PI / 4) * 0.226, 0.75, Math.sin(k * Math.PI / 4) * 0.226, 0, k * Math.PI / 4, 0) }))
  ]);
  PROPS.benchWood = mergeGeos([
    ...[0,1,2,3,4].map(k => ({ geo: new THREE.BoxGeometry(1.82,0.045,0.105), m: MX(0,0.46,-0.22+k*0.115) })),
    ...[0,1,2].map(k => ({ geo: new THREE.BoxGeometry(1.82,0.095,0.04), m: MX(0,0.62+k*0.13,0.25,-0.18) })),
    ...[-0.72,0.72].flatMap(x => [-0.17,0.29].map(z => ({ geo: new THREE.CylinderGeometry(0.012,0.012,0.012,8), m: MX(x,0.49,z,Math.PI/2) })))
  ]);
  /* Piètement et accoudoirs continus : les lames bois restent dans leur bucket dédié. */
  PROPS.benchMetal = mergeGeos([
    ...[-0.75, 0.75].map(x => ({ geo: new THREE.BoxGeometry(0.06, 0.45, 0.5), m: MX(x, 0.22, 0) })),
    ...[-0.75, 0.75].map(x => ({ geo: new THREE.BoxGeometry(0.05, 0.5, 0.05), m: MX(x, 0.7, 0.26) })),
    ...[-0.75, 0.75].map(x => ({ geo: new THREE.CylinderGeometry(0.025, 0.025, 0.48, 8), m: MX(x, 0.73, 0.02, Math.PI / 2, 0, 0) })),
    ...[-0.75, 0.75].map(x => ({ geo: new THREE.CylinderGeometry(0.025, 0.025, 0.48, 8), m: MX(x, 0.48, -0.18, 0, 0, Math.PI / 2) })),
    ...[-0.75, 0.75].map(x => ({ geo: new THREE.BoxGeometry(0.12, 0.045, 0.58), m: MX(x, 0.045, 0) }))
  ]);
  PROPS.shelterFrame = mergeGeos([
    { geo: new THREE.BoxGeometry(4.05,0.10,1.72), m: MX(0,2.5,0) },
    { geo: new THREE.BoxGeometry(4.15,0.055,1.82), m: MX(0,2.58,0) },
    ...[-1.95,1.95].map(x => ({ geo: new THREE.BoxGeometry(0.075,2.5,0.075), m: MX(x,1.25,-0.7) })),
    ...[-1.95,1.95].map(x => ({ geo: new THREE.BoxGeometry(0.075,2.5,0.075), m: MX(x,1.25,0.7) })),
    ...[-1.95,1.95].map(x => ({ geo: new THREE.BoxGeometry(0.07,2.35,0.07), m: MX(x,1.18,0) })),
    { geo: new THREE.BoxGeometry(3.6,0.06,0.4), m: MX(0,0.48,-0.5) },
    { geo: new THREE.CylinderGeometry(0.05,0.05,3,8), m: MX(2.4,1.5,0.6) },
    { geo: new THREE.BoxGeometry(3.7,0.04,0.04), m: MX(0,2.38,0.72) }
  ]);
  PROPS.shelterGlass = mergeGeos([
    { geo: new THREE.BoxGeometry(3.82,2.16,0.018), m: MX(0,1.32,-0.72) },
    { geo: new THREE.BoxGeometry(0.018,2.16,1.28), m: MX(-1.95,1.32,0) },
    { geo: new THREE.BoxGeometry(0.018,2.16,1.28), m: MX(1.95,1.32,0) },
    { geo: new THREE.BoxGeometry(0.025,2.18,0.025), m: MX(0,1.32,-0.72) }
  ]);
  PROPS.busSign = new THREE.BoxGeometry(0.06, 0.5, 0.5).translate(2.4, 2.9, 0.6);
  PROPS.tlPole = mergeGeos([{ geo: new THREE.CylinderGeometry(0.07, 0.08, 3.2, 8), m: MX(0, 1.6, 0) }, { geo: new THREE.BoxGeometry(0.32, 0.95, 0.25), m: MX(0, 3.4, 0) }]);
  PROPS.tlRed = new THREE.CircleGeometry(0.09, 10).translate(0, 3.72, 0.13);
  PROPS.tlAmb = new THREE.CircleGeometry(0.09, 10).translate(0, 3.42, 0.13);
  PROPS.tlGrn = new THREE.CircleGeometry(0.09, 10).translate(0, 3.12, 0.13);
  PROPS.bistroTable = mergeGeos([{ geo: new THREE.CylinderGeometry(0.36, 0.36, 0.03, 18), m: MX(0, 0.74, 0) }, { geo: new THREE.CylinderGeometry(0.03, 0.03, 0.72, 6), m: MX(0, 0.37, 0) }, { geo: new THREE.CylinderGeometry(0.22, 0.24, 0.03, 12), m: MX(0, 0.015, 0) }]);
  PROPS.chair = mergeGeos([{ geo: new THREE.BoxGeometry(0.42, 0.04, 0.42), m: MX(0, 0.45, 0) }, { geo: new THREE.BoxGeometry(0.42, 0.42, 0.04), m: MX(0, 0.68, -0.2, -0.12, 0, 0) }, ...[[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].map(([x, z]) => ({ geo: new THREE.CylinderGeometry(0.015, 0.015, 0.45, 5), m: MX(x, 0.225, z) }))]);
  PROPS.parasol = new THREE.ConeGeometry(1.35, 0.45, 10, 1, true).translate(0, 2.45, 0);
  PROPS.parasolPole = new THREE.CylinderGeometry(0.025, 0.025, 2.4, 6).translate(0, 1.2, 0);
  PROPS.bikeRack = mergeGeos([
    ...[0,1,2].map(k => ({ geo: new THREE.TorusGeometry(0.4,0.032,8,20,Math.PI), m: MX(k*0.8-0.8,0,0) })),
    { geo: new THREE.CylinderGeometry(0.045,0.045,2.4,10), m: MX(0,0.045,0,0,0,Math.PI/2) },
    ...[-0.8,0,0.8].map(x => ({ geo: new THREE.CylinderGeometry(0.055,0.055,0.09,10), m: MX(x,0.045,0,0,0,Math.PI/2) })),
    ...[-1.05, 1.05].flatMap(x => [
      { geo: new THREE.BoxGeometry(0.34, 0.035, 0.18), m: MX(x, 0.025, 0) },
      { geo: new THREE.CylinderGeometry(0.018, 0.018, 0.09, 8), m: MX(x, 0.07, 0) }
    ])
  ]);
  PROPS.trunk = mergeGeos([{ geo: new THREE.CylinderGeometry(0.16, 0.26, 3.2, 7), m: MX(0, 1.6, 0) }, { geo: new THREE.CylinderGeometry(0.06, 0.12, 2, 5), m: MX(0.4, 3.4, 0, 0, 0, -0.5) }, { geo: new THREE.CylinderGeometry(0.06, 0.12, 2, 5), m: MX(-0.35, 3.5, 0.2, 0.3, 0, 0.5) }]);
  /* tree crowns: leaf-cluster cards (alpha-tested), facing outward, with radial normals for a soft volume */
  const crown = (seed, n, rx, ry, cy) => {
    const R = srand(seed), pos = [], nor = [], uv = [], q = new THREE.Quaternion(), e = new THREE.Euler(), V = new THREE.Vector3(), Z = new THREE.Vector3(0, 0, 1);
    for (let k = 0; k < n; k++) {
      let x, y, z; do { x = R() * 2 - 1; y = R() * 2 - 1; z = R() * 2 - 1; } while (x * x + y * y + z * z > 1 || x * x + y * y + z * z < 0.05);
      const l = Math.hypot(x, y, z), sh = 0.45 + 0.55 * Math.cbrt(R()); x = x / l * sh; y = y / l * sh; z = z / l * sh;
      const c = new THREE.Vector3(x * rx, cy + y * ry, z * rx), size = 1.7 + R() * 1.3;
      const out = new THREE.Vector3(x + (R() - 0.5) * 0.9, y * 0.8 + 0.25 + (R() - 0.5) * 0.6, z + (R() - 0.5) * 0.9).normalize();
      q.setFromUnitVectors(Z, out); e.set(0, 0, R() * 6.28); q.multiply(new THREE.Quaternion().setFromEuler(e));
      const P = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => V.set(a * size / 2, b * size / 2, 0).applyQuaternion(q).add(c).toArray());
      const nr = new THREE.Vector3(x, y + 0.35, z).normalize().toArray();
      const uo = (R() * 2 | 0) * 0.5, vo = (R() * 2 | 0) * 0.5, U = [[uo, vo], [uo + 0.5, vo], [uo + 0.5, vo + 0.5], [uo, vo + 0.5]];
      for (const ix of [0, 1, 2, 0, 2, 3]) { pos.push(...P[ix]); nor.push(...nr); uv.push(...U[ix]); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.computeBoundingSphere(); return g;
  };
  /* Six silhouettes d'arbres, plutôt que deux couronnes répétées :
     houppier large, boule compacte, port élancé, dôme bas, couronne aérée,
     et silhouette irrégulière. Les géométries restent partagées et instanciées. */
  PROPS.crownA = crown(5, 58, 3.25, 2.05, 6.05);
  PROPS.crownB = crown(9, 46, 2.25, 3.0, 6.35);
  PROPS.crownC = crown(21, 66, 2.75, 2.35, 5.55);
  PROPS.crownD = crown(34, 38, 2.0, 2.0, 5.45);
  PROPS.crownE = crown(48, 72, 3.05, 2.65, 6.7);
  PROPS.crownF = crown(63, 52, 2.55, 2.15, 6.0);
  /* leaf atlas: 4 clusters, colour map + separate alpha map (alpha map keeps the cut-out in shadows) */
  const LS = 512, lc = document.createElement('canvas'), la = document.createElement('canvas'); lc.width = lc.height = la.width = la.height = LS;
  const lg = lc.getContext('2d'), ag = la.getContext('2d');
  lg.fillStyle = '#3e5a2a'; lg.fillRect(0, 0, LS, LS); ag.fillStyle = '#000'; ag.fillRect(0, 0, LS, LS);
  const LR = srand(77);
  for (let cell = 0; cell < 4; cell++) {
    const ox = (cell % 2) * LS / 2, oy = (cell >> 1) * LS / 2, C = LS / 4;
    for (let k = 0; k < 170; k++) {
      const a = LR() * 6.283, r = Math.sqrt(LR()) * C * 0.86, x = ox + C + Math.cos(a) * r, y = oy + C + Math.sin(a) * r * 0.9;
      const lw = 7 + LR() * 7, lh = lw * (0.45 + LR() * 0.2), rot = LR() * 3.14, edge = r / C;
      lg.fillStyle = `hsl(${85 + LR() * 30},${32 + LR() * 25}%,${14 + LR() * 22 + (1 - edge) * -4 + (y - oy < C ? 6 : 0)}%)`;
      lg.beginPath(); lg.ellipse(x, y, lw, lh, rot, 0, 6.283); lg.fill();
      ag.fillStyle = '#fff'; ag.beginPath(); ag.ellipse(x, y, lw, lh, rot, 0, 6.283); ag.fill();
    }
    lg.strokeStyle = '#4a3a2a'; lg.lineWidth = 2; for (let k = 0; k < 5; k++) { lg.beginPath(); lg.moveTo(ox + C, oy + C * 1.9); lg.lineTo(ox + C + (LR() - 0.5) * C, oy + C + (LR() - 0.5) * C); lg.stroke(); }
  }
  const lmap = canvasTex(lc, true), amap = canvasTex(la); lmap.wrapS = lmap.wrapT = amap.wrapS = amap.wrapT = THREE.ClampToEdgeWrapping;
  MAT.leaves = M({ map: lmap, alphaMap: amap, alphaTest: 0.5, color: 0xd8e4c0, roughness: 0.85, side: THREE.DoubleSide });
  MAT.leaves.shadowSide = THREE.DoubleSide;
  MAT.leafDepth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, alphaMap: amap, alphaTest: 0.5, side: THREE.DoubleSide });
  /* tree grate (cast iron, concentric slots) */
  const gc = document.createElement('canvas'); gc.width = gc.height = 256; const gg = gc.getContext('2d');
  gg.fillStyle = '#3a3a3a'; gg.fillRect(0, 0, 256, 256); gg.fillStyle = '#0c0b0a';
  for (let r = 28; r < 124; r += 12) for (let a = 0; a < 6.283; a += 0.18) { gg.save(); gg.translate(128 + Math.cos(a) * r, 128 + Math.sin(a) * r); gg.rotate(a); gg.fillRect(-2, -5, 4, 10); gg.restore(); }
  gg.fillStyle = '#2a2018'; gg.beginPath(); gg.arc(128, 128, 22, 0, 6.283); gg.fill(); gg.strokeStyle = '#555'; gg.lineWidth = 6; gg.strokeRect(3, 3, 250, 250);
  MAT.grate.map = canvasTex(gc, true); MAT.grate.color.set(0xffffff); MAT.grate.needsUpdate = true;
  PROPS.grate = new THREE.PlaneGeometry(1.4, 1.4).rotateX(-Math.PI / 2);
  /* manhole cover */
  const mc = document.createElement('canvas'); mc.width = mc.height = 128; const mg = mc.getContext('2d');
  mg.fillStyle = '#000'; mg.fillRect(0, 0, 128, 128); mg.fillStyle = '#4a4744'; mg.beginPath(); mg.arc(64, 64, 63, 0, 6.283); mg.fill();
  mg.strokeStyle = '#2a2826'; mg.lineWidth = 3; for (let k = -56; k <= 56; k += 10) { mg.beginPath(); mg.moveTo(64 + k, 8); mg.lineTo(64 + k, 120); mg.stroke(); mg.beginPath(); mg.moveTo(8, 64 + k); mg.lineTo(120, 64 + k); mg.stroke(); }
  mg.lineWidth = 5; mg.beginPath(); mg.arc(64, 64, 58, 0, 6.283); mg.stroke();
  MAT.manhole.map = canvasTex(mc, true); MAT.manhole.color.set(0xffffff); MAT.manhole.needsUpdate = true;
  PROPS.manhole = new THREE.CircleGeometry(0.34, 20).rotateX(-Math.PI / 2);
  for (const g of [PROPS.manhole]) { const u = g.attributes.uv; for (let i = 0; i < u.count; i++) u.setXY(i, u.getX(i), u.getY(i)); }
  MAT.rattan = M({ color: 0x8a6a42, roughness: 0.85 });
  MAT.parasolA = M({ color: 0xe8e0cc, roughness: 0.9, side: THREE.DoubleSide }); MAT.parasolB = M({ color: 0x7a1c22, roughness: 0.9, side: THREE.DoubleSide });
  MAT.binGreen = M({ color: 0x2a4a34, roughness: 0.6, metalness: 0.3 });
  MAT.tlOff = M({ color: 0x111111, roughness: 0.4 });
  MAT.tl = { r: M({ color: 0x330000, emissive: 0xff2010, emissiveIntensity: 3 }), a: M({ color: 0x331a00, emissive: 0xff9a10, emissiveIntensity: 3 }), g: M({ color: 0x003311, emissive: 0x20ff70, emissiveIntensity: 3 }) };
  const bs = document.createElement('canvas'); bs.width = bs.height = 128; const bg = bs.getContext('2d'); bg.fillStyle = '#1a3a8a'; bg.fillRect(0, 0, 128, 128); bg.fillStyle = '#fff'; bg.font = '700 44px "Barlow Condensed",sans-serif'; bg.textAlign = 'center'; bg.fillText('BUS', 64, 80);
  MAT.busSign = M({ map: canvasTex(bs, true), emissiveMap: canvasTex(bs, true), emissive: 0xffffff, emissiveIntensity: 0.6 }); MAT.busSign.userData.sign = true;
  MAT.grassDark = M({ map: MAT.grass.map, normalMap: MAT.grass.normalMap, color: 0x46702a, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
}
/* instances are split into 48 m cells, each with its own bounding sphere, so the camera and the
   shadow pass only draw the cells they actually see (a whole tile used to be drawn at once) */
function instanced(group, geo, mat, mats, cast) {
  if (!mats.length) return null;
  if (!geo.boundingSphere) geo.computeBoundingSphere();
  const cells = new Map(), C = 200, v = new THREE.Vector3();
  for (const m of mats) { v.setFromMatrixPosition(m); const k = Math.floor(v.x / C) * 4096 + Math.floor(v.z / C); let a = cells.get(k); if (!a) cells.set(k, a = []); a.push(m); }
  const hold = new THREE.Group(); hold.userData.inst = true;
  for (const list of cells.values()) {
    const im = new THREE.InstancedMesh(geo, mat, list.length), c = new THREE.Vector3();
    list.forEach((m, i) => { im.setMatrixAt(i, m); c.add(v.setFromMatrixPosition(m)); });
    c.divideScalar(list.length); let r = 0; for (const m of list) r = Math.max(r, v.setFromMatrixPosition(m).distanceTo(c));
    const sc = list.reduce((q, m) => Math.max(q, m.getMaxScaleOnAxis()), 1);
    im.userData.bs = new THREE.Sphere(c.add(geo.boundingSphere.center), r + geo.boundingSphere.radius * sc + 0.5);
    im.castShadow = !!cast; im.receiveShadow = true; im.userData.cast = !!cast; hold.add(im);
  }
  group.add(hold); return hold;
}
function eachInst(h, f) { if (h) for (const im of h.children) f(im); }

/* ---------- real shops: storefronts & signs ---------- */
function storeFamily(k) {
  if (['bar', 'pub', 'nightclub'].includes(k)) return 'bar';
  if (['restaurant', 'cafe', 'fast_food', 'ice_cream'].includes(k)) return 'food';
  if (k === 'pharmacy') return 'pharmacy';
  if (['bank', 'office', 'post_office', 'bureau_de_change', 'library', 'cinema', 'theatre'].includes(k)) return 'office';
  return 'shop';
}
/* nearest facade edge of a real building, preferring the side that faces a street */
function facadeFor(x, y) {
  let best = null, bs = 1e9;
  for (const o of [...obstaclesNear(x - 22, y - 22, x + 22, y + 22)]) {
    if (o.tree || o.h < 3) continue;
    const q = o.p, inside = inPoly(q, x, y);
    for (let i = 0, j = q.length - 2; i < q.length; j = i, i += 2) {
      const ax = q[j], ay = q[j + 1], bx = q[i], by = q[i + 1], L = Math.hypot(bx - ax, by - ay); if (L < 2.4) continue;
      const d = segNear(x, y, ax, ay, bx, by, _q); if (d > 22) continue;
      const px = _q[0], py = _q[1], pt = _q[2];
      const ux = (bx - ax) / L, uy = (by - ay) / L; let nx = uy, ny = -ux;
      const mx = (ax + bx) / 2, my = (ay + by) / 2; if (inPoly(q, mx + nx * 0.4, my + ny * 0.4)) { nx = -nx; ny = -ny; }
      const rd = roadAt(px + nx * 6, py + ny * 6) || roadAt(px + nx * 11, py + ny * 11);
      const street = rd && rd[5] !== 3 && rd[5] !== 4 && !insideBuilding(px + nx * 3, py + ny * 3);
      const sc = d + (street ? 0 : 30) + (inside ? 0 : d * 1.5);
      if (sc < bs) { bs = sc; best = { ax, ay, ux, uy, nx, ny, L, s: pt * L, key: ax + ',' + ay }; }
    }
  }
  return best;
}
const STORE = {};
/* ---------- shop windows: a real-looking room behind the glass (interior mapping) + street reflections ---------- */
const ROOMLIT = { value: 1 };
const ROOMS = {};
function roomAtlas(fam) {
  if (ROOMS[fam]) return ROOMS[fam];
  const c = document.createElement('canvas'); c.width = c.height = 1024; const g = c.getContext('2d'), Q = 512;
  const pal = { bar: ['#3a1a10', '#5a2a18', '#2a160c', '#1a0e08'], food: ['#e8dcc8', '#c89a6a', '#d8d0c0', '#3a2a1a'], shop: ['#e8e4dc', '#d8d4cc', '#c8c4bc', '#f0f0f0'], pharmacy: ['#f4f8f4', '#e0ece4', '#d8e4dc', '#ffffff'], office: ['#c8ccd0', '#a8b0b8', '#8a9098', '#d8dce0'] }[fam];
  /* back wall (top-left quadrant) */
  g.fillStyle = pal[0]; g.fillRect(0, 0, Q, Q);
  if (fam === 'bar') {
    g.fillStyle = '#2a1408'; g.fillRect(0, 0, Q, Q);
    for (let r = 0; r < 4; r++) { g.fillStyle = '#4a2a14'; g.fillRect(40, 60 + r * 62, Q - 80, 6); for (let k = 0; k < 26; k++) { g.fillStyle = ['#2a6a2a', '#8a5a20', '#d8d0b0', '#6a1a1a', '#1a3a6a', '#d8a030'][(k + r) % 6]; g.fillRect(48 + k * 16, 22 + r * 62, 10, 38); } }
    g.fillStyle = '#5a2a14'; g.fillRect(0, Q * 0.62, Q, Q * 0.38); g.fillStyle = '#b8bcc0'; g.fillRect(0, Q * 0.62, Q, 10);
    for (let k = 0; k < 4; k++) { const x = 70 + k * 110; g.fillStyle = '#120a06'; g.beginPath(); g.ellipse(x, Q * 0.5, 22, 28, 0, 0, 7); g.fill(); g.fillRect(x - 30, Q * 0.55, 60, 90); }
    const rg = g.createRadialGradient(Q / 2, 30, 10, Q / 2, 30, 300); rg.addColorStop(0, 'rgba(255,190,110,.55)'); rg.addColorStop(1, 'rgba(255,190,110,0)'); g.fillStyle = rg; g.fillRect(0, 0, Q, Q);
    g.fillStyle = '#ff3d8b'; g.font = '700 54px "Barlow Condensed",Arial'; g.textAlign = 'center'; g.shadowColor = '#ff3d8b'; g.shadowBlur = 18; g.fillText('BAR', Q / 2, 300); g.shadowBlur = 0;
  } else if (fam === 'food') {
    g.fillStyle = '#2a2420'; g.fillRect(60, 40, Q - 120, 120); g.fillStyle = '#e8d8b0'; g.font = '700 30px "Barlow Condensed",Arial'; g.textAlign = 'center'; g.fillText('MENU · GALETTES · PLATS', Q / 2, 110);
    for (let y = 170; y < Q * 0.6; y += 18) for (let x = 0; x < Q; x += 36) { g.fillStyle = `hsl(40,10%,${88 + Math.random() * 7}%)`; g.fillRect(x + ((y / 18) % 2) * 18 + 1, y + 1, 34, 16); }
    g.fillStyle = '#6a4424'; g.fillRect(0, Q * 0.6, Q, Q * 0.4); for (let x = 0; x < Q; x += 40) { g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(x, Q * 0.6, 3, Q * 0.4); } g.fillStyle = '#d8d8d8'; g.fillRect(0, Q * 0.6, Q, 12);
    for (let k = 0; k < 3; k++) { g.fillStyle = '#20180f'; g.beginPath(); g.ellipse(120 + k * 140, Q * 0.5, 20, 26, 0, 0, 7); g.fill(); g.fillRect(95 + k * 140, Q * 0.54, 50, 70); }
  } else {
    for (let r = 0; r < 6; r++) { g.fillStyle = '#9a8a74'; g.fillRect(20, 40 + r * 75, Q - 40, 8); for (let k = 0; k < 30; k++) { g.fillStyle = `hsl(${(k * 47 + r * 13) % 360},${fam === 'pharmacy' ? 20 : 45}%,${45 + (k % 4) * 8}%)`; g.fillRect(26 + k * 15.5, 8 + r * 75, 12, 30); } }
  }
  /* side wall (top-right) */
  g.fillStyle = pal[1]; g.fillRect(Q, 0, Q, Q);
  if (fam === 'bar') { for (let y = 0; y < Q; y += 22) for (let x = (y / 22 % 2) * 22; x < Q; x += 44) { g.fillStyle = `hsl(10,${30 + Math.random() * 20}%,${18 + Math.random() * 10}%)`; g.fillRect(Q + x, y, 42, 20); } g.fillStyle = '#c8a050'; for (let k = 0; k < 3; k++) g.fillRect(Q + 60 + k * 150, 120, 90, 70); }
  else if (fam !== 'food') for (let r = 0; r < 6; r++) { g.fillStyle = '#9a8a74'; g.fillRect(Q, 40 + r * 75, Q, 8); for (let k = 0; k < 32; k++) { g.fillStyle = `hsl(${(k * 71 + r * 29) % 360},40%,${45 + (k % 3) * 10}%)`; g.fillRect(Q + 6 + k * 16, 8 + r * 75, 12, 30); } }
  else {
    g.fillStyle = '#e4d6bc'; g.fillRect(Q, 0, Q, Q * 0.55);
    for (let k = 0; k < 900; k++) { g.fillStyle = `rgba(${Math.random() < 0.5 ? '0,0,0' : '255,255,255'},.035)`; g.fillRect(Q + Math.random() * Q, Math.random() * Q * 0.55, 6, 6); }
    for (let k = 0; k < 3; k++) { const x = Q + 50 + k * 150; g.fillStyle = '#3a2a1a'; g.fillRect(x - 6, 96, 112, 132); g.fillStyle = ['#c8642a', '#5a8a4a', '#d8b040'][k]; g.fillRect(x, 102, 100, 120); g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.arc(x + 50, 150, 28, 0, 7); g.fill(); }
    for (let y = Q * 0.55; y < Q; y += 18) for (let x = 0; x < Q; x += 36) { g.fillStyle = `hsl(40,10%,${90 + Math.random() * 6}%)`; g.fillRect(Q + x + ((y / 18) % 2) * 18 + 1, y + 1, 34, 16); }
    g.fillStyle = '#2a7a3a'; g.fillRect(Q, Q * 0.55 - 8, Q, 10);
  }
  /* floor (bottom-left) */
  g.fillStyle = pal[2]; g.fillRect(0, Q, Q, Q);
  if (fam === 'bar') for (let x = 0; x < Q; x += 32) { g.fillStyle = `hsl(28,40%,${16 + Math.random() * 8}%)`; g.fillRect(x, Q, 30, Q); }
  else if (fam === 'food') for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { g.fillStyle = (x + y) % 2 ? '#1a1a1a' : '#e6e0d4'; g.fillRect(x * 64, Q + y * 64, 64, 64); }
  else { g.strokeStyle = 'rgba(0,0,0,.15)'; for (let k = 0; k < Q; k += 64) { g.beginPath(); g.moveTo(k, Q); g.lineTo(k, 2 * Q); g.moveTo(0, Q + k); g.lineTo(Q, Q + k); g.stroke(); } }
  if (fam === 'bar' || fam === 'food') for (let k = 0; k < 3; k++) { g.fillStyle = 'rgba(0,0,0,.45)'; g.beginPath(); g.ellipse(100 + k * 150, Q + 260, 50, 30, 0, 0, 7); g.fill(); }
  /* ceiling (bottom-right) */
  g.fillStyle = pal[3]; g.fillRect(Q, Q, Q, Q);
  for (let k = 0; k < 3; k++) { const rg = g.createRadialGradient(Q + 100 + k * 150, Q + 250, 4, Q + 100 + k * 150, Q + 250, 90); rg.addColorStop(0, fam === 'bar' ? 'rgba(255,200,120,1)' : 'rgba(255,255,240,1)'); rg.addColorStop(1, 'rgba(255,200,120,0)'); g.fillStyle = rg; g.fillRect(Q, Q, Q, Q); }
  const t = canvasTex(c, true); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; ROOMS[fam] = t; return t;
}
function storefrontMat(c, mk, fam, tint) {
  const m = M({ map: canvasTex(c, true), roughness: 0.4, metalness: 0.05, vertexColors: true });
  const mask = canvasTex(mk), room = roomAtlas(fam);
  m.onBeforeCompile = sh => {
    terrainPatch(sh);
    Object.assign(sh.uniforms, { gmask: { value: mask }, iroom: { value: room }, roomLit: ROOMLIT, gTint: { value: tint } });
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;').replace('gl_Position = projectionMatrix * mvPosition;', 'gl_Position = projectionMatrix * mvPosition; vWP = tWP.xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP; uniform sampler2D gmask, iroom; uniform float roomLit, gTint;')
      .replace('#include <color_fragment>', '')
      .replace('#include <map_fragment>', `#include <map_fragment>
        float gm = texture2D(gmask, vUv).r; vec3 roomCol = vec3(0.);
        vec3 q0 = dFdx(vWP), q1 = dFdy(vWP); vec2 st0 = dFdx(vUv), st1 = dFdy(vUv);
        if (gm > .5 && length(q0) > 1e-6 && length(q1) > 1e-6) {
          float RW = max(vColor.r * 10., .5), RH = max(vColor.g * 10., .5), RD = 4.5;
          vec3 Nf = normalize(cross(q0, q1)); if (dot(Nf, cameraPosition - vWP) < 0.) Nf = -Nf;
          vec3 Tg = normalize(q0 * st1.t - q1 * st0.t), Bg = normalize(-q0 * st1.s + q1 * st0.s);
          vec3 Vd = normalize(vWP - cameraPosition), d = vec3(dot(Vd, Tg), dot(Vd, Bg), -dot(Vd, Nf));
          vec3 o = vec3(clamp(vUv.x, 0., 1.) * RW, clamp(vUv.y, 0., 1.) * RH, 0.); d.z = max(d.z, 0.05);
          d.x = abs(d.x) < 1e-3 ? 1e-3 : d.x; d.y = abs(d.y) < 1e-3 ? 1e-3 : d.y;
          vec3 tt = vec3((d.x > 0. ? RW - o.x : -o.x) / d.x, (d.y > 0. ? RH - o.y : -o.y) / d.y, RD / d.z);
          float tm = min(tt.x, min(tt.y, tt.z)); vec3 h = o + d * tm; vec2 auv;
          if (tm == tt.z) auv = vec2(h.x / RW, h.y / RH) * .5 + vec2(0., .5);
          else if (tm == tt.x) auv = vec2(d.x > 0. ? 1. - h.z / RD : h.z / RD, h.y / RH) * .5 + vec2(.5, .5);
          else if (d.y < 0.) auv = vec2(h.x / RW, 1. - h.z / RD) * .5;
          else auv = vec2(h.x / RW, h.z / RD) * .5 + vec2(.5, 0.);
          roomCol = mapTexelToLinear(texture2D(iroom, auv)).rgb * (1. - h.z / RD * .5) * gTint;
          if (!(roomCol.r >= 0. && roomCol.g >= 0. && roomCol.b >= 0. && roomCol.r < 100.)) roomCol = vec3(0.);
          diffuseColor.rgb = vec3(.01);
        }`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, .04, step(.5, gm));')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += roomCol * roomLit;');
  };
  return m;
}
function buildStorefronts() {
  /* painted wooden shopfronts: window + glazed door + kick plate; the glass shows a dim interior that lights up at night */
  const frames = { bar: ['#173a2a', '#4a1418', '#1a2438'], food: ['#2a1e14', '#5a2a18', '#24343a'], pharmacy: ['#e8ece8', '#d8e0d8', '#f0f0ea'], office: ['#3a3e44', '#2a2e34', '#44484e'], shop: ['#24272c', '#3a2a22', '#1e2a36'] };
  const inside = { bar: ['#2a140c', '#7a4020'], food: ['#3a2414', '#9a6a3a'], pharmacy: ['#b8d8c4', '#f0f4f0'], office: ['#2a343e', '#4a5662'], shop: ['#34363a', '#8a7e6c'] };
  const make = (fam, v) => {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 768; const g = c.getContext('2d');
    const e = document.createElement('canvas'); e.width = 256; e.height = 192; const eg = e.getContext('2d'); eg.fillStyle = '#000'; eg.fillRect(0, 0, 256, 192);
    const fr = frames[fam][v], [i0, i1] = inside[fam], W = 1024, H = 768;
    g.fillStyle = fr; g.fillRect(0, 0, W, H);
    const dx = W * 0.68, glass = [[40, 60, dx - 70, H - 230], [dx + 20, 60, W - dx - 60, H - 110]]; // shop window, door
    for (const [x, y, w, h] of glass) {
      const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, i1); gr.addColorStop(1, i0); g.fillStyle = gr; g.fillRect(x, y, w, h);
      /* interior hints */
      g.fillStyle = 'rgba(0,0,0,.35)';
      if (fam === 'bar') { for (let k = 0; k < 3; k++) g.fillRect(x, y + 70 + k * 46, w, 6); for (let k = 0; k < 40; k++) g.fillRect(x + 10 + Math.random() * (w - 20), y + 40 + ((k % 3) * 46), 8, 26); g.fillRect(x, y + h - 140, w, 40); for (let k = 0; k < 3; k++) { g.beginPath(); g.ellipse(x + 80 + k * (w / 3.3), y + h - 190, 26, 34, 0, 0, 7); g.fill(); g.fillRect(x + 56 + k * (w / 3.3), y + h - 165, 48, 110); } }
      else if (fam === 'food') { for (let k = 0; k < 4; k++) { g.fillRect(x + 30 + k * (w / 4), y + h - 110, w / 6, 10); g.fillRect(x + 30 + k * (w / 4) + w / 12 - 4, y + h - 100, 8, 70); } g.fillStyle = 'rgba(255,230,180,.25)'; for (let k = 0; k < 3; k++) { g.beginPath(); g.arc(x + w * (0.2 + k * 0.3), y + 50, 18, 0, 7); g.fill(); } }
      else if (fam === 'pharmacy') { g.fillStyle = 'rgba(40,120,70,.35)'; for (let k = 0; k < 4; k++) g.fillRect(x + 10, y + 60 + k * 70, w - 20, 8); }
      else for (let k = 0; k < 30; k++) { g.fillStyle = `hsla(${Math.random() * 360},30%,${30 + Math.random() * 40}%,.7)`; g.fillRect(x + 10 + Math.random() * (w - 50), y + 80 + Math.random() * (h - 140), 16 + Math.random() * 30, 20 + Math.random() * 40); }
      /* reflection streak */
      g.fillStyle = 'rgba(255,255,255,.10)'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.35, y); g.lineTo(x, y + h * 0.6); g.fill();
      g.strokeStyle = 'rgba(0,0,0,.6)'; g.lineWidth = 6; g.strokeRect(x, y, w, h);
      const sx = 256 / W, sy = 192 / H, eg2 = eg.createLinearGradient(0, y * sy, 0, (y + h) * sy); eg2.addColorStop(0, fam === 'office' ? '#202830' : '#6a4a2a'); eg2.addColorStop(1, '#1a1008'); eg.fillStyle = eg2; eg.fillRect(x * sx, y * sy, w * sx, h * sy);
    }
    /* window mullions, door handle, kick plate, panel mouldings */
    g.fillStyle = fr; g.fillRect(40 + (dx - 70) / 2 - 5, 60, 10, H - 230); g.fillRect(40, 60 + (H - 230) * 0.28, dx - 70, 8);
    g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(52, H - 150, dx - 94, 110); g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(52, H - 150, dx - 94, 6);
    g.fillStyle = '#c8b070'; g.fillRect(dx + 34, H / 2, 10, 70);
    g.fillStyle = 'rgba(0,0,0,.5)'; g.fillRect(dx - 10, 40, 8, H - 40);
    const mk = document.createElement('canvas'); mk.width = 256; mk.height = 192; const mg = mk.getContext('2d'); mg.fillStyle = '#000'; mg.fillRect(0, 0, 256, 192); mg.fillStyle = '#fff';
    for (const [x, y, w, h] of glass) mg.fillRect(x / 4 + 1, y / 4 + 1, w / 4 - 2, h / 4 - 2);
    return storefrontMat(c, mk, fam, v === 2 && (fam === 'bar' || fam === 'shop') ? 0.45 : 1);
  };
  for (const f of ['bar', 'food', 'pharmacy', 'office', 'shop']) STORE[f] = [0, 1, 2].map(v => make(f, v));
  /* striped awnings */
  STORE.awning = [['#7a1c22', '#e8e0cc'], ['#1c4a2a', '#e8e0cc'], ['#1a2a5a', '#e8e0cc'], ['#2a2a2a', '#c8a040'], ['#7a1c22', '#7a1c22']].map(([a, b]) => {
    const c = document.createElement('canvas'); c.width = 256; c.height = 64; const g = c.getContext('2d');
    for (let k = 0; k < 8; k++) { g.fillStyle = k % 2 ? b : a; g.fillRect(k * 32, 0, 32, 64); }
    g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, 52, 256, 12);
    return M({ map: canvasTex(c, true), roughness: 0.9, side: THREE.DoubleSide });
  });
  MAT.shopFrame = {}; for (const f in frames) MAT.shopFrame[f] = frames[f].map(c => M({ color: c, roughness: 0.55 }));
}
function signAtlases(t, list) {
  t.signMats = [];
  const per = 128;
  for (let a = 0; a * per < list.length; a++) {
    const chunk = list.slice(a * per, (a + 1) * per);
    const c = document.createElement('canvas'); c.width = 1024; c.height = 2048; const g = c.getContext('2d');
    g.fillStyle = '#000'; g.fillRect(0, 0, 1024, 2048);
    chunk.forEach((s, k) => {
      const x = (k % 4) * 256, y = (k / 4 | 0) * 64; const U = (x0, x1) => [x0 / 1024, 1 - (y + 64) / 2048, x1 / 1024, 1 - y / 2048];
      if (s.kind === 'pharmacy') { g.fillStyle = '#0a2a12'; g.fillRect(x, y, 64, 64); g.fillStyle = '#26ff6a'; g.fillRect(x + 24, y + 6, 16, 52); g.fillRect(x + 6, y + 24, 52, 16); s.uv = U(x, x + 64); }
      else if (s.kind === 'tobacco') { g.fillStyle = '#d01818'; g.beginPath(); g.moveTo(x + 32, y + 2); g.lineTo(x + 62, y + 32); g.lineTo(x + 32, y + 62); g.lineTo(x + 2, y + 32); g.fill(); g.fillStyle = '#fff'; g.font = '700 13px "Barlow Condensed",sans-serif'; g.textAlign = 'center'; g.fillText('TABAC', x + 32, y + 37); s.uv = U(x, x + 64); }
      const tx = s.uv ? x + 66 : x, tw = s.uv ? 190 : 256;
      const neon = s.fam === 'bar';
      g.fillStyle = neon ? '#0a0a12' : s.fam === 'pharmacy' ? '#0e5a2a' : pick(['#1e2a3a', '#3a1e1e', '#1e3a2a', '#2a2420', '#101010', '#f2ede2']);
      const light = g.fillStyle === '#f2ede2';
      g.fillRect(tx + 2, y + 2, tw - 4, 60);
      g.font = `${neon ? 'italic 700' : '700'} ${s.name.length > 16 ? 26 : 36}px ${neon ? '"Barlow Condensed"' : 'Georgia, serif'}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      const col = neon ? pick(['#ff4aa0', '#4ae0ff', '#ffe04a', '#ff6a3a', '#b46aff']) : light ? '#1a1a1a' : '#f2e8d0';
      if (neon) { g.shadowColor = col; g.shadowBlur = 10; }
      g.fillStyle = col; g.fillText(s.name, tx + tw / 2, y + 33, tw - 12); g.shadowBlur = 0;
      const nu = [tx / 1024, 1 - (y + 64) / 2048, (tx + tw) / 1024, 1 - y / 2048];
      if (s.uv) s.uv2 = nu; else s.uv = nu;
    });
    const tex = canvasTex(c, true);
    const mat = M({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: MODE.night ? 1.0 : 0, roughness: 0.5, side: THREE.DoubleSide });
    mat.userData.sign = true; t.signMats.push(mat);
    for (const s of chunk) s.mat = mat;
  }
  return t.signMats;
}

/* ---------- tile build (generator, time-sliced) ---------- */
function* buildTile(t, data) {
  const R = srand(t.i * 7919 + t.j * 104729);
  let group = new THREE.Group(); group.matrixAutoUpdate = false;
  t.group = group; t.obs = new Grid(20); t.seg = new Grid(16); t.lights = []; t.walk = []; t.parkSpots = []; t.trees = []; t.shops = []; t.seats = [];
  const gbB = new GB(), gbR = new GB();
  /* road segments index first (needed for shops & curbs) */
  t.jc = data.jc || [];
  t.xc = data.xc || [];
  data.r.forEach((r, ri) => { if (data.bh && data.bh[ri]) r.bh = data.bh[ri]; });
  for (const r of data.r) {
    const p = r.slice(4);
    for (let i = 0; i < p.length - 2; i += 2) {
      const s = [p[i], p[i + 1], p[i + 2], p[i + 3], r[0] / 2 + 0.3, r[1], r[3], r[2], r[0], r.bh ? r.bh[i / 2] : null, r.bh ? r.bh[i / 2 + 1] : null];
      t.seg.add(Math.min(s[0], s[2]) - s[4], Math.min(s[1], s[3]) - s[4], Math.max(s[0], s[2]) + s[4], Math.max(s[1], s[3]) + s[4], s);
    }
  }
  t.ready = true; // enable collision queries as soon as segments exist
  yield;
  let k = 0;
  for (const b of data.b) { addBuilding(gbB, t, b[0], b[1], b.slice(2), R); if (++k % 60 === 0) yield; }
  if (data.na) loadAtlases(t, data.na);
  t.gbPhoto = new GB(); t.gbDrawn = new GB();
  for (const rec of data.lb || []) { addLodBuilding(gbB, t, rec, R); if (++k % 80 === 0) yield; }
  if (t.stadiumRec && !buildStadium(gbB, t, data)) addLodBuilding(gbB, t, t.stadiumRec, R, true);
  t.photoG = new THREE.Group(); t.drawnG = new THREE.Group(); t.photoG.matrixAutoUpdate = t.drawnG.matrixAutoUpdate = false;
  t.gbPhoto.meshes(t.photoG, { cast: true }); t.gbDrawn.meshes(t.drawnG, { cast: true }); group.add(t.photoG, t.drawnG);
  t.photoG.visible = FACADE_PHOTO; t.drawnG.visible = !FACADE_PHOTO; t.gbPhoto = t.gbDrawn = null;
  gbB.meshes(group, { cast: true });
  yield;
  t.hasRP = !!data.rp;
  const kerbBoll = [], bollGrid = new Grid(6), kerbBollP = kerbBoll, bollGridP = bollGrid;
  t.cw = new Grid(8);
  for (const [key, mat, sc] of [['rp', MAT.road, 7], ['rq', MAT.sett, 2.2]]) {
    if (!data[key]) continue;
    const v = data[key].v, I = data[key].i, ox = BX0 + t.i * TILE, oy = BY0 + t.j * TILE;
    const V = q => [ox + v[q * 2] / 10, 0, -(oy + v[q * 2 + 1] / 10)];
    for (let q = 0; q < I.length; q += 3) {
      let A = V(I[q]), B = V(I[q + 1]), C = V(I[q + 2]);
      if ((B[2] - A[2]) * (C[0] - A[0]) - (B[0] - A[0]) * (C[2] - A[2]) < 0) [B, C] = [C, B];
      gbR.tri(mat, A, B, C, [A[0] / sc, -A[2] / sc], [B[0] / sc, -B[2] / sc], [C[0] / sc, -C[2] / sc]);
      const tq = [A[0], -A[2], B[0], -B[2], C[0], -C[2], Math.min(A[0], B[0], C[0]), Math.min(-A[2], -B[2], -C[2]), Math.max(A[0], B[0], C[0]), Math.max(-A[2], -B[2], -C[2])];
      t.cw.add(tq[6], tq[7], tq[8], tq[9], tq);
    }
  }
  t.hasRF = !!(data.rf && data.rf.i.length);
  if (t.hasRF) { /* pedestrian streets: setts from facade to facade minus the paved strips */
    const v = data.rf.v, I = data.rf.i, ox = BX0 + t.i * TILE, oy = BY0 + t.j * TILE, V = q => [ox + v[q * 2] / 10, SW + 0.008, -(oy + v[q * 2 + 1] / 10)];
    for (let q = 0; q < I.length; q += 3) { let A = V(I[q]), B = V(I[q + 1]), C = V(I[q + 2]); if ((B[2] - A[2]) * (C[0] - A[0]) - (B[0] - A[0]) * (C[2] - A[2]) < 0) [B, C] = [C, B]; gbR.tri(MAT.cobble, A, B, C, [A[0] / 2.2, -A[2] / 2.2], [B[0] / 2.2, -B[2] / 2.2], [C[0] / 2.2, -C[2] / 2.2]); }
  }
  /* lines of "potelets" along the edge of the setts, as in the old town */
  for (const ln of data.bl || []) { let acc = R() * 1.7; for (let i = 0; i < ln.length - 2; i += 2) { const ax = ln[i], ay = ln[i + 1], bx = ln[i + 2], by = ln[i + 3], l = Math.hypot(bx - ax, by - ay), nx = -(by - ay) / (l || 1), ny = (bx - ax) / (l || 1); while (acc < l) { const x = ax + (bx - ax) * acc / l - nx * 0.35, y = ay + (by - ay) * acc / l - ny * 0.35; if (R() > 0.12 && !insideBuilding(x, y)) { const nb = new Set(); bollGridP.query(x - 1, y - 1, x + 1, y + 1, nb); if (!nb.size) { bollGridP.add(x, y, x, y, 1); kerbBollP.push(MX(x, 0, -y)); } } acc += 1.7; } acc -= l; } }
  t.fnList = data.fn || []; buildSteps(gbR, t, data.st || []); buildBarriers(gbR, t, data.fn || []);
  if (Math.floor((LICES.O[0] - BX0) / TILE) === t.i && Math.floor((LICES.O[1] - BY0) / TILE) === t.j) buildLices(gbR, t);
  for (const [f, h] of t.churchQ || []) parvis(gbR, t, f, h); t.churchQ = null;

  for (const c of data.cb || []) { addKerb(gbR, t, c, kerbBoll, bollGrid); if (++k % 60 === 0) yield; }
  /* Zébras OSM marqués uniquement ; polygones découpés aux limites des tuiles. */
  for (const c of data.xw || []) gbR.poly(MAT.mark, c, 0.018, 1);
  /* Bateaux : rampe entre chaussée et trottoir au droit du passage marqué. */
  for (const c of data.dr || []) {
    gbR.quad(MAT.curb,
      [c[0], 0.025, -c[1]], [c[2], 0.025, -c[3]],
      [c[4], SW + 0.025, -c[5]], [c[6], SW + 0.025, -c[7]],
      [0,0], [1,0], [1,1], [0,1], [0,1,0]);
  }
  /* Terre-pleins et îlots de circulation explicitement cartographiés dans OSM. */
  for (const c of data.md || []) gbR.poly(MAT.square, c, SW + 0.014, 3); // îlots minéraux
  for (const c of data.mg || []) gbR.poly(MAT.grass, c, SW + 0.014, 4); // îlots engazonnés
  // Places et espaces piétons fermés dans OSM : dalles, pavés ou asphalte selon surface.
  for (const a of data.pa || []) gbR.poly(a[0] === 1 ? MAT.cobble : a[0] === 2 ? MAT.asphalt : MAT.square, a.slice(1), SW + 0.012, a[0] === 1 ? 2.2 : a[0] === 2 ? 7 : 3);
  for (const c of data.ar || []) gbR.poly(MAT.mark, c, 0.024, 1); // flèches de direction OSM
  for (const r of data.r) { addRoad(gbR, t, r); if (++k % 80 === 0) yield; }
  for (const a of data.a) if (a[0] === 1) addPitchLines(gbR, a[1]); // parks, squares, car parks & gardens are painted on the ground (landcover)
  // Anciens passages piétons (points OSM, f[0] === 6) : remplacés par les zèbres xw quand la tuile en a, sinon on les doublerait.
  if (!(data.xw && data.xw.length)) for (const f of data.f) if (f[0] === 6 && inCW(f[1], f[2])) addCrosswalk(gbR, t, f[1], f[2]);
  gbR.meshes(group, { cast: false });
  yield;
  /* sidewalks walk paths + parking spots + generated lamps & trees */
  const grates = [], manholes = [], lampTall = [], lampStd = [], headsTall = [], headsStd = [], pools = [], trees = [], bollards = [], bins = [], benchW = [], benchM = [], shelters = [], tls = [], racks = [];
  const lampGrid = new Grid(10), treeGrid = new Grid(6);
  const okSpot = (x, y, r) => !insideBuilding(x, y) && !roadAtTile(t, x, y) && !inWaterQuick(x, y) && (r === undefined || true);
  const addLamp = (x, y, ang, tall) => {
    const near = new Set(); lampGrid.query(x - 9, y - 9, x + 9, y + 9, near); if (near.size) return;
    lampGrid.add(x, y, x, y, 1);
    const m = MX(x, 0, -y, 0, ang, 0);
    (tall ? lampTall : lampStd).push(m); (tall ? headsTall : headsStd).push(m);
    const hx = tall ? x + Math.cos(ang) * 1.75 : x, hy = tall ? y + Math.sin(ang) * 1.75 : y, hh = tall ? 8.9 : 4.6;
    pools.push(MX(hx, 0.005, -hy, 0, 0, 0, tall ? 18 : 12, 1, tall ? 18 : 12)); t.lights.push([hx, hy, hh]);
  };
  for (const f of data.f) if (f[0] === 3) addLamp(f[1], f[2], R() * 6, false);
  for (const r of data.r) {
    const w = r[0], kind = r[1], flags = r[2], p = r.slice(4); if (kind === 2 || kind === 4) continue;
    let acc = R() * 20;
    const ped = flags & 8, tall = kind === 3 || w >= 9, step = kind === 3 ? 45 : ped ? 17 : 27;
    for (let i = 0; i < p.length - 2; i += 2) {
      const ax = p[i], ay = p[i + 1], bx = p[i + 2], by = p[i + 3], l = Math.hypot(bx - ax, by - ay) || 1, ux = (bx - ax) / l, uy = (by - ay) / l, qx = -uy, qy = ux;
      /* sidewalk walk path for pedestrians */
      if (!isLowered(r) && (ped || kind === 1)) t.walk.push([ax, ay, bx, by]);
      /* parking spots along residential streets */
      /* kerbside parking; on narrow two-way streets cars park half on the sidewalk, as they do in Rennes */
      if (kind === 0 && !ped && w <= 14 && l > 12 && !(flags & 2)) {
        const one = flags & 1, both = one ? w >= 7.5 : w >= 9.6, off = one || both ? w / 2 - 1.0 : w / 2 + 0.35;
        for (const sg of both ? [1, -1] : [1]) for (let s = 6 + (sg < 0 ? 3 : 0); s < l - 5; s += 6.2) t.parkSpots.push([ax + ux * s + qx * sg * off, ay + uy * s + qy * sg * off, Math.atan2(ux, uy)]);
      }
      while (acc < l) {
        const sg = ((acc / step) | 0) % 2 || tall ? 1 : -1;
        const off = kind === 3 ? w / 2 + 1.2 : ped ? w / 2 - 0.6 : w / 2 + 0.7;
        const x = ax + ux * acc + qx * sg * off, y = ay + uy * acc + qy * sg * off;
        if (!insideBuilding(x, y) && !roadAtTile(t, x, y)) addLamp(x, y, Math.atan2(-sg * qy, -sg * qx), tall && !ped);
        acc += step;
      }
      acc -= l;
      /* boulevard trees (in metal tree grates) */
      if (kind === 0 && w >= 9 && !ped) for (let s = R() * 10; s < l; s += 11) for (const sg of [1, -1]) {
        const x = ax + ux * s + qx * sg * (w / 2 + 2.2), y = ay + uy * s + qy * sg * (w / 2 + 2.2);
        const nb = new Set(); treeGrid.query(x - 5, y - 5, x + 5, y + 5, nb);
        if (!nb.size && okSpot(x, y)) { treeGrid.add(x, y, x, y, 1); trees.push([x, y]); grates.push(MX(x, 0.004, -y, 0, Math.atan2(ux, uy), 0)); }
      }
      /* manhole covers */
      if (isLowered(r) && !(flags & 2)) for (let s = 8 + R() * 30; s < l - 2; s += 25 + R() * 30) {
        const o = (R() - 0.5) * w * 0.5; manholes.push(MX(ax + ux * s + qx * o, 0.006, -(ay + uy * s + qy * o), 0, R() * 6, 0));
      }
    }
    if (++k % 120 === 0) yield;
  }
  for (let i = 0; i < data.t.length; i += 2) {
    const x = data.t[i], y = data.t[i + 1]; const nb = new Set(); treeGrid.query(x - 2, y - 2, x + 2, y + 2, nb); if (nb.size) continue;
    treeGrid.add(x, y, x, y, 1); trees.push([x, y]);
    /* street trees next to a carriageway get a tree grate */
    const sg = new Set(); t.seg.query(x - 9, y - 9, x + 9, y + 9, sg);
    for (const r of sg) if ((r[5] === 0 || r[5] === 3) && segNear(x, y, r[0], r[1], r[2], r[3], _q) < r[8] / 2 + 5) { grates.push(MX(x, 0.004, -y, 0, Math.atan2(r[2] - r[0], r[3] - r[1]), 0)); break; }
  }
  for (const p of data.gd || []) { // a few trees in private gardens
    const b = polyBox(p), N = Math.min(8, Math.abs(polyArea(p)) / 220 | 0);
    for (let q = 0; q < N; q++) { const x = b[0] + R() * (b[2] - b[0]), y = b[1] + R() * (b[3] - b[1]); if (inPoly(p, x, y) && !insideBuilding(x, y)) { const nb = new Set(); treeGrid.query(x - 5, y - 5, x + 5, y + 5, nb); if (!nb.size) { treeGrid.add(x, y, x, y, 1); trees.push([x, y]); } } }
  }
  for (const a of data.a) if (a[0] === 0) { // fill parks
    const p = a.slice(1), b = polyBox(p), area = Math.abs(polyArea(p)); const N = Math.min(60, area / 260 | 0);
    for (let q = 0; q < N; q++) { const x = rnd(b[0], b[2]), y = rnd(b[1], b[3]); if (inPoly(p, x, y) && okSpot(x, y)) { const nb = new Set(); treeGrid.query(x - 5, y - 5, x + 5, y + 5, nb); if (!nb.size) { treeGrid.add(x, y, x, y, 1); trees.push([x, y]); } } }
  }
  yield;
  const crownSets = Array.from({ length: 6 }, () => []), trunks = [];
  for (const [x, y] of trees) {
    const s = rnd(0.78, 1.38), rot = R() * 6;
    /* Le choix de silhouette et les proportions sont propres à chaque arbre,
       mais restent déterministes dans la génération de la tuile. */
    const speciesRoll = R();
    const species = speciesRoll < 0.17 ? 0 : speciesRoll < 0.34 ? 1 : speciesRoll < 0.51 ? 2 : speciesRoll < 0.68 ? 3 : speciesRoll < 0.84 ? 4 : 5;
    const crownScale = [1.0, 1.08, 0.94, 0.88, 1.12, 0.98][species];
    trunks.push(MX(x, 0, -y, 0, rot, 0, s, s, s));
    crownSets[species].push(MX(x, 0, -y, 0, rot, 0, s * crownScale, s * rnd(0.88, 1.16), s * crownScale));
    t.obs.add(x - 0.4, y - 0.4, x + 0.4, y + 0.4, { p: [x - 0.3, y - 0.3, x + 0.3, y - 0.3, x + 0.3, y + 0.3, x - 0.3, y + 0.3], b: [x - 0.3, y - 0.3, x + 0.3, y + 0.3], h: 6, tree: true });
  }
  t.trees = trees;
  t.parkSpots = t.parkSpots.filter(([x, y]) => { const nb = new Set(); lampGrid.query(x - 3, y - 3, x + 3, y + 3, nb); treeGrid.query(x - 3, y - 3, x + 3, y + 3, nb); return !nb.size && !insideBuilding(x, y); });
  /* furniture from OSM */
  const signs = [];
  for (const f of data.f) {
    const [ty, x, y] = f;
    const rd = roadAtTile(t, x, y) || (() => { const s = new Set(); t.seg.query(x - 8, y - 8, x + 8, y + 8, s); let b = null, bd = 9; for (const r of s) { if (r[5] === 2 || r[5] === 4) continue; const d = segNear(x, y, r[0], r[1], r[2], r[3], _q); if (d < bd) { bd = d; b = r; } } return b; })();
    const ang = rd ? -Math.atan2(rd[3] - rd[1], rd[2] - rd[0]) : R() * 6;
    if (ty === 0) { const m = MX(x, 0, -y, 0, ang + (R() < 0.5 ? Math.PI : 0), 0); benchW.push(m); benchM.push(m); }
    else if (ty === 1) bins.push(MX(x, 0, -y, 0, ang, 0));
    else if (ty === 4) bollards.push(MX(x, 0, -y));
    else if (ty === 7) racks.push(MX(x, 0, -y, 0, ang, 0));
    else if (ty === 2 && rd && rd[5] !== 2) {
      const d = segNear(x, y, rd[0], rd[1], rd[2], rd[3], _q), side = Math.sign((x - _q[0]) * -(rd[3] - rd[1]) + (y - _q[1]) * (rd[2] - rd[0])) || 1;
      const L = Math.hypot(rd[2] - rd[0], rd[3] - rd[1]) || 1, qx = -(rd[3] - rd[1]) / L * side, qy = (rd[2] - rd[0]) / L * side;
      const sx = _q[0] + qx * (rd[8] / 2 + 2.2), sy = _q[1] + qy * (rd[8] / 2 + 2.2);
      if (!insideBuilding(sx, sy)) shelters.push(MX(sx, 0, -sy, 0, Math.atan2(-qx, qy), 0));
    }
    else if (ty === 5 && rd && (rd[5] === 0 || rd[5] === 3)) {
      const L = Math.hypot(rd[2] - rd[0], rd[3] - rd[1]) || 1, ux = (rd[2] - rd[0]) / L, uy = (rd[3] - rd[1]) / L, qx = -uy, qy = ux;
      for (const sg of [1, -1]) { const px = x + qx * sg * (rd[8] / 2 + 0.6), py = y + qy * sg * (rd[8] / 2 + 0.6); const dx = -ux * sg, dy = -uy * sg; if (!insideBuilding(px, py)) tls.push({ m: MX(px, 0, -py, 0, Math.atan2(dx, -dy), 0), ph: Math.abs(ux) > Math.abs(uy) ? 0 : 1 }); }
    }
  }
  /* real shops & bars (OpenStreetMap): storefront + sign on the facade that faces the street */
  const used = new Map();
  const prio = k => { const f = storeFamily(k); return f === 'bar' ? 0 : f === 'food' ? 1 : 2; };
  for (const p of data.p.slice().sort((a, b) => prio(a[3]) - prio(b[3]))) {
    const [name, x, y, kind, terr] = p;
    const f = facadeFor(x, y); if (!f) continue;
    const fam = storeFamily(kind), ul = used.get(f.key) || [];
    let placed = null;
    for (const Wd0 of fam === 'bar' || fam === 'food' ? [5.5, 4, 3] : [4.5, 3]) { /* bars get first pick, then narrower fronts if the wall is crowded */
      const Wd = Math.min(f.L - 0.9, Wd0); if (Wd < 2.4) break;
      let s = clamp(f.s, Wd / 2 + 0.42, f.L - Wd / 2 - 0.42);
      for (let k = 0; k < 8 && ul.some(q => Math.abs(q[0] - s) < (q[1] + Wd) / 2); k++) s = clamp(f.s + (k % 2 ? -1 : 1) * (Wd * 0.6) * ((k >> 1) + 1), Wd / 2 + 0.42, f.L - Wd / 2 - 0.42);
      if (!ul.some(q => Math.abs(q[0] - s) < (q[1] + Wd) / 2 - 0.05)) { placed = [s, Wd]; break; }
    }
    if (!placed) continue;
    const [s, Wd] = placed; ul.push([s, Wd]); used.set(f.key, ul);
    const cx = f.ax + f.ux * s, cy = f.ay + f.uy * s;
    signs.push({ name: name.toUpperCase(), real: name, kind: kind === 'tobacco' ? 'tobacco' : kind === 'pharmacy' ? 'pharmacy' : kind, fam, x: cx, y: cy, nx: f.nx, ny: f.ny, ux: -f.ny, uy: f.nx, W: Wd, terr: !!terr });
  }
  /* enterable shops + terraces where OpenStreetMap says outdoor_seating=yes */
  const tables = [], chairs = [], parasolsA = [], parasolsB = [];
  for (const sg of signs) {
    if (sg.fam !== 'office') t.shops.push({ name: sg.real, fam: sg.fam, kind: sg.kind, x: sg.x + sg.nx * 0.9, y: sg.y + sg.ny * 0.9, nx: sg.nx, ny: sg.ny, terr: sg.terr, fx: sg.x, fy: sg.y, W: sg.W });
    const soif = Math.hypot(sg.x + 384, sg.y - 124) < 260; /* rue Saint-Michel / Champ-Jacquet / Sainte-Anne: terraces everywhere */
    if ((!sg.terr && !soif) || (sg.fam !== 'bar' && sg.fam !== 'food')) continue;
    const n = Math.max(1, Math.round(sg.W / 1.9)), pa = (sg.real.length % 2 ? parasolsA : parasolsB);
    /* how much open pavement is in front of the shop: tables only where a 3.5 m walkway stays free */
    let free = 0;
    for (let d = 0.5; d < 14; d += 0.5) { const x = sg.x + sg.nx * d, y = sg.y + sg.ny * d; if (insideBuilding(x, y) || onCarriageway(t, x, y, 1.6) || inWaterQuick(x, y)) break; free = d; }
    const rows = soif ? (free >= 9 ? [1.3, 3.1] : free >= 4.6 ? [1.2] : []) : free >= 9.5 ? [1.5, 3.3] : free >= 6 ? [1.4] : [];
    for (const d of rows) for (let k = 0; k < n; k++) {
      let u = (k - (n - 1) / 2) * 1.9;
      if (d < 2 && Math.abs(u) < 1.55) { if (Math.abs(u) < 0.3) continue; u = Math.sign(u) * 1.55; } /* keep the doorway clear */
      const x = sg.x + sg.nx * d + sg.ux * u, y = sg.y + sg.ny * d + sg.uy * u;
      if (insideBuilding(x, y) || onCarriageway(t, x, y, 2.2) || inWaterQuick(x, y) || insideBuilding(x + sg.nx * 0.8, y + sg.ny * 0.8)) continue;
      tables.push(MX(x, 0, -y)); pa.push(MX(x, 0, -y, 0, R() * 6, 0));
      for (const sd of [1, -1]) {
        const cx = x + sg.ux * 0.62 * sd, cy = y + sg.uy * 0.62 * sd, h = Math.atan2(x - cx, y - cy);
        chairs.push(MX(cx, 0, -cy, 0, Math.PI - h, 0)); t.seats.push({ x: cx, y: cy, h, taken: null, bar: sg.fam === 'bar', tile: t });
      }
      t.obs.add(x - 0.4, y - 0.4, x + 0.4, y + 0.4, { p: [x - 0.35, y - 0.35, x + 0.35, y - 0.35, x + 0.35, y + 0.35, x - 0.35, y + 0.35], b: [x - 0.35, y - 0.35, x + 0.35, y + 0.35], h: 1 });
    }
  }
  const gbS = new GB();
  for (const s of signs) {
    const hsh = [...s.name].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) | 0, 7) >>> 0, v = hsh % 3;
    const m = STORE[s.fam][v], o = 0.06, hw = s.W / 2, rx = s.ux, ry = s.uy, bx = s.x + s.nx * o, by = s.y + s.ny * o, N = [s.nx, 0, -s.ny];
    gbS.quad(m, [bx - rx * hw, -0.2, -(by - ry * hw)], [bx + rx * hw, -0.2, -(by + ry * hw)], [bx + rx * hw, 3.6, -(by + ry * hw)], [bx - rx * hw, 3.6, -(by - ry * hw)], [0, 0], [1, 0], [1, 1], [0, 1], N, [s.W / 10, 0.38, 0]);
    /* 3D frame: pilasters and a cornice that carries the sign */
    const box = (x0, x1, z0, z1, d, mm) => { // along u from x0..x1, height z0..z1, depth d off the wall
      const P = (u, z, dd) => [s.x + s.ux * u + s.nx * dd, z, -(s.y + s.uy * u + s.ny * dd)];
      gbS.quad(mm, P(x0, z0, d), P(x1, z0, d), P(x1, z1, d), P(x0, z1, d), [0, 0], [1, 0], [1, 1], [0, 1], N);
      gbS.quad(mm, P(x0, z1, 0), P(x1, z1, 0), P(x1, z1, d), P(x0, z1, d), [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
      gbS.quad(mm, P(x0, z0, 0), P(x0, z0, d), P(x0, z1, d), P(x0, z1, 0), [0, 0], [1, 0], [1, 1], [0, 1], [-s.ux, 0, s.uy]);
      gbS.quad(mm, P(x1, z0, d), P(x1, z0, 0), P(x1, z1, 0), P(x1, z1, d), [0, 0], [1, 0], [1, 1], [0, 1], [s.ux, 0, -s.uy]);
      gbS.quad(mm, P(x0, z0, d), P(x0, z0, 0), P(x1, z0, 0), P(x1, z0, d), [0, 0], [1, 0], [1, 1], [0, 1], [0, -1, 0]);
    };
    const fm = MAT.shopFrame[s.fam][v];
    box(-hw - 0.22, -hw + 0.02, -0.2, 3.6, 0.14, fm); box(hw - 0.02, hw + 0.22, -0.2, 3.6, 0.14, fm); box(-hw - 0.3, hw + 0.3, 3.6, 4.35, 0.2, fm);
    /* storefront portal: recessed-looking stone sill, transom and slim metal glazing bars.
       Everything stays in gbS, so the new architecture is merged with the other shop geometry. */
    const trim = MAT.metalLight || MAT.metal, sill = MAT.wallLow || fm;
    box(-hw + 0.02, hw - 0.02, -0.18, -0.04, 0.19, sill);
    box(-hw + 0.04, hw - 0.04, 2.88, 2.96, 0.16, trim);
    box(-hw + 0.04, hw - 0.04, 3.34, 3.42, 0.16, trim);
    /* two display-window bays receive vertical mullions; avoid crowding narrow frontages */
    if (s.W > 4.2) {
      for (const u of [-hw * 0.52, -hw * 0.02, hw * 0.48]) box(u - 0.035, u + 0.035, 0.18, 2.88, 0.17, trim);
      for (const z of [1.12, 2.05]) box(-hw + 0.08, hw - 0.08, z - 0.025, z + 0.025, 0.17, trim);
    } else {
      box(0.02, 0.09, 0.18, 2.88, 0.17, trim);
      box(-hw + 0.08, hw - 0.08, 1.55, 1.61, 0.17, trim);
    }
    /* door leaf edge, kick plate and handle on the right-hand bay */
    const doorU = hw * 0.48;
    box(doorU - 0.025, doorU + 0.025, 0.12, 2.92, 0.19, trim);
    box(doorU + 0.12, doorU + 0.18, 0.12, 0.62, 0.2, trim);
    box(doorU + 0.11, doorU + 0.15, 1.18, 1.52, 0.22, trim);
    /* compact wall sconces above selected entrances, with a projecting hood */
    if (hsh % 3 !== 1) {
      const lampU = hw + 0.38;
      box(lampU - 0.07, lampU + 0.07, 3.12, 3.30, 0.24, trim);
      box(lampU - 0.13, lampU + 0.13, 3.30, 3.36, 0.32, MAT.lampHead || trim);
    }
    if ((s.fam === 'bar' || s.fam === 'food') && (s.terr || hsh % 5 < 3)) { /* fabric awning */
      const am = STORE.awning[hsh % STORE.awning.length], P = (u, z, dd) => [s.x + s.ux * u + s.nx * dd, z, -(s.y + s.uy * u + s.ny * dd)];
      gbS.quad(am, P(-hw, 3.55, 0.2), P(hw, 3.55, 0.2), P(hw, 2.75, 1.45), P(-hw, 2.75, 1.45), [0, 0], [s.W / 1.6, 0], [s.W / 1.6, 1], [0, 1], [s.nx * 0.5, 1, -s.ny * 0.5]);
      gbS.quad(am, P(-hw, 2.75, 1.45), P(hw, 2.75, 1.45), P(hw, 2.5, 1.45), P(-hw, 2.5, 1.45), [0, 0.8], [s.W / 1.6, 0.8], [s.W / 1.6, 1], [0, 1], N);
      /* slim metal support arms: paired diagonal braces and a front rail make the canopy read as a built structure */
      const steel = MAT.metalLight || MAT.metal;
      for (const u of [-hw + 0.18, hw - 0.18]) {
        const a = P(u - 0.035, 3.48, 0.22), b = P(u + 0.035, 3.48, 0.22), c = P(u + 0.035, 3.40, 0.34), d = P(u - 0.035, 3.40, 0.34);
        gbS.quad(steel, a, b, c, d, [0,0], [1,0], [1,1], [0,1], N);
        const e = P(u - 0.035, 3.42, 0.32), f = P(u + 0.035, 3.42, 0.32), g = P(u + 0.035, 2.78, 1.38), h0 = P(u - 0.035, 2.78, 1.38);
        gbS.quad(steel, e, f, g, h0, [0,0], [1,0], [1,1], [0,1], N);
        /* small wall mounting plate */
        box(u - 0.09, u + 0.09, 3.28, 3.62, 0.17, steel);
      }
      /* rigid front hem and end caps */
      box(-hw - 0.04, hw + 0.04, 2.48, 2.55, 1.43, steel);
    }
    if (s.fam === 'bar' || s.fam === 'food') t.lights.push([s.x + s.nx * 1.5, s.y + s.ny * 1.5, 3.2, s.fam === 'bar' ? 3 : 0]);
  }
  const smats = signAtlases(t, signs);
  for (const s of signs) {
    if (!s.mat) continue;
    const [u0, v0, u1, v1] = s.uv;
    if (s.kind === 'pharmacy' || s.kind === 'tobacco') {
      const cx = s.x + s.nx * 0.6, cy = s.y + s.ny * 0.6, h = 4.95, w = 0.45;
      gbS.quad(s.mat, [cx - s.nx * w, h - w, -(cy - s.ny * w)], [cx + s.nx * w, h - w, -(cy + s.ny * w)], [cx + s.nx * w, h + w, -(cy + s.ny * w)], [cx - s.nx * w, h + w, -(cy - s.ny * w)], [u0, v0], [u1, v0], [u1, v1], [u0, v1], [s.ux, 0, -s.uy]);
      t.lights.push([cx, cy, h, s.kind === 'pharmacy' ? 1 : 2]);
    }
    const W = Math.min(s.W + 0.4, 0.8 + s.name.length * 0.22), H = 0.55, cx = s.x + s.nx * 0.22, cy = s.y + s.ny * 0.22, h = 3.975;
    gbS.quad(s.mat, [cx - s.ux * W / 2, h - H / 2, -(cy - s.uy * W / 2)], [cx + s.ux * W / 2, h - H / 2, -(cy + s.uy * W / 2)], [cx + s.ux * W / 2, h + H / 2, -(cy + s.uy * W / 2)], [cx - s.ux * W / 2, h + H / 2, -(cy - s.uy * W / 2)], s.kind === 'pharmacy' || s.kind === 'tobacco' ? [s.uv2[0], s.uv2[1]] : [u0, v0], s.kind === 'pharmacy' || s.kind === 'tobacco' ? [s.uv2[2], s.uv2[1]] : [u1, v0], s.kind === 'pharmacy' || s.kind === 'tobacco' ? [s.uv2[2], s.uv2[3]] : [u1, v1], s.kind === 'pharmacy' || s.kind === 'tobacco' ? [s.uv2[0], s.uv2[3]] : [u0, v1], [s.nx, 0, -s.ny]);
    if (['bar', 'pub', 'nightclub'].includes(s.kind)) t.lights.push([cx + s.nx * 0.5, cy + s.ny * 0.5, h, 3]);
  }
  gbS.meshes(group, {});
  instanced(group, PROPS.manhole, MAT.manhole, manholes);
  const props = new THREE.Group(); props.position.y = SW; props.matrixAutoUpdate = false; props.updateMatrix(); group.add(props); t.props = props;
  const G0 = group; group = props;
  instanced(group, PROPS.lampTallPole, MAT.metal, lampTall, true); instanced(group, PROPS.lampTallHead, MAT.lampHead, headsTall);
  instanced(group, PROPS.lampPole, MAT.metal, lampStd, true); instanced(group, PROPS.lampHead, MAT.lampHead, headsStd);
  t.pools = instanced(group, POOLGEO, poolMat, pools); eachInst(t.pools, im => im.receiveShadow = false);
  instanced(group, PROPS.trunk, MAT.trunk, trunks, true);
  const crownGeometries = [PROPS.crownA, PROPS.crownB, PROPS.crownC, PROPS.crownD, PROPS.crownE, PROPS.crownF];
  for (let i = 0; i < crownGeometries.length; i++) {
    const h = instanced(group, crownGeometries[i], MAT.leaves, crownSets[i], true);
    eachInst(h, im => im.customDepthMaterial = MAT.leafDepth);
  }
  instanced(group, PROPS.bollard, MAT.bollard, bollards.concat(kerbBoll)); instanced(group, PROPS.grate, MAT.grate, grates); instanced(group, PROPS.bin, MAT.binGreen, bins);
  instanced(group, PROPS.bistroTable, MAT.metal, tables, true); instanced(group, PROPS.chair, MAT.rattan, chairs, true);
  instanced(group, PROPS.parasol, MAT.parasolA, parasolsA, true); instanced(group, PROPS.parasol, MAT.parasolB, parasolsB, true); instanced(group, PROPS.parasolPole, MAT.metalLight, parasolsA.concat(parasolsB));
  instanced(group, PROPS.benchWood, MAT.wood, benchW); instanced(group, PROPS.benchMetal, MAT.metal, benchM); instanced(group, PROPS.bikeRack, MAT.metalLight, racks);
  instanced(group, PROPS.shelterFrame, MAT.metalLight, shelters, true); instanced(group, PROPS.shelterGlass, MAT.glassBus, shelters); instanced(group, PROPS.busSign, MAT.busSign, shelters);
  const tlm = tls.map(o => o.m); instanced(group, PROPS.tlPole, MAT.metal, tlm, true);
  t.tl = [0, 1].map(ph => { const ms = tls.filter(o => o.ph === ph).map(o => o.m); return { r: instanced(group, PROPS.tlRed, MAT.tl.r, ms), a: instanced(group, PROPS.tlAmb, MAT.tl.a, ms), g: instanced(group, PROPS.tlGrn, MAT.tl.g, ms) }; });
  group = G0;
  group.updateMatrixWorld(true);
  scene.add(group);
  t.built = true;
}
function inWaterQuick(x, y) { const s = new Set(); waterGrid.query(x, y, x, y, s); for (const w of s) if (inPoly(w.p, x, y)) return true; return false; }

/* ---------- tile manager ---------- */
const LOAD_R = 700, UNLOAD_R = 900, FAR_R = 780;
let building = null; const buildQueue = [];
function tileCenter(i, j) { return [BX0 + (i + 0.5) * TILE, BY0 + (j + 0.5) * TILE]; }
const tileSet = new Set();
function initTiles() { for (const [i, j] of GD.tiles) tileSet.add(tkey(i, j)); }
function updateTiles(px, py) {
  for (const key of tileSet) {
    const i = (key / 1000) | 0, j = key % 1000, [cx, cy] = tileCenter(i, j), d = Math.max(0, Math.hypot(cx - px, cy - py) - TILE * 0.7);
    const t = tiles.get(key);
    if (d < LOAD_R && !t) {
      const nt = { i, j, key, d, ready: false, built: false, obs: new Grid(20), seg: new Grid(16) };
      tiles.set(key, nt);
      fetch(`tiles/t${i}_${j}.json`).then(r => r.json()).then(data => { nt.data = data; buildQueue.push(nt); }).catch(() => { });
    } else if (t && d > UNLOAD_R && t.built) unloadTile(t);
    if (t) { t.d = d; if (t.group) t.group.visible = d < FAR_R; if (t.props) { t.props.visible = d < 300; t.props.traverse(o => { if (o.userData.bs) { const dd = Math.hypot(o.userData.bs.center.x - px, -o.userData.bs.center.z - py) - o.userData.bs.radius; o.visible = dd < (o.userData.cast ? 260 : 110); o.castShadow = o.userData.cast && dd < 70; } }); } }
  }
}
function unloadTile(t) {
  for (const p of peds.slice()) if (p.seat && p.seat.tile === t && !p.keep) removePed(p);
  if (t.group) { scene.remove(t.group); t.group.traverse(o => { if (o.geometry && !Object.values(PROPS).includes(o.geometry) && o.geometry !== POOLGEO) o.geometry.dispose(); }); }
  for (const m of t.signMats || []) { m.map.dispose(); m.dispose(); const i = allMats.indexOf(m); if (i >= 0) allMats.splice(i, 1); }
  if (t.atlas) for (const m of t.atlas) { m.map.dispose(); m.dispose(); const i = allMats.indexOf(m); if (i >= 0) allMats.splice(i, 1); }
  tiles.delete(t.key);
}
function pumpTiles(budgetMs) {
  const t0 = performance.now();
  while (performance.now() - t0 < budgetMs) {
    if (!building) {
      if (!buildQueue.length) return;
      buildQueue.sort((a, b) => a.d - b.d);
      const t = buildQueue.shift(); if (!tiles.has(t.key)) continue;
      building = buildTile(t, t.data);
    }
    const r = building.next(); if (r.done) building = null;
  }
}
function tilesPending() { return buildQueue.length + (building ? 1 : 0) + [...tiles.values()].filter(t => !t.data).length; }

/* ---------- global ground + water ---------- */
function gridGeo(size, step) {
  const n = Math.round(size / step), g = new THREE.PlaneGeometry(n * step, n * step, n, n); g.rotateX(-Math.PI / 2); return g;
}
let groundNear = null, groundFine = null, GSTEP = 6; const FINE_SZ = 160, GFINE = { value: new THREE.Vector4(0, 0, -1, 0) };
let LCD = null;
function lcSquare(x, y) { if (!LCD) return false; const u = Math.floor((x - BX0) / (BX1 - BX0) * LCD.w), v = Math.floor((1 - (y - BY0) / (BY1 - BY0)) * LCD.h); if (u < 0 || v < 0 || u >= LCD.w || v >= LCD.h) return false; return LCD.d[(v * LCD.w + u) * 4 + 1] > 90; }
function lcGrass(x, y) { if (!LCD) return true; const u = Math.floor((x - BX0) / (BX1 - BX0) * LCD.w), v = Math.floor((1 - (y - BY0) / (BY1 - BY0)) * LCD.h); if (u < 0 || v < 0 || u >= LCD.w || v >= LCD.h) return true; return LCD.d[(v * LCD.w + u) * 4] > 90; }
/* where the ground itself is laid with granite setts (Place des Lices, lower square): a 1 m mask from the relief, softened */
const COB = { tex: null, box: new THREE.Vector4(-575, 15, 150, 105) };
function buildCobbleMask() {
  const [x0, y0, W, H] = [COB.box.x, COB.box.y, COB.box.z, COB.box.w], a = new Float32Array(W * H), d = new Uint8Array(W * H * 4);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const x = x0 + i + 0.5, y = y0 + j + 0.5, e = Math.min(i, j, W - 1 - i, H - 1 - j); a[j * W + i] = th(x, y) < 3.6 ? Math.min(1, e / 8) : 0; }
  for (let pass = 0; pass < 2; pass++) { const b = a.slice(); for (let j = 1; j < H - 1; j++) for (let i = 1; i < W - 1; i++) { let s = 0; for (let v = -1; v <= 1; v++) for (let u = -1; u <= 1; u++) s += b[(j + v) * W + i + u]; a[j * W + i] = s / 9; } }
  for (let k = 0; k < W * H; k++) { d[k * 4] = Math.round(a[k] * 255); d[k * 4 + 3] = 255; }
  COB.tex = new THREE.DataTexture(d, W, H, THREE.RGBAFormat, THREE.UnsignedByteType); COB.tex.magFilter = COB.tex.minFilter = THREE.LinearFilter; COB.tex.needsUpdate = true;
}
function buildGlobal(maskImg, lcImg) {
  { const c = document.createElement('canvas'); c.width = lcImg.width; c.height = lcImg.height; const g = c.getContext('2d'); g.drawImage(lcImg, 0, 0); LCD = { w: c.width, h: c.height, d: g.getImageData(0, 0, c.width, c.height).data }; }
  const mask = new THREE.Texture(maskImg); mask.needsUpdate = true; mask.flipY = true;
  const lc = new THREE.Texture(lcImg); lc.needsUpdate = true; lc.flipY = true; lc.anisotropy = 4;
  /* raised sidewalk level: granite slabs in the centre, asphalt further out, parks/squares/car parks from the landcover map;
     cut out (stencil) above carriageways; a fine grid follows the player so the relief is smooth */
  const g = MAT.groundTex;
  buildCobbleMask();
  const mkMat = fine => { const mat = new THREE.MeshStandardMaterial({ map: g.slab.map, normalMap: g.slab.normalMap, roughnessMap: null, color: MAT.groundAlbedo, roughness: 1 });
  Object.assign(mat, { stencilWrite: true, stencilRef: 1, stencilFunc: THREE.NotEqualStencilFunc });
  allMats.push(mat);
  mat.customProgramCacheKey = () => fine ? 'groundFine' : 'groundCoarse'; /* the two variants must not share one compiled program */
  const cxz = new THREE.Vector2(CENTER.x, -CENTER.y);
  mat.onBeforeCompile = sh => {
    terrainPatch(sh);
    Object.assign(sh.uniforms, { wmask: { value: mask }, lcov: { value: lc }, wb: { value: new THREE.Vector4(BX0, BY0, BX1 - BX0, BY1 - BY0) }, map2: { value: g.sw.map }, nmap2: { value: g.sw.normalMap }, rmap2: { value: g.sw.roughnessMap }, gmap: { value: g.grass.map }, smap: { value: g.slab.map }, amap: { value: g.asphalt.map }, cxz: { value: cxz }, gfine: GFINE, cobM: { value: COB.tex }, cobB: { value: COB.box }, cmap: { value: g.cobble.map }, cnmap: { value: g.cobble.normalMap } });
    /* street surfaces laid on the ground (blue channel of the relief texture): the ground sinks 8 cm under them */
    sh.vertexShader = sh.vertexShader.replace('void main() {', `float dOvl(vec2 xz) { if (dInfo.y < .5) return 0.; vec2 g = vec2((xz.x - dInfo.x) / dInfo.z - .5, (dInfo.w + xz.y) / dInfo.z - .5);
  if (g.x <= 0. || g.y <= 0. || g.x >= dSize.x - 1.001 || g.y >= dSize.y - 1.001) return 0.; vec2 i = floor(g), t = g - i;
  float a = texture2D(dMap, (i + .5) / dSize).b, b = texture2D(dMap, (i + vec2(1.5, .5)) / dSize).b, c = texture2D(dMap, (i + vec2(.5, 1.5)) / dSize).b, d = texture2D(dMap, (i + 1.5) / dSize).b;
  return mix(mix(a, b, t.x), mix(c, d, t.x), t.y); }
void main() {`).replace('tWP.y += terrainH(tWP.xz);', 'tWP.y += terrainH(tWP.xz) - 0.08 * dOvl(tWP.xz);');
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vW;')
      .replace('#include <uv_vertex>', '#include <uv_vertex>\nvUv = (modelMatrix * vec4(position, 1.)).xz * vec2(1., -1.) / 2.4;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvW=(modelMatrix*vec4(position,1.)).xz;');
    const zc = 'float zc=smoothstep(1050.,1350.,length(vW-cxz)+110.*sin(vW.x*.011)*sin(vW.y*.013));vec2 uv2=vUv*.8;vec2 mu=vec2((vW.x-wb.x)/wb.z,(-vW.y-wb.y)/wb.w);vec3 LC=(mu.x>0.&&mu.x<1.&&mu.y>0.&&mu.y<1.)?texture2D(lcov,mu).rgb:vec3(0.);vec2 cu=vec2((vW.x-cobB.x)/cobB.z,(-vW.y-cobB.y)/cobB.w);float cm=(cu.x>0.&&cu.x<1.&&cu.y>0.&&cu.y<1.)?texture2D(cobM,cu).r:0.;';
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vW;uniform sampler2D wmask,map2,nmap2,rmap2,lcov,gmap,smap,amap;uniform vec4 wb;uniform vec2 cxz;uniform vec4 gfine;uniform sampler2D cobM,cmap,cnmap;uniform vec4 cobB;')
      .replace('void main() {', 'void main() {\n' + zc + (fine ? '' : 'if(all(lessThan(abs(vW-gfine.xy),vec2(gfine.z))))discard;\n') + 'if(mu.x>0.&&mu.x<1.&&mu.y>0.&&mu.y<1.&&texture2D(wmask,mu).r>.5)discard;\n')
      .replace('#include <map_fragment>', `vec4 texelColor=mapTexelToLinear(mix(texture2D(map,vUv),texture2D(map2,uv2),zc));
        texelColor.rgb=mix(texelColor.rgb,mapTexelToLinear(texture2D(amap,vUv*.34)).rgb*.62,LC.b);
        texelColor.rgb=mix(texelColor.rgb,mapTexelToLinear(texture2D(smap,vUv*.42)).rgb*vec3(1.13,1.14,1.17),LC.g);
        texelColor.rgb=mix(texelColor.rgb,mapTexelToLinear(texture2D(gmap,vUv*.6)).rgb*vec3(.55,.8,.42),LC.r);
        texelColor.rgb=mix(texelColor.rgb,mapTexelToLinear(texture2D(cmap,vUv*1.09)).rgb*.8,cm);
        diffuseColor*=texelColor;`)
      .replace('#include <roughnessmap_fragment>', THREE.ShaderChunk.roughnessmap_fragment.replace('texture2D( roughnessMap, vUv )', 'mix(mix(texture2D(roughnessMap,vUv),texture2D(rmap2,uv2),zc),vec4(1.),max(LC.r,LC.b))'))
      .replace('#include <normal_fragment_maps>', THREE.ShaderChunk.normal_fragment_maps.replace('texture2D( normalMap, vUv )', 'mix(mix(mix(texture2D(normalMap,vUv),texture2D(nmap2,uv2),zc),vec4(.5,.5,1.,1.),max(LC.r,LC.b)*.8),texture2D(cnmap,vUv*1.09),cm)'));
  };
  return mat; };
  const mat = mkMat(false), matF = mkMat(true); MAT.ground = mat; MAT.groundF = matF;
  groundNear = new THREE.Mesh(gridGeo(1300, GSTEP), mat); groundNear.position.y = SW; groundNear.receiveShadow = true; groundNear.frustumCulled = false; scene.add(groundNear);
  /* 1 m grid around the player, on the centres of the detailed relief texels, so the visible ground is the ground walked on */
  groundFine = new THREE.Mesh(gridGeo(FINE_SZ, 1), matF); groundFine.position.y = SW; groundFine.receiveShadow = true; groundFine.frustumCulled = false; scene.add(groundFine);
  const far = new THREE.Mesh(gridGeo(Math.max(BX1 - BX0, BY1 - BY0) + 2400, 30), mat);
  far.position.set((BX0 + BX1) / 2, SW - 1.6, -(BY0 + BY1) / 2); far.receiveShadow = true; far.frustumCulled = false; scene.add(far);
  /* water + quays */
  const gb = new GB();
  for (const w of GD.water) {
    const p0 = ccw(w), p = [];
    for (let i = 0, n = p0.length / 2; i < n; i++) { const ax = p0[i * 2], ay = p0[i * 2 + 1], bx = p0[((i + 1) % n) * 2], by = p0[((i + 1) % n) * 2 + 1], k = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / 12)); for (let q = 0; q < k; q++) p.push(ax + (bx - ax) * q / k, ay + (by - ay) * q / k); }
    gb.poly(MAT.water, p, -1.4, 1);
    const n = p.length / 2;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n, ax = p[i * 2], ay = p[i * 2 + 1], bx = p[j * 2], by = p[j * 2 + 1], L = Math.hypot(bx - ax, by - ay) || 1, nx = -(by - ay) / L, ny = (bx - ax) / L;
      gb.quad(MAT.quay, [ax, -1.6, -ay], [bx, -1.6, -by], [bx, SW, -by], [ax, SW, -ay], [0, 0], [L / 3, 0], [L / 3, 0.55], [0, 0.55], [nx, 0, -ny]);
    }
  }
  const grp = new THREE.Group(); gb.meshes(grp, {}); scene.add(grp);
}

function updateGround(px, py) {
  if (groundNear) { groundNear.position.x = Math.round(px / GSTEP) * GSTEP; groundNear.position.z = -Math.round(py / GSTEP) * GSTEP; groundNear.updateMatrix(); }
  if (groundFine) { const hr = TD ? TDRES / 2 : 0.5, ox = TD ? TDX0 + hr : hr, oy = TD ? TDY1 - hr : hr, gx = ox + Math.round((px - ox) / 4) * 4, gy = oy + Math.round((py - oy) / 4) * 4;
    groundFine.position.x = gx; groundFine.position.z = -gy; groundFine.updateMatrix(); GFINE.value.set(gx, -gy, FINE_SZ / 2 - 1, 0); }
}
