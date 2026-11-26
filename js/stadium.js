'use strict';
/* ===== Roazhon Park: compact bowl of four covered stands with closed corners (≈29 800 red seats),
   two tiers on the long sides (Vilaine, Lorient), single tier behind the goals (Mordelles, Rennes),
   aisles with steps, vomitories, corner tunnels to walk in, roof ring at ≈27 m, LED boards, goals, benches ===== */
function stadiumMats() {
  if (MAT.stSeat) return;
  MAT.stSeat = M({ color: 0xffffff, roughness: 0.55 });
  MAT.stConc = M({ ...MAT.groundTex.concrete, color: 0xb4b0a8, roughness: 0.9 });
  MAT.stConcD = M({ ...MAT.groundTex.concrete, color: 0x8a8680, roughness: 0.9, side: THREE.DoubleSide });
  MAT.stStep = M({ ...MAT.groundTex.concrete, color: 0xd8d4cc, roughness: 0.8 });
  MAT.stDark = M({ color: 0x141414, roughness: 0.9 });
  MAT.stRoof = M({ color: 0xdcdcdc, roughness: 0.45, metalness: 0.5, side: THREE.DoubleSide });
  MAT.stRoofU = M({ color: 0x2a2c30, roughness: 0.7, metalness: 0.4, side: THREE.DoubleSide });
  MAT.stRail = M({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.7 });
  MAT.stWhite = M({ color: 0xf4f4f4, roughness: 0.5 });
  MAT.stLight = M({ color: 0xfff1d0, emissive: 0xfff4e0, emissiveIntensity: 1.5, side: THREE.DoubleSide }); MAT.stLight.userData.sign = true;
  { // exterior cladding: vertical grey panels with a red band
    const c = document.createElement('canvas'); c.width = 256; c.height = 256; const g = c.getContext('2d');
    g.fillStyle = '#9a9ea4'; g.fillRect(0, 0, 256, 256); for (let x = 0; x < 256; x += 32) { g.fillStyle = `rgb(${140 + Math.random() * 20},${144 + Math.random() * 20},${150 + Math.random() * 20})`; g.fillRect(x + 1, 0, 30, 256); }
    g.fillStyle = '#b0141c'; g.fillRect(0, 40, 256, 18);
    MAT.stClad = M({ map: canvasTex(c, true), roughness: 0.5, metalness: 0.3 });
  }
  { // LED boards
    const c = document.createElement('canvas'); c.width = 1024; c.height = 64; const g = c.getContext('2d');
    const txt = ['ROAZHON PARK', 'ROUGE ET NOIR', 'ALLEZ RENNES', 'BREIZH', 'ROAZHON PARK', 'RENNES'];
    for (let k = 0; k < 6; k++) { g.fillStyle = k % 2 ? '#b0141c' : '#111'; g.fillRect(k * 171, 0, 171, 64); g.fillStyle = '#fff'; g.font = '700 30px "Barlow Condensed",Arial'; g.textAlign = 'center'; g.fillText(txt[k], k * 171 + 85, 43); }
    MAT.stLed = M({ map: canvasTex(c, true), emissiveMap: canvasTex(c, true), emissive: 0xffffff, emissiveIntensity: 0.8, roughness: 0.3 }); MAT.stLed.userData.sign = true;
  }
  { // goal net
    const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); g.strokeStyle = '#fff'; g.lineWidth = 2;
    for (let k = 0; k <= 64; k += 8) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k, 64); g.moveTo(0, k); g.lineTo(64, k); g.stroke(); }
    MAT.stNet = M({ map: canvasTex(c), transparent: true, alphaTest: 0.3, side: THREE.DoubleSide, roughness: 0.9 }); MAT.stNet.map.repeat.set(8, 4);
  }
  { // stand names
    MAT.stName = {};
    for (const n of ['VILAINE', 'LORIENT', 'MORDELLES', 'RENNES']) {
      const c = document.createElement('canvas'); c.width = 1024; c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#b0141c'; g.fillRect(0, 0, 1024, 128); g.fillStyle = '#fff'; g.font = '700 84px "Barlow Condensed",Arial'; g.textAlign = 'center'; g.fillText('TRIBUNE ' + n, 512, 98);
      MAT.stName[n] = M({ map: canvasTex(c, true), roughness: 0.6 });
    }
  }
  for (const k of ['stConc', 'stStep', 'stDark', 'stClad', 'stWhite']) MAT[k].side = THREE.DoubleSide;
  for (const k in MAT.stName) MAT.stName[k].side = THREE.DoubleSide;
}
function buildStadium(gb, t, data) {
  let m = null;
  for (const a of data.a) if (a[0] === 1) { const q = a[1], cx = (q[0] + q[4]) / 2, cy = (q[1] + q[5]) / 2; if (Math.hypot(cx - GD.stadium[0], cy - GD.stadium[1]) < 140) m = q; }
  if (!m) return false;
  stadiumMats();
  const c = [(m[0] + m[4]) / 2, (m[1] + m[5]) / 2], e1 = [m[2] - m[0], m[3] - m[1]], e2 = [m[6] - m[0], m[7] - m[1]];
  let Lr = Math.hypot(...e1), Wr = Math.hypot(...e2), u = [e1[0] / Lr, e1[1] / Lr];
  if (Wr > Lr) { [Lr, Wr] = [Wr, Lr]; u = [e2[0] / Lr, e2[1] / Lr]; }
  const v = [-u[1], u[0]], HL = 52.5, HW = 34; // FIFA pitch 105 x 68, centred on the real one
  const W = (a, b, z) => [c[0] + u[0] * a + v[0] * b, z, -(c[1] + u[1] * a + v[1] * b)];
  const WX = (a, b) => [c[0] + u[0] * a + v[0] * b, c[1] + u[1] * a + v[1] * b];
  /* ring polyline at offset d from the pitch rectangle (front of stands 7 m behind touchlines, 9 m behind goal lines), chamfered corners */
  const ring = d => { const A = HL + 9 + d, B = HW + 7 + d, k = 10 + d * 0.75; return [[A - k, -B], [A, -B + k], [A, B - k], [A - k, B], [-A + k, B], [-A, B - k], [-A, -B + k], [-A + k, -B]]; };
  const edgeInfo = []; // per ring edge: [i, j, isCorner, standName]
  const names = [null, u[0] > 0 ? 'RENNES' : 'MORDELLES', null, v[1] < 0 ? 'VILAINE' : 'LORIENT', null, u[0] > 0 ? 'MORDELLES' : 'RENNES', null, v[1] < 0 ? 'LORIENT' : 'VILAINE'];
  for (let i = 0; i < 8; i++) edgeInfo.push([i, (i + 1) % 8]);
  /* ring 0..7: edges 0:A side(+u end, between corners), 1 corner, 2: +v long side, ... ; edge i goes from vertex i to i+1 */
  const sideOf = i => i % 2; // odd edges are the four straight stands, even edges the closed corners
  const twoTier = i => i === 3 || i === 7;
  /* row profile */
  const rows = [];
  for (let k = 0; k < 44; k++) {
    const lower = k < 24, upper = k >= 26;
    if (k === 24 || k === 25) { rows.push({ d: rows[rows.length - 1].d + rows[rows.length - 1].dep, dep: 1.3, z: rows[rows.length - 1].z + 0.35, concourse: true }); continue; }
    const prev = rows[rows.length - 1];
    rows.push({ d: prev ? prev.d + prev.dep : 0, dep: 0.8, z: prev ? prev.z + (upper ? 0.5 : 0.38) : 1.6, upper, k });
  }
  const seats = [], seatCols = [], steps = [], rails = [];
  const red = new THREE.Color(0xb0141c), black = new THREE.Color(0x151515), white = new THREE.Color(0xe8e8e8);
  const tunnelHalf = 3, tunnelH = 4.2;
  for (const [i, j] of edgeInfo) {
    const side = sideOf(i), corner = side === 0;
    const maxK = corner ? 44 : twoTier(i) ? 44 : 34; // ends and corners stop lower than the long two-tier sides... corners follow neighbours
    for (const r of rows) {
      if (r.k !== undefined && r.k >= maxK) break;
      if (!twoTier(i) && !corner && r.concourse) { /* single tier behind goals keeps stepping */ }
      const p0 = ring(r.d), p1 = ring(r.d + r.dep), a0 = p0[i], b0 = p0[j], a1 = p1[i], b1 = p1[j];
      const L = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), tx = (b0[0] - a0[0]) / L, ty = (b0[1] - a0[1]) / L;
      const zNext = (rows[rows.indexOf(r) + 1] || r).z;
      const tunnel = corner && r.z < tunnelH; // corner tunnels: walk in under the stands
      const segs = tunnel ? [[0, L / 2 - tunnelHalf], [L / 2 + tunnelHalf, L]] : [[0, L]];
      for (const [s0, s1] of segs) {
        if (s1 - s0 < 0.1) continue;
        const f0 = s0 / L, f1 = s1 / L, lerp = (p, q, f) => [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f];
        const A0 = lerp(a0, b0, f0), B0 = lerp(a0, b0, f1), A1 = lerp(a1, b1, f0), B1 = lerp(a1, b1, f1);
        gb.quad(r.concourse ? MAT.stStep : MAT.stConc, W(...A0, r.z), W(...B0, r.z), W(...B1, r.z), W(...A1, r.z), [0, 0], [L / 3, 0], [L / 3, 0.3], [0, 0.3], [0, 1, 0]);
        gb.quad(MAT.stConc, W(...A1, r.z), W(...B1, r.z), W(...B1, zNext), W(...A1, zNext), [0, 0], [L / 3, 0], [L / 3, 0.1], [0, 0.1], null);
        if (rows.indexOf(r) === 0) gb.quad(MAT.stConc, W(...A0, 0), W(...B0, 0), W(...B0, r.z), W(...A0, r.z), [0, 0], [L / 3, 0], [L / 3, 0.4], [0, 0.4], null);
      }
      if (r.concourse) { if (r === rows[24]) for (let s = 6; s < L - 6; s += 22) { const P = lerp2(a1, b1, s / L); const Q = lerp2(a1, b1, (s + 3) / L); gb.quad(MAT.stDark, W(...P, r.z + 0.01), W(...Q, r.z + 0.01), W(...Q, r.z + 2.4), W(...P, r.z + 2.4), [0, 0], [1, 0], [1, 1], [0, 1], null); } continue; }
      /* seats every 0.5 m, aisles with stairs every 15 m */
      const nx2 = -ty, ny2 = tx; // inward normal is toward the pitch: check sign with the centre
      const mid = lerp2(a0, b0, 0.5), toC = [c[0] - (c[0] + u[0] * mid[0] + v[0] * mid[1]), c[1] - (c[1] + u[1] * mid[0] + v[1] * mid[1])];
      const wdx = u[0] * nx2 + v[0] * ny2, wdy = u[1] * nx2 + v[1] * ny2, inward = wdx * toC[0] + wdy * toC[1] > 0 ? 1 : -1;
      const head = Math.atan2(wdx * inward, wdy * inward);
      for (let s = 0.4; s < L - 0.3; s += 0.5) {
        if (tunnel && Math.abs(s - L / 2) < tunnelHalf + 0.3) continue;
        const ai = ((s + 7.5) % 15); if (ai < 0.7) { if (ai < 0.5) { const H = lerp2(lerp2(a0, b0, s / L), lerp2(a1, b1, s / L), 0.5), w = WX(...H); steps.push(MX(w[0], r.z + (zNext - r.z) / 2 - 0.1, -w[1], 0, Math.PI - head, 0)); } continue; }
        const P = lerp2(lerp2(a0, b0, s / L), lerp2(a1, b1, s / L), 0.55), w = WX(...P);
        seats.push(MX(w[0], r.z, -w[1], 0, Math.PI - head, 0));
        const kk = r.k || 0; seatCols.push((kk % 9 === 0 && kk) ? black : ((Math.floor(s / 15) + kk) % 23 === 0 ? white : red));
      }
      if (r === rows[0] || r === rows[26]) { const P = lerp2(a0, b0, 0), Q = lerp2(a0, b0, 1), w0 = WX(...P), w1 = WX(...Q); rails.push([w0, w1, r.z]); }
    }
    { const top = rows[maxK - 1], p = ring(top.d + top.dep), a = p[i], b = p[j]; if (maxK < 44) { const Lw = Math.hypot(b[0] - a[0], b[1] - a[1]), hh = rows[43].z + 4.5 - top.z; gb.quad(MAT.stClad, W(...a, top.z), W(...b, top.z), W(...b, rows[43].z + 4.5), W(...a, rows[43].z + 4.5), [0, 0], [Lw / 8, 0], [Lw / 8, hh / 8], [0, hh / 8], null); } }
    /* stand name board on the upper back wall */
    const nm = names[i];
    if (nm) { const top = rows[twoTier(i) ? 43 : 33], p = ring(top.d + 1.2), a = p[i], b = p[j], f = 0.32; const A = lerp2(a, b, f), B = lerp2(a, b, 1 - f); gb.quad(MAT.stName[nm], W(...B, top.z + 1.2), W(...A, top.z + 1.2), W(...A, top.z + 3.4), W(...B, top.z + 3.4), [0, 0], [1, 0], [1, 1], [0, 1], null); }
  }
  /* outer shell with gates in the corners, roof ring, lights */
  const dOut = rows[43].d + 2.5, zTop = rows[43].z + 4.5, po = ring(dOut);
  for (let i = 0; i < 8; i++) {
    const a = po[i], b = po[(i + 1) % 8], L = Math.hypot(b[0] - a[0], b[1] - a[1]), corner = sideOf(i) === 0;
    const pieces = corner ? [[0, L / 2 - tunnelHalf, 0], [L / 2 + tunnelHalf, L, 0], [L / 2 - tunnelHalf, L / 2 + tunnelHalf, tunnelH]] : [[0, L, 0]];
    for (const [s0, s1, z0] of pieces) { const A = lerp2(a, b, s0 / L), B = lerp2(a, b, s1 / L); gb.quad(MAT.stClad, W(...A, z0), W(...B, z0), W(...B, zTop), W(...A, zTop), [s0 / 8, z0 / 8], [s1 / 8, z0 / 8], [s1 / 8, zTop / 8], [s0 / 8, zTop / 8], null); }
    if (corner) { /* tunnel walls and ceiling from the gate to the pitch */
      const pi = ring(0), ai = pi[i], bi = pi[(i + 1) % 8], Li = Math.hypot(bi[0] - ai[0], bi[1] - ai[1]);
      for (const sg of [-1, 1]) { const O = lerp2(a, b, (L / 2 + sg * tunnelHalf) / L), I = lerp2(ai, bi, (Li / 2 + sg * tunnelHalf) / Li); gb.quad(MAT.stConcD, W(...O, 0), W(...I, 0), W(...I, tunnelH), W(...O, tunnelH), [0, 0], [3, 0], [3, 1], [0, 1], null); }
      const O0 = lerp2(a, b, (L / 2 - tunnelHalf) / L), O1 = lerp2(a, b, (L / 2 + tunnelHalf) / L), I0 = lerp2(ai, bi, (Li / 2 - tunnelHalf) / Li), I1 = lerp2(ai, bi, (Li / 2 + tunnelHalf) / Li);
      gb.quad(MAT.stConcD, W(...O0, tunnelH), W(...O1, tunnelH), W(...I1, tunnelH), W(...I0, tunnelH), [0, 0], [1, 0], [1, 1], [0, 1], null);
    }
    /* roof: from the shell to ~row 14, slight slope, white top and dark underside, light strip at the edge */
    const pr = ring(rows[14].d), ar = pr[i], br = pr[(i + 1) % 8];
    gb.quad(MAT.stRoof, W(...a, zTop + 1.6), W(...b, zTop + 1.6), W(...br, zTop + 0.6), W(...ar, zTop + 0.6), [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
    gb.quad(MAT.stRoofU, W(...ar, zTop + 0.3), W(...br, zTop + 0.3), W(...b, zTop + 1.3), W(...a, zTop + 1.3), [0, 0], [1, 0], [1, 1], [0, 1], [0, -1, 0]);
    gb.quad(MAT.stLight, W(...ar, zTop + 0.25), W(...br, zTop + 0.25), W(...br, zTop + 0.65), W(...ar, zTop + 0.65), [0, 0], [1, 0], [1, 1], [0, 1], null);
    const mid = WX(...lerp2(ar, br, 0.5)); t.lights.push([mid[0], mid[1], zTop, 4]);
  }
  /* obstacles: the four straight stands (corners stay open for the tunnels) */
  const pi = ring(0);
  for (const i of [1, 3, 5, 7]) {
    const a = pi[i], b = pi[(i + 1) % 8], a2 = po[i], b2 = po[(i + 1) % 8], o = [WX(...a), WX(...b), WX(...b2), WX(...a2)].flat();
    t.obs.add(...polyBox(o), { p: o, b: polyBox(o), h: zTop });
  }
  /* corner stands are solid apart from the tunnel: two obstacle wedges each */
  for (const i of [0, 2, 4, 6]) {
    const a = pi[i], b = pi[(i + 1) % 8], a2 = po[i], b2 = po[(i + 1) % 8], L = Math.hypot(b[0] - a[0], b[1] - a[1]), L2 = Math.hypot(b2[0] - a2[0], b2[1] - a2[1]);
    for (const [f0, f1, g0, g1] of [[0, (L / 2 - tunnelHalf) / L, 0, (L2 / 2 - tunnelHalf) / L2], [(L / 2 + tunnelHalf) / L, 1, (L2 / 2 + tunnelHalf) / L2, 1]]) {
      const o = [WX(...lerp2(a, b, f0)), WX(...lerp2(a, b, f1)), WX(...lerp2(a2, b2, g1)), WX(...lerp2(a2, b2, g0))].flat();
      t.obs.add(...polyBox(o), { p: o, b: polyBox(o), h: zTop });
    }
  }
  /* pitch furniture: LED boards, goals, benches, corner flags */
  const board = [[-HL - 4, -HW - 4], [HL + 4, -HW - 4], [HL + 4, HW + 4], [-HL - 4, HW + 4]];
  for (let i = 0; i < 4; i++) { const a = board[i], b = board[(i + 1) % 4], L = Math.hypot(b[0] - a[0], b[1] - a[1]), m2 = WX((a[0] + b[0]) / 2, (a[1] + b[1]) / 2); gb.quad(MAT.stLed, W(...b, 0), W(...a, 0), W(...a, 0.9), W(...b, 0.9), [0, 0], [L / 60, 0], [L / 60, 1], [0, 1], [c[0] - m2[0], 0, -(c[1] - m2[1])]); }
  const post = (a, b, z0, z1, w) => { const A = W(a, b, 0); gb.quad(MAT.stWhite, W(a - w, b - w, z0), W(a + w, b - w, z0), W(a + w, b - w, z1), W(a - w, b - w, z1), [0, 0], [1, 0], [1, 1], [0, 1], null); gb.quad(MAT.stWhite, W(a + w, b + w, z0), W(a - w, b + w, z0), W(a - w, b + w, z1), W(a + w, b + w, z1), [0, 0], [1, 0], [1, 1], [0, 1], null); gb.quad(MAT.stWhite, W(a - w, b + w, z0), W(a - w, b - w, z0), W(a - w, b - w, z1), W(a - w, b + w, z1), [0, 0], [1, 0], [1, 1], [0, 1], null); gb.quad(MAT.stWhite, W(a + w, b - w, z0), W(a + w, b + w, z0), W(a + w, b + w, z1), W(a + w, b - w, z1), [0, 0], [1, 0], [1, 1], [0, 1], null); };
  for (const sg of [-1, 1]) {
    const g = sg * HL; post(g, -3.66, 0, 2.44, 0.06); post(g, 3.66, 0, 2.44, 0.06);
    gb.quad(MAT.stWhite, W(g, -3.72, 2.38), W(g, 3.72, 2.38), W(g, 3.72, 2.5), W(g, -3.72, 2.5), [0, 0], [1, 0], [1, 1], [0, 1], null);
    const back = g + sg * 2;
    gb.quad(MAT.stNet, W(back, -3.66, 0), W(back, 3.66, 0), W(back, 3.66, 2.0), W(back, -3.66, 2.0), [0, 0], [1, 0], [1, 1], [0, 1], null);
    gb.quad(MAT.stNet, W(g, -3.66, 2.44), W(g, 3.66, 2.44), W(back, 3.66, 2.0), W(back, -3.66, 2.0), [0, 0], [1, 0], [1, 1], [0, 1], null);
    for (const sv of [-1, 1]) gb.quad(MAT.stNet, W(g, sv * 3.66, 0), W(back, sv * 3.66, 0), W(back, sv * 3.66, 2.0), W(g, sv * 3.66, 2.44), [0, 0], [0.3, 0], [0.3, 1], [0, 1], null);
    for (const sv of [-1, 1]) post(g, sv * HW, 0, 1.5, 0.02);
    /* team benches on the Vilaine side, dark shells with clear roofs */
    const bx = sg * 8, by = HW + 3;
    gb.quad(MAT.stDark, W(bx - 3, by + 1, 0), W(bx + 3, by + 1, 0), W(bx + 3, by + 1, 2), W(bx - 3, by + 1, 2), [0, 0], [1, 0], [1, 1], [0, 1], null);
    gb.quad(MAT.glassBus || MAT.stDark, W(bx - 3, by + 1, 2), W(bx + 3, by + 1, 2), W(bx + 3, by - 0.6, 1.9), W(bx - 3, by - 0.6, 1.9), [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
  }
  const grp = t.group;
  const seatG = mergeGeos([{ geo: new THREE.BoxGeometry(0.44, 0.06, 0.4), m: MX(0, 0.42, 0.05) }, { geo: new THREE.BoxGeometry(0.44, 0.42, 0.05), m: MX(0, 0.63, -0.16, -0.12, 0, 0) }]);
  const im = new THREE.InstancedMesh(seatG, MAT.stSeat, seats.length); seats.forEach((q, n) => { im.setMatrixAt(n, q); im.setColorAt(n, seatCols[n]); });
  im.frustumCulled = false; im.receiveShadow = true; grp.add(im); t.stadiumSeats = seats.length;
  instanced(grp, new THREE.BoxGeometry(1.1, 0.19, 0.42), MAT.stStep, steps);
  for (const [w0, w1, z] of rails) { const dx = w1[0] - w0[0], dy = w1[1] - w0[1], L = Math.hypot(dx, dy), mesh = new THREE.Mesh(new THREE.BoxGeometry(L, 0.05, 0.05), MAT.stRail); mesh.position.set((w0[0] + w1[0]) / 2, z + 1.0, -(w0[1] + w1[1]) / 2); mesh.rotation.y = Math.atan2(dy, dx); grp.add(mesh); }
  return true;
}
function lerp2(p, q, f) { return [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f]; }
