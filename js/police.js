'use strict';
/* ===== police: five levels of heat, and a sixth for when Rennes really loses it =====
   1  a patrol car, officers on foot arrest you on contact
   2  two cars, they call for backup
   3  three cars including the BAC (unmarked), roadblocks, batons on foot
   4  CRS vans join, roadblocks more often
   5  six vehicles and the helicopter (it keeps you in sight)
   6  RAID: black vans, eight vehicles, helicopter, roadblocks everywhere — only reached by killing officers */
const POL = {
  n: [0, 1, 2, 3, 4, 6, 8], evR: [0, 110, 130, 160, 190, 230, 280], evT: [0, 10, 14, 18, 24, 32, 45],
  heat: 0, copKills: 0, blockT: 0, heli: null, heliPos: null, hitT: 0
};
function copSpec(level, k) {
  if (level >= 6 && k >= 2) return { type: k % 2 ? 'van' : 'suv', copColor: 0x0c0d10, marked: true };
  if (level >= 4 && k >= 3) return { type: 'van', copColor: 0x22345c, marked: true };
  if (level >= 3 && k === 2) return { type: 'sedan', marked: false };
  return { type: k % 3 === 1 ? 'hatch' : 'sedan', marked: !copUnmarked };
}
function setWanted(w) {
  w = clamp(Math.round(w), 0, 6);
  if (w > wanted && wanted > 0) toast(['', '', 'Renforts demandés', 'La BAC est sur le coup', 'Les CRS arrivent', 'Hélicoptère en approche', 'LE RAID EST DÉPLOYÉ'][w], 2.5);
  if (w === 0) { POL.heat = 0; }
  wanted = w; evadeT = 0;
  [...$('wanted').children].forEach((el, i) => { el.classList.toggle('on', i < wanted); });
  $('wanted').classList.toggle('six', wanted >= 6);
  syncCops();
}
function syncCops() {
  const copCars = cars.filter(c => c.ai === 'cop');
  const pl = player.car || player;
  let k = copCars.length;
  while (copCars.length < POL.n[wanted]) {
    let best = -1;
    for (let q = 0; q < 60; q++) { const a = Math.random() * 6.28, r = rnd(120, 230), i = nearestNode(pl.x + Math.cos(a) * r, pl.y + Math.sin(a) * r, 1); const d = Math.hypot(nx(i) - pl.x, ny(i) - pl.y); if (d > 100 && d < 270) { best = i; break; } }
    if (best < 0) best = nearestNode(pl.x + 150, pl.y, 1);
    if (best < 0) break; // aucun point routier valide : ne pas placer de patrouille au nœud 0
    const e = outEdges(best, 2); const b = e.length ? GNB[e[0]] : best;
    const c = addCar(nx(best), ny(best), Math.atan2(nx(b) - nx(best), ny(b) - ny(best)), Object.assign({ ai: 'cop', kind: 'cop', keep: true }, copSpec(wanted, k++)));
    copCars.push(c);
  }
  if (wanted === 0) {
    for (const c of cars) if (c.ai === 'cop' || c.ai === 'block') { c.ai = 'leave'; c.t = 6; c.a = -1; c.keep = false; }
    if (POL.heli) { scene.remove(POL.heli); POL.heli = null; }
  }
}
/* roadblock: two cars across the road ahead of where you are heading */
function roadblock() {
  const pl = player.car || player, h = player.car ? player.car.h : player.h;
  const ax = pl.x + Math.sin(h) * rnd(150, 210), ay = pl.y + Math.cos(h) * rnd(150, 210);
  const i = nearestNode(ax, ay, 1); if (i < 0) return;
  const x = nx(i), y = ny(i); if (Math.hypot(x - pl.x, y - pl.y) < 110 || (started && camFacing(x, y) > 0.92 && Math.hypot(x - pl.x, y - pl.y) < 140)) return;
  const e = outEdges(i, 1); if (!e.length) return;
  const b = GNB[e[0]], rh = Math.atan2(nx(b) - x, ny(b) - y), px = Math.cos(rh), py = -Math.sin(rh);
  for (const s of [-1, 1]) {
    const c = addCar(x + px * s * 2.2, y + py * s * 2.2, rh + Math.PI / 2 * s + rnd(-0.2, 0.2), Object.assign({ ai: 'block', kind: 'cop', keep: true }, copSpec(Math.min(wanted, 5), 0)));
    c.blockAt = performance.now();
  }
  for (const s of [-1, 1]) { const q = addPed(x + px * s * 5, y + py * s * 5 + 2, { cop: true, look: { top: '#1c2a4a', pants: '#1c2a4a', cap: '#101a36', skin: pick(SKIN), shoes: '#111', vest: '#1a2440' } }); q.state = 'idle'; q.t = 1e9; q.blocker = true; }
}
function heliMesh() {
  const g = new THREE.Group(), dark = M({ color: 0x1c2330, roughness: 0.5, metalness: 0.3 }), glass = CARMAT.glass;
  const body = new THREE.Mesh(new THREE.SphereGeometry(1.4, 14, 10), dark); body.scale.set(1, 0.9, 1.7); g.add(body);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 5.5), dark); tail.position.set(0, 0.2, -4.2); g.add(tail);
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.2, 0.8), dark); fin.position.set(0, 0.8, -6.8); g.add(fin);
  const ws = new THREE.Mesh(new THREE.SphereGeometry(1.0, 12, 8, 0, Math.PI * 2, 0, 1.2), glass); ws.position.set(0, 0.15, 1.2); ws.rotation.x = 1.2; g.add(ws);
  for (const s of [1, -1]) { const sk = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 3), dark); sk.position.set(s * 0.9, -1.3, 0.2); g.add(sk); }
  const rotor = new THREE.Mesh(new THREE.BoxGeometry(11, 0.05, 0.3), dark); rotor.position.y = 1.45; g.add(rotor); g.userData.rotor = rotor;
  const r2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 11), dark); rotor.add(r2);
  const beamM = new THREE.MeshBasicMaterial({ color: 0xdfe8ff, transparent: true, opacity: 0.09, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 7, 1, 20, 1, true).translate(0, -0.5, 0), beamM); scene.add(beam); g.userData.beam = beam;
  const spotM = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending });
  const spot = new THREE.Mesh(new THREE.CircleGeometry(7, 24).rotateX(-Math.PI / 2), spotM); scene.add(spot); g.userData.spot = spot;
  scene.add(g); return g;
}
function updatePolice(dt) {
  const pl = player.car || player;
  if (wanted === 0) { $('evade').textContent = ''; return 1e9; }
  /* heat rises while the chase goes on, up to level 5 */
  POL.heat += dt;
  if (wanted >= 2 && wanted < 5 && POL.heat > 70 + wanted * 15) { POL.heat = 0; setWanted(wanted + 1); }
  if (cars.filter(c => c.ai === 'cop').length < POL.n[wanted]) { POL.respawn = (POL.respawn || 0) + dt; if (POL.respawn > 6) { POL.respawn = 0; syncCops(); } }
  /* roadblocks */
  if (wanted >= 3) { POL.blockT -= dt; if (POL.blockT <= 0) { POL.blockT = wanted >= 5 ? 18 : 28; roadblock(); } }
  for (const c of cars) if (c.ai === 'block') {
    const d = dist(c, pl);
    if (d < 22 || d > 380) { if (d > 380) { c.keep = false; c.ai = null; } else { c.ai = 'cop'; c.deployed = true; } }
  }
  for (const p of peds) if (p.blocker && dist(p, pl) < 30) { p.blocker = false; p.state = 'chase'; }
  /* helicopter from level 5 */
  if (wanted >= 5) {
    if (!POL.heli) { POL.heli = heliMesh(); POL.heliPos = { x: pl.x - 180, y: pl.y - 120 }; }
    const hp = POL.heliPos, dx = pl.x - hp.x, dy = pl.y - hp.y, d = Math.hypot(dx, dy), v = Math.min(d, 32 * dt);
    if (d > 8) { hp.x += dx / d * v; hp.y += dy / d * v; }
    const g = POL.heli, alt = th(hp.x, hp.y) + 48;
    g.position.set(hp.x, alt, -hp.y); g.rotation.y = Math.PI - Math.atan2(dx, dy); g.rotation.z = Math.sin(performance.now() / 900) * 0.05; g.rotation.x = Math.min(0.25, d / 200);
    g.userData.rotor.rotation.y += dt * 40;
    const gx = pl.x + Math.sin(performance.now() / 1300) * 2, gy = pl.y, gz = th(gx, gy) + 0.2;
    const b = g.userData.beam, top = new THREE.Vector3(hp.x, alt - 1.2, -hp.y), bot = new THREE.Vector3(gx, gz, -gy), L = top.distanceTo(bot);
    b.position.copy(top); b.scale.set(1, L, 1); b.lookAt(bot); b.rotateX(-Math.PI / 2); b.visible = d < 90;
    g.userData.spot.position.set(gx, gz + 0.05, -gy); g.userData.spot.visible = d < 90;
  }
  /* closest pursuer */
  let md = 1e9;
  for (const c of cars) if (c.ai === 'cop') md = Math.min(md, dist(c, pl));
  for (const p of peds) if (p.cop && p.state === 'chase') md = Math.min(md, dist(p, pl));
  if (POL.heli) md = Math.min(md, Math.hypot(POL.heliPos.x - pl.x, POL.heliPos.y - pl.y) * 1.4);
  const R = POL.evR[wanted], T = POL.evT[wanted];
  if (md > R) { evadeT += dt; $('evade').textContent = `Ils te perdent… ${Math.max(0, T - evadeT).toFixed(0)} s`; if (evadeT >= T) { setWanted(0); toast('Tu les as semés', 2.5); } }
  else { evadeT = Math.max(0, evadeT - dt * 2); $('evade').textContent = `Sème-les : plus de ${R} m`; }
  /* arrest */
  let close = false; for (const c of cars) if (c.ai === 'cop' && dist(c, pl) < (player.car ? 5.5 : 4.5)) close = true;
  if (close && (!player.car || Math.abs(player.car.v) < 2)) { bustT += dt; if (bustT > (player.car ? (wanted >= 5 ? 1.0 : 1.8) : 0.8)) busted(); } else bustT = Math.max(0, bustT - dt);
  return md;
}
/* an officer on foot reaches you: arrest at low levels, batons from level 3 */
function copContact(p, dt) {
  if (wanted < 3) { busted(); return; }
  POL.hitT -= dt;
  if (POL.hitT <= 0) { POL.hitT = wanted >= 6 ? 0.6 : 0.9; hurtPlayer(wanted >= 5 ? 14 : 10); if (player.hp < 30) busted(); }
}
function copKilled() {
  POL.copKills++;
  if (wanted >= 5 && POL.copKills >= 6) setWanted(6);
  else setWanted(Math.min(5, Math.max(wanted + 1, 3)));
}
