'use strict';
/* ===== game: player, AI, police, map/GPS, missions, loop ===== */
let started = false, paused = false;
const player = { x: -582.3, y: 23.1, h: 0, v: 0, car: null, phase: 0, carry: null, mesh: null };
const keys = {};
let yaw = 0, pitch = 0.3, lastMouse = 0;
let money = 0, wanted = 0, evadeT = 0, gameMin = 23 * 60 + 12, bustT = 0;
let mapImg = null;
const LAND = [['Place Sainte-Anne', -294, 240], ['Rue de la Soif', -384, 112], ['Les Lices', -585, 48], ['République', -150, -282], ['Parc du Thabor', 430, 40], ['Gare', 280, -900], ['Roazhon Park', -2683, -500], ['Rocade', 3000, 2400]];

/* ---------- input ---------- */
addEventListener('keydown', e => {
  if (!started) return;
  keys[e.code] = true;
  if (e.code === 'KeyE' || e.code === 'Enter') { if (dialogActive()) advanceDialog(); else if (!mapOpen) interact(); }
  if (e.code === 'KeyM' || e.code === 'Semicolon' || (e.code === 'Escape' && mapOpen)) toggleMap();
  if (e.code === 'KeyT') { const cur = WX.auto ? 0 : MODES.findIndex(x => x.id === MODE.id); const i = (cur + 1) % MODES.length; applyMode(MODES[i]); toast('Ambiance : ' + MODES[i].label, 2); }
  if (e.code === 'KeyF') { setFacadePhoto(!FACADE_PHOTO); toast(FACADE_PHOTO ? 'Façades : photos réelles (Rennes Métropole)' : 'Façades : dessinées, plus nettes de près', 2.5); }
  if (e.code === 'Space' && !player.car && !dialogActive()) punch();
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.code)) e.preventDefault();
});
addEventListener('keyup', e => { keys[e.code] = false; });
const K = c => !!keys[c];
canvasEl.addEventListener('click', () => { if (started && !mapOpen && document.pointerLockElement !== canvasEl) { try { const r = canvasEl.requestPointerLock(); if (r && r.catch) r.catch(() => { }); } catch (e) { } } if (dialogActive()) advanceDialog(); });
let dragging = false;
canvasEl.addEventListener('mousedown', e => { dragging = true; if (e.button === 0 && started && document.pointerLockElement === canvasEl && !mapOpen && !dialogActive()) punch(); });
addEventListener('mouseup', () => { dragging = false; });
addEventListener('mousemove', e => {
  if (!mapOpen && (document.pointerLockElement === canvasEl || dragging)) { yaw += e.movementX * 0.0028; pitch = clamp(pitch + e.movementY * 0.0022, -0.15, 1.2); lastMouse = performance.now(); }
});

/* ---------- HUD ---------- */
function setMoney(v) { money = Math.max(0, Math.round(v)); $('money').textContent = money.toLocaleString('fr-FR') + ' €'; }
let toastT = 0, bannerT = 0;
function toast(t, s) { $('toast').textContent = t; $('toast').classList.add('show'); toastT = s || 3; }
function banner(a, b, s) { const el = $('banner'); el.textContent = a; if (b) { const sm = document.createElement('small'); sm.textContent = b; el.append(sm); } el.classList.add('show'); bannerT = s || 3.5; }
function objective(t) { $('obj').textContent = t || ''; }
function bar(label, frac, color) { if (label == null) { $('bar').style.display = 'none'; return; } $('bar').style.display = 'block'; $('barlabel').textContent = label; $('barfill').style.width = clamp(frac, 0, 1) * 100 + '%'; $('barfill').style.background = color || '#ffc04a'; }
let dq = [], dcb = null;
function dialogActive() { return dq.length > 0; }
function showDialog() { const [w, t] = dq[0]; $('dwho').textContent = w; $('dtxt').textContent = t; $('dialog').style.display = 'block'; }
function say(lines) { return new Promise(res => { dq = lines.slice(); dcb = res; showDialog(); }); }
function advanceDialog() { dq.shift(); if (dq.length) showDialog(); else { $('dialog').style.display = 'none'; const c = dcb; dcb = null; if (c) c(); } }

/* ---------- GPS ---------- */
let gps = null; // {x,y,path:[nodes], t}
function setGPS(x, y, label) { gps = x == null ? null : { x, y, label, path: null, t: 0 }; }
function updateGPS(dt) {
  const dest = goalBeam.visible ? { x: goalBeam.position.x, y: -goalBeam.position.z } : gps;
  if (!dest) { routeNodes = null; return; }
  routeT -= dt;
  const pl = player.car || player;
  if (routeT <= 0 || !routeNodes || routeDest !== dest.x + ',' + dest.y) {
    routeT = 2.5; routeDest = dest.x + ',' + dest.y;
    const s = nearestNode(pl.x, pl.y, 2), g = nearestNode(dest.x, dest.y, 2);
    routeNodes = astar(s, g, 2, 40000);
  }
  if (gps && Math.hypot(gps.x - pl.x, gps.y - pl.y) < 15) { gps = null; toast('Vous êtes arrivé', 2); }
}
let routeNodes = null, routeT = 0, routeDest = '';

/* ---------- minimap ---------- */
const mini = $('mini'), mg = mini.getContext('2d');
let markers = [];
const MS = 0.5; // map image px per metre
function drawMini() {
  const W = mini.width, H = mini.height, pl = player.car || player;
  const sp = player.car ? Math.abs(player.car.v) : 0, s = clamp(1.5 - sp / 35, 0.75, 1.5); // screen px per metre
  mg.save(); mg.clearRect(0, 0, W, H); mg.beginPath(); mg.arc(W / 2, H / 2, W / 2, 0, 7); mg.clip();
  mg.fillStyle = '#1b1f2a'; mg.fillRect(0, 0, W, H);
  mg.translate(W / 2, H / 2); mg.rotate(-yaw);
  if (mapImg) { const k = s / MS; mg.drawImage(mapImg, -(pl.x - BX0) * MS * k, -(BY1 - pl.y) * MS * k, mapImg.width * k, mapImg.height * k); }
  if (routeNodes) { mg.strokeStyle = '#ffb020'; mg.lineWidth = 4; mg.lineJoin = 'round'; mg.beginPath(); routeNodes.forEach((n, i) => { const X = (nx(n) - pl.x) * s, Y = -(ny(n) - pl.y) * s; i ? mg.lineTo(X, Y) : mg.moveTo(X, Y); }); mg.stroke(); }
  const blink = (performance.now() / 250 | 0) % 2;
  for (const c of cars) if (c.ai === 'cop') { mg.fillStyle = blink ? '#3d8bff' : '#ff2d4a'; mg.beginPath(); mg.arc((c.x - pl.x) * s, -(c.y - pl.y) * s, 5, 0, 7); mg.fill(); }
  for (const p of peds) if (p.cop) { mg.fillStyle = '#3d8bff'; mg.beginPath(); mg.arc((p.x - pl.x) * s, -(p.y - pl.y) * s, 3, 0, 7); mg.fill(); }
  mg.restore();
  const ca = Math.cos(-yaw), sa = Math.sin(-yaw);
  for (const m of markers) {
    const dx = (m.x - pl.x) * s, dy = -(m.y - pl.y) * s; let rx = dx * ca - dy * sa, ry = dx * sa + dy * ca;
    const l = Math.hypot(rx, ry), R = W / 2 - 10; if (l > R) { rx *= R / l; ry *= R / l; }
    mg.fillStyle = m.c; mg.strokeStyle = '#000'; mg.lineWidth = 2; mg.beginPath(); mg.arc(W / 2 + rx, H / 2 + ry, 7, 0, 7); mg.fill(); mg.stroke();
  }
  mg.save(); mg.translate(W / 2, H / 2); mg.rotate((player.car ? player.car.h : player.h) - yaw); mg.fillStyle = '#fff'; mg.strokeStyle = '#000'; mg.lineWidth = 2;
  mg.beginPath(); mg.moveTo(0, -10); mg.lineTo(7, 8); mg.lineTo(0, 4); mg.lineTo(-7, 8); mg.closePath(); mg.fill(); mg.stroke(); mg.restore();
  mg.fillStyle = '#fff'; mg.font = '700 13px "Barlow Condensed"'; mg.textAlign = 'center'; mg.save(); mg.translate(W / 2, H / 2); mg.rotate(-yaw); mg.fillText('N', 0, -H / 2 + 14); mg.restore();
}

/* ---------- big map (zoom / pan / waypoint) ---------- */
let mapOpen = false;
const BM = { s: 0.2, cx: 0, cy: 0, drag: null, moved: false };
function toggleMap() {
  mapOpen = !mapOpen; $('bigmap').style.display = mapOpen ? 'block' : 'none'; paused = mapOpen;
  if (mapOpen) { if (document.pointerLockElement) document.exitPointerLock(); const pl = player.car || player; BM.cx = pl.x; BM.cy = pl.y; BM.s = Math.max(BM.s, 0.25); drawBig(); }
}
const bigc = $('bigc');
function bigXY(x, y) { const r = bigc.width / 2, q = bigc.height / 2; return [r + (x - BM.cx) * BM.s, q - (y - BM.cy) * BM.s]; }
function drawBig() {
  BM.cx = clamp(BM.cx, BX0, BX1); BM.cy = clamp(BM.cy, BY0, BY1);
  const c = bigc, rr = c.getBoundingClientRect(); const dpr = Math.min(devicePixelRatio, 2);
  if (c.width !== (rr.width * dpr | 0)) { c.width = rr.width * dpr | 0; c.height = rr.height * dpr | 0; }
  const g = c.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0);
  g.fillStyle = '#0d1220'; g.fillRect(0, 0, c.width, c.height);
  const k = BM.s * dpr / MS; const s = BM.s * dpr;
  const [ox, oy] = [c.width / 2 - (BM.cx - BX0) * s, c.height / 2 - (BY1 - BM.cy) * s];
  if (mapImg) { g.imageSmoothingEnabled = BM.s < 1.5; g.drawImage(mapImg, ox, oy, mapImg.width * k, mapImg.height * k); }
  const T = (x, y) => [ox + (x - BX0) * s, oy + (BY1 - y) * s];
  if (routeNodes) { g.strokeStyle = '#ffb020'; g.lineWidth = 4 * dpr; g.lineJoin = 'round'; g.beginPath(); routeNodes.forEach((n, i) => { const [a, b] = T(nx(n), ny(n)); i ? g.lineTo(a, b) : g.moveTo(a, b); }); g.stroke(); }
  g.textAlign = 'center'; g.textBaseline = 'middle';
  const boxes = [];
  const label = (n, a, b, font, col) => {
    g.font = font; const w = g.measureText(n).width + 8 * dpr, h = 18 * dpr;
    if (a < -w || b < -h || a > c.width + w || b > c.height + h) return;
    if (boxes.some(q => Math.abs(q[0] - a) < (q[2] + w) / 2 && Math.abs(q[1] - b) < (q[3] + h) / 2)) return;
    boxes.push([a, b, w, h]); g.fillStyle = '#000c'; g.fillText(n, a + dpr, b + dpr); g.fillStyle = col; g.fillText(n, a, b);
  };
  for (const [n, x, y] of LAND) { const [a, b] = T(x, y); label(n, a, b, `700 ${15 * dpr}px "Barlow Condensed",sans-serif`, '#ff9ac4'); }
  for (const [n, x, y, kind] of GD.labels) {
    const big = kind === 'suburb'; if (kind === 'neighbourhood' && BM.s < 0.6) continue; if (kind === 'quarter' && BM.s < 0.3) continue;
    const [a, b] = T(x, y); label(n, a, b, `${big ? 700 : 600} ${(big ? 16 : 13) * dpr}px "Barlow Condensed",sans-serif`, big ? '#ffe7b0' : '#e8ecf4');
  }
  const dot = (x, y, col, r) => { const [a, b] = T(x, y); g.fillStyle = col; g.strokeStyle = '#000'; g.lineWidth = 2 * dpr; g.beginPath(); g.arc(a, b, r * dpr, 0, 7); g.fill(); g.stroke(); };
  for (const m of markers) dot(m.x, m.y, m.c, 8);
  if (gps) dot(gps.x, gps.y, '#ffb020', 8);
  for (const cc of cars) if (cc.ai === 'cop') dot(cc.x, cc.y, '#3d8bff', 5);
  const pl = player.car || player, [a, b] = T(pl.x, pl.y);
  g.save(); g.translate(a, b); g.rotate(player.car ? player.car.h : player.h); g.fillStyle = '#fff'; g.strokeStyle = '#000'; g.lineWidth = 2 * dpr; g.beginPath(); g.moveTo(0, -11 * dpr); g.lineTo(8 * dpr, 9 * dpr); g.lineTo(0, 4 * dpr); g.lineTo(-8 * dpr, 9 * dpr); g.closePath(); g.fill(); g.stroke(); g.restore();
  $('mapscale').textContent = BM.s >= 1 ? `${Math.round(100 / BM.s)} m` : `${Math.round(100 / BM.s)} m`;
}
bigc.addEventListener('wheel', e => {
  e.preventDefault(); const r = bigc.getBoundingClientRect(), mx = e.clientX - r.left - r.width / 2, my = e.clientY - r.top - r.height / 2;
  const wx = BM.cx + mx / BM.s, wy = BM.cy - my / BM.s; BM.s = clamp(BM.s * Math.exp(-e.deltaY * 0.0015), 0.08, 3);
  BM.cx = wx - mx / BM.s; BM.cy = wy + my / BM.s; drawBig();
}, { passive: false });
bigc.addEventListener('pointerdown', e => { BM.drag = [e.clientX, e.clientY, BM.cx, BM.cy]; BM.moved = false; bigc.setPointerCapture(e.pointerId); });
bigc.addEventListener('pointermove', e => { if (!BM.drag) return; const dx = e.clientX - BM.drag[0], dy = e.clientY - BM.drag[1]; if (Math.hypot(dx, dy) > 4) BM.moved = true; BM.cx = BM.drag[2] - dx / BM.s; BM.cy = BM.drag[3] + dy / BM.s; drawBig(); });
bigc.addEventListener('pointerup', e => {
  if (BM.drag && !BM.moved) { const r = bigc.getBoundingClientRect(); const x = BM.cx + (e.clientX - r.left - r.width / 2) / BM.s, y = BM.cy - (e.clientY - r.top - r.height / 2) / BM.s; setGPS(x, y); routeT = 0; updateGPS(0); toast('Point GPS posé', 1.5); drawBig(); }
  BM.drag = null;
});
$('mzin').onclick = () => { BM.s = clamp(BM.s * 1.5, 0.08, 3); drawBig(); };
$('mzout').onclick = () => { BM.s = clamp(BM.s / 1.5, 0.08, 3); drawBig(); };
$('mme').onclick = () => { const pl = player.car || player; BM.cx = pl.x; BM.cy = pl.y; drawBig(); };
$('mclear').onclick = () => { setGPS(null); routeNodes = null; drawBig(); };
$('mclose').onclick = () => toggleMap();
addEventListener('keydown', e => { if (!mapOpen) return; const st = 120 / BM.s; if (e.code === 'ArrowLeft') BM.cx -= st; if (e.code === 'ArrowRight') BM.cx += st; if (e.code === 'ArrowUp') BM.cy += st; if (e.code === 'ArrowDown') BM.cy -= st; if (e.code === 'Equal' || e.code === 'NumpadAdd') BM.s = clamp(BM.s * 1.4, 0.08, 3); if (e.code === 'Minus' || e.code === 'NumpadSubtract') BM.s = clamp(BM.s / 1.4, 0.08, 3); drawBig(); });

/* ---------- interaction ---------- */
function interact() {
  if (player.car) { exitCar(); return; }
  if (lifeInteract() || INT.active) return;
  let best = null, bd = 4.5;
  for (const c of cars) { if (c.ai === 'cop' || c.kind === 'bike' || (c.kind === 'scooter' && !c.free)) continue; const d = dist(c, player); if (d < bd) { bd = d; best = c; } }
  if (best) enterCar(best);
}
function enterCar(c) {
  if (c.driverMesh) { c.mesh.remove(c.driverMesh); const d = addPed(c.x + Math.cos(c.h) * 2.4, c.y - Math.sin(c.h) * 2.4, { speed: 5 }); d.state = 'flee'; d.t = 8; c.driverMesh = null; c.mesh.userData.driverMesh = null; c.poolKey = null; toast('Tu piques la caisse !', 2); if (copsNear(70)) setWanted(Math.max(wanted, 1)); }
  c.ai = null; c.driver = true; c.keep = true; c.v *= 0.3; player.car = c; player.mesh.visible = false; yaw = c.h;
}
function exitCar() {
  const c = player.car; if (Math.abs(c.v) > 5) { toast('Ralentis avant de sortir', 1.5); return; }
  player.car = null; c.v = 0; c.driver = false;
  for (const s of [1, -1]) { const x = c.x + Math.cos(c.h) * 1.6 * s, y = c.y - Math.sin(c.h) * 1.6 * s; if (freeSpot(x, y, 0.4)) { player.x = x; player.y = y; break; } player.x = c.x - Math.sin(c.h) * 3.2; player.y = c.y - Math.cos(c.h) * 3.2; }
  player.mesh.visible = true; player.h = c.h;
  setTimeout(() => { if (player.car !== c) c.keep = false; }, 60000);
}
function copsNear(r) { const pl = player.car || player; return cars.some(c => c.ai === 'cop' && dist(c, pl) < r) || peds.some(p => p.cop && dist(p, pl) < r); }

/* ---------- vehicles ---------- */
const _f = { x: 0, y: 0 }, _b = { x: 0, y: 0 };
function bodyCollide(c) {
  if (['scooter','bike','motorcycle','escooter'].includes(c.kind)) { return resolve(c, 0.6); }
  const L = (c.mesh.userData.T.L || 4) / 2 - 0.85;
  _f.x = c.x + Math.sin(c.h) * L; _f.y = c.y + Math.cos(c.h) * L; _b.x = c.x - Math.sin(c.h) * L; _b.y = c.y - Math.cos(c.h) * L;
  const h1 = resolve(_f, 0.92), h2 = resolve(_b, 0.92);
  if (h1 || h2) { c.x = (_f.x + _b.x) / 2; c.y = (_f.y + _b.y) / 2; c.h = Math.atan2(_f.x - _b.x, _f.y - _b.y); }
  return h1 || h2;
}
/* oriented-box overlap between two vehicles: returns [nx, ny, depth] pushing a away from b, or null */
function obbOverlap(a, b) {
  const ta = a.mesh.userData.T, tb = b.mesh.userData.T;
  const A = [Math.sin(a.h), Math.cos(a.h)], Ar = [A[1], -A[0]], B = [Math.sin(b.h), Math.cos(b.h)], Br = [B[1], -B[0]];
  const ha = [(ta.L || 4) / 2, (ta.W || 1.8) / 2], hb = [(tb.L || 4) / 2, (tb.W || 1.8) / 2];
  const dx = a.x - b.x, dy = a.y - b.y; let best = 1e9, bn = null;
  for (const ax of [A, Ar, B, Br]) {
    const ra = ha[0] * Math.abs(A[0] * ax[0] + A[1] * ax[1]) + ha[1] * Math.abs(Ar[0] * ax[0] + Ar[1] * ax[1]);
    const rb = hb[0] * Math.abs(B[0] * ax[0] + B[1] * ax[1]) + hb[1] * Math.abs(Br[0] * ax[0] + Br[1] * ax[1]);
    const d = dx * ax[0] + dy * ax[1], o = ra + rb - Math.abs(d);
    if (o <= 0) return null;
    if (o < best) { best = o; bn = d >= 0 ? ax : [-ax[0], -ax[1]]; }
  }
  return [bn[0], bn[1], best];
}
function driveCar(c, dt, thr, steer, hand) {
  const maxV = c.ai === 'cop' ? 24 + wanted * 2 : c.kind === 'bike' ? 6 : c.kind === 'escooter' ? 8 : c.kind === 'motorcycle' ? 25 : c.kind === 'scooter' ? 17 : c.hw ? 26 : c.ai === 'traffic' ? 14 : 33;
  if (thr > 0) c.v += (c.v < 0 ? 22 : (c.ai ? 9 : 11) * (1 - Math.max(0, c.v) / maxV * 0.6)) * thr * dt;
  else if (thr < 0) c.v += (c.v > 0.5 ? -20 : -7) * -thr * dt;
  else c.v *= 1 - 0.6 * dt;
  if (hand) c.v -= Math.sign(c.v) * Math.min(Math.abs(c.v), 12 * dt);
  c.brake = thr < 0 && c.v > 0.5 || hand;
  c.v = clamp(c.v, -9, maxV);
  c.steer += (steer - c.steer) * Math.min(1, dt * 6);
  const spd = Math.abs(c.v), grip = 1 - 0.55 * Math.min(spd / 30, 1);
  const turn = c.steer * clamp(c.v / 4, -1, 1) * 1.7 * grip * (hand ? 1.6 : 1);
  c.h = angWrap(c.h + turn * dt);
  const ox = c.x, oy = c.y;
  c.x += Math.sin(c.h) * c.v * dt; c.y += Math.cos(c.h) * c.v * dt;
  let impact = 0;
  if (bodyCollide(c)) { if (spd > 3) { impact = spd; c.v *= -0.25; } else c.v *= 0.8; }
  if (inWater(c.x, c.y)) { c.x = ox; c.y = oy; impact = Math.max(impact, spd); c.v = -c.v * 0.3; }
  c.wheelRot += c.v * dt / 0.33;
  return impact;
}
function laneTarget(c) {
  const A = c.a, B = c.b, ax = nx(A), ay = ny(A), bx = nx(B), by = ny(B), l = Math.hypot(bx - ax, by - ay) || 1;
  let two = false; for (let k = GOFF[B]; k < GOFF[B + 1]; k++) if (GNB[k] === A && GFL[k] & 1) two = true;
  const off = two ? 1.8 : (c.hw ? 1.8 : 0);
  return [bx + (by - ay) / l * off, by - (bx - ax) / l * off];
}
function nextEdge(c, mask, away) {
  const B = c.b, dx = nx(B) - nx(c.a), dy = ny(B) - ny(c.a), l = Math.hypot(dx, dy) || 1;
  const opts = []; for (let k = GOFF[B]; k < GOFF[B + 1]; k++) if ((GFL[k] & mask) && GNB[k] !== c.a) opts.push(k);
  if (!opts.length) { for (let k = GOFF[B]; k < GOFF[B + 1]; k++) if (GFL[k] & mask) opts.push(k); }
  if (!opts.length) return false;
  let best = opts[0], bs = -1e9;
  for (const k of opts) {
    const n = GNB[k], ex = nx(n) - nx(B), ey = ny(n) - ny(B), el = Math.hypot(ex, ey) || 1, straight = (ex * dx + ey * dy) / (el * l);
    const sc = away ? Math.hypot(nx(n) - away.x, ny(n) - away.y) * 0.05 + straight + rnd(0, 1.5) : straight * 1.2 + rnd(0, 1.6) + (GFL[k] & 4 && c.hw ? 2 : 0);
    if (sc > bs) { bs = sc; best = k; }
  }
  c.a = B; c.b = GNB[best]; c.hw = !!(GFL[best] & 4); return true;
}
function followGraph(c, dt, mask, speed, away) {
  if (c.a < 0) { c.a = nearestNode(c.x, c.y, mask); const e = outEdges(c.a, mask); if (!e.length) return; c.b = GNB[e[0]]; }
  const [tx, ty] = laneTarget(c);
  if (Math.hypot(tx - c.x, ty - c.y) < (c.hw ? 9 : 5)) { if (!nextEdge(c, mask, away)) return; }
  const want = Math.atan2(tx - c.x, ty - c.y), da = angWrap(want - c.h);
  let target = (c.hw ? 25 : speed) * (Math.abs(da) > 0.5 ? 0.45 : 1);
  if (c.ai === 'traffic') {
    const fx = Math.sin(c.h), fy = Math.cos(c.h), look = 7 + Math.abs(c.v) * 0.9;
    const check = (o, lat) => { const dx = o.x - c.x, dy = o.y - c.y, f = dx * fx + dy * fy, s = Math.abs(dx * fy - dy * fx); return f > 0 && f < look && s < (lat || 2.0); };
    if (check(player.car || player)) target = 0;
    else { for (const o of cars) if (o !== c && check(o, (['bike','motorcycle','escooter','scooter'].includes(o.kind) || ['bike','motorcycle','escooter','scooter'].includes(c.kind) ? 1.1 : 1.7))) { target = Math.min(target, Math.max(0, o.v - 1)); break; } }
    if (target > 0) for (const p of peds) if (p.state !== 'down' && p.state !== 'dead' && !p.sit && check(p, 1.4)) { target = 0; break; }
  }
  driveCar(c, dt, c.v < target ? 1 : (c.v > target + 1.5 ? -1 : 0), clamp(da * 2.2, -1, 1), false);
}
function chaseAI(c, dt) {
  const tgt = player.car || player, d = dist(c, tgt);
  let tx = tgt.x, ty = tgt.y;
  c.repath -= dt;
  if (d > 40) {
    if (c.repath <= 0 || !c.path) { c.repath = 1.5; c.path = astar(nearestNode(c.x, c.y, 2), nearestNode(tgt.x, tgt.y, 2), 2, 15000); c.pi = 0; }
    if (c.path) {
      const fx = Math.sin(c.h), fy = Math.cos(c.h);
      while (c.pi < c.path.length - 1) { const n = c.path[c.pi], dx = nx(n) - c.x, dy = ny(n) - c.y; if (Math.hypot(dx, dy) < 9 || (c.pi === 0 && dx * fx + dy * fy < 0 && Math.abs(c.v) > 3)) c.pi++; else break; }
      const n = c.path[c.pi]; if (!(c.pi >= c.path.length - 1 && Math.hypot(nx(n) - c.x, ny(n) - c.y) < 15)) { tx = nx(n); ty = ny(n); }
    }
  }
  const da = angWrap(Math.atan2(tx - c.x, ty - c.y) - c.h);
  if (d < 35 && Math.abs(c.v) < 2) { c.footT = (c.footT || 0) + dt; if (c.footT > 2.5 && !c.deployed) { c.deployed = true; for (const s of [1, -1]) { const q = addPed(c.x + Math.cos(c.h) * 1.6 * s, c.y - Math.sin(c.h) * 1.6 * s, { cop: true, look: { top: '#1c2a4a', pants: '#1c2a4a', cap: '#101a36', skin: pick(SKIN), shoes: '#111', vest: '#1a2440' } }); q.state = 'chase'; } toast('Les flics descendent de voiture !', 2); } }
  c.stuck = Math.max(0, (c.stuck || 0) + (Math.abs(c.v) < 1 ? dt : -dt));
  if (c.stuck > 1.5) { c.rev = 1.2; c.stuck = 0; }
  if (c.rev > 0) { c.rev -= dt; driveCar(c, dt, -1, -clamp(da * 2, -1, 1), false); return; }
  driveCar(c, dt, Math.abs(da) > 1.4 && d < 25 ? 0.3 : 1, clamp(da * 2.2, -1, 1), Math.abs(da) > 1.2 && c.v > 12);
}

/* ---------- police ---------- */
let copUnmarked = false;
function busted() {
  setWanted(0); bustT = 0;
  for (const c of cars.filter(c => c.ai === 'cop' || c.ai === 'leave' || c.ai === 'block')) removeCar(c);
  for (const p of peds.slice()) if (p.cop && (p.state === 'chase' || p.blocker) && !p.keep) removePed(p);
  POL.copKills = 0;
  const lost = Math.round(money * 0.3); setMoney(money - lost);
  banner('INTERPELLÉ', lost ? `Amende et frais : −${lost} €` : 'Garde à vue, puis retour à la rue', 4);
  if (player.car) { player.car.v = 0; player.car.keep = false; player.car = null; }
  player.x = -561.6; player.y = -14.2; player.mesh.visible = true;
  for (const p of peds) if (p.cop && p.state === 'chase') p.state = 'walk';
  if (mission) failMission('Tu t\'es fait serrer.');
}

/* ---------- pedestrians ---------- */
function updatePed(p, dt, t) {
  const pl = player.car || player, dpl = Math.hypot(p.x - pl.x, p.y - pl.y);
  const vis = dpl < 190 && p.state !== 'incar';
  p.mesh.visible = vis; if (p.dog) p.dog.visible = vis;
  if (p.state === 'incar') return;
  if (p.hurt > 0) p.hurt -= dt;
  applyKnock(p, dt, false);
  if (p.state === 'dead') { p.deadT += dt; if (vis) { deadPose(p); p.mesh.position.set(p.x, liftTo(p, dt), -p.y); p.mesh.rotation.y = Math.PI - p.h; } if (!p.keep && p.deadT > 120 && dpl > 80) removePed(p); return; }
  if (p.state === 'yield') { p.yT = (p.yT || 0) + dt; yieldPose(p); p.mesh.position.set(p.x, liftTo(p, dt), -p.y); p.mesh.rotation.y = Math.PI - p.h; if (p.yT > 8) { p.state = 'flee'; p.t = 10; p.still = false; } return; }
  if (p.state === 'down') { p.t -= dt; if (p.t <= 0) { p.state = 'flee'; p.t = 6; } poseChar(p.mesh, 'down', 0, 0, t); p.mesh.position.set(p.x, liftTo(p, dt), -p.y); return; }
  if (dpl > 230 && !p.cop && !p.keep) return;
  let speed = p.speed, tx = p.tx, ty = p.ty, moving = true, mode = 'walk';
  if (p.cop && wanted > 0 && dpl < 75) p.state = 'chase'; else if (p.cop && p.state === 'chase') p.state = 'walk';
  /* dodge fast cars */
  if (p.state === 'walk' || p.state === 'idle') for (const c of cars) { if (Math.abs(c.v) < 6) continue; const dx = p.x - c.x, dy = p.y - c.y, d = Math.hypot(dx, dy); if (d < 7 && (dx * Math.sin(c.h) + dy * Math.cos(c.h)) > 0) { p.state = 'flee'; p.t = 2.5; p.fleeFrom = { x: c.x, y: c.y }; break; } }
  if (p.state === 'chase') { tx = pl.x; ty = pl.y; speed = 6.4; mode = 'run'; if (dpl < 1.4 && !player.car) { copContact(p, dt); if (wanted === 0) return; moving = false; } }
  else if (p.state === 'flee') { p.t -= dt; speed = 5.2; mode = 'run'; const src = p.fleeFrom || pl; const a = Math.atan2(p.x - src.x, p.y - src.y); tx = p.x + Math.sin(a) * 10; ty = p.y + Math.cos(a) * 10; if (p.t <= 0) { p.state = 'walk'; p.fleeFrom = null; p.seg = null; } }
  else if (p.state === 'runaway') {
    speed = 6.9; mode = 'run';
    if (!p.wp || Math.hypot(p.wp[0] - p.x, p.wp[1] - p.y) < 2) {
      let best = null, bs = -1e9;
      for (let k = 0; k < 14; k++) { const q = randomWalkPoint(p.x, p.y, 6, 30); if (!q) continue; const s = Math.hypot(q[0] - pl.x, q[1] - pl.y) - Math.hypot(q[0] - p.x, q[1] - p.y) * 0.3; if (s > bs) { bs = s; best = q; } }
      p.wp = best || [p.x + rnd(-5, 5), p.y + rnd(-5, 5)];
    }
    tx = p.wp[0]; ty = p.wp[1];
  } else if (p.state === 'fight') {
    if (player.car || INT.active || dpl > 35 || koT > 0) { p.state = 'walk'; p.seg = null; p.still = false; moving = false; }
    else { const r = fightStep(p, dt, player); if (r) { tx = r[0]; ty = r[1]; speed = r[2]; mode = 'run'; } else moving = false; }
  } else if (p.state === 'follow') { tx = pl.x; ty = pl.y; if (dpl < 2.2) moving = false; speed = dpl > 12 ? 4.2 : p.speed; mode = dpl > 12 ? 'run' : 'walk'; }
  else if (p.state === 'idle' || p.still) { moving = false; if (!p.still) { p.t -= dt; if (p.t <= 0) p.state = 'walk'; } }
  else { // walk along sidewalks
    if (!p.seg) { p.seg = walkSegNear(p.x, p.y, 25); p.dir = Math.random() < 0.5 ? 1 : -1; p.lat = rnd(-0.7, 0.7); if (!p.seg) moving = false; }
    if (p.seg) {
      const s = p.seg, ex = p.dir > 0 ? s[2] : s[0], ey = p.dir > 0 ? s[3] : s[1];
      const l = Math.hypot(s[2] - s[0], s[3] - s[1]) || 1, qx = -(s[3] - s[1]) / l * p.dir, qy = (s[2] - s[0]) / l * p.dir;
      tx = ex + qx * (p.lat || 0); ty = ey + qy * (p.lat || 0);
      if (Math.hypot(ex - p.x, ey - p.y) < 1.4) {
        const cand = []; tilesIn(ex - 5, ey - 5, ex + 5, ey + 5, tt => { for (const w of tt.walk) { if (w === s) continue; if (Math.hypot(w[0] - ex, w[1] - ey) < 4) cand.push([w, 1]); else if (Math.hypot(w[2] - ex, w[3] - ey) < 4) cand.push([w, -1]); } });
        if (cand.length) { const [w, d] = pick(cand); p.seg = w; p.dir = d; } else p.dir = -p.dir;
        if (Math.random() < 0.06) { p.state = 'idle'; p.t = rnd(2, 8); }
      }
    }
  }
  if (moving) {
    const a = Math.atan2(tx - p.x, ty - p.y), wob = p.mesh.userData.wobble ? Math.sin(t * 1.7 + p.phase) * 0.45 : 0;
    p.h += angWrap(a + wob - p.h) * Math.min(1, dt * 8);
    const ox = p.x, oy = p.y;
    p.x += Math.sin(p.h) * speed * dt; p.y += Math.cos(p.h) * speed * dt;
    resolve(p, 0.32);
    if (inWater(p.x, p.y)) { p.x = ox; p.y = oy; }
    if (Math.hypot(p.x - ox, p.y - oy) < speed * dt * 0.2 && p.state === 'walk') { p.seg = null; }
    p.phase += dt * speed * (mode === 'run' ? 2.6 : 3.4);
  }
  for (const c of cars) {
    if (Math.abs(c.v) > 4 && Math.hypot(c.x - p.x, c.y - p.y) < (['scooter','bike','motorcycle','escooter'].includes(c.kind) ? 1.2 : 1.9)) {
      p.hp -= Math.abs(c.v) * 5; if (p.seat) { p.seat.taken = null; p.seat = null; } p.sit = false; p.still = false;
      { const a = Math.atan2(p.x - c.x, p.y - c.y), sp = Math.abs(c.v); p.kvx = Math.sin(a) * sp * 0.7; p.kvy = Math.cos(a) * sp * 0.7; bleed(p.x, p.y, p.gy || 0, 1.0, Math.min(16, sp | 0), Math.sin(a), Math.cos(a)); }
      if (p.hp <= 0 && !p.immortal) { killPed(p, c !== player.car); } else { p.state = 'down'; p.t = 3; } const a = Math.atan2(p.x - c.x, p.y - c.y); p.x += Math.sin(a) * 1.8; p.y += Math.cos(a) * 1.8; resolve(p, 0.32);
      if (c === player.car) { c.v *= 0.75; c.lastImpact = 7; if (p.cop) setWanted(Math.max(wanted + 1, 2)); else if (wanted === 0 && (copsNear(90) || Math.random() < 0.35)) { setWanted(1); toast('Un témoin appelle les flics', 2.5); } }
      break;
    }
  }
  p.mesh.position.set(p.x, dpl < 120 ? liftTo(p, dt) : SW, -p.y); p.mesh.rotation.y = Math.PI - p.h;
  if (dpl < 70 || (performance.now() / 16 | 0) % 3 === 0) { poseChar(p.mesh, moving ? mode : (p.sit ? 'sit' : 'idle'), p.phase, 1, t + p.phase); npcCombatPose(p); }
  if (p.dog) { const a = p.h + 1.3, dx = p.x + Math.sin(a) * 0.9, dy = p.y + Math.cos(a) * 0.9; p.dog.position.set(dx, p.mesh.position.y, -dy); p.dog.rotation.y = Math.PI - p.h + (moving ? 0 : 0.8); poseDog(p.dog, p.phase * 1.3, moving ? 1 : 0, t); }
}

/* ---------- missions ---------- */
let rearm = true, mission = null, missionIdx = 0, missionTick = null, extraMarkers = null;
let startBeam, goalBeam;
function beam(color) {
  const g = new THREE.Group();
  const c = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 70, 20, 1, true), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false }));
  c.position.y = 35; g.add(c);
  const r = new THREE.Mesh(new THREE.RingGeometry(1.5, 2.1, 32), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })); r.rotation.x = -Math.PI / 2; r.position.y = 0.12; g.add(r);
  g.visible = false; scene.add(g); return g;
}
const P = { spawn: [-582, 22.1], anne: [-294, 233], yann: [-297, 227], fred: [-388, 120], lices: [-600, 36], tonton: [-603, 33], door: [-326, 362], m3: [-327, 392], momo: [-327, 395], thabor: [410, 20], m4: [400, 30], yann4: [397, 33], pub: [-366.3, 169], barman: [-365.1, 174.1], gaby: [-369, 171], home: [701, 12.3], repu: [-150, -290], yann6: [-153, -293], truck: [-541.5, 51.6], stade: [-2512.3, -512.4] };
const at = k => ({ x: P[k][0], y: P[k][1] });
const MISSIONS = [
  { name: 'Le boss à quatre pattes', at: at('anne'), run: m1 },
  { name: 'Livraison express', at: at('lices'), run: m2 },
  { name: 'Descente', at: at('m3'), run: m3 },
  { name: 'Guerre de territoire', at: at('m4'), run: m4 },
  { name: 'Fermeture des bars', at: at('pub'), run: m5 },
  { name: 'Jour de match', at: at('repu'), run: m6 }
];
function goal(x, y) { if (x == null) { goalBeam.visible = false; return; } goalBeam.position.copy(W3(x, y)); goalBeam.visible = true; routeT = 0; }
function refreshMarkers() {
  markers = [];
  if (!mission && missionIdx < MISSIONS.length) markers.push({ ...MISSIONS[missionIdx].at, c: '#ff3d8b' });
  if (goalBeam.visible) markers.push({ x: goalBeam.position.x, y: -goalBeam.position.z, c: '#ffc04a' });
  if (extraMarkers) extraMarkers();
  sideMarkers();
}
function wait(cond, fail) { return new Promise((res, rej) => { missionTick = dt => { const f = fail && fail(dt); if (f) { missionTick = null; rej(new Error(f)); return; } if (cond(dt)) { missionTick = null; res(); } }; }); }
const near = (p, r) => () => dist(player.car || player, p) < r;
function failMission(msg) { if (mission) mission.cancel(msg); }
const timerFail = (sec, msg) => { let t = sec; return dt => { t -= dt; bar('Temps · ' + Math.ceil(t) + ' s', t / sec, t < 15 ? '#ff4a4a' : '#ffc04a'); return t <= 0 ? msg : false; }; };
let actors = [];
function cleanupMission() {
  goal(); bar(null); objective(''); extraMarkers = null; copUnmarked = false;
  for (const a of actors) { if (a.isCar) removeCar(a); else if (a.isMesh) scene.remove(a.mesh); else removePed(a); }
  actors = []; player.carry = null;
}
async function startMission(i) {
  const Mi = MISSIONS[i];
  let cancel; const cancelled = new Promise((_, rej) => { cancel = rej; });
  mission = { cancel: msg => cancel(new Error(msg)) };
  startBeam.visible = false; banner(`Mission ${i + 1}`, Mi.name, 3);
  try {
    await Promise.race([Mi.run(), cancelled]);
    cleanupMission(); mission = null; missionIdx++;
    if (missionIdx < MISSIONS.length) { startBeam.position.copy(W3(MISSIONS[missionIdx].at.x, MISSIONS[missionIdx].at.y)); startBeam.visible = true; }
  } catch (e) {
    missionTick = null; if (dcb) { dq = []; $('dialog').style.display = 'none'; dcb = null; }
    cleanupMission(); mission = null; banner('MISSION RATÉE', e.message, 4);
    startBeam.position.copy(W3(Mi.at.x, Mi.at.y)); startBeam.visible = true;
  }
}
function reward(n, txt) { setMoney(money + n); banner('MISSION RÉUSSIE', `+${n} € · ${txt}`, 4.5); }
function spawnActor(k, look, opt) { const p = addPed(P[k][0], P[k][1], Object.assign({ look, still: true, keep: true }, opt || {})); actors.push(p); return p; }
function face(p, t) { p.h = Math.atan2(t.x - p.x, t.y - p.y); }
const YANN = { top: '#151515', pants: '#3a1414', mohawk: '#ff3d8b', skin: '#f1c9a5', shoes: '#141414', hair: '#1b1208', bald: true, jacket: '#151515' };
function kaosFor(owner) { const d = makeDog('#3a2a1a'); const k = { mesh: d, isMesh: true, x: owner.x + 1.2, y: owner.y - 0.7 }; d.position.copy(W3(k.x, k.y, groundH(k.x, k.y))); d.rotation.y = Math.PI - owner.h; actors.push(k); return k; }
function parkAt(x, y, opt) { const i = nearestNode(x, y, 1), e = outEdges(i, 1), b = e.length ? GNB[e[0]] : i; const h = Math.atan2(nx(b) - nx(i), ny(b) - ny(i)); const l = Math.hypot(nx(b) - nx(i), ny(b) - ny(i)) || 1; const c = addCar(nx(i) + (nx(b) - nx(i)) / l * 4, ny(i) + (ny(b) - ny(i)) / l * 4, h, Object.assign({ ai: null, driver: false, keep: true }, opt || {})); return c; }

async function m1() {
  const yann = spawnActor('yann', YANN); face(yann, player); yann.mesh.userData.talk = true;
  const kaos = kaosFor(yann);
  await say([['Yann', 'Eh, toi. Ouais, toi. Kaos veut te parler.'], ['Kaos', 'Wouf.'], ['Yann', 'Je traduis : un mec de Villejean lui a chouravé sa gamelle. Celle en inox, avec son nom gravé dessus.'], ['Yann', 'Il traîne place Saint-Michel, gros blouson rouge. Ramène-la, et Kaos te file du taf.']]);
  yann.mesh.userData.talk = false;
  const fred = spawnActor('fred', { top: '#c81e1e', jacket: '#c81e1e', pants: '#22283a', cap: '#111111', skin: '#e0ac80', shoes: '#f0f0f0' }, { name: 'Fred' });
  goal(...P.fred); objective('Trouve le mec en blouson rouge, place Saint-Michel');
  await wait(() => dist(player, fred) < 12);
  face(fred, player);
  await say([['Fred', 'Quoi ? Elle est à moi maintenant, la gamelle. Elle me sert de cendrier.']]);
  goal(); objective('Rattrape-le !'); fred.still = false; fred.state = 'runaway';
  await wait(() => dist(player.car || player, fred) < 1.8, () => dist(player, fred) > 90 ? 'Fred t\'a semé dans les ruelles.' : false);
  fred.state = 'idle'; fred.still = true; face(fred, player);
  await say([['Fred', 'Ok, ok ! Tiens, ta gamelle. Dis à ton clebs que c\'était pour rire.']]);
  fred.state = 'flee'; fred.still = false; fred.t = 10;
  player.carry = 'gamelle'; goal(kaos.x, kaos.y); objective('Rapporte la gamelle à Kaos, place Sainte-Anne');
  await wait(near(kaos, 5));
  await say([['Kaos', 'Wouf ! WOUF.'], ['Yann', 'Il dit que t\'es réglo. Va voir le Tonton aux Lices, il a un colis pour toi.']]);
  reward(50, 'Kaos a récupéré sa gamelle');
}
async function m2() {
  const tonton = spawnActor('tonton', { top: '#3a5a3a', jacket: '#3a5a3a', pants: '#2a2a2a', cap: '#5a3a1a', skin: '#c68a5e' }); face(tonton, player); tonton.mesh.userData.talk = true;
  await say([['Le Tonton', 'C\'est toi, le nouveau de Kaos ? Bon. Un colis, rue de Saint-Malo, la porte bleue.'], ['Le Tonton', 'Passe par la rue de la Soif, y a du monde, personne regarde. Sauf les keufs : y a une patrouille ce soir. Évite-les.'], ['Le Tonton', 'T\'as une minute et demie. Le client a pas que ça à faire.']]);
  player.carry = 'colis';
  for (const [x, y] of [[-382, 132], [-350, 168], [-312, 205]]) { const c = addPed(x, y, { cop: true, keep: true, look: { top: '#1c2a4a', pants: '#1c2a4a', cap: '#101a36', skin: pick(SKIN), shoes: '#111', vest: '#1a2440' } }); actors.push(c); }
  const door = at('door');
  goal(door.x, door.y); objective('Livre le colis rue de Saint-Malo sans croiser la patrouille');
  const tf = timerFail(90, 'Trop tard, le client s\'est barré.');
  let warned = false;
  await wait(() => {
    if (wanted === 0) for (const p of peds) if (p.cop && dist(p, player.car || player) < 9) { setWanted(1); toast('Contrôle ! La patrouille t\'a repéré', 3); }
    if (near(door, 4)()) { if (wanted === 0) return true; if (!warned) { warned = true; toast('Le client n\'ouvre pas : t\'es suivi ! Sème les flics.', 3); } } else warned = false;
    return false;
  }, tf);
  bar(null); player.carry = null;
  await say([['Client', 'Pile poil. Dis au Tonton que c\'est carré.']]);
  reward(150, 'Colis livré');
}
async function m3() {
  const momo = spawnActor('momo', { top: '#6a6a6a', hood: true, pants: '#22283a', skin: '#8d5a3a', shoes: '#f0f0f0' }); face(momo, player); momo.mesh.userData.talk = true;
  await say([['Momo', 'Mauvaise nouvelle : la BAC prépare une descente. Ils sont là dans une minute.'], ['Momo', 'Y a trois sacs planqués dans le coin. Récupère-les avant eux, prends une caisse et file au Thabor.']]);
  actors.push(Object.assign(parkAt(-320, 380), { isCar: true }));
  const bags = [];
  for (let k = 0; k < 3; k++) {
    let s = null; for (let q = 0; q < 40; q++) { const c = randomWalkPoint(-327, 392, 35, 110); if (c && bags.every(b => Math.hypot(b.x - c[0], b.y - c[1]) > 30) && freeSpot(c[0], c[1], 0.8) && reachable(player.x, player.y, c[0], c[1], 2.2)) { s = c; break; } }
    if (!s) { const c = fp(-327 + rnd(-40, 40), 392 + rnd(-40, 40)); s = [c.x, c.y]; } /* fallback stays on a free walkable spot */
    const b = beam(0x39ff6a); b.scale.set(0.5, 0.12, 0.5); b.position.copy(W3(s[0], s[1])); b.visible = true;
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.4), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 })); bag.position.copy(W3(s[0], s[1], 0.2)); scene.add(bag);
    bags.push({ x: s[0], y: s[1], b, bag, got: false });
  }
  const cleanBags = () => { for (const b of bags) { scene.remove(b.b); scene.remove(b.bag); } };
  objective('Récupère les 3 sacs (repères verts) avant la BAC');
  let got = 0, t = 60;
  extraMarkers = () => { for (const b of bags) if (!b.got) markers.push({ x: b.x, y: b.y, c: '#39ff6a' }); };
  try {
    await wait(dt => {
      t -= dt; bar(`La BAC arrive · ${Math.ceil(t)} s`, t / 60, t < 15 ? '#ff4a4a' : '#ffc04a');
      for (const b of bags) if (!b.got && dist(player.car || player, b) < 2.8) { b.got = true; got++; scene.remove(b.b); scene.remove(b.bag); toast(`Sac ${got}/3`, 1.5); }
      return got === 3 || t <= 0;
    });
  } finally { extraMarkers = null; cleanBags(); }
  bar(null);
  if (!got) throw new Error('La BAC a tout saisi.');
  copUnmarked = true; setWanted(2); banner('LA BAC !', 'Sème-les, puis file au Thabor', 3);
  goal(...P.thabor); objective('Sème la BAC, puis dépose les sacs au Thabor');
  await wait(() => wanted === 0 && near(at('thabor'), 7)());
  reward(got * 100, `${got} sac${got > 1 ? 's' : ''} sauvé${got > 1 ? 's' : ''}`);
}
async function m4() {
  const yann = spawnActor('yann4', YANN); face(yann, player); yann.mesh.userData.talk = true; kaosFor(yann);
  await say([['Yann', 'Bien joué pour les sacs. Mais y a un souci : les gars de Villejean tournent en scooter dans le centre.'], ['Kaos', 'Grrrr.'], ['Yann', 'Kaos aime pas ça. Prends une caisse, colle-les jusqu\'à ce qu\'ils lâchent l\'affaire. Pas besoin de taper : juste les serrer.']]);
  if (!cars.some(c => !c.ai && dist(c, player) < 40)) actors.push(Object.assign(parkAt(410, 10), { isCar: true }));
  objective('Monte dans une voiture');
  await wait(() => !!player.car);
  const s = nearestNode(player.car.x + 60, player.car.y, 2), e = outEdges(s, 2), b = e.length ? GNB[e[0]] : s;
  const sc = addCar(nx(s), ny(s), Math.atan2(nx(b) - nx(s), ny(b) - ny(s)), { ai: 'flee', kind: 'scooter', keep: true, color: 0xd02040 }); sc.a = s; sc.b = b; sc.isCar = true; actors.push(sc);
  objective('Colle le scooter de Villejean jusqu\'à ce qu\'il abandonne');
  extraMarkers = () => markers.push({ x: sc.x, y: sc.y, c: '#ff3d8b' });
  let press = 0;
  await wait(dt => { const d = dist(player.car || player, sc); press = clamp(press + (d < 15 && player.car ? 20 : -4) * dt, 0, 100); bar('Pression', press / 100, '#ff3d8b'); return press >= 100; }, () => dist(player.car || player, sc) > 260 ? 'Le scooter t\'a semé.' : false);
  bar(null); sc.ai = 'stop';
  await say([['Le gars de Villejean', 'C\'est bon, c\'est bon ! Le centre, c\'est à vous. On reste à Villejean !']]);
  reward(400, 'Villejean a compris le message');
}
async function m5() {
  gameMin = 60 + 2;
  const barman = spawnActor('barman', { top: '#eeeeee', pants: '#111111', hair: '#111111', skin: '#f1c9a5', short: true });
  const gaby = spawnActor('gaby', { top: '#c8a040', pants: '#2a3a5a', hair: '#8a6a3a', skin: '#f6d8c0', female: false });
  face(barman, player); face(gaby, player); barman.mesh.userData.talk = true; gaby.mesh.userData.wobble = true;
  await say([['Barman', 'On ferme ! Et ton pote Gaby, il est raide.'], ['Gaby', 'J\'te jure… j\'ai rien dit… à personne… hic.'], ['Barman', 'Il raconte vos affaires à tout le bar depuis une heure. Ramène-le chez lui, rue de Paris, et vite.']]);
  gaby.still = false; gaby.state = 'follow'; gaby.speed = 3;
  if (!cars.some(c => !c.ai && dist(c, player) < 60)) actors.push(Object.assign(parkAt(-384, 110), { isCar: true }));
  const home = at('home');
  let talk = 0, t = 170;
  const tick = dt => { t -= dt; if (t <= 0) return 'Trop tard, Gaby a tout balancé à des inconnus.'; if (talk >= 100) return 'Gaby a tout raconté par la fenêtre… à une patrouille.'; return false; };
  for (; ;) {
    objective('Fais monter Gaby dans une voiture'); goal();
    await wait(() => { bar(`Bavardage · ${Math.ceil(t)} s`, talk / 100, '#ff3d8b'); return player.car && dist(player.car, gaby) < 7; }, tick);
    gaby.mesh.visible = false; gaby.state = 'incar'; toast('Gaby monte : « On va où ? Hic. »', 2.5);
    objective('Ramène Gaby rue de Paris, en douceur'); goal(home.x, home.y);
    await wait(dt => {
      if (!player.car) return true;
      const v = Math.abs(player.car.v); if (v > 17) talk += 7 * dt; else talk = Math.max(0, talk - 2 * dt);
      if (player.car.lastImpact > 5) { talk += 18; player.car.lastImpact = 0; toast('Gaby : « Ooh ! Doucement ! »', 1.5); }
      bar(`Bavardage · ${Math.ceil(t)} s`, talk / 100, '#ff3d8b');
      return dist(player.car, home) < 12 && v < 4;
    }, tick);
    if (player.car) break;
    gaby.x = player.x + 1.5; gaby.y = player.y; gaby.mesh.visible = true; gaby.state = 'follow';
  }
  bar(null);
  await say([['Gaby', 'T\'es… mon meilleur pote, toi. Hic.'], ['Yann (au téléphone)', 'Kaos est au courant. Il dit que la rue de la Soif, maintenant, c\'est toi qui la tiens. Wouf.']]);
  reward(500, 'Rue de la Soif : respect');
}
async function m6() {
  gameMin = 20 * 60 + 10;
  const yann = spawnActor('yann6', { ...YANN, top: '#c8141e', jacket: '#c8141e' }); face(yann, player); yann.mesh.userData.talk = true; kaosFor(yann);
  await say([['Yann', 'Le lendemain soir. Ce soir y a match au Roazhon Park, et Kaos a promis des galettes-saucisses à toute la tribune.'], ['Yann', 'Le camion de Momo est garé aux Lices. Il est chaud, faut livrer avant le coup d\'envoi.'], ['Kaos', 'Wouf ! (traduction : pas de galette froide.)']]);
  const truck = addCar(...P.truck, 0, { ai: null, driver: false, keep: true, type: 'van', kind: 'food', color: 0xe8e0d0 }); truck.isCar = true; actors.push(truck);
  const nb = outEdges(nearestNode(...P.truck, 1), 1); if (nb.length) { const b = GNB[nb[0]]; truck.h = Math.atan2(nx(b) - truck.x, ny(b) - truck.y); }
  goal(truck.x, truck.y); objective('Va chercher le camion de galettes-saucisses aux Lices');
  await wait(() => player.car === truck);
  const st = at('stade'); goal(st.x, st.y); objective('Livre les galettes au Roazhon Park avant qu\'elles refroidissent');
  let heat = 100;
  await wait(dt => {
    heat -= dt * 0.33; if (player.car === truck && truck.lastImpact > 6) { heat -= 6; truck.lastImpact = 0; toast('Les galettes valsent !', 1.2); }
    bar(`Chaleur des galettes · ${Math.max(0, heat | 0)} %`, heat / 100, heat < 30 ? '#4ab0ff' : '#ff7a2a');
    return player.car === truck && dist(truck, st) < 14 && Math.abs(truck.v) < 4;
  }, () => heat <= 0 ? 'Galettes froides. La tribune ne pardonne pas.' : false);
  bar(null);
  const pay = 200 + Math.round(heat * 5);
  await say([['Supporter', 'Les voilà ! Encore tièdes ! Allez Rennes !'], ['Yann (au téléphone)', 'Kaos dit que t\'es officiellement de la famille. Mais un certain Baron, à Villejean, n\'aime pas ça. Rejoins-moi rue de la Soif.']]);
  reward(pay, 'Tribune nourrie. Suite au repère rose, petits boulots en bleu');
}

/* ---------- lights / effects per frame ---------- */
let lightList = [], lightT = 0;
const _m4 = new THREE.Matrix4(), _c = new THREE.Color(), _v = new THREE.Vector3();
function updateLights(dt) {
  const cx = camera.position.x, cy = -camera.position.z;
  lightT -= dt;
  if (lightT <= 0) {
    lightT = 0.3; lightList = [];
    tilesIn(cx - 110, cy - 110, cx + 110, cy + 110, t => { for (const l of t.lights || []) { const d = Math.hypot(l[0] - cx, l[1] - cy); if (d < 110) lightList.push([d, l]); } });
    lightList.sort((a, b) => a[0] - b[0]);
    const COLS = [0xffb060, 0x30ff70, 0xff2020, 0xff4aa0, 0xeef4ff];
    for (let i = 0; i < lampLights.length; i++) {
      const L = lampLights[i], e = lightList[i];
      if (e && MODE.night) { const l = e[1]; L.position.set(l[0], l[2] - 0.4 + th(l[0], l[1]), -l[1]); L.color.set(COLS[l[3] || 0]); L.intensity = l[3] === 4 ? 2.5 : l[3] ? 0.9 : 1.1; L.distance = l[3] === 4 ? 140 : 24; } else L.intensity = 0;
    }
  }
  if (streakMesh.visible) {
    let n = 0; const cyh = camera.position.y;
    for (const [d, l] of lightList) {
      if (n >= STREAKS) break; if (d > 95) break;
      const mx = l[0], my = l[1], h = l[2], tt = cyh / (cyh + h);
      const px = cx + (mx - cx) * tt, py = cy + (my - cy) * tt;
      const dx = px - cx, dy = py - cy, dl = Math.hypot(dx, dy) || 1;
      const len = Math.min(18, 2 + h * 1.4 + dl * 0.08), wdt = 0.7 + h * 0.08;
      _m4.compose(_v.set(px + dx / dl * len * 0.35, 0.09, -(py + dy / dl * len * 0.35)), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.atan2(dx, -dy), 0)), new THREE.Vector3(wdt, 1, len));
      streakMesh.setMatrixAt(n, _m4);
      const k = clamp(1 - d / 95, 0, 1) * 0.32;
      _c.set([0xffb060, 0x30ff70, 0xff3030, 0xff4aa0, 0xdde8ff][l[3] || 0]).multiplyScalar(k); streakMesh.setColorAt(n, _c); n++;
    }
    streakMesh.count = n; streakMesh.instanceMatrix.needsUpdate = true; if (streakMesh.instanceColor) streakMesh.instanceColor.needsUpdate = true;
  }
  if (rain.visible && underRoof(player.x, player.y)) rain.visible = false; /* under the market halls' roof */
  else if (!rain.visible && MODE.rain && (!WX.auto || WX.k > 0.03) && !underRoof(player.x, player.y) && !INT.active) rain.visible = true;
  if (rain.visible) {
    rain.position.set(camera.position.x, camera.position.y - 12, camera.position.z);
    const a = rainPos, fall = dt * 18;
    for (let i = 0; i < RAIN; i++) { const o = i * 6; a[o + 1] -= fall; a[o + 4] -= fall; if (a[o + 4] < 0) { a[o + 1] += 30; a[o + 4] += 30; } }
    rainGeo.attributes.position.needsUpdate = true;
  }
  MAT.water.normalMap.offset.x += dt * 0.006; MAT.water.normalMap.offset.y += dt * 0.004;
  /* traffic lights cycle */
  const cyc = (performance.now() / 1000) % 26;
  for (const t of tiles.values()) if (t.tl) for (let ph = 0; ph < 2; ph++) {
    const c = (cyc + ph * 13) % 26, g = t.tl[ph]; if (!g || !g.r) continue;
    g.g.visible = c < 10; g.a.visible = c >= 10 && c < 13; g.r.visible = c >= 13;
  }
  /* sun / moon shadow follows player */
  const pl = player.car || player, dir = sun.userData.dir || new THREE.Vector3(-0.5, 0.7, 0.4);
  const sx = Math.round(pl.x / 4) * 4, sy = Math.round(pl.y / 4) * 4;
  const sh0 = th(sx, sy); sun.position.set(sx + dir.x * 220, dir.y * 220 + sh0, -sy + dir.z * 220); sun.target.position.set(sx, sh0, -sy);
  /* player headlights */
  if (player.car && MODE.night) { const c = player.car; headLight.intensity = 3; const hh = th(c.x, c.y) + (c.gy || 0); headLight.position.set(c.x + Math.sin(c.h) * 2, 0.9 + hh, -(c.y + Math.cos(c.h) * 2)); headLight.target.position.set(c.x + Math.sin(c.h) * 22, hh, -(c.y + Math.cos(c.h) * 22)); }
  else headLight.intensity = 0;
}

/* ---------- audio ---------- */
let AC = null, siren = null, sirenG = null, engine = null, engineG = null, rainG = null;
function initAudio() {
  try {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    const out = AC.createGain(); out.gain.value = 0.8; out.connect(AC.destination);
    siren = AC.createOscillator(); siren.type = 'square'; sirenG = AC.createGain(); sirenG.gain.value = 0; const f = AC.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1500; siren.connect(f); f.connect(sirenG); sirenG.connect(out); siren.start();
    engine = AC.createOscillator(); engine.type = 'sawtooth'; engineG = AC.createGain(); engineG.gain.value = 0; const ef = AC.createBiquadFilter(); ef.type = 'lowpass'; ef.frequency.value = 420; engine.connect(ef); ef.connect(engineG); engineG.connect(out); engine.start();
    const buf = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const ns = AC.createBufferSource(); ns.buffer = buf; ns.loop = true; const bp = AC.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2600; bp.Q.value = 0.4; rainG = AC.createGain(); rainG.gain.value = 0; ns.connect(bp); bp.connect(rainG); rainG.connect(out); ns.start();
  } catch (e) { AC = null; }
}
function updateAudio(md) {
  if (!AC) return;
  if (wanted > 0) { sirenG.gain.value = clamp(0.05 - md / 5000, 0.004, 0.05); siren.frequency.value = (performance.now() / 600 | 0) % 2 ? 660 : 880; } else sirenG.gain.value = 0;
  if (player.car) { const v = Math.abs(player.car.v); engine.frequency.value = 38 + (v % 9) * 9 + v * 2.2; engineG.gain.value = 0.035 + Math.min(v, 30) * 0.0012; } else engineG.gain.value = 0;
  rainG.gain.value = MODE.rain ? (player.car ? 0.02 : 0.045) : 0;
}

/* ---------- main step ---------- */
let clockAcc = 0, popT = 0, tileT = 0, streetT = 0;
function step(dt, t) {
  const inDialog = dialogActive();
  const fwd = (K('KeyW') || K('ArrowUp') ? 1 : 0) - (K('KeyS') || K('ArrowDown') ? 1 : 0);
  const side = (K('KeyD') || K('ArrowRight') ? 1 : 0) - (K('KeyA') || K('ArrowLeft') ? 1 : 0);
  if (INT.active) interiorStep(dt, t);
  else if (player.car) {
    const c = player.car;
    const imp = driveCar(c, dt, inDialog ? 0 : fwd, inDialog ? 0 : side, K('Space'));
    if (imp > 5) c.lastImpact = imp;
    player.x = c.x; player.y = c.y;
    if (performance.now() - lastMouse > 1400) yaw += angWrap((c.v < -2 ? c.h : c.h) - yaw) * Math.min(1, dt * 2.2);
  } else {
    if (!inDialog && (fwd || side) && koT <= 0 && searchT <= 0) {
      let mx = fwd * Math.sin(yaw) + side * Math.cos(yaw), my = fwd * Math.cos(yaw) - side * Math.sin(yaw);
      const l = Math.hypot(mx, my); mx /= l; my /= l;
      const run = K('ShiftLeft') || K('ShiftRight'), sp = run ? 7.4 : 3.3;
      const ox = player.x, oy = player.y;
      player.x += mx * sp * dt; player.y += my * sp * dt;
      if (punchT <= 0) player.h += angWrap(Math.atan2(mx, my) - player.h) * Math.min(1, dt * 12);
      resolve(player, 0.38);
      if (inWater(player.x, player.y)) { player.x = ox; player.y = oy; }
      doorWalkIn(dt, true);
      for (const c of cars) { const d = dist(c, player); if (d < 2.3) { const a = Math.atan2(player.x - c.x, player.y - c.y); player.x = c.x + Math.sin(a) * 2.3; player.y = c.y + Math.cos(a) * 2.3; } }
      player.phase += dt * sp * (run ? 2.6 : 3.4);
      poseChar(player.mesh, run ? 'run' : 'walk', player.phase, 1, t);
    } else { poseChar(player.mesh, 'idle', 0, 0, t); doorWalkIn(dt, false); }
    playerCombatPose();
    player.mesh.position.set(player.x, liftTo(player, dt), -player.y); player.mesh.rotation.y = Math.PI - player.h;
  }
  /* cars */
  for (const c of cars.slice()) {
    if (c !== player.car) {
      if (c.ai === 'traffic') { if (dist(c, player.car || player) < 450) followGraph(c, dt, 1, 12); }
      else if (c.ai === 'flee') followGraph(c, dt, 2, 15, player.car || player);
      else if (c.ai === 'cop') chaseAI(c, dt);
      else if (c.ai === 'leave') { c.t -= dt; followGraph(c, dt, 2, 14); if (c.t <= 0 && dist(c, player) > 120) { removeCar(c); continue; } }
      else c.v *= 1 - Math.min(1, dt * 3);
    }
    const m = c.mesh; m.position.set(c.x, dist(c, player.car || player) < 150 ? liftTo(c, dt) : 0, -c.y); m.rotation.y = Math.PI - c.h;
    const dd = dist(c, player.car || player); m.visible = dd < 300;
    if (dd < 80) for (const w of m.userData.wheels) w.rotation.x = c.wheelRot;
    if (m.userData.rider && dd < 60) poseCyclist(m.userData.rider, c.wheelRot * 0.5);
    const det = dd < 70; if (m.userData.detail && m.userData.det !== det) { m.userData.det = det; for (const o of m.userData.detail) o.visible = det; }
    if (m.userData.lights) { const on = (performance.now() / 160 | 0) % 2; m.userData.lights[0].material = on ? CARMAT.blue : CARMAT.blueOff; m.userData.lights[1].material = on ? CARMAT.blueOff : CARMAT.red; }
  }
  /* car-car collisions */
  for (let i = 0; i < cars.length; i++) for (let j = i + 1; j < cars.length; j++) {
    const a = cars[i], b = cars[j]; if (Math.abs(a.x - b.x) > 5 || Math.abs(a.y - b.y) > 5) continue;
    const pen = obbOverlap(a, b);
    if (pen) {
      const [nxv, nyv, o0] = pen, o = o0 / 2;
      a.x += nxv * o; a.y += nyv * o; b.x -= nxv * o; b.y -= nyv * o;
      const rel = Math.abs(a.v - b.v);
      if ((a === player.car || b === player.car) && rel > 5) { player.car.lastImpact = rel; if ((a.ai === 'traffic' || b.ai === 'traffic') && wanted === 0 && copsNear(80)) setWanted(1); }
      a.v *= 0.6; b.v *= 0.6;
    }
  }
  for (const p of peds.slice()) updatePed(p, dt, t);
  /* police */
  const md = updatePolice(dt);
  updateAudio(md);
  /* missions */
  if (!mission && !side && !INT.active && missionIdx < MISSIONS.length && !inDialog) {
    const a = MISSIONS[missionIdx].at, pl = player.car || player, d = dist(pl, a);
    if (d > 8) rearm = true;
    if (d < 4 && !player.car && rearm) { rearm = false; startMission(missionIdx); }
    else if (d < 4 && player.car) showPrompt('Descends de voiture pour lancer la mission (E)'); else showPrompt(null);
  } else showPrompt(null);
  if (missionTick && !inDialog) missionTick(dt);
  lifeStep(dt, t);
  if (!player.car && !inDialog && !INT.active && !lifePrompt) { let nb = null; for (const c of cars) if (c.ai !== 'cop' && c.kind !== 'bike' && (c.kind !== 'scooter' || c.free) && dist(c, player) < 4.5) nb = c; if (nb && !$('prompt').textContent) showPrompt(nb.driverMesh ? 'E : piquer la voiture' : 'E : monter'); }
  /* world streaming & population */
  tileT -= dt; if (tileT <= 0) { tileT = 0.5; const pl = player.car || player; updateTiles(pl.x, pl.y); }
  popT -= dt; if (popT <= 0) { popT = 0.12; populate(dt, player.car || player); }
  updateGPS(dt); weatherStep(dt);
  /* clock + HUD */
  clockAcc += dt; if (clockAcc > 2) { clockAcc = 0; gameMin = (gameMin + 1) % 1440; $('clock').textContent = String(gameMin / 60 | 0).padStart(2, '0') + ':' + String(gameMin % 60).padStart(2, '0'); }
  if (toastT > 0 && (toastT -= dt) <= 0) $('toast').classList.remove('show');
  if (bannerT > 0 && (bannerT -= dt) <= 0) $('banner').classList.remove('show');
  streetT -= dt; if (streetT <= 0 && !INT.active) { streetT = 0.6; const pl = player.car || player; $('street').textContent = nearestNamedRoad(pl.x, pl.y) || ''; }
  $('speed').style.display = player.car ? 'block' : 'none'; if (player.car) $('kmh').textContent = Math.round(Math.abs(player.car.v) * 3.6);
}
function showPrompt(t) { const el = $('prompt'); if (!t) { el.style.display = 'none'; el.textContent = ''; } else { el.textContent = t; el.style.display = 'block'; } }

const camPos = new THREE.Vector3(), camTgt = new THREE.Vector3(), camLook = new THREE.Vector3();
function updateCamera(dt) {
  if (window.__freecam) { const f = window.__freecam; camera.position.set(f[0], f[1], f[2]); camera.lookAt(f[3], f[4], f[5]); return; }
  const t = player.car || player, inCar = !!player.car;
  const d = inCar ? 7.8 + Math.min(Math.abs(player.car.v), 30) * 0.06 : 4.3, hb = inCar ? 1.7 : 1.55;
  let dd = d;
  for (let k = 1; k <= 8; k++) { const f = k / 8 * d, x = t.x - Math.sin(yaw) * f * Math.cos(pitch), y = t.y - Math.cos(yaw) * f * Math.cos(pitch), h = hb + Math.sin(pitch) * f + 0.5; if (insideBuilding(x, y, h)) { dd = Math.max(1.2, f - d / 8); break; } }
  const cx = t.x - Math.sin(yaw) * dd * Math.cos(pitch), cy = t.y - Math.cos(yaw) * dd * Math.cos(pitch), ch = Math.max(0.4, hb + Math.sin(pitch) * dd + 0.5);
  const tg = th(t.x, t.y) + (t.gy || 0);
  camPos.set(cx, Math.max(ch + tg, th(cx, cy) + 0.6), -cy); camera.position.lerp(camPos, Math.min(1, dt * (inCar ? 8 : 12)));
  camTgt.set(t.x, hb + (inCar ? 0.3 : 0.15) + tg, -t.y); camLook.lerp(camTgt, Math.min(1, dt * 15)); camera.lookAt(camLook);
  camera.fov = lerp(camera.fov, inCar ? 66 + Math.min(Math.abs(player.car.v), 33) * 0.35 : 68, Math.min(1, dt * 3)); camera.updateProjectionMatrix();
  const pulse = 1 + Math.sin(performance.now() / 300) * 0.08; startBeam.scale.set(pulse, 1, pulse); goalBeam.scale.set(pulse, 1, pulse);
}

let last = performance.now(), frames = 0;
/* ---------- performance: shadows refreshed every other frame, shadows only for nearby people and cars,
   resolution that adapts to keep ~50 fps (the look stays the same, only the pixel count moves) ---------- */
const PERF = { acc: 0, n: 0, pr: renderer.getPixelRatio(), maxPr: Math.min(devicePixelRatio, 1.25), t: 0 };
renderer.shadowMap.autoUpdate = false;
function perfTick(now) {
  renderer.shadowMap.needsUpdate = (frames & 1) === 0 || INT.active;
  const dt = now - (PERF.last || now); PERF.last = now; PERF.acc += dt; PERF.n++;
  if (PERF.acc > 1500) {
    const ms = PERF.acc / PERF.n; PERF.acc = 0; PERF.n = 0;
    let pr = PERF.pr; if (ms > 24) pr = Math.max(0.6, pr - 0.1); else if (ms < 15) pr = Math.min(PERF.maxPr, pr + 0.05);
    if (Math.abs(pr - PERF.pr) > 0.01 && !window.__fixedRes) { PERF.pr = pr; renderer.setPixelRatio(pr); composer.setPixelRatio(pr); onResize(); }
    const pl = player.car || player;
    for (const p of peds) if (p.mesh) p.mesh.castShadow = Math.abs(p.x - pl.x) + Math.abs(p.y - pl.y) < 55;
    for (const c of cars) if (c.mesh) { const on = Math.abs(c.x - pl.x) + Math.abs(c.y - pl.y) < 80; if (c.mesh.userData.sh !== on) { c.mesh.userData.sh = on; c.mesh.traverse(o => { if (o.isMesh) o.castShadow = on; }); } }
  }
}
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now; const t = now / 1000;
  if (started && !paused) { step(dt, t); refreshMarkers(); }
  pumpTiles(started ? 7 : 40);
  if (INT.active) interiorCamera(dt); else { updateCamera(dt); const pl = player.car || player; updateGround(pl.x, pl.y); }
  postCamera(t);
  updateLights(dt);
  gradePass.uniforms.time.value = t % 100;
  perfTick(now);
  composer.render();
  if (started && (frames++ % 2 === 0)) drawMini();
  requestAnimationFrame(loop);
}

/* ---------- init ---------- */
async function init() {
  const play = $('play'), st = msg => { play.textContent = msg; };
  st('Chargement de la carte…');
  const gd = await (await fetch('global.json')).json(); initGlobal(gd); initTiles();
  mapImg = await loadImg('map.webp'); const mask = await loadImg('water.png');
  st('Chargement du relief…'); await loadTerrain(); const lcImg = await loadImg('landcover.png');
  st('Chargement du ciel…'); await loadEnvironments();
  st('Chargement des textures…'); await loadGroundMaterials(); await loadWallImages();
  st('Peinture des façades…'); try { await document.fonts.load('700 20px "Barlow Condensed"'); } catch (e) { } await buildFacadeMaterials();
  buildProps(); buildStorefronts(); buildCarAssets(); buildGlobal(mask, lcImg);
  startBeam = beam(0xff3d8b); goalBeam = beam(0xffc04a); initSide(); initBlood(); initRoomLights(); await initMetro(); await initBus(); initCarousels();
  applyMode(MODES[0]); onResize();
  player.mesh = makeChar({ female: false, skin: '#e0ac80', hair: '#2a1a10', top: '#2a2e36', hood: true, pants: '#3a4a6a', shoes: '#f0f0f0', jacket: null, cap: false, beanie: false, long: false, bag: false, skirt: false, short: false });
  player.mesh.position.set(player.x, 0, -player.y);
  camera.position.set(player.x - 6, 4, -player.y + 6); camLook.set(player.x, 1.5, -player.y);
  updateTiles(player.x, player.y);
  requestAnimationFrame(loop);
  const need = [...tiles.values()].filter(t => t.d < 300).length;
  while (true) {
    const near = [...tiles.values()].filter(t => t.d < 300), done = near.filter(t => t.built).length;
    st(`Construction de Rennes… ${Math.round(done / Math.max(1, near.length) * 100)} %`);
    if (done >= near.length && near.length) break;
    await new Promise(r => setTimeout(r, 120));
  }
  for (let k = 0; k < 90; k++) populate(0, player);
  startBeam.position.copy(W3(MISSIONS[0].at.x, MISSIONS[0].at.y)); startBeam.visible = true;
  setMoney(0); setWanted(0);
  play.disabled = false; st('Jouer');
}
document.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => { const m = MODES.find(x => x.id === b.dataset.mode); document.querySelectorAll('[data-mode]').forEach(x => x.setAttribute('aria-pressed', x === b)); if (MAT.asphalt) applyMode(m); else { MODE = m; WX.auto = !!m.auto; } }));
$('play').addEventListener('click', () => {
  $('title').style.display = 'none'; started = true; initAudio(); applyMode(MODE);
  try { const r = canvasEl.requestPointerLock(); if (r && r.catch) r.catch(() => { }); } catch (e) { }
  banner('Grand Theft Roazhon', 'Kaos t\'attend place Sainte-Anne (repère rose)', 4);
});
window.__game = { player, cars, peds, tiles, get money() { return money; }, get wanted() { return wanted; }, get missionIdx() { return missionIdx; }, get mission() { return mission; }, jump(i) { missionIdx = i; startBeam.position.copy(W3(MISSIONS[i].at.x, MISSIONS[i].at.y)); }, setWanted, MISSIONS, P, get goal() { return goalBeam.visible ? { x: goalBeam.position.x, y: -goalBeam.position.z } : null; }, markersList: () => markers, sim(sec) { for (let tt = 0; tt < sec; tt += 1 / 30) { step(1 / 30, performance.now() / 1000); refreshMarkers(); pumpTiles(5); } }, setcam(y, p) { yaw = y; pitch = p; lastMouse = performance.now(); }, applyMode, MODES, toggleMap };
init().catch(e => { $('play').textContent = 'Erreur : ' + e.message; console.error(e); });
