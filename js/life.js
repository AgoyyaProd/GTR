'use strict';
/* ===== life: fighting, enterable shops & bars, side jobs, story missions 7–9 ===== */

/* ---------- player health ---------- */
player.hp = 100;
let hurtT = 0, koT = 0, drunkT = 0, drinks = 0, combatQuiet = false, fightGuardT = 0;
const HOSP = { x: -1372, y: 930, name: 'Pontchaillou' };
function setHP(v) {
  player.hp = clamp(v, 0, 100);
  $('hpfill').style.width = player.hp + '%'; $('hp').classList.toggle('low', player.hp < 30);
}
function flashRed() { const f = $('flash'); f.style.transition = 'none'; f.style.opacity = '0.45'; requestAnimationFrame(() => { f.style.transition = 'opacity .5s'; f.style.opacity = '0'; }); }
function hurtPlayer(n) {
  if (koT > 0 || player.car) return;
  setHP(player.hp - n); hurtT = 7; flashRed(); fightGuardT = 4; sfx('hit'); camShake = Math.max(camShake, 0.25);
  { const P = meNow(); bleed(P.x, P.y, INT.active ? 0 : baseOf(player), 1.45, 3, 0, 0); }
  if (player.hp <= 0) knockOut();
}
function knockOut() {
  koT = 3.5;
  const lost = Math.round(money * 0.1); setMoney(money - lost);
  banner('K.O.', `Réveil aux urgences de ${HOSP.name}${lost ? ' · −' + lost + ' €' : ''}`, 4.5);
  if (INT.active) leaveInterior(true);
  if (mission) failMission('Tu es tombé K.O.');
  if (side) side.cancel('Tu es tombé K.O.');
  setWanted(0);
  const s = fp(HOSP.x, HOSP.y); player.x = s.x; player.y = s.y; player.gy = undefined;
  for (const p of peds) if (p.state === 'fight') { p.state = 'walk'; p.seg = null; }
  setTimeout(() => setHP(100), 600);
}

/* ---------- tiny sound effects (WebAudio noise bursts) ---------- */
function sfx(kind) {
  if (typeof AC === 'undefined' || !AC) return;
  const t = AC.currentTime, len = kind === 'hit' ? 0.12 : 0.18;
  const buf = AC.createBuffer(1, AC.sampleRate * len | 0, AC.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, kind === 'hit' ? 3 : 1.5);
  const src = AC.createBufferSource(); src.buffer = buf;
  const f = AC.createBiquadFilter(); f.type = kind === 'hit' ? 'lowpass' : 'bandpass'; f.frequency.value = kind === 'hit' ? 900 : 1800;
  const g = AC.createGain(); g.gain.setValueAtTime(kind === 'hit' ? 0.5 : 0.12, t);
  src.connect(f); f.connect(g); g.connect(AC.destination); src.start(t);
}

/* ---------- blood: droplets that fly and splash, pools that spread under bodies ---------- */
const BLOOD = { drops: [], decals: [], dm: null, km: null, ki: 0 };
let camShake = 0;
function initBlood() {
  const dmat = new THREE.MeshStandardMaterial({ color: 0x5a0006, roughness: 0.25 }); allMats.push(dmat);
  BLOOD.dm = new THREE.InstancedMesh(new THREE.SphereGeometry(0.016, 4, 3), dmat, 200); BLOOD.dm.count = 0; BLOOD.dm.frustumCulled = false;
  const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
  for (let k = 0; k < 26; k++) { const a = Math.random() * 6.28, r = Math.random() * 34, rr = 8 + Math.random() * 22 * (1 - r / 50); g.fillStyle = `rgba(${70 + Math.random() * 30},0,${4 + Math.random() * 6},${0.75 + Math.random() * 0.25})`; g.beginPath(); g.arc(64 + Math.cos(a) * r, 64 + Math.sin(a) * r, rr, 0, 6.28); g.fill(); }
  const km = new THREE.MeshStandardMaterial({ map: canvasTex(c, true), transparent: true, depthWrite: false, roughness: 0.15, metalness: 0.1, polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6 }); allMats.push(km);
  BLOOD.km = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), km, 160); BLOOD.km.count = 0; BLOOD.km.frustumCulled = false;
  scene.add(BLOOD.dm, BLOOD.km);
}
function bloodTo(sc) { if (!BLOOD.dm) return; BLOOD.drops = []; BLOOD.decals = []; BLOOD.dm.count = BLOOD.km.count = 0; sc.add(BLOOD.dm, BLOOD.km); }
function bleed(x, y, base, h, n, dx, dy) {
  if (!BLOOD.dm) return;
  for (let k = 0; k < n && BLOOD.drops.length < 200; k++) BLOOD.drops.push({ x, y, z: base + h, vx: dx * rnd(0.5, 2.2) + rnd(-0.8, 0.8), vy: dy * rnd(0.5, 2.2) + rnd(-0.8, 0.8), vz: rnd(0.2, 1.8), base });
}
function splat(x, y, base, size, grow) {
  const d = { x, y, base: base + 0.012, s: grow ? 0.2 : size, max: size, rot: Math.random() * 6.28, grow: !!grow };
  if (BLOOD.decals.length < 160) BLOOD.decals.push(d); else { BLOOD.decals[BLOOD.ki % 160] = d; BLOOD.ki++; }
}
const _bm = new THREE.Matrix4();
function updateBlood(dt) {
  if (!BLOOD.dm) return;
  for (let i = BLOOD.drops.length - 1; i >= 0; i--) {
    const d = BLOOD.drops[i]; d.vz -= 9.8 * dt; d.x += d.vx * dt; d.y += d.vy * dt; d.z += d.vz * dt;
    if (d.z <= d.base) { if (Math.random() < 0.35) splat(d.x, d.y, d.base, rnd(0.12, 0.3)); BLOOD.drops.splice(i, 1); }
  }
  BLOOD.drops.forEach((d, i) => BLOOD.dm.setMatrixAt(i, _bm.makeTranslation(d.x, d.z, -d.y)));
  BLOOD.dm.count = BLOOD.drops.length; BLOOD.dm.instanceMatrix.needsUpdate = true;
  BLOOD.decals.forEach((d, i) => { if (d.grow && d.s < d.max) d.s = Math.min(d.max, d.s + dt * 0.35 * (1 - d.s / d.max * 0.7)); BLOOD.km.setMatrixAt(i, MX(d.x, d.base, -d.y, 0, d.rot, 0, d.s, 1, d.s)); });
  BLOOD.km.count = BLOOD.decals.length; BLOOD.km.instanceMatrix.needsUpdate = true;
}
function baseOf(p) { return INT.active ? 0 : (p.gy !== undefined ? p.gy : SW); }

/* ---------- melee ---------- */
let punchT = 0, punchHit = false, punchSide = 0;
const PUNCH = 0.42;
function meNow() { return INT.active ? INT.me : player; }
function combatTargets() { return INT.active ? INT.npcs : peds; }
function punch() {
  if (player.car || koT > 0 || dialogActive() || punchT > 0 || mapOpen) return;
  punchT = PUNCH; punchHit = false; punchSide ^= 1; fightGuardT = 4;
  /* soft auto-aim toward the closest person in front */
  const P = meNow(); let best = null, bd = 2.6;
  for (const p of combatTargets()) { if (p.state === 'dead' || p.state === 'incar' || !p.mesh.visible) continue; const dx = p.x - P.x, dy = p.y - P.y, d = Math.hypot(dx, dy); if (d < bd && Math.abs(angWrap(Math.atan2(dx, dy) - P.h)) < 1.3) { bd = d; best = p; } }
  if (best) P.h = Math.atan2(best.x - P.x, best.y - P.y);
}
function updatePunch(dt) {
  if (punchT <= 0) return;
  punchT -= dt;
  if (punchHit || punchT > PUNCH - 0.17) return;
  punchHit = true;
  const P = meNow(), fx = Math.sin(P.h), fy = Math.cos(P.h);
  let best = null, bd = 1.6;
  for (const p of combatTargets()) {
    if (p.state === 'dead' || p.state === 'incar' || p.immortal) continue;
    const dx = p.x - P.x, dy = p.y - P.y, d = Math.hypot(dx, dy);
    if (d < bd && (dx * fx + dy * fy) / (d || 1) > 0.3) { bd = d; best = p; }
  }
  if (best) hitPed(best, rnd(16, 26) * (K('ShiftLeft') || K('ShiftRight') ? 1.35 : 1), P); else sfx('whoosh');
}
function hitPed(p, dmg, from) {
  p.hp -= dmg; p.hurt = 0.35; sfx('hit'); camShake = Math.max(camShake, 0.12);
  const a = Math.atan2(p.x - from.x, p.y - from.y), kb = dmg > 40 ? 5 : 2.6; p.kvx = Math.sin(a) * kb; p.kvy = Math.cos(a) * kb;
  bleed(p.x, p.y, baseOf(p), 1.45, 2 + (dmg / 12 | 0), Math.sin(a), Math.cos(a));
  if (p.seat) { p.seat.taken = null; p.seat = null; p.sit = false; }
  if (p.hp <= 0) { killPed(p); return; }
  if (p.yieldAt && p.hp <= p.yieldAt && !p.yielded) { p.yielded = true; p.state = 'yield'; p.still = true; if (p.onYield) p.onYield(p); return; }
  if (p.onHit) p.onHit(p);
  if (p.state === 'fight' || p.state === 'chase' || p.state === 'yield') return;
  p.still = false; p.sit = false; p.mesh.userData.talk = false;
  if ((p.cop || p.tough || Math.random() < 0.42) && p.hp > 30) { p.state = 'fight'; p.atk = 0.4; }
  else { p.state = 'flee'; p.t = 8; p.fleeFrom = { x: from.x, y: from.y }; }
  scareAround(p, 9);
  crimeSeen(p.cop ? 2 : 1, false);
}
function killPed(p, quiet) {
  bleed(p.x, p.y, baseOf(p), 1.2, 7, p.kvx ? Math.sign(p.kvx) * 0.5 : 0, p.kvy ? Math.sign(p.kvy) * 0.5 : 0);
  p.dl = null; setTimeout(() => { if (p.state === 'dead') { const b = p.dl ? p.dl.dir : 1, h = p.h; splat(p.x + Math.sin(h) * b * 0.8, p.y + Math.cos(h) * b * 0.8, baseOf(p), rnd(1.2, 1.9), true); } }, 700);
  p.hp = 0; p.state = 'dead'; p.still = true; p.sit = false; p.deadT = 0; p.mesh.userData.talk = false; p.mesh.userData.wobble = false;
  if (p.seat) { p.seat.taken = null; p.seat = null; }
  p.deadRot = rnd(-0.5, 0.5);
  if (p.onDeath) p.onDeath(p);
  scareAround(p, 16);
  if (!quiet) { if (p.cop) copKilled(); else if (wanted > 0) setWanted(Math.min(4, Math.max(wanted, wanted + (Math.random() < 0.5 ? 1 : 0)))); else crimeSeen(2, true); }
}
function scareAround(src, r) {
  for (const q of combatTargets()) {
    if (q === src || q.keep || q.cop || q.staff || q.state === 'dead' || q.state === 'fight' || q.state === 'incar') continue;
    if (Math.hypot(q.x - src.x, q.y - src.y) < r && Math.random() < 0.8) { if (q.seat) { q.seat.taken = null; q.seat = null; } q.sit = false; q.still = false; q.state = 'flee'; q.t = rnd(5, 9); q.fleeFrom = { x: src.x, y: src.y }; q.mesh.userData.talk = false; }
  }
}
function crimeSeen(level, serious) {
  if (combatQuiet) return;
  if (INT.active) { INT.alarm = Math.max(INT.alarm, level); return; }
  if (wanted >= level) return;
  if (copsNear(70) || Math.random() < (serious ? 0.75 : 0.25)) { setWanted(level); toast(serious ? 'Un témoin appelle le 17' : 'Quelqu\'un a vu la bagarre et appelle les flics', 2.5); }
}
/* fight behaviour shared by street and indoor NPCs; returns [tx, ty, speed] to move, or null to stand and swing */
function fightStep(p, dt, P) {
  const d = Math.hypot(P.x - p.x, P.y - p.y);
  if (p.hp < 22 && !p.tough) { p.state = 'flee'; p.t = 8; p.fleeFrom = { x: P.x, y: P.y }; return [p.x + (p.x - P.x), p.y + (p.y - P.y), 5]; }
  p.atk = (p.atk === undefined ? rnd(0.3, 0.9) : p.atk) - dt;
  if (p.swing > 0) {
    p.swing -= dt;
    if (!p.swHit && p.swing < 0.24) { p.swHit = true; if (d < 1.55 && koT <= 0) hurtPlayer(p.dmg ? rnd(p.dmg[0], p.dmg[1]) : rnd(6, 11)); }
    return null;
  }
  if (d > 1.1) return [P.x, P.y, p.tough ? 5.4 : 4.8];
  p.h += angWrap(Math.atan2(P.x - p.x, P.y - p.y) - p.h) * Math.min(1, dt * 10);
  if (p.atk <= 0) { p.atk = rnd(0.75, 1.25) / (p.tough ? 1.2 : 1); p.swing = PUNCH; p.swHit = false; p.swSide = (p.swSide || 0) ^ 1; }
  return null;
}
/* arm poses layered on top of the base animation */
function punchPose(m, f, side) {
  const b = m.userData.b, A = side ? 'L' : 'R', B = side ? 'R' : 'L', sg = side ? -1 : 1;
  const drive = Math.sin(Math.max(0, Math.min(1, f)) * Math.PI), load = 1 - drive;
  // The strike now starts from the floor: brace the lead leg, rotate pelvis, then unwind the chest.
  b.thighL.rotation.x = -0.12 - 0.18 * drive; b.thighR.rotation.x = 0.08 + 0.12 * drive;
  b.hips.rotation.y = 0.22 * drive * sg; b.hips.rotation.z = -0.045 * drive * sg;
  b['uArm' + A].rotation.x = -1.45 * drive - 0.72 * load;
  b['uArm' + A].rotation.z = -0.18 * sg; b['fArm' + A].rotation.x = -1.45 * load - 0.08;
  b['uArm' + B].rotation.x = -0.82; b['fArm' + B].rotation.x = -1.72; b['uArm' + B].rotation.z = 0.28 * sg;
  b.spine.rotation.x = 0.16 + 0.13 * drive; b.spine.rotation.y = -0.12 * drive * sg;
  b.chest.rotation.y = -0.58 * drive * sg; b.chest.rotation.x = 0.06 + 0.08 * drive;
  b.head.rotation.y = 0.12 * drive * sg; b.head.rotation.x = -0.035 * drive;
}
function guardPose(m) {
  const b = m.userData.b;
  b.hips.position.y = 0.91; b.hips.rotation.z = 0.035;
  b.thighL.rotation.x = -0.12; b.thighR.rotation.x = 0.1;
  b.uArmL.rotation.x = b.uArmR.rotation.x = -0.82;
  b.fArmL.rotation.x = -1.72; b.fArmR.rotation.x = -1.62;
  b.uArmL.rotation.z = 0.3; b.uArmR.rotation.z = -0.3;
  b.spine.rotation.x = 0.16; b.chest.rotation.x = 0.04; b.head.rotation.x = -0.04;
}
function hurtPose(m, k) { const b = m.userData.b; b.spine.rotation.x = -0.55 * k; b.head.rotation.x = -0.7 * k; b.chest.rotation.y = 0.3 * k; b.uArmL.rotation.z += 0.6 * k; b.uArmR.rotation.z -= 0.6 * k; b.thighR.rotation.x = -0.4 * k; }
function npcCombatPose(p) {
  if (p.state === 'fight') { if (p.swing > 0) punchPose(p.mesh, Math.sin((PUNCH - p.swing) / PUNCH * Math.PI), p.swSide); else guardPose(p.mesh); }
  if (p.hurt > 0) hurtPose(p.mesh, p.hurt / 0.35);
}
/* the body must land on free ground: try the planned fall, then turned and reversed ones, so it never goes through a wall, a car or a glass door */
function bodyBlocked(x, y, room) {
  if (room) { if (x < -INT.W / 2 + 0.15 || x > INT.W / 2 - 0.15 || y < 0.15 || y > INT.D - 0.15) return true; for (const b of INT.boxes) if (x > b[0] && x < b[2] && y > b[1] && y < b[3]) return true; return false; }
  if (insideBuilding(x, y)) return true;
  for (const c of cars) if (Math.abs(c.x - x) < 3 && Math.abs(c.y - y) < 3) { const s = Math.sin(c.h), co = Math.cos(c.h), dx = x - c.x, dy = y - c.y; if (Math.abs(dx * s + dy * co) < 2.2 && Math.abs(dx * co - dy * s) < 1.0) return true; }
  return false;
}
function fallClear(p) {
  const D = p.dl, inRoom = INT.active && INT.npcs.includes(p);
  if (!inRoom && !peds.includes(p)) return;
  const tries = [];
  for (const dir of [D.dir, -D.dir]) for (const dh of [0, 0.5, -0.5, 1.0, -1.0, 1.57, -1.57, 2.3, -2.3]) tries.push([dir, dh]);
  for (const [dir, dh] of tries) {
    const h = p.h + dh; let ok = true;
    for (const r of [0.45, 0.9, 1.35, 1.75]) if (bodyBlocked(p.x + Math.sin(h) * dir * r, p.y + Math.cos(h) * dir * r, inRoom)) { ok = false; break; }
    if (ok) { D.dir = dir; p.h = h; return; }
  }
  D.dir = 1; D.slump = true; /* nowhere to lie flat: slumps against the wall */
}
function deadPose(p) {
  const b = p.mesh.userData.b, T = p.deadT || 0;
  if (!p.dl) { p.dl = { dir: Math.random() < 0.55 ? -1 : 1, a: [rnd(0.15, 1.0), rnd(-1.0, -0.15), rnd(-1.4, 0.5), rnd(-1.4, 0.5), rnd(-0.5, 0.4), rnd(-0.5, 0.5), rnd(0.1, 1.1)], roll: rnd(-0.4, 0.4) }; fallClear(p); }
  const D = p.dl, f = Math.min(1, T / 0.7), e = f * f, bounce = f >= 1 ? Math.max(0, Math.sin(Math.min(1, (T - 0.7) / 0.25) * Math.PI)) * 0.05 : 0;
  for (const n of BONES) b[n].rotation.set(0, 0, 0);
  const buckle = Math.sin(Math.min(1, T / 0.5) * Math.PI) * (1 - e * 0.6);
  b.hips.position.y = 0.95 - buckle * 0.25; b.root.position.y = 0.1 * e + bounce;
  b.root.rotation.x = D.dir * (D.slump ? 0.35 : 1.5) * e; b.root.rotation.z = D.roll * e;
  b.thighL.rotation.x = -buckle * 0.9 + D.a[4] * e; b.thighR.rotation.x = -buckle * 0.7 - D.a[4] * e * 0.5; b.shinL.rotation.x = buckle * 1.4 + D.a[6] * e; b.shinR.rotation.x = buckle * 1.2;
  b.thighL.rotation.z = D.a[5] * 0.3 * e; b.thighR.rotation.z = -Math.abs(D.a[5]) * 0.3 * e;
  b.uArmL.rotation.z = D.a[0] * e + 0.3 * buckle; b.uArmR.rotation.z = D.a[1] * e - 0.3 * buckle; b.uArmL.rotation.x = D.a[2] * e - buckle; b.uArmR.rotation.x = D.a[3] * e - buckle;
  b.fArmL.rotation.x = -0.4 * e; b.fArmR.rotation.x = -0.2 * e; b.head.rotation.y = 0.7 * D.roll * 2 * e; b.head.rotation.x = -0.3 * D.dir * e; b.spine.rotation.x = 0.15 * D.dir * e;
  if (D.slump) { b.hips.position.y = 0.95 - 0.5 * e; b.thighL.rotation.x = b.thighR.rotation.x = -1.4 * e; b.shinL.rotation.x = b.shinR.rotation.x = 1.3 * e; }
}
function applyKnock(p, dt, room) {
  if (!p.kvx && !p.kvy) return;
  p.x += p.kvx * dt; p.y += p.kvy * dt; const k = Math.max(0, 1 - dt * 7); p.kvx *= k; p.kvy *= k;
  if (Math.abs(p.kvx) + Math.abs(p.kvy) < 0.05) p.kvx = p.kvy = 0;
  if (room) roomResolve(p, 0.3); else resolve(p, 0.32);
}
function yieldPose(p) { const b = p.mesh.userData.b; poseChar(p.mesh, 'idle', 0, 0, 0); b.hips.position.y = 0.55; b.thighL.rotation.x = b.thighR.rotation.x = -1.2; b.shinL.rotation.x = b.shinR.rotation.x = 2.1; b.spine.rotation.x = 0.5; b.uArmL.rotation.x = b.uArmR.rotation.x = -2.6; }
/* ---------- searching bodies ---------- */
let searchT = 0;
const LOOT = [['un portefeuille', 0.62, 8, 65], ['un porte-monnaie', 0.35, 2, 18], ['des billets froissés', 0.2, 10, 40]];
const JUNK = ['un ticket STAR', 'une carte KorriGo', 'des clés', 'un briquet', 'un téléphone fissuré', 'un paquet de clopes', 'un ticket de PMU perdant', 'une crêpe à moitié mangée', 'des écouteurs', 'une carte de fidélité Leclerc'];
function nearCorpse(x, y, list) { let b = null, bd = 1.7; for (const p of list) if (p.state === 'dead' && !p.searched && p.deadT > 0.9) { const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; b = p; } } return b; }
function searchBody(p) {
  p.searched = true; searchT = 1.3; const me = meNow(); me.h = Math.atan2(p.x - me.x, p.y - me.y);
  setTimeout(() => {
    let cash = 0; const got = [];
    for (const [name, pr, a, b] of LOOT) if (Math.random() < pr) { const v = Math.round(rnd(a, b)); cash += v; got.push(`${name} (${v} €)`); }
    if (p.cop) { const v = Math.round(rnd(15, 60)); cash += v; got.push(`des menottes et ${v} €`); }
    if (p.staff) { const v = Math.round(rnd(20, 90)); cash += v; got.push(`la recette du jour (${v} €)`); }
    if (Math.random() < 0.7) got.push(pick(JUNK));
    if (cash) setMoney(money + cash);
    toast(got.length ? 'Tu trouves ' + got.join(', ') : 'Rien. Les poches sont vides.', 3.5);
    if (!INT.active && copsNear(30)) setWanted(Math.max(wanted, 2));
  }, 1250);
}
function searchPose(m) { const b = m.userData.b, k = Math.min(1, Math.sin(Math.min(1, (1.3 - searchT) / 1.3) * Math.PI) * 1.6); b.hips.position.y = 0.95 - 0.45 * k; b.thighL.rotation.x = b.thighR.rotation.x = -1.5 * k; b.shinL.rotation.x = b.shinR.rotation.x = 1.9 * k; b.spine.rotation.x = 0.6 * k; b.uArmL.rotation.x = b.uArmR.rotation.x = -0.9 * k; b.fArmL.rotation.x = -0.6 * k; }
function playerCombatPose() {
  if (searchT > 0) { searchPose(player.mesh); return; }
  if (punchT > 0) punchPose(player.mesh, Math.sin((PUNCH - punchT) / PUNCH * Math.PI), punchSide);
  else if (fightGuardT > 0) guardPose(player.mesh);
  if (hurtT > 6.7) hurtPose(player.mesh, 1);
}

/* ---------- enterable shops, bars, restaurants ---------- */
const INT = { trains: [], active: null, sep: new THREE.Scene(), root: new THREE.Group(), world: false, scene: null, room: null, door: null, lights: [], npcs: [], me: { x: 0, y: 1.2, h: 0, phase: 0 }, W: 10, D: 13, H: 3.4, boxes: [], alarm: 0, spots: [] };
INT.scene = INT.sep; INT.sep.background = new THREE.Color(0x05060a);
const IMAT = {};
function canvasMat(w, h, draw, opts) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = canvasTex(c, true); return M(Object.assign({ map: t, roughness: 0.8 }, opts || {})); }
function interiorMats() {
  if (IMAT.ready) return; IMAT.ready = true;
  IMAT.wood = canvasMat(256, 256, (g, w, h) => { for (let y = 0; y < h; y += 32) { g.fillStyle = `hsl(28,${35 + Math.random() * 15}%,${22 + Math.random() * 8}%)`; g.fillRect(0, y, w, 32); g.fillStyle = '#0006'; g.fillRect(0, y, w, 2); const o = Math.random() * w; g.fillRect(o, y, 2, 32); for (let k = 0; k < 30; k++) { g.fillStyle = `rgba(0,0,0,${Math.random() * 0.08})`; g.fillRect(Math.random() * w, y + Math.random() * 32, 40 + Math.random() * 80, 1); } } }, { roughness: 0.55 });
  IMAT.wood.map.repeat.set(0.4, 0.4);
  IMAT.tiles = canvasMat(256, 256, (g, w, h) => { for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { g.fillStyle = (x + y) % 2 ? '#e8e6e0' : '#d8d6d0'; g.fillRect(x * 32, y * 32, 32, 32); } g.strokeStyle = '#aaa'; for (let k = 0; k <= 8; k++) { g.beginPath(); g.moveTo(k * 32, 0); g.lineTo(k * 32, h); g.moveTo(0, k * 32); g.lineTo(w, k * 32); g.stroke(); } }, { roughness: 0.3 });
  IMAT.tiles.map.repeat.set(0.25, 0.25);
  IMAT.checker = canvasMat(128, 128, (g) => { for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { g.fillStyle = (x + y) % 2 ? '#1a1a1a' : '#e6e0d4'; g.fillRect(x * 32, y * 32, 32, 32); } }, { roughness: 0.35 });
  IMAT.checker.map.repeat.set(0.5, 0.5);
  IMAT.plaster = M({ color: 0xb8b0a2, roughness: 0.95 });
  IMAT.barWall = canvasMat(256, 256, (g, w, h) => { g.fillStyle = '#3a1e18'; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 16) for (let x = (y / 16 % 2) * 16; x < w; x += 32) { g.fillStyle = `hsl(10,${30 + Math.random() * 20}%,${20 + Math.random() * 10}%)`; g.fillRect(x + 1, y + 1, 30, 14); } }, { roughness: 0.9 });
  IMAT.barWall.map.repeat.set(0.5, 0.5);
  IMAT.ceiling = M({ color: 0x2a2622, roughness: 1 });
  IMAT.counter = M({ color: 0x4a2a18, roughness: 0.45 });
  IMAT.zinc = M({ color: 0xb8bcc0, roughness: 0.25, metalness: 0.9 });
  IMAT.shelf = M({ color: 0x6a4a30, roughness: 0.7 });
  IMAT.white = M({ color: 0xf0f0ec, roughness: 0.5 });
  IMAT.metal = M({ color: 0x8a8e94, roughness: 0.35, metalness: 0.8 });
  IMAT.seat = M({ color: 0x5a1a1a, roughness: 0.7 });
  IMAT.glass = M({ color: 0x9ab0b8, roughness: 0.05, metalness: 0.6, transparent: true, opacity: 0.18, depthWrite: false });
  IMAT.prod = new THREE.MeshStandardMaterial({ roughness: 0.6, vertexColors: false }); allMats.push(IMAT.prod);
  IMAT.door = canvasMat(256, 512, (g, w, h) => { g.fillStyle = '#20160f'; g.fillRect(0, 0, w, h); g.fillStyle = '#7a9aa8'; g.fillRect(24, 24, w - 48, h * 0.62); g.fillStyle = '#fff'; g.font = '700 40px "Barlow Condensed",sans-serif'; g.textAlign = 'center'; g.fillText('SORTIE', w / 2, h * 0.82); }, { emissive: 0x223344, emissiveIntensity: 0.6 });
}
function neonMat(text, col, bg) {
  const m = canvasMat(1024, 192, (g, w, h) => {
    g.fillStyle = bg || '#0a0a10'; g.fillRect(0, 0, w, h);
    let fs = 120; g.font = `700 ${fs}px "Barlow Condensed",sans-serif`; while (g.measureText(text).width > w - 60 && fs > 30) { fs -= 6; g.font = `700 ${fs}px "Barlow Condensed",sans-serif`; }
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = col; g.shadowBlur = 30; g.fillStyle = col; g.fillText(text, w / 2, h / 2 + 4); g.shadowBlur = 0; g.fillStyle = '#fff'; g.globalAlpha = 0.6; g.fillText(text, w / 2, h / 2 + 4);
  }, { emissive: 0xffffff, emissiveIntensity: 1.0, roughness: 0.4 });
  m.emissiveMap = m.map; m.needsUpdate = true; return m;
}
function rbox(w, h, d, mat, x, y, z, solid) { // room coords: x across, z = height base, y depth
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, z + h / 2, -y); m.castShadow = false; m.receiveShadow = true; INT.room.add(m);
  if (solid) INT.boxes.push([x - w / 2, y - d / 2, x + w / 2, y + d / 2]);
  return m;
}
function rplane(w, h, mat, x, z, y, ry) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, z, -y); m.rotation.y = ry || 0; INT.room.add(m); return m; }
function rlight(x, y, z, col, int, dist) {
  if (INT.world) { /* a fixed pool of lights lives in the city scene: adding lights would recompile every material */
    const l = INT.lights.find(q => !q.used); if (!l) return null; l.used = true;
    const v = INT.root.localToWorld(new THREE.Vector3(x, z, -y)); v.y += th(v.x, -v.z);
    l.position.copy(v); l.color.set(col); l.intensity = int * 1.15; l.distance = dist || 9; return l;
  }
  const l = new THREE.PointLight(col, int, dist || 9, 2); l.position.set(x, z, -y); INT.room.add(l); return l;
}
function initRoomLights() { for (let k = 0; k < 4; k++) { const l = new THREE.PointLight(0xffffff, 0, 9, 2); scene.add(l); INT.lights.push(l); } }
function shelfProducts(x0, x1, y, zs, palette, depthSign) {
  const N = Math.max(1, Math.round((x1 - x0) / 0.16)), geo = new THREE.BoxGeometry(0.12, 0.22, 0.14);
  const im = new THREE.InstancedMesh(geo, IMAT.prod, N * zs.length); const c = new THREE.Color(); let i = 0;
  for (const z of zs) for (let k = 0; k < N; k++) { const h = rnd(0.7, 1.3); im.setMatrixAt(i, MX(x0 + (k + 0.5) * (x1 - x0) / N, z + 0.11 * h, -(y + (depthSign || 0) * 0.05), 0, 0, 0, 1, h, 1)); im.setColorAt(i, c.set(pick(palette))); i++; }
  im.count = i; INT.room.add(im);
}
function bottles(x0, x1, y, zs) {
  const N = Math.round((x1 - x0) / 0.12), geo = new THREE.CylinderGeometry(0.035, 0.04, 0.3, 8);
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.08, metalness: 0.2, transparent: true, opacity: 0.85 }); allMats.push(mat);
  const im = new THREE.InstancedMesh(geo, mat, N * zs.length), c = new THREE.Color(); let i = 0;
  for (const z of zs) for (let k = 0; k < N; k++) { im.setMatrixAt(i, MX(x0 + (k + 0.5) * (x1 - x0) / N, z + 0.15, -y)); im.setColorAt(i, c.set(pick(['#2a6a2a', '#6a3a10', '#c8c8b0', '#8a1a1a', '#1a3a6a', '#d8a030', '#3a2a1a']))); i++; }
  INT.room.add(im);
}
function roomNPC(x, y, h, look, opt) {
  let m; if (!look && PEDPOOL.length) { const r = PEDPOOL.pop(); m = r.mesh; look = r.look; m.userData = { b: m.userData.b }; m.rotation.set(0, 0, 0); m.visible = true; } else m = makeChar(look || randomLook());
  scene.remove(m); INT.scene.add(m);
  const n = Object.assign({ x, y, h, mesh: m, hp: 100, state: 'idle', phase: Math.random() * 6, speed: 1.3, still: true, look }, opt || {});
  INT.npcs.push(n); return n;
}
function buildInterior(shop) {
  interiorMats();
  if (INT.room) { INT.room.parent && INT.room.parent.remove(INT.room); INT.room.traverse(o => { if (o.geometry && !o.isSkinnedMesh) o.geometry.dispose(); }); }
  for (const n of INT.npcs) n.mesh.parent && n.mesh.parent.remove(n.mesh); INT.npcs = []; INT.boxes = []; INT.spots = []; INT.trains = []; INT.door = null;
  for (const l of INT.lights) { l.used = false; l.intensity = 0; }
  INT.room = new THREE.Group(); INT.scene.add(INT.room);
  if (shop.fam === 'metro') return buildStation(shop);
  const fam = shop.fam, bar = fam === 'bar', food = fam === 'food';
  const W = INT.W = Math.min(shop.iw || 99, bar ? 9 : food ? 10 : 8), D = INT.D = Math.min(shop.id || 99, bar ? 13 : food ? 12 : 10), H = INT.H = 3.4;
  const floor = bar ? IMAT.wood : food ? IMAT.checker : IMAT.tiles, wall = bar ? IMAT.barWall : IMAT.plaster;
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floor); fl.rotation.x = -Math.PI / 2; fl.position.set(0, 0, -D / 2); fl.receiveShadow = true;
  const uv = fl.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * W, uv.getY(i) * D); INT.room.add(fl);
  rplane(W, D, IMAT.ceiling, 0, H, D / 2).rotation.x = Math.PI / 2;
  const wl = (w, x, y, ry) => { const m = rplane(w, H, wall, x, H / 2, y, ry); const u = m.geometry.attributes.uv; for (let i = 0; i < u.count; i++) u.setXY(i, u.getX(i) * w, u.getY(i) * H); };
  wl(W, 0, D, 0); wl(D, -W / 2, D / 2, Math.PI / 2); wl(D, W / 2, D / 2, -Math.PI / 2);
  /* front wall with real openings: shop windows and the glazed door look out on the street */
  const piece = (x0, x1, z0, z1) => { const m = rplane(x1 - x0, z1 - z0, wall, (x0 + x1) / 2, (z0 + z1) / 2, 0, Math.PI); const u = m.geometry.attributes.uv; for (let i = 0; i < u.count; i++) u.setXY(i, u.getX(i) * (x1 - x0) + x0, u.getY(i) * (z1 - z0) + z0); };
  const wl0 = -W / 2 + 0.5, wl1 = -1.0, wr0 = 1.0, wr1 = W / 2 - 0.5, wz0 = 0.9, wz1 = 2.8;
  piece(-W / 2, W / 2, wz1, H); piece(-W / 2, wl0, 0, wz1); piece(wr1, W / 2, 0, wz1); piece(wl0, wl1, 0, wz0); piece(wr0, wr1, 0, wz0); piece(wl1, -0.65, 0, wz1); piece(0.65, wr0, 0, wz1); piece(-0.65, 0.65, 2.3, wz1);
  { const pv = new THREE.Group(); pv.position.set(-0.65, 0, -0.04); INT.room.add(pv); const dl = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 2.3), IMAT.door); dl.position.set(0.65, 1.15, 0); dl.rotation.y = Math.PI; pv.add(dl); const fr = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.3, 0.05), IMAT.glass); fr.position.set(0.65, 1.15, 0.03); pv.add(fr); INT.door = pv; }
  for (const [a, b] of [[wl0, wl1], [wr0, wr1]]) {
    rplane(b - a, wz1 - wz0, IMAT.glass, (a + b) / 2, (wz0 + wz1) / 2, 0.03, Math.PI);
    rbox(b - a + 0.1, 0.08, 0.12, IMAT.counter, (a + b) / 2, 0.03, wz0 - 0.04); rbox(b - a + 0.1, 0.08, 0.12, IMAT.counter, (a + b) / 2, 0.03, wz1 - 0.04);
    rbox(0.07, wz1 - wz0, 0.12, IMAT.counter, (a + b) / 2, 0.03, wz0); rbox(0.07, wz1 - wz0, 0.12, IMAT.counter, a, 0.03, wz0); rbox(0.07, wz1 - wz0, 0.12, IMAT.counter, b, 0.03, wz0);
  }
  const sign = neonMat(shop.name.toUpperCase(), bar ? '#ff3d8b' : food ? '#ffb040' : fam === 'pharmacy' ? '#30ff80' : '#7ad0ff');
  rplane(Math.min(W - 1, 5.5), 1.0, sign, 0, H - 0.75, D - 0.02, 0);
  const lamps = [];
  if (bar) {
    const CW = Math.min(6, W - 1.4), TX = Math.min(2.8, W / 2 - 1.5);
    rbox(CW, 1.1, 0.7, IMAT.counter, 0, D - 2.4, 0, true); rbox(CW + 0.1, 0.06, 0.8, IMAT.zinc, 0, D - 2.4, 1.1);
    for (const z of [1.2, 1.6, 2.0]) rbox(CW, 0.04, 0.3, IMAT.shelf, 0, D - 0.2, z);
    bottles(-CW / 2 + 0.1, CW / 2 - 0.1, D - 0.22, [1.24, 1.64, 2.04]);
    for (let k = -2; k <= 2; k++) if (Math.abs(k * 1.2) < CW / 2 - 0.2) { rbox(0.36, 0.05, 0.36, IMAT.seat, k * 1.2, D - 3.25, 0.72); rbox(0.05, 0.72, 0.05, IMAT.metal, k * 1.2, D - 3.25, 0); }
    for (const [x, y] of [[-TX, 3], [TX, 3], [-TX, 6.3], [TX, 6.3]].filter(q => W >= 6.4 && q[1] < D - 4.4)) {
      rbox(0.9, 0.04, 0.9, IMAT.counter, x, y, 0.74, true); rbox(0.08, 0.74, 0.08, IMAT.metal, x, y, 0);
      for (const s of [-1, 1]) { rbox(0.42, 0.04, 0.42, IMAT.seat, x + s * 0.75, y, 0.45); rbox(0.42, 0.45, 0.04, IMAT.seat, x + s * 0.95, y, 0.47).rotation.y = Math.PI / 2; INT.spots.push([x + s * 0.72, y, s > 0 ? -Math.PI / 2 : Math.PI / 2]); }
    }
    rlight(0, D - 2.4, 2.9, 0xffb070, 1.6, 8); rlight(-2.5, 4.5, 3.0, 0xff5aa0, 0.9, 8); rlight(2.5, 4.5, 3.0, 0x5aa0ff, 0.7, 8);
    INT.counter = { x: 0, y: D - 3.2 };
    roomNPC(0, D - 1.6, Math.PI, { top: '#111111', pants: '#111111', skin: pick(SKIN), hair: '#1a1208', short: true, shoes: '#111' }, { staff: true, tough: true, dmg: [8, 12] });
    for (const s of INT.spots) if (Math.random() < 0.6) { const n = roomNPC(s[0], s[1], s[2], randomLook(), { sit: true }); n.mesh.userData.talk = Math.random() < 0.5; }
    for (let k = 0; k < 3; k++) { const n = roomNPC(rnd(-2.2, 2.2), D - 3.6 - rnd(0, 0.6), Math.PI + rnd(-0.3, 0.3), randomLook()); n.mesh.userData.talk = Math.random() < 0.6; n.mesh.userData.wobble = Math.random() < 0.3; }
  } else if (food) {
    const CW = Math.min(5, W - 1.2); rbox(CW, 1.05, 0.7, IMAT.white, 0, D - 2.2, 0, true); rbox(CW + 0.1, 0.05, 0.8, IMAT.counter, 0, D - 2.2, 1.05);
    rplane(4.5, 1.2, neonMat('MENU · GALETTES · PLATS DU JOUR', '#ffe0a0', '#1a1410'), 0, 2.3, D - 0.03, 0);
    for (const x of (W >= 8.5 ? [-3, 0, 3] : W >= 6 ? [-1.6, 1.6] : [0])) for (const y of [3, 6].filter(q => q < D - 4)) {
      rbox(1.1, 0.04, 0.8, IMAT.counter, x, y, 0.74, true); rbox(0.08, 0.74, 0.08, IMAT.metal, x, y, 0);
      for (const s of [-1, 1]) { rbox(0.42, 0.04, 0.42, IMAT.shelf, x, y + s * 0.65, 0.45); INT.spots.push([x, y + s * 0.62, s > 0 ? Math.PI : 0]); }
    }
    rlight(0, 4, 3.0, 0xffe0b0, 0.9, 10); rlight(0, D - 2, 3.0, 0xffffff, 0.6, 8);
    INT.counter = { x: 0, y: D - 3.0 };
    roomNPC(0, D - 1.4, Math.PI, { top: '#f0f0f0', pants: '#222', skin: pick(SKIN), hair: '#3a2a1a', short: true }, { staff: true });
    for (const s of INT.spots) if (Math.random() < 0.5) roomNPC(s[0], s[1], s[2], randomLook(), { sit: true }).mesh.userData.talk = Math.random() < 0.5;
  } else {
    const pharma = fam === 'pharmacy', tabac = shop.kind === 'tobacco';
    const CX = Math.min(1.8, W / 2 - 1.7); rbox(Math.min(3.2, W - 2.2), 1.0, 0.7, pharma ? IMAT.white : IMAT.counter, CX, D - 2.2, 0, true);
    const pal = pharma ? ['#ffffff', '#e8f0ff', '#30a060', '#2a6ad0', '#f0f0f0'] : tabac ? ['#c81e1e', '#f0f0f0', '#1a3a8a', '#d8b020', '#2a2a2a'] : ['#c83a2a', '#2a6ab0', '#e8c030', '#3a9a4a', '#f0f0f0', '#8a3a9a', '#e07a20'];
    for (const s of [-1, 1]) { rbox(0.5, 2.2, D - 3, IMAT.shelf, s * (W / 2 - 0.3), D / 2 - 0.3, 0, true); }
    for (const z of [0.3, 0.75, 1.2, 1.65]) for (const s of [-1, 1]) { shelfProductsSide(s * (W / 2 - 0.62), 1.5, D - 2.2, z, pal); }
    if (!pharma && !tabac && W >= 6.4 && D >= 9) for (const x of [-1.6, 0.4]) { rbox(0.7, 1.5, 4.5, IMAT.shelf, x, 4.6, 0, true); for (const z of [0.3, 0.8, 1.3]) for (const s of [-1, 1]) shelfProductsSide(x + s * 0.42, 2.4, 6.8, z, pal); }
    shelfProducts(-W / 2 + 0.6, W / 2 - 0.6, D - 0.25, [0.5, 1.0, 1.5, 2.0], pal);
    rlight(0, D / 2, 3.1, 0xfff4e8, 0.75, 11); rlight(0, 2, 3.1, 0xf0f4ff, 0.4, 7);
    INT.counter = { x: CX, y: D - 3.0 };
    roomNPC(CX, D - 1.5, Math.PI, { top: pharma ? '#f4f4f4' : '#2a4a6a', pants: '#222', skin: pick(SKIN), hair: '#2a1a10', short: pharma }, { staff: true });
    for (let k = 0; k < 2; k++) if (Math.random() < 0.7) { const n = roomNPC(rnd(-1, 1), rnd(2.5, D - 4), rnd(-3, 3), randomLook(), { browse: true, still: false }); }
  }
  if (!INT.world) { const amb = new THREE.HemisphereLight(0xfff0e0, 0x302820, bar ? 0.35 : 0.4); INT.room.add(amb); }
  INT.scene.environment = ENV.env_night || null;
}
/* ---------- underground VAL station (line a / b) ---------- */
const LCOL = { a: '#e2001a', b: '#00a14b' };
let SMAT = null;
function stationMats() {
  if (SMAT) return SMAT;
  const tile = band => canvasMat(256, 256, (g, w, h) => {
    g.fillStyle = '#e9e7e1'; g.fillRect(0, 0, w, h);
    for (let y = 0; y < 16; y++) for (let x = 0; x < 8; x++) { g.fillStyle = `hsl(40,8%,${86 + Math.random() * 6}%)`; g.fillRect(x * 32 + 1, y * 16 + 1, 30, 14); }
    if (band) { g.fillStyle = band; g.fillRect(0, 150, w, 34); }
  }, { roughness: 0.25 });
  SMAT = { floor: canvasMat(256, 256, (g, w, h) => { g.fillStyle = '#6c6a66'; g.fillRect(0, 0, w, h); for (let k = 0; k < 2500; k++) { g.fillStyle = `hsl(30,4%,${30 + Math.random() * 45}%)`; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); } g.strokeStyle = '#4a4844'; for (let k = 0; k <= 4; k++) { g.beginPath(); g.moveTo(k * 64, 0); g.lineTo(k * 64, h); g.moveTo(0, k * 64); g.lineTo(w, k * 64); g.stroke(); } }, { roughness: 0.4 }),
    edge: M({ color: 0xe8d020, roughness: 0.6 }), pit: M({ color: 0x1c1b1a, roughness: 1 }), rail: M({ color: 0x9a9ea4, roughness: 0.3, metalness: 0.9 }),
    conc: M({ color: 0x8a8884, roughness: 0.95 }), black: M({ color: 0x020203, roughness: 1 }), steel: M({ color: 0xb4b8bc, roughness: 0.3, metalness: 0.85 }),
    glass: M({ color: 0xa8c4cc, roughness: 0.05, metalness: 0.5, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide }),
    strip: M({ color: 0xffffff, emissive: 0xf4f8ff, emissiveIntensity: 1.6 }), day: M({ color: 0xffffff, emissive: 0xdde8f0, emissiveIntensity: 1.3 }),
    step: M({ color: 0x9a968e, roughness: 0.6 }), nose: M({ color: 0xd8c020, roughness: 0.5 }), tiles: {} };
  SMAT.tile = c => SMAT.tiles[c] || (SMAT.tiles[c] = tile(c));
  return SMAT;
}
function uvScale(m, sx, sy) { const u = m.geometry.attributes.uv; for (let i = 0; i < u.count; i++) u.setXY(i, u.getX(i) * sx, u.getY(i) * sy); return m; }
function buildStation(shop) {
  const S = stationMats(), st = METRO.data.stations.find(q => q.name === shop.name) || { lines: 'a' };
  const lines = st.lines.split(''), W = INT.W = 16, D = INT.D = 64, H = INT.H = 5.6, PIT = -1.15, P0 = 14, P1 = 58;
  const colL = LCOL[lines[0]], colR = LCOL[lines[1] || lines[0]], wallL = S.tile(colL), wallR = S.tile(colR), wallM = S.tile(null);
  /* floors: central island platform, two track pits */
  uvScale(rplane(8, D, S.floor, 0, 0, D / 2), 2, 16).rotation.x = -Math.PI / 2;
  for (const sd of [-1, 1]) {
    const pit = rplane(4, D, S.pit, sd * 6, PIT, D / 2); pit.rotation.x = -Math.PI / 2;
    rbox(4, 0.12, D, S.conc, sd * 6, D / 2, PIT); /* VAL runs on a concrete track with steel guide rails */
    for (const o of [-0.95, 0.95]) rbox(0.25, 0.2, D, S.conc, sd * 6 + o, D / 2, PIT + 0.12);
    for (const o of [-1.6, 1.6]) rbox(0.08, 0.35, D, S.rail, sd * 6 + o, D / 2, PIT + 0.25);
    uvScale(rplane(D, -PIT, wallM, sd * 4, PIT / 2, D / 2, sd * Math.PI / 2), 16, 0.3);
    rbox(0.35, 0.02, P1 - P0 + 4, S.edge, sd * 3.75, (P0 + P1) / 2, 0);
    INT.boxes.push([sd > 0 ? 3.95 : -8, 10, sd > 0 ? 8 : -3.95, D]);
    /* side wall behind the tracks: tiles with the line band, station names and adverts */
    const sw = uvScale(rplane(D, H - PIT, sd < 0 ? wallL : wallR, sd * 8, (H + PIT) / 2, D / 2, -sd * Math.PI / 2), 16, (H - PIT) / 4);
    const name = neonMat(shop.name.toUpperCase(), '#ffffff', '#1b1d22');
    for (let y = 16; y < D - 4; y += 12) { rplane(4.2, 0.8, name, sd * 7.97, 2.75, y, -sd * Math.PI / 2); }
    for (let y = 22; y < D - 4; y += 12) rplane(2.4, 1.6, advert(y + sd), sd * 7.97, 1.9, y, -sd * Math.PI / 2);
    /* platform screen doors (Rennes has them on both lines) */
    const doors = [];
    for (let y = P0; y < P1; y += 1.5) {
      const isDoor = METRO_DOORS.some(d => Math.abs(d + 34 - (y + 0.75)) < 0.76);
      if (isDoor) continue;
      rplane(1.46, 1.75, S.glass, sd * 3.92, 0.25 + 0.875, y + 0.75, sd * Math.PI / 2);
      rbox(0.06, 2.05, 0.06, S.steel, sd * 3.92, y, 0);
    }
    for (const d of METRO_DOORS) { const y = 34 + d, leaves = [];
      for (const k of [-1, 1]) { const lf = rbox(0.05, 1.9, 0.66, S.glass, sd * 3.92, y + k * 0.35, 0.05); leaves.push([lf, k, y]); }
      doors.push(leaves); }
    rbox(0.25, 0.35, P1 - P0, S.steel, sd * 3.9, (P0 + P1) / 2, 2.05);
    rbox(0.05, 0.08, P1 - P0, S.strip, sd * 3.75, (P0 + P1) / 2, 2.2);
    /* front walls with the tunnel portals */
    rbox(4, H - PIT, 10, wallM, sd * 6, 5, PIT); rplane(3.4, 3.6, S.black, sd * 6, PIT + 1.8, 10.02, Math.PI); rplane(3.4, 3.6, S.black, sd * 6, PIT + 1.8, D - 0.02, 0);
    INT.boxes.push([sd > 0 ? 4 : -8, 0, sd > 0 ? 8 : -4, 10]);
    /* the train for this track */
    const tr = new THREE.Group();
    for (const z of [-6.7, 6.7]) { const car = new THREE.Mesh(new THREE.BoxGeometry(2.08, 3.1, 13), METRO.trainM || S.steel); car.position.set(0, PIT + 0.35 + 1.55, z); tr.add(car); }
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.25, 0.05), S.strip); lamp.position.set(0, PIT + 1.2, 13.4); tr.add(lamp);
    tr.position.set(sd * 6, 0, -200); INT.room.add(tr);
    INT.trains.push({ sd, mesh: tr, y: sd < 0 ? 34 : 130, st: sd < 0 ? 'stop' : 'gone', t: sd < 0 ? 9 : 6, doors, open: sd < 0 ? 1 : 0, line: sd < 0 ? lines[0] : (lines[1] || lines[0]) });
  }
  /* back wall, ceiling with light lines */
  uvScale(rplane(W, H - PIT, wallM, 0, (H + PIT) / 2, D, 0), 4, (H - PIT) / 4);
  for (const sd of [-1, 1]) uvScale(rplane(2.4, H, wallM, sd * 2.8, H / 2, 0.01, Math.PI), 0.6, H / 4);
  uvScale(rplane(3.2, H - 3.6, wallM, 0, (H + 3.6) / 2, 0.01, Math.PI), 0.8, 0.5);
  const ceil = rplane(W, D, S.conc, 0, H, D / 2); ceil.rotation.x = Math.PI / 2;
  for (const x of [-2.6, 2.6, -6, 6]) rbox(0.22, 0.08, D - 12, S.strip, x, D / 2 + 5, H - 0.1);
  /* exit stairs climbing to the street */
  for (let k = 0; k < 28; k++) { rbox(3.2, (k + 1) * 0.17, 0.29, S.step, 0, -(k * 0.29 + 0.145), 0); rbox(3.2, 0.03, 0.06, S.nose, 0, -(k * 0.29 + 0.03), (k + 1) * 0.17 - 0.03); }
  for (const sd of [-1, 1]) { const sw2 = rplane(8.4, 8, wallM, sd * 1.6, 3.6, -4.1, -sd * Math.PI / 2); rbox(0.06, 0.06, 8.2, S.steel, sd * 1.5, -4.1, 0.95).rotation.x = 0.53; }
  const dayl = rplane(3.2, 2.6, S.day, 0, 5.4, -8.1, Math.PI);
  const lid = rplane(3.2, 9, S.conc, 0, 5.2, -4, 0); lid.rotation.x = Math.PI / 2 + 0.53;
  rplane(3.0, 0.5, neonMat('SORTIE · ' + shop.name.toUpperCase(), '#ffffff', '#174a8c'), 0, 4.0, 0.04, Math.PI);
  /* fare gates and ticket machine in the hall */
  for (const x of [-3.4, -2.0, 2.0, 3.4]) { rbox(0.32, 1.05, 1.4, S.steel, x, 7, 0, true); rbox(0.34, 0.06, 0.5, M({ color: 0x20c050, emissive: 0x20c050, emissiveIntensity: 0.8 }), x, 6.5, 1.05); }
  rbox(0.9, 1.8, 0.6, M({ color: 0x174a8c, roughness: 0.5 }), -3.4, 2.2, 0, true); rplane(0.6, 0.45, M({ color: 0x9ad0ff, emissive: 0x4a90d0, emissiveIntensity: 1 }), -3.4, 1.35, 1.89, Math.PI);
  /* hanging direction signs */
  for (const tr of INT.trains) { const ord = METRO.data.order[tr.line] || []; const dirName = tr.sd < 0 ? ord[ord.length - 1] : ord[0];
    const sg = neonMat('▲ ' + (dirName || '').toUpperCase(), '#ffffff', LCOL[tr.line]); for (const y of [18, 36, 52]) { const a = rplane(3.2, 0.6, sg, tr.sd * 2, 3.6, y, Math.PI); const b = rplane(3.2, 0.6, sg, tr.sd * 2, 3.6, y + 0.02, 0); } }
  for (const y of [12, 24, 36, 48, 60]) rlight(0, y, H - 0.5, 0xf4f6ff, 0.9, 16);
  rlight(0, -5, 4.5, 0xe8f0ff, 0.8, 9);
  /* passengers waiting */
  for (let k = 0; k < 9; k++) { const sd = Math.random() < 0.5 ? -1 : 1, n = roomNPC(sd * rnd(1.6, 3.2), rnd(P0 + 2, P1 - 2), sd < 0 ? -Math.PI / 2 : Math.PI / 2, randomLook()); n.mesh.userData.talk = Math.random() < 0.3; }
  for (let k = 0; k < 3; k++) roomNPC(rnd(-3, 3), rnd(2, 12), rnd(-3, 3), randomLook(), { browse: true, still: false });
  INT.room.add(new THREE.HemisphereLight(0xf0f4ff, 0x403c38, 0.55));
  INT.counter = null; INT.scene.environment = ENV.env_night || null;
}
const METRO_DOORS = [-10.05, -3.35, 3.35, 10.05];
const ADS = ['GALETTE-SAUCISSE · LE VRAI CARBURANT', 'KAOS RECRUTE · SÉRIEUX S\'ABSTENIR', 'STADE RENNAIS · ALLEZ RENNES', 'TRANSMUSICALES · DÉCEMBRE'];
let ADM = {};
function advert(k) { const i = Math.abs(Math.round(k)) % ADS.length; if (ADM[i]) return ADM[i];
  return ADM[i] = canvasMat(256, 170, (g, w, h) => { const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, ['#c8102e', '#1a1a1a', '#d4001a', '#2a1a5a'][i]); gr.addColorStop(1, ['#f0a020', '#ff3d8b', '#111', '#ff7a30'][i]); g.fillStyle = gr; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.font = '700 26px "Barlow Condensed",sans-serif'; g.textAlign = 'center'; const ws = ADS[i].split(' · '); ws.forEach((t, j) => g.fillText(t, w / 2, 70 + j * 34)); }, { emissive: 0xffffff, emissiveIntensity: 0.5 }); }
/* trains come in from the far tunnel, stop, open the doors, leave by the near one */
function stationStep(dt) {
  for (const tr of INT.trains) {
    tr.t -= dt;
    if (tr.st === 'gone' && tr.t <= 0) { tr.st = 'in'; tr.y = 130; }
    else if (tr.st === 'in') { const d = tr.y - 34, v = Math.max(1.2, Math.min(17, Math.sqrt(2 * 1.1 * Math.max(0, d)))); tr.y -= v * dt; if (tr.y <= 34) { tr.y = 34; tr.st = 'stop'; tr.t = 14; } }
    else if (tr.st === 'stop') { tr.open = clamp(tr.open + (tr.t > 2.5 ? 1 : -1) * dt * 1.2, 0, 1); if (tr.t <= 0) { tr.st = 'out'; tr.v = 0; tr.open = 0; } }
    else if (tr.st === 'out') { tr.v = Math.min(17, tr.v + dt * 1.1); tr.y -= tr.v * dt; if (tr.y < -40) { tr.st = 'gone'; tr.t = rnd(18, 30); } }
    tr.mesh.position.z = -(tr.st === 'gone' ? -200 : tr.y);
    for (const leaves of tr.doors) for (const [lf, k, y] of leaves) lf.position.z = -(y + k * (0.35 + 0.62 * tr.open));
  }
}
function stationAction() {
  const me = INT.me;
  for (const tr of INT.trains) if (tr.st === 'stop' && tr.open > 0.8 && Math.abs(me.x - tr.sd * 3.5) < 0.9 && METRO_DOORS.some(d => Math.abs(me.y - 34 - d) < 1.2))
    return { label: `E : monter · ligne ${tr.line.toUpperCase()} (ticket 1,70 €)`, run: () => openMetro({ st: INT.active.name }) };
  return null;
}
function stationShop(e) { return { name: e.st, fam: 'metro', kind: 'metro', x: e.x, y: e.y, nx: 0.6, ny: 0.8, onLeave: () => updateTiles(player.x, player.y) }; }
/* the street outside the shop window is the real city: a cube snapshot taken from the doorstep */
let CUBE = null;
function captureStreet(shop) {
  if (shop.nx === undefined || shop.fam === 'metro') { INT.scene.background = new THREE.Color(0x05060a); return; }
  if (!CUBE) { CUBE = { rt: new THREE.WebGLCubeRenderTarget(256, { stencilBuffer: true, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter }) }; CUBE.cam = new THREE.CubeCamera(0.3, 900, CUBE.rt); scene.add(CUBE.cam); }
  const x = shop.x + shop.nx * 1.4, y = shop.y + shop.ny * 1.4;
  CUBE.cam.position.set(x, th(x, y) + SW + 1.6, -y); CUBE.cam.rotation.set(0, Math.atan2(shop.nx, -shop.ny), 0); CUBE.cam.updateMatrixWorld(true);
  const pv = player.mesh.visible; player.mesh.visible = false; CUBE.cam.update(renderer, scene); player.mesh.visible = pv;
  INT.scene.background = CUBE.rt.texture;
}
let BACKDROP = {};
function streetBackdrop() {
  const night = MODE.night, k = night ? 'n' : 'd'; if (BACKDROP[k]) return BACKDROP[k];
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const g = c.getContext('2d');
  const sky = g.createLinearGradient(0, 0, 0, 200); sky.addColorStop(0, night ? '#05070f' : '#8fa6bd'); sky.addColorStop(1, night ? '#141a2a' : '#c8d2da'); g.fillStyle = sky; g.fillRect(0, 0, 1024, 200);
  /* houses across the street */
  let x = 0; while (x < 1024) { const w = 150 + Math.random() * 120, top = 40 + Math.random() * 90; g.fillStyle = night ? `hsl(${25 + Math.random() * 15},${10 + Math.random() * 15}%,${16 + Math.random() * 8}%)` : `hsl(${25 + Math.random() * 15},${15 + Math.random() * 15}%,${62 + Math.random() * 14}%)`; g.fillRect(x, top, w, 400 - top);
    for (let wy = top + 20; wy < 300; wy += 58) for (let wx = x + 18; wx < x + w - 30; wx += 44) { g.fillStyle = night ? (Math.random() < 0.45 ? '#e8b860' : '#10131c') : '#3a4452'; g.fillRect(wx, wy, 22, 34); }
    g.fillStyle = night ? '#c86a30' : '#5a4a3a'; g.fillRect(x + 20, 320, w - 40, 80); x += w + 2; }
  /* pavement and wet cobbles */
  const gr = g.createLinearGradient(0, 400, 0, 512); gr.addColorStop(0, night ? '#2a2420' : '#8a8478'); gr.addColorStop(1, night ? '#12100e' : '#6a665e'); g.fillStyle = gr; g.fillRect(0, 400, 1024, 112);
  if (night) for (let k = 0; k < 6; k++) { const lx = 80 + k * 180; const rg = g.createRadialGradient(lx, 150, 0, lx, 150, 70); rg.addColorStop(0, 'rgba(255,210,140,.9)'); rg.addColorStop(1, 'rgba(255,210,140,0)'); g.fillStyle = rg; g.fillRect(lx - 70, 80, 140, 140); g.fillStyle = 'rgba(255,200,120,.18)'; g.fillRect(lx - 6, 400, 12, 112); }
  g.filter = 'blur(3px)'; g.drawImage(c, 0, 0); g.filter = 'none';
  const m = new THREE.MeshBasicMaterial({ map: canvasTex(c, true) }); m.userData.noTerrain = true; BACKDROP[k] = m; return m;
}
function shelfProductsSide(x, y0, y1, z, pal) {
  const N = Math.max(1, Math.round((y1 - y0) / 0.17)), geo = new THREE.BoxGeometry(0.14, 0.22, 0.12);
  const im = new THREE.InstancedMesh(geo, IMAT.prod, N), c = new THREE.Color();
  for (let k = 0; k < N; k++) { const h = rnd(0.7, 1.3); im.setMatrixAt(k, MX(x, z + 0.11 * h, -(y0 + (k + 0.5) * (y1 - y0) / N), 0, 0, 0, 1, h, 1)); im.setColorAt(k, c.set(pick(pal))); }
  INT.room.add(im);
}
function roomResolve(e, r) {
  e.x = clamp(e.x, -INT.W / 2 + r, INT.W / 2 - r); e.y = clamp(e.y, INT.world && Math.abs(e.x) < 0.5 ? -0.2 : r, INT.D - r);
  for (const b of INT.boxes) {
    if (e.x > b[0] - r && e.x < b[2] + r && e.y > b[1] - r && e.y < b[3] + r) {
      const dl = e.x - (b[0] - r), dr = b[2] + r - e.x, dd = e.y - (b[1] - r), du = b[3] + r - e.y, m = Math.min(dl, dr, dd, du);
      if (m === dl) e.x = b[0] - r; else if (m === dr) e.x = b[2] + r; else if (m === dd) e.y = b[1] - r; else e.y = b[3] + r;
    }
  }
}
let fadeBusy = false;
function fadeTo(fn) { if (fadeBusy) return; fadeBusy = true; const f = $('fade'); f.style.opacity = '1'; setTimeout(() => { fn(); setTimeout(() => { f.style.opacity = '0'; fadeBusy = false; }, 120); }, 260); }
/* where the shop sits in the city: origin on the facade at the door, local +y goes into the building.
   The room is sized to the real building behind the storefront so it never pokes into the neighbours. */
function shopFrame(shop) {
  if (shop.frame) return shop.frame;
  const fx = shop.fx !== undefined ? shop.fx : shop.x - shop.nx * 0.9, fy = shop.fy !== undefined ? shop.fy : shop.y - shop.ny * 0.9;
  const dx = -shop.nx, dy = -shop.ny, lx = dy, ly = -dx, o = insideBuilding(fx + dx * 0.8, fy + dy * 0.8);
  let iw = 8, id = 10;
  if (o) {
    const same = (x, y) => insideBuilding(x, y) === o;
    const ext = s => { let e = 0.5; while (e < 5.2 && same(fx + dx * 0.8 + lx * s * e, fy + dy * 0.8 + ly * s * e) && same(fx + dx * 4 + lx * s * e, fy + dy * 4 + ly * s * e)) e += 0.25; return e - 0.1; };
    iw = Math.max(4.2, 2 * Math.min(ext(1), ext(-1)));
    const deep = o2 => { let e = 1; while (e < 13.5 && same(fx + dx * e + lx * o2, fy + dy * e + ly * o2)) e += 0.25; return e; };
    id = Math.max(6, Math.min(deep(0), deep(iw / 2 - 0.3), deep(-iw / 2 + 0.3)) - 0.15);
  }
  shop.iw = iw; shop.id = id;
  return shop.frame = { fx, fy, dx, dy, lx, ly, hd: Math.atan2(dx, dy), rot: Math.atan2(ly, lx) };
}
function worldFromRoom(F, x, y) { return { x: F.fx + F.lx * x + F.dx * y, y: F.fy + F.ly * x + F.dy * y }; }
function enterShop(shop, opt) {
  if (wanted > 0 && !(opt && opt.force)) { toast('Pas avec les flics aux trousses', 2); return; }
  const world = shop.fam !== 'metro' && shop.nx !== undefined;
  const go = () => {
    INT.world = world; INT.scene = world ? INT.root : INT.sep;
    let F = null;
    if (world) { F = shopFrame(shop); INT.root.position.set(F.fx, SW + 0.01, -F.fy); INT.root.rotation.set(0, F.rot, 0); INT.root.updateMatrixWorld(true); scene.add(INT.root); }
    else captureStreet(shop);
    buildInterior(shop); INT.active = shop; INT.frame = F; INT.alarm = 0; INT.robbed = false; INT.brawl = false; punchT = 0;
    if (world && opt && opt.walk) {
      const px = player.x - F.fx, py = player.y - F.fy;
      INT.me.x = clamp(px * F.lx + py * F.ly, -0.4, 0.4); INT.me.y = 0.35; INT.me.h = player.h - F.hd; yaw -= F.hd;
    } else { INT.me.x = 0; INT.me.y = world ? 1.2 : 1.3; INT.me.h = 0; yaw = 0; pitch = 0.25; }
    scene.remove(player.mesh); INT.scene.add(player.mesh); bloodTo(INT.scene);
    if (!world) { composer.passes[0].scene = INT.scene; TERR.on.value = 0; }
    if (opt && opt.setup) opt.setup();
    if (!(opt && opt.quiet)) toast(shop.name, 2);
  };
  if (world) go(); else fadeTo(go);
}
function leaveInterior(now) {
  const shop = INT.active; if (!shop) return;
  const go = () => {
    const F = INT.frame, me = INT.me;
    INT.scene.remove(player.mesh); scene.add(player.mesh); bloodTo(scene);
    if (!INT.world) { composer.passes[0].scene = scene; TERR.on.value = 1; }
    for (const n of INT.npcs) n.mesh.parent && n.mesh.parent.remove(n.mesh); INT.npcs = [];
    if (INT.world) { scene.remove(INT.root); for (const l of INT.lights) { l.used = false; l.intensity = 0; } }
    INT.active = null;
    if (F) { const w = worldFromRoom(F, clamp(me.x, -0.5, 0.5), -0.5); player.x = w.x; player.y = w.y; player.h = me.h + F.hd; yaw += F.hd; player.gy = undefined; resolve(player, 0.38); INT.cool = 1.2; }
    else if (shop.x !== undefined) { player.x = shop.x + shop.nx * 0.6; player.y = shop.y + shop.ny * 0.6; player.h = Math.atan2(shop.nx, shop.ny); yaw = player.h; player.gy = undefined; resolve(player, 0.38); }
    INT.world = false; INT.frame = null; INT.scene = INT.sep;
    if (INT.alarm && !combatQuiet && !now) { setWanted(Math.max(wanted, INT.alarm)); toast(INT.alarm > 1 ? 'Le patron a appelé la police !' : 'Quelqu\'un a appelé les flics', 2.5); }
    if (shop.onLeave) shop.onLeave();
  };
  if (now || INT.world) go(); else fadeTo(go);
}
/* walking into a shop door from the street pushes it open: no prompt, no loading */
function doorWalkIn(dt, moving) {
  if (INT.cool > 0) { INT.cool -= dt; return; }
  if (!moving || player.car || INT.active || dialogActive() || koT > 0) return;
  const sh = nearestShop(player.x, player.y, 2.6); if (!sh) return;
  const F = shopFrame(sh), px = player.x - F.fx, py = player.y - F.fy, lat = px * F.lx + py * F.ly, dep = px * F.dx + py * F.dy;
  const fwd = Math.sin(player.h) * F.dx + Math.cos(player.h) * F.dy;
  if (Math.abs(lat) < 0.75 && dep > -0.75 && fwd > 0.55) {
    if (wanted > 0) { if (!INT.lockT || performance.now() - INT.lockT > 3000) { INT.lockT = performance.now(); toast('La porte est verrouillée : t\'es suivi par les flics', 2); } return; }
    enterShop(sh, { walk: true });
  }
}
function nearestShop(x, y, r) {
  let best = null, bd = r;
  tilesIn(x - r, y - r, x + r, y + r, t => { for (const s of t.shops) { const d = Math.hypot(s.x - x, s.y - y); if (d < bd) { bd = d; best = s; } } });
  return best;
}
/* what E does inside */
function interiorAction() {
  const me = INT.me, shop = INT.active;
  if (!INT.world && me.y < 1.6 && Math.abs(me.x) < 1.2) return { label: 'E : sortir', run: () => leaveInterior() };
  { const cp = nearCorpse(me.x, me.y, INT.npcs); if (cp) return { label: 'E : fouiller le corps', run: () => searchBody(cp) }; }
  if (shop.fam === 'metro') return stationAction();
  const c = INT.counter; if (!c || Math.hypot(me.x - c.x, me.y - c.y) > 1.8) return null;
  const staff = INT.npcs.find(n => n.staff && n.state !== 'dead' && n.state !== 'flee');
  if (!staff) return { label: 'Le comptoir est vide', run: () => { } };
  const pay = (n, fn) => () => { if (money < n) { toast('Pas assez d\'argent', 1.5); return; } setMoney(money - n); fn(); };
  if (shop.fam === 'bar') return { label: 'E : une pinte (5 €)', run: pay(5, () => { drinks++; setHP(player.hp + 12); toast(drinks >= 3 ? 'Ça tourne un peu…' : 'Santé !', 1.6); if (drinks >= 3) drunkT = Math.min(120, drunkT + 40); }) };
  if (shop.fam === 'food') return { label: 'E : manger un morceau (9 €)', run: pay(9, () => { setHP(100); toast('Galette complète. Santé au max.', 2); }) };
  if (shop.fam === 'pharmacy') return { label: 'E : trousse de soins (15 €)', run: pay(15, () => { setHP(100); toast('Pansements, désinfectant. Santé au max.', 2); }) };
  if (shop.kind === 'tobacco') return { label: 'E : ticket à gratter (2 €)', run: pay(2, () => { const r = Math.random(), w = r < 0.02 ? 500 : r < 0.1 ? 50 : r < 0.3 ? 4 : 0; if (w) { setMoney(money + w); toast(`Gagné : ${w} € !`, 2); } else toast('Perdu.', 1.2); }) };
  if (INT.robbed || shop.robbed) return { label: 'La caisse est vide', run: () => { } };
  return { label: 'E : braquer la caisse', run: () => { const g = Math.round(rnd(90, 280)); setMoney(money + g); INT.robbed = true; shop.robbed = true; INT.alarm = Math.max(INT.alarm, 2); staff.handsUp = true; toast(`Le vendeur lève les mains · +${g} €`, 2.5); scareAround(staff, 20); } };
}
function interiorStep(dt, t) {
  const me = INT.me, inDialog = dialogActive();
  if (INT.trains.length) stationStep(dt);
  const fwd = (K('KeyW') || K('ArrowUp') ? 1 : 0) - (K('KeyS') || K('ArrowDown') ? 1 : 0), side = (K('KeyD') || K('ArrowRight') ? 1 : 0) - (K('KeyA') || K('ArrowLeft') ? 1 : 0);
  if (!inDialog && (fwd || side) && koT <= 0 && searchT <= 0) {
    let mx = fwd * Math.sin(yaw) + side * Math.cos(yaw), my = fwd * Math.cos(yaw) - side * Math.sin(yaw); const l = Math.hypot(mx, my); mx /= l; my /= l;
    const run = K('ShiftLeft') || K('ShiftRight'), sp = run ? 5.5 : 2.6;
    me.x += mx * sp * dt; me.y += my * sp * dt; if (punchT <= 0) me.h += angWrap(Math.atan2(mx, my) - me.h) * Math.min(1, dt * 12);
    roomResolve(me, 0.35); me.phase += dt * sp * (run ? 2.6 : 3.4);
    poseChar(player.mesh, run ? 'run' : 'walk', me.phase, 1, t);
  } else poseChar(player.mesh, 'idle', 0, 0, t);
  playerCombatPose();
  player.mesh.position.set(me.x, 0, -me.y); player.mesh.rotation.y = Math.PI - me.h;
  if (INT.door) { let near = Math.hypot(me.x, me.y); for (const n of INT.npcs) if (n.state === 'flee') near = Math.min(near, Math.hypot(n.x, n.y)); const o = clamp((1.7 - near) / 1.1, 0, 1); INT.door.rotation.y += (o * 1.45 - INT.door.rotation.y) * Math.min(1, dt * 7); }
  if (INT.world && me.y < 0.02 && Math.abs(me.x) < 0.6) { leaveInterior(); return; }
  for (const n of INT.npcs.slice()) {
    if (n.hurt > 0) n.hurt -= dt;
    applyKnock(n, dt, true);
    if (n.state === 'dead') { n.deadT += dt; deadPose(n); n.mesh.position.set(n.x, 0, -n.y); n.mesh.rotation.y = Math.PI - n.h; continue; }
    if (n.state === 'yield') { yieldPose(n); n.mesh.position.set(n.x, 0, -n.y); continue; }
    let tx = n.x, ty = n.y, moving = false, sp = n.speed, mode = 'walk';
    if (n.state === 'fight') { const r = fightStep(n, dt, me); if (r) { [tx, ty, sp] = r; moving = true; mode = 'run'; } }
    else if (n.state === 'flee') { tx = 0; ty = 0.3; sp = 4.5; moving = true; mode = 'run'; if (Math.hypot(n.x, n.y - 0.3) < 0.8) { n.mesh.parent && n.mesh.parent.remove(n.mesh); INT.npcs.splice(INT.npcs.indexOf(n), 1); if (INT.world) { const w = worldFromRoom(INT.frame, 0, -1.2); const q = addPed(w.x, w.y, { look: n.look }); q.state = 'flee'; q.t = 8; } continue; } }
    else if (n.browse) { n.t = (n.t || 0) - dt; if (n.t <= 0) { n.tx = rnd(-INT.W / 2 + 1, INT.W / 2 - 1); n.ty = rnd(2, INT.D - 3.5); n.t = rnd(4, 9); } if (Math.hypot(n.tx - n.x, n.ty - n.y) > 0.5) { tx = n.tx; ty = n.ty; moving = true; } }
    if (moving) { n.h += angWrap(Math.atan2(tx - n.x, ty - n.y) - n.h) * Math.min(1, dt * 8); n.x += Math.sin(n.h) * sp * dt; n.y += Math.cos(n.h) * sp * dt; if (n.state !== 'flee') roomResolve(n, 0.3); n.phase += dt * sp * 3; }
    poseChar(n.mesh, moving ? mode : n.sit ? 'sit' : 'idle', n.phase, 1, t + n.phase);
    if (n.handsUp) { const b = n.mesh.userData.b; b.uArmL.rotation.x = b.uArmR.rotation.x = -2.9; b.fArmL.rotation.x = b.fArmR.rotation.x = -0.3; }
    npcCombatPose(n);
    n.mesh.position.set(n.x, 0, -n.y); n.mesh.rotation.y = Math.PI - n.h;
  }
  /* staff and regulars step in when you start a brawl */
  if (INT.alarm && !INT.brawl) { INT.brawl = true; for (const n of INT.npcs) if (n.staff && n.tough && n.state === 'idle') { n.state = 'fight'; n.still = false; } }
}
function interiorCamera(dt) {
  const me = INT.me, d = 3.0, hb = 1.55;
  let cx = me.x - Math.sin(yaw) * d * Math.cos(pitch), cy = me.y - Math.cos(yaw) * d * Math.cos(pitch), ch = hb + Math.sin(pitch) * d + 0.3;
  cx = clamp(cx, -INT.W / 2 + 0.25, INT.W / 2 - 0.25); cy = clamp(cy, 0.25, INT.D - 0.25); ch = clamp(ch, 0.6, INT.H - 0.2);
  if (INT.world) {
    const F = INT.frame, c = worldFromRoom(F, cx, cy), tg = worldFromRoom(F, me.x, me.y), b0 = SW + 0.01;
    camera.position.set(c.x, b0 + ch + th(c.x, c.y), -c.y); camera.lookAt(tg.x, b0 + hb + 0.1 + th(tg.x, tg.y), -tg.y);
  } else camera.position.set(cx, ch, -cy), camera.lookAt(me.x, hb + 0.1, -me.y);
  if (camera.fov !== 66) { camera.fov = 66; camera.updateProjectionMatrix(); }
}

/* ---------- side jobs (blue markers) ---------- */
let side = null, sideBeams = [];
const SIDE = [
  { id: 'taxi', name: 'Taxi de nuit', at: { x: -139, y: -293 }, cd: 0, run: sideTaxi, blurb: 'Trois courses dans la ville. Payé au temps.' },
  { id: 'livr', name: 'Livreur de galettes', at: { x: -568, y: 16 }, cd: 0, run: sideDelivery, blurb: 'Trois livraisons en scooter, avant que ça refroidisse.' },
  { id: 'baston', name: 'Baston de l\'Esplanade', at: { x: -15, y: -700 }, cd: 0, run: sideFight, blurb: 'Trois adversaires, de plus en plus costauds.' },
  { id: 'course', name: 'Course de scooters', at: { x: -575, y: -330 }, cd: 0, run: sideRace, blurb: 'Les points de passage, contre la montre.' }
];
function initSide() {
  for (const s of SIDE) { const p = fp(s.at.x, s.at.y); s.at = { x: p.x, y: p.y }; const b = beam(0x39d0ff); b.position.copy(W3(p.x, p.y)); b.visible = true; s.beam = b; sideBeams.push(b); }
}
function sideMarkers() { if (mission || side) return; for (const s of SIDE) if (s.cd <= 0) markers.push({ x: s.at.x, y: s.at.y, c: '#39d0ff' }); }
async function startSide(s) {
  let cancel; const cancelled = new Promise((_, rej) => { cancel = rej; });
  side = { def: s, cancel: msg => cancel(new Error(msg)) };
  for (const b of sideBeams) b.visible = false; startBeam.visible = false;
  banner('Petit boulot', s.name, 3);
  try { await Promise.race([s.run(), cancelled]); }
  catch (e) { missionTick = null; if (dcb) { dq = []; $('dialog').style.display = 'none'; dcb = null; } banner('BOULOT RATÉ', e.message, 4); }
  cleanupMission(); combatQuiet = false; side = null; s.cd = 20;
  for (const q of SIDE) q.beam.visible = true; if (missionIdx < MISSIONS.length) startBeam.visible = true;
}
function sideReward(n, txt) { setMoney(money + n); banner('BOULOT TERMINÉ', n ? `+${n} € · ${txt}` : txt, 4); }
function farPoint(x, y, rmin, rmax, mask) {
  for (let k = 0; k < 40; k++) { const a = Math.random() * 6.283, r = rnd(rmin, rmax), i = nearestNode(x + Math.cos(a) * r, y + Math.sin(a) * r, mask || 1), d = Math.hypot(nx(i) - x, ny(i) - y); if (d > rmin * 0.8 && d < rmax * 1.2) return { x: nx(i), y: ny(i) }; }
  const i = nearestNode(x + rmin, y, mask || 1); return { x: nx(i), y: ny(i) };
}
async function sideTaxi() {
  const taxi = parkAt(player.x + 6, player.y, { kind: 'taxi', color: 0xe8e8e8, type: 'sedan' }); taxi.isCar = true; actors.push(taxi);
  await say([['Répartiteur', 'Un chauffeur s\'est fait porter pâle. Prends son taxi, trois clients t\'attendent.'], ['Répartiteur', 'Plus tu vas vite, plus le pourboire est gros. Mais ne les secoue pas trop.']]);
  goal(taxi.x, taxi.y); objective('Monte dans le taxi');
  await wait(() => player.car === taxi);
  let earned = 0;
  for (let k = 0; k < 3; k++) {
    const pick0 = farPoint(taxi.x, taxi.y, 180, 420);
    const pw = fp(pick0.x, pick0.y);
    const cl = addPed(pw.x, pw.y, { still: true, keep: true }); cl.state = 'idle'; cl.mesh.userData.talk = true; actors.push(cl);
    goal(pick0.x, pick0.y); objective(`Client ${k + 1}/3 : va le chercher`);
    await wait(() => player.car === taxi && dist(taxi, cl) < 9 && Math.abs(taxi.v) < 3, () => player.car !== taxi ? 'Tu as abandonné le taxi.' : false);
    cl.mesh.visible = false; cl.state = 'incar';
    const dest = farPoint(taxi.x, taxi.y, 500, 1100), dd = Math.hypot(dest.x - taxi.x, dest.y - taxi.y), T = dd / 8.5 + 25;
    toast(pick(['« Gare SNCF, et vite ! »', '« Chez moi, je suis crevé… »', '« Suivez cette… non, je rigole. »', '« Vous connaissez un bon kebab ? »']), 2.5);
    goal(dest.x, dest.y); objective('Dépose le client');
    let t = T, shake = 0;
    await wait(dt => { t -= dt; if (taxi.lastImpact > 6) { shake++; taxi.lastImpact = 0; toast('« Eh ! Doucement ! »', 1.2); } bar(`Course · ${Math.ceil(t)} s`, t / T, t < 10 ? '#ff4a4a' : '#ffc04a'); return dist(taxi, dest) < 14 && Math.abs(taxi.v) < 3; }, () => player.car !== taxi ? 'Tu as abandonné le taxi.' : t <= 0 ? 'Le client est descendu furieux.' : false);
    const pay = Math.max(15, Math.round(30 + t * 2 - shake * 8)); earned += pay; setMoney(money + pay); toast(`Course payée : ${pay} €`, 2); bar(null);
    removePed(cl);
  }
  sideReward(0, `Trois courses : ${earned} € au total`);
}
async function sideDelivery() {
  const sc = addCar(player.x + 3, player.y + 2, 0, { ai: null, kind: 'scooter', driver: true, keep: true, color: 0xd83020 }); sc.free = true; sc.isCar = true; actors.push(sc);
  await say([['Crêpière', 'T\'es le livreur ? Prends le scooter, j\'ai trois commandes qui partent.'], ['Crêpière', 'Une galette qui arrive froide, c\'est un avis une étoile. Allez !']]);
  goal(sc.x, sc.y); objective('Monte sur le scooter (E)');
  await wait(() => player.car === sc);
  let total = 0;
  for (let k = 0; k < 3; k++) {
    const d0 = farPoint(sc.x, sc.y, 300, 800, 1); let w = fp(d0.x, d0.y); if (!reachable(d0.x, d0.y, w.x, w.y, 2, 0.6)) w = { x: d0.x, y: d0.y }; /* never behind a fence */
    const cl = addPed(w.x, w.y, { still: true, keep: true }); cl.state = 'idle'; actors.push(cl);
    const T = Math.hypot(w.x - sc.x, w.y - sc.y) / 7.5 + 22;
    goal(w.x, w.y); objective(`Livraison ${k + 1}/3`);
    let t = T;
    await wait(dt => { t -= dt; bar(`Chaleur · ${Math.ceil(t)} s`, t / T, t < 10 ? '#4ab0ff' : '#ff7a2a'); return dist(player.car || player, cl) < 6; }, () => t <= 0 ? 'Galettes froides, commande annulée.' : false);
    const pay = Math.round(20 + t * 1.5); total += pay; setMoney(money + pay); toast(`« Merci ! » · +${pay} € avec le pourboire`, 2); bar(null);
    face(cl, player.car || player); cl.mesh.userData.talk = true;
  }
  sideReward(0, `Tournée finie : ${total} €`);
}
async function sideFight() {
  combatQuiet = true;
  await say([['Organisateur', 'Pas de couteau, pas de flics, pas de pleurs. Trois rounds.'], ['Organisateur', 'Quand ton adversaire abandonne, tu le laisses. Ou pas. Ici, personne n\'a rien vu.']]);
  const ring = [];
  for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283, p = addPed(player.x + Math.cos(a) * 6.5, player.y + Math.sin(a) * 6.5, { still: true, keep: true }); p.state = 'idle'; p.h = Math.atan2(-Math.cos(a), -Math.sin(a)); p.mesh.userData.talk = Math.random() < 0.6; p.immortal = true; actors.push(p); ring.push(p); }
  const names = ['Kévin « la Brique »', 'Steph de Maurepas', 'Le Grand Gwen'], hps = [80, 120, 170], pays = [120, 220, 400];
  let won = 0;
  for (let r = 0; r < 3; r++) {
    setHP(Math.max(player.hp, 70));
    const a = Math.random() * 6.283, op = addPed(player.x + Math.cos(a) * 3, player.y + Math.sin(a) * 3, { keep: true, hp: hps[r], look: { ...randomLook(), female: false, top: pick(['#1a1a1a', '#6a1a1a', '#2a3a5a']), hood: true } });
    op.tough = true; op.dmg = [5 + r * 2, 9 + r * 3]; op.yieldAt = 12; op.state = 'fight'; op.name = names[r]; actors.push(op);
    banner(`Round ${r + 1}`, names[r], 2.2); objective(`Mets ${names[r]} au tapis`);
    extraMarkers = () => markers.push({ x: op.x, y: op.y, c: '#ff3d8b' });
    await wait(() => { bar(`${names[r]}`, Math.max(0, op.hp) / hps[r], '#ff3d8b'); return op.state === 'yield' || op.state === 'dead'; }, () => dist(player, op) > 40 ? 'Tu as quitté le ring.' : false);
    won++; setMoney(money + pays[r]); toast(op.state === 'dead' ? `${names[r]} ne se relèvera pas · +${pays[r]} €` : `${names[r]} abandonne · +${pays[r]} €`, 2.5); bar(null);
    await new Promise(res => setTimeout(res, 1500));
  }
  combatQuiet = false;
  sideReward(0, 'Champion de l\'Esplanade');
}
async function sideRace() {
  const sc = addCar(player.x + 3, player.y + 2, 0, { ai: null, kind: 'scooter', driver: true, keep: true, color: 0x20a0d0 }); sc.free = true; sc.isCar = true; actors.push(sc);
  await say([['Starter', 'Dix points de passage à travers la ville. Le chrono part quand tu démarres.']]);
  goal(sc.x, sc.y); objective('Monte sur le scooter (E)');
  await wait(() => player.car === sc);
  const s0 = nearestNode(sc.x, sc.y, 1), g0 = nearestNode(sc.x + 900, sc.y + 700, 1), path = astar(s0, g0, 1) || [s0];
  const cps = []; let acc = 0;
  for (let k = 1; k < path.length; k++) { acc += Math.hypot(nx(path[k]) - nx(path[k - 1]), ny(path[k]) - ny(path[k - 1])); if (acc > 110 || k === path.length - 1) { cps.push({ x: nx(path[k]), y: ny(path[k]) }); acc = 0; if (cps.length >= 10) break; } }
  let len = 0; for (let k = 1; k < cps.length; k++) len += Math.hypot(cps[k].x - cps[k - 1].x, cps[k].y - cps[k - 1].y);
  const T = (len + Math.hypot(cps[0].x - sc.x, cps[0].y - sc.y)) / 11 + 15; let t = T, i = 0;
  extraMarkers = () => { for (let k = i; k < cps.length; k++) markers.push({ x: cps[k].x, y: cps[k].y, c: k === i ? '#ffc04a' : '#39d0ff' }); };
  goal(cps[0].x, cps[0].y); objective(`Point de passage 1/${cps.length}`);
  await wait(dt => {
    t -= dt; bar(`Chrono · ${Math.ceil(t)} s`, t / T, t < 10 ? '#ff4a4a' : '#39d0ff');
    if (dist(player.car || player, cps[i]) < 12) { i++; if (i >= cps.length) return true; goal(cps[i].x, cps[i].y); objective(`Point de passage ${i + 1}/${cps.length}`); toast('✓', 0.6); }
    return false;
  }, () => t <= 0 ? 'Trop lent.' : player.car !== sc ? 'Tu as lâché le scooter.' : false);
  bar(null); sideReward(Math.round(250 + t * 6), `Course bouclée avec ${Math.ceil(t)} s d'avance`);
}

/* ---------- story missions 7–9 ---------- */
Object.assign(P, { hic: [-372, 150], yann7: [-370, 152], baronCar: [-257, -890], garage: [-2225, -1262], yann8: [-150, -290], lices9: [-585, 45] });
MISSIONS.push(
  { name: 'Racket au Bar\'Hic', at: at('hic'), run: m7 },
  { name: 'La berline du Baron', at: at('yann8'), run: m8 },
  { name: 'Le Baron', at: at('lices9'), run: m9 }
);
const THUG = () => ({ top: '#1a1a1a', jacket: '#1a1a1a', pants: '#2a2a2a', skin: pick(SKIN), hair: '#111', cap: Math.random() < 0.5 ? '#111111' : false, shoes: '#111' });
async function m7() {
  const yann = spawnActor('yann7', YANN); face(yann, player); yann.mesh.userData.talk = true; kaosFor(yann);
  await say([['Yann', 'Trois videurs du Baron de Villejean rackettent le Bar\'Hic, juste là. Le patron est un pote.'], ['Kaos', 'Grrr.'], ['Yann', 'Va leur expliquer la politesse rennaise. À mains nues. Les flics n\'en sauront rien, le patron est d\'accord.']]);
  const door = { name: 'Le Bar\'Hic', fam: 'bar', kind: 'bar', x: P.hic[0], y: P.hic[1], nx: 0, ny: -1 };
  goal(door.x, door.y); objective('Entre dans le Bar\'Hic');
  await wait(near({ x: door.x, y: door.y }, 3));
  combatQuiet = true;
  let thugs = [];
  enterShop(door, { force: true, setup: () => { for (const [x, y] of [[-1.2, INT.D - 4.2], [0.6, INT.D - 4.6], [2, 5]]) { const n = roomNPC(x, y, Math.PI, THUG(), { tough: true, hp: 110, dmg: [7, 12], still: false }); thugs.push(n); } } });
  await new Promise(r => setTimeout(r, 500));
  await say([['Videur', 'C\'est privé ce soir. Tu payes l\'entrée : tout ce que t\'as dans les poches.']]);
  for (const n of thugs) { n.state = 'fight'; n.atk = rnd(0.3, 1.2); }
  for (const n of INT.npcs) if (!thugs.includes(n) && !n.staff) { n.state = 'flee'; n.still = false; }
  objective('Règle leur compte aux trois videurs');
  await wait(() => { const left = thugs.filter(n => n.state !== 'dead').length; bar(`Videurs debout · ${left}`, left / 3, '#ff3d8b'); return left === 0; }, () => !INT.active ? 'Tu as quitté le bar.' : false);
  bar(null);
  await say([['Le patron', 'Ils ne reviendront pas. Tiens, c\'est la caisse de la semaine. Et tes pintes sont offertes, à vie.']]);
  combatQuiet = false;
  objective('Sors du bar'); await wait(() => !INT.active);
  reward(600, 'Le Bar\'Hic est libre');
}
async function m8() {
  const yann = spawnActor('yann8', YANN); face(yann, player); yann.mesh.userData.talk = true; kaosFor(yann);
  await say([['Yann', 'Le Baron l\'a mauvaise. Il gare sa berline noire place du Colombier, le coffre plein de liquide.'], ['Yann', 'Pique-la, et emmène-la au garage de Momo à Cleunay. Momo ouvre pas s\'il y a des gyrophares derrière toi.']]);
  const ci = nearestNode(...P.baronCar, 1), e = outEdges(ci, 1), b = e.length ? GNB[e[0]] : ci;
  const car = addCar(nx(ci), ny(ci), Math.atan2(nx(b) - nx(ci), ny(b) - ny(ci)), { ai: null, driver: false, keep: true, type: 'sedan', color: 0x0a0a0c }); car.isCar = true; actors.push(car);
  const g1 = addPed(car.x + 3, car.y + 2, { keep: true, look: THUG() }); g1.tough = true; g1.dmg = [7, 11]; g1.state = 'idle'; g1.still = true; actors.push(g1);
  g1.onHit = p => { p.state = 'fight'; };
  goal(car.x, car.y); objective('Vole la berline noire du Baron');
  await wait(() => player.car === car);
  setWanted(2); banner('ALARME !', 'La berline est signalée. Sème les flics.', 3);
  const gi = nearestNode(...P.garage, 1), gar = { x: nx(gi), y: ny(gi) };
  goal(gar.x, gar.y); objective('Amène la berline au garage de Momo, à Cleunay, sans les flics');
  let warned = false;
  await wait(() => { if (dist(car, gar) < 12) { if (wanted === 0 && player.car === car) return true; if (!warned) { warned = true; toast('Momo n\'ouvre pas : t\'es suivi !', 2.5); } } else warned = false; return false; }, () => car.removed ? 'La berline est perdue.' : false);
  await say([['Momo', 'Belle bête. Je la désosse cette nuit. Le liquide, c\'est pour toi et Kaos.'], ['Momo', 'Le Baron va vouloir te voir en personne. Aux Lices, demain soir. Prépare tes poings.']]);
  reward(900, 'La berline du Baron a disparu');
}
async function m9() {
  gameMin = 23 * 60 + 40;
  const yann = spawnActor('lices9', YANN); face(yann, player); yann.mesh.userData.talk = true; kaosFor(yann);
  await say([['Yann', 'Il est là. Le Baron, et sa garde rapprochée. Il veut récupérer la rue de la Soif.'], ['Kaos', 'WOUF.'], ['Yann', 'Kaos dit : pas de quartier. Moi je dis : ne tombe pas.']]);
  yann.state = 'flee'; yann.still = false; yann.t = 30;
  combatQuiet = true;
  const base = fp(P.lices9[0] + 14, P.lices9[1] + 6);
  const baron = addPed(base.x, base.y, { keep: true, hp: 240, look: { top: '#f0f0f0', jacket: '#3a2a1a', pants: '#1a1a1a', skin: '#e0ac80', hair: '#cfcfcf', shoes: '#3a2a1a', cap: false } });
  baron.tough = true; baron.dmg = [10, 16]; baron.name = 'Le Baron'; actors.push(baron);
  const guards = [];
  for (let k = 0; k < 3; k++) { const g = addPed(base.x + rnd(-3, 3), base.y + rnd(-3, 3), { keep: true, hp: 110, look: THUG() }); g.tough = true; g.dmg = [7, 12]; actors.push(g); guards.push(g); }
  for (const g of [baron, ...guards]) { g.state = 'idle'; g.still = true; face(g, player); }
  goal(base.x, base.y); objective('Va voir le Baron');
  await wait(() => dist(player, baron) < 9);
  face(baron, player); baron.mesh.userData.talk = true;
  await say([['Le Baron', 'Alors c\'est toi, le chien de garde du chien ? La rue de la Soif m\'appartient depuis vingt ans.'], ['Le Baron', 'Les gars. Occupez-vous de lui.']]);
  baron.mesh.userData.talk = false;
  for (const g of guards) { g.state = 'fight'; g.still = false; g.atk = rnd(0.2, 1.5); }
  objective('Mets la garde du Baron hors d\'état');
  extraMarkers = () => { for (const g of [baron, ...guards]) if (g.state !== 'dead') markers.push({ x: g.x, y: g.y, c: '#ff3d8b' }); };
  await wait(() => guards.every(g => g.state === 'dead' || g.state === 'flee'), () => player.car ? 'Pas de voiture : c\'est à mains nues.' : false);
  baron.state = 'fight'; baron.still = false; banner('Le Baron', 'À toi de jouer', 2);
  objective('Affronte le Baron');
  await wait(() => { bar('Le Baron', Math.max(0, baron.hp) / 240, '#ff3d8b'); return baron.state === 'dead' || baron.state === 'flee'; }, () => player.car ? 'Pas de voiture : c\'est à mains nues.' : false);
  bar(null); combatQuiet = false; extraMarkers = null;
  setWanted(3); banner('SIRÈNES', 'Toute la police de Rennes converge sur les Lices', 3.5);
  goal(...P.anne); objective('Sème la police et rejoins Kaos place Sainte-Anne');
  await wait(() => wanted === 0 && near(at('anne'), 8)());
  const y2 = spawnActor('yann', YANN); face(y2, player); kaosFor(y2);
  await say([['Kaos', 'Wouf.'], ['Yann', 'Il dit que la ville est à toi. Et que t\'as une gamelle à ton nom maintenant.'], ['Yann', 'Fin de l\'histoire. Les petits boulots en bleu sur la carte t\'attendent toujours.']]);
  reward(1500, 'Roi de la rue de la Soif');
}

/* ---------- dealers at the street corners of the Soif zone (cartoon) ---------- */
const DEAL = { spots: null, lines: [
  ['Le guetteur', 'Psst… t\'es de la BAC ? Non ? Alors circule, y a rien à voir.'],
  ['Le guetteur', 'Herbes de Provence, 20 balles. Bio. Enfin presque.'],
  ['Le guetteur', 'Dis à Kaos qu\'on a rien vu. Rien du tout.'],
  ['Le guetteur', 'Arraaah ! Les bleus ! … Non c\'est bon, c\'est un livreur Deliveroo.'],
  ['Le guetteur', 'Le coin il est à nous depuis 2009, frère. Avant c\'était à un pigeon.']] };
function dealerSpots() {
  const out = [], n = GOFF.length - 1;
  for (let i = 0; i < n; i++) {
    if (GOFF[i + 1] - GOFF[i] < 3) continue;
    const x = nx(i), y = ny(i); if (Math.hypot(x + 384, y - 124) > 240) continue;
    if (out.some(o => Math.hypot(o.cx - x, o.cy - y) < 28)) continue;
    out.push({ cx: x, cy: y, p: null, cd: 0, n: 1 + (out.length % 3 === 0 ? 1 : 0) });
  }
  out.sort((a, b) => Math.hypot(a.cx + 384, a.cy - 124) - Math.hypot(b.cx + 384, b.cy - 124));
  return out.slice(0, 11);
}
function dealerStep(dt) {
  const pl = player.car || player;
  if (Math.hypot(pl.x + 384, pl.y - 124) > 520) { if (DEAL.spots) for (const s of DEAL.spots) if (s.p) { for (const q of s.p) if (q.state !== 'dead') removePed(q); s.p = null; } return; }
  if (!DEAL.spots) DEAL.spots = dealerSpots();
  const busy = wanted > 0 && copsNear(45);
  for (const s of DEAL.spots) {
    if (s.cd > 0) s.cd -= dt;
    const d = Math.hypot(s.cx - pl.x, s.cy - pl.y);
    if (s.p) {
      s.p = s.p.filter(q => peds.includes(q));
      for (const q of s.p) if (busy && q.state !== 'dead' && q.state !== 'flee' && q.state !== 'fight') { q.still = false; q.state = 'flee'; q.t = 12; q.speed = 4.5; q.fleeFrom = { x: pl.x, y: pl.y }; q.mesh.userData.talk = false; }
      if (d > 230 || !s.p.length) { for (const q of s.p) if (q.state !== 'dead') removePed(q); s.p = null; if (!s.cd) s.cd = 20; }
      continue;
    }
    if (d > 170 || s.cd > 0 || busy || (!MODE.night && (s.cx * 7 + s.cy) % 5 > 1.5)) continue;
    if (started && d < 60 && camFacing(s.cx, s.cy) > 0.5) continue;
    const q0 = s.wall || (s.wall = wallSpot(s.cx, s.cy)); if (!q0) { s.cd = 1e9; continue; }
    s.p = [];
    for (let k = 0; k < s.n; k++) {
      const lk = randomLook(); lk.hood = true; lk.female = false; lk.long = false; lk.skirt = false; lk.top = pick(['#1c1c1c', '#2a2f3a', '#3b3b3b', '#16213a']); lk.pants = pick(['#1a1a1a', '#2b2b30']); lk.cap = Math.random() < 0.5;
      const q = addPed(q0[0] + q0[3] * k * 0.95, q0[1] + q0[4] * k * 0.95, { look: lk, still: true, keep: true });
      q.state = 'idle'; q.t = 1e9; q.dealer = true; q.h = q0[2] + (k ? -0.9 : 0.35); q.mesh.userData.talk = k > 0;
      s.p.push(q);
    }
  }
}
/* a lookout stands with his back to a wall, in a doorway or a passage near the corner, never in the street */
function wallSpot(cx, cy) {
  let best = null, bs = 1e9;
  for (let k = 0; k < 60; k++) {
    const a = Math.random() * 6.283, r = rnd(4, 16), x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    if (insideBuilding(x, y) || roadAt(x, y)) continue;
    for (let j = 0; j < 8; j++) {
      const b = j * Math.PI / 4, wx = Math.sin(b), wy = Math.cos(b);
      if (!insideBuilding(x + wx * 0.75, y + wy * 0.75) || insideBuilding(x + wx * 0.35, y + wy * 0.35)) continue;
      const lx = wy, ly = -wx; if (insideBuilding(x + lx * 1, y + ly * 1) || insideBuilding(x - wx * 1.2, y - wy * 1.2)) continue;
      const sc = r + Math.random() * 3; if (sc < bs) { bs = sc; best = [x, y, Math.atan2(-wx, -wy), lx, ly]; } break;
    }
  }
  return best;
}
function nearDealer(x, y) { let b = null, bd = 2.3; for (const p of peds) if (p.dealer && p.state === 'idle') { const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; b = p; } } return b; }
async function talkDealer(p) {
  face(p, player);
  const l = pick(DEAL.lines);
  if (l[1].includes('20 balles') && money >= 20) { await say([l, ['Toi', '…Allez, vas-y.']]); setMoney(money - 20); toast('Sachet d\'herbes de Provence. Vraiment. Ça sent le gigot.', 4); }
  else await say([l]);
}

/* ---------- per-frame glue ---------- */
let lifePrompt = null;
function lifeStep(dt, t) {
  if (koT > 0) koT -= dt;
  updateBus(dt); updateCarousels(dt, t); updateHallDoors(dt);
  if (hurtT > 0) hurtT -= dt; else if (player.hp < 100) setHP(player.hp + dt * 2.5);
  if (fightGuardT > 0) fightGuardT -= dt; if (searchT > 0) searchT -= dt;
  if (drunkT > 0) { drunkT -= dt; if (drunkT <= 0) drinks = 0; }
  updatePunch(dt); updateBlood(dt); updateMetro(dt); dealerStep(dt); if (camShake > 0) camShake = Math.max(0, camShake - dt);
  for (const s of SIDE) if (s.cd > 0) s.cd -= dt;
  lifePrompt = null;
  if (INT.active) { $('street').textContent = INT.active.name; if (!dialogActive()) { const a = interiorAction(); if (a) { lifePrompt = a; showPrompt(a.label); } else showPrompt(null); } return; }
  if (!player.car && !dialogActive()) {
    if (!mission && !side) for (const s of SIDE) if (s.cd <= 0 && dist(player, s.at) < 3.5) { lifePrompt = { label: `E : petit boulot · ${s.name} — ${s.blurb}`, run: () => startSide(s) }; break; }
    if (!lifePrompt) { const me2 = nearEntrance(player.x, player.y); if (me2) lifePrompt = { label: `E : descendre dans le métro · ${me2.st}`, run: () => enterShop(stationShop(me2)) }; }
    if (!lifePrompt) { const cp = nearCorpse(player.x, player.y, peds); if (cp) lifePrompt = { label: 'E : fouiller le corps', run: () => searchBody(cp) }; }
    if (!lifePrompt) { const dl = nearDealer(player.x, player.y); if (dl) lifePrompt = { label: 'E : parler au guetteur', run: () => talkDealer(dl) }; }
    if (lifePrompt && !$('prompt').textContent) showPrompt(lifePrompt.label);
  }
}
function lifeInteract() {
  if (lifePrompt && !player.car) { const a = lifePrompt; lifePrompt = null; a.run(); return true; }
  return false;
}
function postCamera(t) {
  if (camShake > 0) { camera.position.x += (Math.random() - 0.5) * camShake * 0.6; camera.position.y += (Math.random() - 0.5) * camShake * 0.6; }
  if (drunkT > 0) { const k = Math.min(1, drunkT / 20); camera.rotateZ(Math.sin(t * 0.9) * 0.06 * k); camera.rotateX(Math.sin(t * 0.63) * 0.02 * k); }
}

Object.assign(window.__game, { INT, SIDE, startSide, enterShop, leaveInterior, nearestShop, punch, setHP, hitPed });
Object.defineProperties(window.__game, { hp: { get: () => player.hp }, side: { get: () => side }, lifePrompt: { get: () => lifePrompt } });

/* ---------- métro: entrances in the street, fast travel between real stations, line b viaducts with trains ---------- */
const METRO = { data: null, ent: [], trains: [] };
async function initMetro() {
  try { METRO.data = await (await fetch('metro.json')).json(); } catch (e) { return; }
  const D = METRO.data, sc = document.createElement('canvas'); sc.width = 256; sc.height = 256; const g = sc.getContext('2d');
  /* the STAR métro sign: white square, blue lowercase m */
  g.fillStyle = '#f4f6f8'; g.fillRect(0, 0, 256, 256); g.strokeStyle = '#c8ccd0'; g.lineWidth = 10; g.strokeRect(5, 5, 246, 246);
  g.fillStyle = '#1557b0'; g.font = '700 230px "Barlow Condensed",Arial'; g.textAlign = 'center'; g.fillText('m', 128, 186);
  const signM = M({ map: canvasTex(sc, true), emissiveMap: canvasTex(sc, true), emissive: 0xffffff, emissiveIntensity: 0.45 }); signM.userData.sign = true;
  const tileC = document.createElement('canvas'); tileC.width = 128; tileC.height = 128; const tg = tileC.getContext('2d');
  tg.fillStyle = '#e6e4de'; tg.fillRect(0, 0, 128, 128); for (let y = 0; y < 8; y++) for (let x = 0; x < 4; x++) { tg.fillStyle = `hsl(40,6%,${84 + Math.random() * 7}%)`; tg.fillRect(x * 32 + 1, y * 16 + 1, 30, 14); }
  tg.fillStyle = '#e2001a'; tg.fillRect(0, 96, 128, 10);
  const wallM = M({ map: canvasTex(tileC, true), roughness: 0.3 }), stepM = M({ ...MAT.groundTex.concrete, color: 0xb0aca4, roughness: 0.85 }), nosM = M({ color: 0xd8c030, roughness: 0.6 });
  const copeM = M({ color: 0xc2beb6, roughness: 0.8 }), ceilM = M({ color: 0x8a8884, roughness: 0.95 }), lightM = M({ color: 0xffffff, emissive: 0xf0f4ff, emissiveIntensity: 1.4 });
  const glassM = M({ color: 0x9fc0c8, roughness: 0.05, metalness: 0.4, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide });
  const holeMark = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, stencilWrite: true, stencilRef: 1, stencilFunc: THREE.AlwaysStencilFunc, stencilZPass: THREE.ReplaceStencilOp });
  const parts = new Map(); const put = (mat, geo, m) => { let a = parts.get(mat); if (!a) parts.set(mat, a = []); a.push({ geo, m }); };
  const L = 7.2, Wd = 2.5, RISE = 0.17, RUN = 0.3, N = 22, DEEP = N * RISE, COR = 4.5;
  const box = (w, h, d) => new THREE.BoxGeometry(w, h, d), pl = (w, h) => new THREE.PlaneGeometry(w, h);
  for (const [x, y, st] of D.entrances) {
    /* lay the stairs along the street: direction of the nearest road */
    const ni = nearestNode(x, y, 1), e = ni >= 0 ? outEdges(ni, 1) : [];
    let a = Math.random() * 6.28; if (e.length) { const b = GNB[e[0]]; a = Math.atan2(ny(b) - ny(ni), nx(b) - nx(ni)); }
    const ca = Math.cos(a), sa = Math.sin(a), q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, a, 0));
    const F = (lx, ly, lz, ry) => { const m = new THREE.Matrix4(), qq = q.clone(); if (ry) qq.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0))); m.compose(new THREE.Vector3(x + ca * lx + sa * lz, SW + ly, -(y + sa * lx - ca * lz)), qq, new THREE.Vector3(1, 1, 1)); return m; };
    const F2 = (lx, ly, lz, eu) => { const m = new THREE.Matrix4(); m.compose(new THREE.Vector3(x + ca * lx + sa * lz, SW + ly, -(y + sa * lx - ca * lz)), q.clone().multiply(new THREE.Quaternion().setFromEuler(eu)), new THREE.Vector3(1, 1, 1)); return m; };
    const x0 = -L / 2;
    /* steps down, then a covered landing that leads into the station */
    for (let k = 0; k < N; k++) { const top = -(k + 1) * RISE, h = DEEP + 0.4 + top; put(stepM, box(RUN, h, Wd), F(x0 + (k + 0.5) * RUN, top - h / 2, 0)); put(nosM, box(0.05, 0.02, Wd), F(x0 + k * RUN + 0.03, top + 0.005, 0)); }
    const xl = x0 + N * RUN; put(stepM, box(L / 2 + COR - xl + 0.2, 0.4, Wd), F((xl + L / 2 + COR) / 2, -DEEP - 0.2, 0));
    for (const s of [1, -1]) {
      put(wallM, pl(L + COR, DEEP + 0.3), F2(COR / 2, -DEEP / 2 - 0.15, s * Wd / 2, new THREE.Euler(0, s > 0 ? Math.PI : 0, 0)));
      put(MAT.metalLight, box(N * RUN * 1.16, 0.05, 0.05), F2(x0 + N * RUN / 2, -DEEP / 2 + 0.9, s * (Wd / 2 - 0.08), new THREE.Euler(0, 0, -Math.atan2(RISE, RUN))));
      put(lightM, box(L + COR - 1, 0.04, 0.03), F(COR / 2, -DEEP + 0.25, s * (Wd / 2 - 0.02)));
    }
    put(wallM, pl(Wd, DEEP + 0.3), F2(L / 2 + COR, -DEEP / 2 - 0.15, 0, new THREE.Euler(0, -Math.PI / 2, 0)));
    put(signM, pl(1.2, 1.2), F2(L / 2 + COR - 0.02, -DEEP + 1.7, 0, new THREE.Euler(0, -Math.PI / 2, 0)));
    put(ceilM, pl(COR + 0.2, Wd), F2(L / 2 + COR / 2, -0.35, 0, new THREE.Euler(Math.PI / 2, 0, 0)));
    put(lightM, box(COR - 0.6, 0.03, 0.2), F(L / 2 + COR / 2, -0.37, 0));
    put(wallM, pl(Wd, 0.6), F2(x0, -0.3, 0, new THREE.Euler(0, Math.PI / 2, 0)));
    /* coping and glass balustrades on three sides, the street end stays open */
    for (const s of [1, -1]) { put(copeM, box(L + 0.3, 0.12, 0.28), F(0.15, 0.06, s * (Wd / 2 + 0.14))); put(glassM, pl(L, 0.95), F2(0.15, 0.62, s * (Wd / 2 + 0.14), new THREE.Euler(0, 0, 0))); put(MAT.metalLight, box(L + 0.1, 0.05, 0.07), F(0.15, 1.12, s * (Wd / 2 + 0.14))); for (let px = x0 + 0.1; px <= L / 2 + 0.31; px += 1.8) put(MAT.metalLight, box(0.05, 1.0, 0.05), F(Math.min(px, L / 2 + 0.28), 0.6, s * (Wd / 2 + 0.14))); }
    put(copeM, box(0.28, 0.12, Wd + 0.56), F(L / 2 + 0.14, 0.06, 0)); put(glassM, pl(Wd + 0.28, 0.95), F2(L / 2 + 0.14, 0.62, 0, new THREE.Euler(0, Math.PI / 2, 0))); put(MAT.metalLight, box(0.07, 0.05, Wd + 0.4), F(L / 2 + 0.14, 1.12, 0));
    /* totem with the m sign */
    put(MAT.metal, new THREE.CylinderGeometry(0.07, 0.07, 3.3, 8), F(x0 - 0.7, 1.65, Wd / 2 + 0.6));
    put(signM, pl(0.75, 0.75), F(x0 - 0.7, 3.25, Wd / 2 + 0.6 + 0.03)); put(signM, pl(0.75, 0.75), F2(x0 - 0.7, 3.25, Wd / 2 + 0.6 - 0.03, new THREE.Euler(0, Math.PI, 0)));
    put(holeMark, pl(L, Wd), F2(0, 0.004, 0, new THREE.Euler(-Math.PI / 2, 0, 0)));
    /* collisions: the well and its balustrade; the way in is at the street end */
    const hx = L / 2 + 0.3, hz = Wd / 2 + 0.3, pts = [];
    for (const [u, v] of [[x0 + 0.5, -hz], [hx, -hz], [hx, hz], [x0 + 0.5, hz]]) pts.push(x + ca * u + sa * v, y + sa * u - ca * v);
    const bx = [Math.min(pts[0], pts[2], pts[4], pts[6]), Math.min(pts[1], pts[3], pts[5], pts[7]), Math.max(pts[0], pts[2], pts[4], pts[6]), Math.max(pts[1], pts[3], pts[5], pts[7])];
    XOBS.add(bx[0], bx[1], bx[2], bx[3], { p: pts, b: bx, h: 1.1 });
    METRO.ent.push({ x: x + ca * (x0 - 0.6), y: y + sa * (x0 - 0.6), st, a, cx: x, cy: y });
  }
  const grp = new THREE.Group(); scene.add(grp);
  for (const [mat, list] of parts) {
    for (let k = 0; k < list.length; k += 400) { const m = new THREE.Mesh(mergeGeos(list.slice(k, k + 400)), mat); m.receiveShadow = true; if (mat === holeMark) m.renderOrder = -1; grp.add(m); }
  }
  /* line b viaducts */
  const gb = new GB(), con = M({ ...MAT.groundTex.concrete, color: 0xc8c4bc, roughness: 0.9 }), dark = M({ color: 0x3a3a3a, roughness: 0.8 }), piers = [];
  const TOP = 8.6, TH = 1.4, HW = 2.3;
  for (const c of D.viaducts) {
    let acc = 0;
    for (let i = 0; i < c.length - 2; i += 2) {
      const ax = c[i], ay = c[i + 1], bx = c[i + 2], by = c[i + 3], l = Math.hypot(bx - ax, by - ay) || 1, ux = (bx - ax) / l, uy = (by - ay) / l, qx = -uy * HW, qy = ux * HW, n = Math.max(1, Math.ceil(l / 10));
      for (let k = 0; k < n; k++) {
        const x0 = ax + (bx - ax) * k / n, y0 = ay + (by - ay) * k / n, x1 = ax + (bx - ax) * (k + 1) / n, y1 = ay + (by - ay) * (k + 1) / n, L = l / n;
        const P = (x, y, z) => [x, z, -y];
        gb.quad(con, P(x0 + qx, y0 + qy, TOP), P(x1 + qx, y1 + qy, TOP), P(x1 - qx, y1 - qy, TOP), P(x0 - qx, y0 - qy, TOP), [0, 0], [L / 4, 0], [L / 4, 1], [0, 1], [0, 1, 0]);
        gb.quad(con, P(x0 - qx, y0 - qy, TOP - TH), P(x1 - qx, y1 - qy, TOP - TH), P(x1 + qx, y1 + qy, TOP - TH), P(x0 + qx, y0 + qy, TOP - TH), [0, 0], [L / 4, 0], [L / 4, 1], [0, 1], [0, -1, 0]);
        for (const sg of [1, -1]) gb.quad(con, P(x0 + qx * sg, y0 + qy * sg, TOP - TH), P(x1 + qx * sg, y1 + qy * sg, TOP - TH), P(x1 + qx * sg, y1 + qy * sg, TOP + 0.9), P(x0 + qx * sg, y0 + qy * sg, TOP + 0.9), [0, 0], [L / 4, 0], [L / 4, 0.6], [0, 0.6], [qx * sg, 0, -qy * sg]);
        gb.quad(dark, P(x0 + qx * 0.5, y0 + qy * 0.5, TOP + 0.02), P(x1 + qx * 0.5, y1 + qy * 0.5, TOP + 0.02), P(x1 - qx * 0.5, y1 - qy * 0.5, TOP + 0.02), P(x0 - qx * 0.5, y0 - qy * 0.5, TOP + 0.02), [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
      }
      for (let s = (30 - acc % 30) % 30; s < l; s += 30) piers.push(MX(ax + ux * s, 0, -(ay + uy * s)));
      acc += l;
    }
    if (acc > 400) METRO.trains.push({ c, len: acc, s: Math.random() * acc, dir: 1, wait: 0, mesh: null });
  }
  const vg = new THREE.Group(); gb.meshes(vg, { cast: true }); scene.add(vg);
  instanced(vg, new THREE.CylinderGeometry(0.8, 1.0, TOP - TH, 10).translate(0, (TOP - TH) / 2, 0), con, piers, true);
  /* VAL trains */
  const tc = document.createElement('canvas'); tc.width = 512; tc.height = 128; const tg2 = tc.getContext('2d');
  tg2.fillStyle = '#eceeee'; tg2.fillRect(0, 0, 512, 128); tg2.fillStyle = '#16181c'; for (let k = 0; k < 6; k++) tg2.fillRect(20 + k * 82, 24, 64, 52); tg2.fillStyle = '#d4202a'; tg2.fillRect(0, 92, 512, 12);
  const trainM = M({ map: canvasTex(tc, true), emissiveMap: canvasTex(tc, true), emissive: 0x332a1a, emissiveIntensity: 1, roughness: 0.35, metalness: 0.3 }); trainM.userData.facade = true; METRO.trainM = trainM;
  for (const tr of METRO.trains) {
    const m = new THREE.Group();
    for (const z of [-6.8, 6.8]) { const car = new THREE.Mesh(new THREE.BoxGeometry(2.1, 3.0, 13), trainM); car.position.set(0, TOP + 0.3 + 1.5, z); car.castShadow = true; m.add(car); }
    scene.add(m); tr.mesh = m;
  }
}
function trainAt(c, s) {
  let acc = 0;
  for (let i = 0; i < c.length - 2; i += 2) { const l = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]); if (acc + l >= s || i >= c.length - 4) { const f = clamp((s - acc) / (l || 1), 0, 1); return [c[i] + (c[i + 2] - c[i]) * f, c[i + 1] + (c[i + 3] - c[i + 1]) * f, Math.atan2(c[i + 2] - c[i], c[i + 3] - c[i + 1])]; } acc += l; }
  return [c[0], c[1], 0];
}
function updateMetro(dt) {
  for (const tr of METRO.trains) {
    if (tr.wait > 0) { tr.wait -= dt; continue; }
    tr.s += tr.dir * 17 * dt;
    if (tr.s > tr.len - 15 || tr.s < 15) { tr.dir *= -1; tr.wait = 12; tr.s = clamp(tr.s, 15, tr.len - 15); }
    const [x, y, h] = trainAt(tr.c, tr.s); tr.mesh.position.set(x, 0, -y); tr.mesh.rotation.y = Math.PI - h;
  }
}
function nearEntrance(x, y) { let best = null, bd = 3.2; for (const e of METRO.ent) { const d = Math.hypot(e.x - x, e.y - y); if (d < bd) { bd = d; best = e; } } return best; }
function openMetro(from) {
  const D = METRO.data; if (!D) return;
  try { document.exitPointerLock(); } catch (e) { }
  let el = $('metro'); if (!el) { el = document.createElement('div'); el.id = 'metro'; document.body.appendChild(el); }
  const col = L => `<div class="mline"><h3><span class="mbadge ${L}">${L}</span> Ligne ${L}</h3>${D.order[L].filter(n => D.stations.some(s => s.name === n)).map(n => `<button data-st="${n}" ${n === from.st ? 'disabled' : ''}>${n}</button>`).join('')}</div>`;
  el.innerHTML = `<h2>Métro · ${from.st}</h2><p>Ticket : 1,70 €. Choisis ta station.</p><div class="mcols">${col('a')}${col('b')}</div><button class="mclose">Rester ici (Échap)</button>`;
  el.style.display = 'block'; paused = true;
  el.querySelectorAll('[data-st]').forEach(b => b.onclick = () => { closeMetro(); travel(b.dataset.st); });
  el.querySelector('.mclose').onclick = closeMetro;
}
function closeMetro() { const el = $('metro'); if (el) el.style.display = 'none'; paused = false; }
addEventListener('keydown', e => { if (e.code === 'Escape' && $('metro') && $('metro').style.display === 'block') closeMetro(); });
function travel(name) {
  if (money < 1.7) { toast('Pas de quoi payer le ticket', 2); return; }
  const st = METRO.data.stations.find(s => s.name === name), ents = METRO.ent.filter(e => e.st === name);
  if (INT.active && INT.active.fam === 'metro') {
    const from = INT.active.name, ride = Math.max(1, Math.round(Math.hypot(st.x - (METRO.data.stations.find(q => q.name === from) || st).x, st.y - (METRO.data.stations.find(q => q.name === from) || st).y) / 600));
    fadeTo(() => {
      setMoney(money - 1.7);
      const e = ents.length ? ents[(Math.random() * ents.length) | 0] : { x: st.x, y: st.y, st: name };
      const sh = stationShop(e); buildInterior(sh); INT.active = sh;
      const tr = INT.trains[0]; tr.st = 'stop'; tr.y = 34; tr.t = 6; tr.open = 1;
      INT.me.x = tr.sd * 3.1; INT.me.y = 34 + METRO_DOORS[1]; INT.me.h = tr.sd < 0 ? Math.PI / 2 : -Math.PI / 2; yaw = INT.me.h;
      gameMin += ride * 2 + 2;
      banner('Métro', `${from} → ${name} · ${ride * 2 + 2} min`, 3);
    });
    return;
  }
  fadeTo(() => {
    setMoney(money - 1.7);
    const p = ents.length ? ents[(Math.random() * ents.length) | 0] : fp(st.x, st.y); const q = fp(p.x + 2.5, p.y);
    player.x = q.x; player.y = q.y; player.gy = undefined; updateTiles(player.x, player.y);
    banner('Métro', `Station ${name}`, 2.5);
  });
}
