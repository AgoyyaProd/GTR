/* ---------- Chronostar C1–C7: articulated buses on the real OpenStreetMap routes ---------- */
const BUS = { lines: [], buses: [], mats: {} };
async function initBus() {
  let data; try { data = await (await fetch('chrono.json')).json(); } catch (e) { return; }
  for (const L of data) {
    const p = L.pts, n = p.length / 2, cum = new Float32Array(n);
    for (let i = 1; i < n; i++) cum[i] = cum[i - 1] + Math.hypot(p[2 * i] - p[2 * i - 2], p[2 * i + 1] - p[2 * i - 1]);
    const line = { ref: L.ref, col: L.col, ends: L.ends, p, cum, len: cum[n - 1], stops: L.stops.map(s => s[0]) };
    BUS.lines.push(line);
    const count = Math.max(2, Math.round(line.len / 2200));
    for (let k = 0; k < count; k++) BUS.buses.push({ line, s: (k + Math.random() * 0.5) * line.len / count, v: 10, dwell: 0, nextStop: 0, mesh: null, segs: [] });
  }
  for (const b of BUS.buses) b.nextStop = b.line.stops.findIndex(s => s > b.s);
}
/* position and heading on a route, s in metres from the start (wraps: routes are loops) */
function busAt(line, s, out) {
  s = ((s % line.len) + line.len) % line.len;
  const c = line.cum; let lo = 0, hi = c.length - 1;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (c[m] <= s) lo = m; else hi = m; }
  const p = line.p, ax = p[2 * lo], ay = p[2 * lo + 1], bx = p[2 * hi], by = p[2 * hi + 1], l = c[hi] - c[lo] || 1, f = (s - c[lo]) / l;
  const dx = (bx - ax) / l, dy = (by - ay) / l;
  out[0] = ax + (bx - ax) * f + dy * 1.75; out[1] = ay + (by - ay) * f - dx * 1.75; /* keep right */
  return out;
}
function busLivery(line) {
  if (BUS.mats[line.ref]) return BUS.mats[line.ref];
  const c = document.createElement('canvas'); c.width = 1024; c.height = 256; const g = c.getContext('2d');
  g.fillStyle = '#eef0f2'; g.fillRect(0, 0, 1024, 256);
  g.fillStyle = '#20262c'; g.fillRect(0, 52, 1024, 104);
  for (let x = 0; x < 1024; x += 128) { g.fillStyle = '#3a4650'; g.fillRect(x + 6, 58, 116, 92); g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(x + 10, 62, 50, 84); }
  g.fillStyle = '#d3d6da'; g.fillRect(0, 156, 1024, 6);
  g.fillStyle = line.col; g.fillRect(0, 196, 1024, 30);
  g.fillStyle = '#111'; g.fillRect(0, 226, 1024, 30);
  g.fillStyle = line.col; g.font = '900 44px "Barlow Condensed",Arial'; g.fillText('CHRONO', 40, 190); g.fillStyle = '#c8141e'; g.fillText('STAR', 180, 190);
  g.fillStyle = '#fff'; g.beginPath(); g.arc(900, 104, 38, 0, 7); g.fill(); g.fillStyle = line.col; g.font = '900 46px "Barlow Condensed",Arial'; g.textAlign = 'center'; g.fillText(line.ref, 900, 120);
  const t = canvasTex(c, true);
  const body = M({ map: t, roughness: 0.35, metalness: 0.15 });
  const d = document.createElement('canvas'); d.width = 512; d.height = 64; const dg = d.getContext('2d');
  dg.fillStyle = '#050505'; dg.fillRect(0, 0, 512, 64); dg.fillStyle = '#ffb020'; dg.font = '700 40px "Barlow Condensed",Arial'; dg.fillText(`${line.ref}  ${(line.ends[0] || '').replace(/^Rennes \(|\)$/g, '').toUpperCase()}`, 14, 46);
  const disp = M({ map: canvasTex(d, true), emissiveMap: canvasTex(d, true), emissive: 0xffffff, emissiveIntensity: 1.2 }); disp.userData.sign = true;
  return BUS.mats[line.ref] = { body, disp };
}
const BUSDIM = [[0, 11.9], [12.5, 18.4]]; /* front and rear bodies, metres behind the front bumper */
function makeBusMesh(b) {
  const mt = busLivery(b.line), root = new THREE.Group(), dark = BUS.mats.dark || (BUS.mats.dark = M({ color: 0x15171a, roughness: 0.8 }));
  for (const [a, z] of BUSDIM) {
    const L = z - a, g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.55, 2.75, L), mt.body); body.position.y = 0.35 + 1.375; body.castShadow = true; g.add(body);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.3, L * 0.6), dark); roof.position.y = 3.25; g.add(roof);
    for (const wz of a === 0 ? [L / 2 - 2.6, -L / 2 + 3.6] : [-L / 2 + 1.6]) for (const s of [1, -1]) { const w = new THREE.Mesh(CARMAT.wheelGeo, CARMAT.tyre); w.scale.set(1.25, 1.55, 1.55); w.position.set(s * 1.15, 0.5, wz); g.add(w); }
    if (a === 0) { const dp = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.28), mt.disp); dp.position.set(0, 2.85, L / 2 + 0.01); g.add(dp);
      const ws = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.5), CARMAT.glass); ws.position.set(0, 1.9, L / 2 + 0.02); g.add(ws);
      for (const s of [1, -1]) { const hl = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.05), CARMAT.head); hl.position.set(s * 0.9, 0.75, L / 2 + 0.02); g.add(hl); } }
    else for (const s of [1, -1]) { const tl = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.05), CARMAT.tail); tl.position.set(s * 1.0, 0.9, -L / 2 - 0.02); g.add(tl); }
    root.add(g); b.segs.push({ g, a, z, L, o: { x: 0, y: 0, h: 0, mesh: { userData: { T: { L, W: 2.55 } } } } });
  }
  const bel = new THREE.Mesh(new THREE.BoxGeometry(2.35, 2.6, 0.7), dark); root.add(bel); b.bellow = bel;
  scene.add(root); b.mesh = root;
}
const _bA = [0, 0], _bB = [0, 0];
function updateBus(dt) {
  const pl = player.car || player;
  for (const b of BUS.buses) {
    const line = b.line, near = !INT.active && Math.hypot(...(busAt(line, b.s, _bA), [_bA[0] - pl.x, _bA[1] - pl.y])) < 380;
    /* stops: brake into each one, doors open for a few seconds */
    let target = 11;
    if (b.dwell > 0) { b.dwell -= dt; target = 0; if (b.dwell <= 0) b.nextStop = (b.nextStop + 1) % line.stops.length; }
    else if (b.nextStop >= 0 && line.stops.length) {
      let d = line.stops[b.nextStop] - b.s; if (d < -line.len / 2) d += line.len;
      if (d < 0.3) { b.dwell = 9; target = 0; b.v = 0; } else target = Math.min(target, Math.sqrt(2 * 1.3 * d) + 0.6);
    }
    if (near) {
      busAt(line, b.s, _bA); busAt(line, b.s - 2, _bB);
      const fx = _bA[0] - _bB[0], fy = _bA[1] - _bB[1], fl = Math.hypot(fx, fy) || 1, ux = fx / fl, uy = fy / fl;
      const blocked = o => { const dx = o.x - _bA[0], dy = o.y - _bA[1], f = dx * ux + dy * uy, s = Math.abs(dx * uy - dy * ux); return f > -1 && f < 6 + b.v * 1.1 && s < 1.9; };
      if (blocked(pl)) target = 0;
      else for (const c of cars) if (c !== pl && Math.abs(c.x - _bA[0]) < 25 && Math.abs(c.y - _bA[1]) < 25 && blocked(c)) { target = Math.min(target, Math.max(0, c.v - 1)); break; }
      if (target > 0) for (const p of peds) if (p.state !== 'dead' && !p.sit && Math.abs(p.x - _bA[0]) < 12 && Math.abs(p.y - _bA[1]) < 12 && blocked(p)) { target = 0; break; }
      for (const o of BUS.buses) if (o !== b && o.line !== line && o.mesh && Math.hypot(o.segs[1].o.x - _bA[0], o.segs[1].o.y - _bA[1]) < 9 && blocked(o.segs[1].o)) { target = 0; break; }
    }
    b.v += clamp(target - b.v, -3.2 * dt, 1.1 * dt);
    b.s = (b.s + b.v * dt) % line.len;
    if (b.nextStop < 0) b.nextStop = 0;
    if (!near) { if (b.mesh) { scene.remove(b.mesh); b.mesh = null; b.segs = []; } continue; }
    if (!b.mesh) makeBusMesh(b);
    for (const sg of b.segs) {
      busAt(line, b.s - sg.a, _bA); busAt(line, b.s - sg.z, _bB);
      const x = (_bA[0] + _bB[0]) / 2, y = (_bA[1] + _bB[1]) / 2, h = Math.atan2(_bA[0] - _bB[0], _bA[1] - _bB[1]);
      sg.o.x = x; sg.o.y = y; sg.o.h = h;
      sg.g.position.set(x, groundH(x, y), -y); sg.g.rotation.y = Math.PI - h;
      /* the bus is heavy: it shoves cars and people out of its way */
      if (player.car && Math.abs(player.car.x - x) < 12 && Math.abs(player.car.y - y) < 12) { const pen = obbOverlap(player.car, sg.o); if (pen) { player.car.x += pen[0] * pen[2]; player.car.y += pen[1] * pen[2]; if (Math.abs(player.car.v) > 5) player.car.lastImpact = Math.abs(player.car.v); player.car.v *= 0.4; } }
      if (!player.car && !INT.active) {
        const dx = player.x - x, dy = player.y - y, s = Math.sin(h), c = Math.cos(h), f = dx * s + dy * c, l = dx * c - dy * s, hl = sg.L / 2 + 0.35, hw = 1.28 + 0.35;
        if (Math.abs(f) < hl && Math.abs(l) < hw) { const pf = hl - Math.abs(f), pw = hw - Math.abs(l); if (pw < pf) { const k = Math.sign(l) * pw; player.x += c * k; player.y -= s * k; } else { const k = Math.sign(f) * pf; player.x += s * k; player.y += c * k; } }
      }
    }
    busAt(line, b.s - 12.2, _bA); b.bellow.position.set(_bA[0], groundH(_bA[0], _bA[1]) + 0.35 + 1.3, -_bA[1]);
    b.bellow.rotation.y = Math.PI - (b.segs[0].o.h + angWrap(b.segs[1].o.h - b.segs[0].o.h) / 2);
    b.mesh.visible = true;
  }
}

/* ---------- carrousels (OpenStreetMap attraction=carousel): Place Sainte-Anne, place de la Mairie ---------- */
const CAROUSELS = [];
function initCarousels() {
  const spots = [[-334.1, 246.7], [-190.6, -139.0]];
  const c = document.createElement('canvas'); c.width = 1024; c.height = 128; const g = c.getContext('2d');
  for (let k = 0; k < 16; k++) { g.fillStyle = k % 2 ? '#f4ead2' : '#b8202a'; g.fillRect(k * 64, 0, 64, 128); }
  g.fillStyle = '#d8b040'; g.fillRect(0, 0, 1024, 10); g.fillRect(0, 118, 1024, 10);
  const stripe = M({ map: canvasTex(c, true), roughness: 0.6, side: THREE.DoubleSide });
  const f = document.createElement('canvas'); f.width = 1024; f.height = 128; const fg = f.getContext('2d');
  fg.fillStyle = '#1e4a3a'; fg.fillRect(0, 0, 1024, 128);
  for (let k = 0; k < 8; k++) { fg.fillStyle = '#d8b040'; fg.fillRect(k * 128 + 4, 8, 120, 112); fg.fillStyle = ['#7ab0d0', '#d07a5a', '#8ac07a', '#d0b07a'][k % 4]; fg.fillRect(k * 128 + 12, 16, 104, 96); fg.fillStyle = '#fff6'; fg.beginPath(); fg.arc(k * 128 + 64, 64, 26, 0, 7); fg.fill(); }
  const frieze = M({ map: canvasTex(f, true), emissiveMap: canvasTex(f, true), emissive: 0xffffff, emissiveIntensity: 0.25, roughness: 0.5 }); frieze.userData.sign = true;
  const gold = M({ color: 0xd8b040, roughness: 0.3, metalness: 0.8 }), wood = M({ color: 0x5a3a20, roughness: 0.6 }), red = M({ color: 0xa01820, roughness: 0.5 });
  const bulb = M({ color: 0xfff0c0, emissive: 0xffe0a0, emissiveIntensity: 1.2 }); bulb.userData.sign = true;
  const horseM = [M({ color: 0xf2ece0, roughness: 0.5 }), M({ color: 0x5a3a24, roughness: 0.5 }), M({ color: 0x2a2a2a, roughness: 0.5 })];
  for (const [x, y] of spots) {
    const root = new THREE.Group(); root.position.set(x, SW, -y); scene.add(root);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(6.4, 6.6, 0.45, 32), wood); base.position.y = 0.22; root.add(base);
    const rot = new THREE.Group(); rot.position.y = 0.45; root.add(rot);
    const floor = new THREE.Mesh(new THREE.CylinderGeometry(6.1, 6.1, 0.08, 32), red); floor.position.y = 0.04; rot.add(floor);
    const core = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 4.2, 16), frieze); core.position.y = 2.1; rot.add(core);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(7.2, 2.6, 32, 1, true), stripe); roof.position.y = 5.7; rot.add(roof);
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(7.0, 7.0, 0.9, 32, 1, true), frieze); skirt.position.y = 4.15; rot.add(skirt);
    const fin = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 8), gold); fin.position.y = 7.2; rot.add(fin);
    const horses = [];
    for (let k = 0; k < 16; k++) {
      const a = k / 16 * Math.PI * 2, r = k % 2 ? 4.1 : 5.3, px = Math.cos(a) * r, pz = Math.sin(a) * r;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 3.9, 8), gold); pole.position.set(px, 1.95, pz); rot.add(pole);
      const hg = new THREE.Group(); hg.position.set(px, 1.0, pz); hg.rotation.y = -a; rot.add(hg);
      const hm = horseM[k % 3];
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.42, 1.2), hm); hg.add(body);
      const neck = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.55, 0.28), hm); neck.position.set(0, 0.35, 0.5); neck.rotation.x = -0.5; hg.add(neck);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.25, 0.45), hm); head.position.set(0, 0.6, 0.72); hg.add(head);
      for (const [lx, lz, ra] of [[0.13, 0.42, 0.6], [-0.13, 0.42, 0.3], [0.13, -0.42, -0.4], [-0.13, -0.42, -0.2]]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.55, 0.09), hm); lg.position.set(lx, -0.42, lz); lg.rotation.x = ra; hg.add(lg); }
      const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.06, 0.4), red); saddle.position.y = 0.23; hg.add(saddle);
      horses.push([hg, k * 0.7]);
    }
    const bulbs = new THREE.InstancedMesh(new THREE.SphereGeometry(0.06, 6, 4), bulb, 48);
    for (let k = 0; k < 48; k++) { const a = k / 48 * Math.PI * 2; bulbs.setMatrixAt(k, MX(Math.cos(a) * 7.02, 3.75, Math.sin(a) * 7.02)); } rot.add(bulbs);
    const pts = []; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pts.push(x + Math.cos(a) * 6.6, y + Math.sin(a) * 6.6); }
    XOBS.add(x - 6.6, y - 6.6, x + 6.6, y + 6.6, { p: pts, b: [x - 6.6, y - 6.6, x + 6.6, y + 6.6], h: 7 });
    CAROUSELS.push({ x, y, rot, horses, root });
  }
}
function updateCarousels(dt, t) {
  for (const c of CAROUSELS) {
    c.root.position.y = SW + th(c.x, c.y) * 0;
    c.rot.rotation.y += dt * 0.42;
    for (const [hg, ph] of c.horses) hg.position.y = 1.0 + Math.sin(t * 2.1 + ph) * 0.28;
  }
}
