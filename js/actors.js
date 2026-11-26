'use strict';
/* ===== actors: articulated people, dogs, cars, population ===== */
const BONES = ['root', 'hips', 'spine', 'chest', 'neck', 'head', 'uArmL', 'fArmL', 'uArmR', 'fArmR', 'thighL', 'shinL', 'thighR', 'shinR'];
const BP = { root: [0, 0, 0], hips: [0, 0.95, 0], spine: [0, 1.05, 0], chest: [0, 1.28, 0], neck: [0, 1.5, 0], head: [0, 1.6, 0], uArmL: [0.2, 1.46, 0], fArmL: [0.2, 1.17, 0], uArmR: [-0.2, 1.46, 0], fArmR: [-0.2, 1.17, 0], thighL: [0.095, 0.93, 0], shinL: [0.095, 0.5, 0], thighR: [-0.095, 0.93, 0], shinR: [-0.095, 0.5, 0] };
const PARENT = { hips: 'root', spine: 'hips', chest: 'spine', neck: 'chest', head: 'neck', uArmL: 'chest', fArmL: 'uArmL', uArmR: 'chest', fArmR: 'uArmR', thighL: 'hips', shinL: 'thighL', thighR: 'hips', shinR: 'thighR' };
const BI = Object.fromEntries(BONES.map((b, i) => [b, i]));

function limb(a, b, r0, r1, seg) { // cylinder from a to b
  const d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), L = d.length();
  const g = new THREE.CylinderGeometry(r1, r0, L, seg || 12, 1);
  g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize())));
  g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2); return g;
}
function ball(r, c, s, ws, hs) { const g = new THREE.SphereGeometry(r, ws || 16, hs || 12); if (s) g.scale(...s); g.translate(...c); return g; }
function boxg(w, h, d, c, rx) { const g = new THREE.BoxGeometry(w, h, d); if (rx) g.rotateX(rx); g.translate(...c); return g; }
function skinnedGeo(parts) { // parts: [geo, boneName, color]
  const pos = [], nor = [], col = [], si = [], sw = [];
  const C = new THREE.Color();
  for (const [g0, bone, color] of parts) {
    const g = g0.index ? g0.toNonIndexed() : g0; C.set(color).convertSRGBToLinear();
    const p = g.attributes.position.array, n = g.attributes.normal.array, b = BI[bone];
    for (let i = 0; i < p.length / 3; i++) { pos.push(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]); nor.push(n[i * 3], n[i * 3 + 1], n[i * 3 + 2]); col.push(C.r, C.g, C.b); si.push(b, 0, 0, 0); sw.push(1, 0, 0, 0); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
  g.computeBoundingSphere(); g.boundingSphere.radius = 1.4; return g;
}
const SKIN = ['#f1c9a5', '#e0ac80', '#c68a5e', '#8d5a3a', '#5e3b26', '#f6d8c0'];
const HAIR = ['#1b1208', '#3a2612', '#6a4a2a', '#a07a4a', '#d8c090', '#b0b0b0', '#2a1a10', '#8a2a1a'];
const TOPS = ['#1c1f26', '#2c3e50', '#7a1f1f', '#3b5d3a', '#c9c3b8', '#5d4a6e', '#b8862f', '#1e4f6e', '#e8e4dc', '#45484f', '#8a5a3a', '#2a6a5a', '#9a2a4a'];
const PANTS = ['#1d2433', '#2b3a55', '#3d3d3d', '#151515', '#5a4a3a', '#4a5a6a', '#6a6050'];
const SHOES = ['#f0f0f0', '#141414', '#5a3a22', '#2a2a2a', '#c0c0c0'];
function randomLook(R) {
  R = R || Math.random;
  const p = a => a[(R() * a.length) | 0];
  const female = R() < 0.48;
  return { female, skin: p(SKIN), hair: p(HAIR), top: p(TOPS), pants: p(PANTS), shoes: p(SHOES), long: female && R() < 0.75, cap: !female && R() < 0.18, beanie: R() < 0.12, hood: R() < 0.2, bag: R() < 0.25, skirt: female && R() < 0.25, short: R() < 0.12, jacket: R() < 0.4 ? p(['#1a1a1a', '#3a2a1a', '#2a3a4a', '#5a5a4a', '#6a1a1a']) : null, bald: !female && R() < 0.1, beard: !female && R() < 0.24, glasses: R() < 0.13, ponytail: female && R() < 0.18, scarf: R() < 0.1, longCoat: R() < 0.12, hairStyle: p(['short','short','parted','curly','bun']), build: p(['slim','average','average','broad']), shoeStyle: p(['sneaker','sneaker','boot','dress']) };
}
function personGeo(L) {
  L = Object.assign({ skin: '#e0ac80', hair: '#2a1a10', top: '#33363c', pants: '#22283a', shoes: '#141414' }, L);
  const sh = L.female ? 0.175 : 0.2, P = [];
  const torso = L.build === 'slim' ? 0.92 : (L.build === 'broad' ? 1.1 : 1);
  const leg = L.build === 'broad' ? 1.06 : 1;
  const top = L.jacket || L.top, sleeve = top;
  // Tailored torso shell: a continuous lathed waist/abdomen replaces the
  // visibly stacked cylindrical segments of the earlier pedestrian models.
  const waist = new THREE.LatheGeometry([
    new THREE.Vector2(0.105 * torso, 0.00), new THREE.Vector2(0.135 * torso, 0.045),
    new THREE.Vector2(0.145 * torso, 0.12), new THREE.Vector2(0.132 * torso, 0.22),
    new THREE.Vector2(0.15 * torso, 0.31), new THREE.Vector2(0.17 * torso, 0.39),
    new THREE.Vector2(0.165 * torso, 0.45)
  ], 24);
  waist.scale(1, 1, 0.72); waist.translate(0, 0.98, 0);
  P.push([ball(0.16, [0, 0.96, 0], [L.female ? 1.05 : 0.95, 0.62, 0.72]), 'hips', L.pants]);
  P.push([waist, 'spine', top]);
  // A shaped upper chest and shoulder yoke give the jacket/shirt a human
  // shoulder line instead of two cylinders meeting at a flat cross-section.
  P.push([ball(0.174 * torso, [0, 1.405, 0], [1.22, 0.72, 0.76], 20, 14), 'chest', top]);
  P.push([ball(0.145 * torso, [0, 1.475, -0.005], [1.38, 0.48, 0.72], 18, 12), 'chest', top]);
  if (L.jacket) P.push([boxg(0.06, 0.48, 0.02, [0, 1.22, 0.115]), 'chest', L.top]);
  P.push([ball(0.068, [sh - 0.015, 1.445, 0], [1, 0.9, 1]), 'chest', top], [ball(0.068, [-sh + 0.015, 1.445, 0], [1, 0.9, 1]), 'chest', top]);
  if (L.female) P.push([ball(0.06, [0.06, 1.36, 0.08], [1, 0.9, 0.8]), 'chest', top], [ball(0.06, [-0.06, 1.36, 0.08], [1, 0.9, 0.8]), 'chest', top]);
  P.push([limb([0, 1.47, 0], [0, 1.6, 0], 0.052, 0.048), 'neck', L.skin]);
  P.push([ball(0.105, [0, 1.71, 0.01], [0.93, 1.13, 1.04], 20, 14), 'head', L.skin]);
  P.push([boxg(0.028, 0.045, 0.04, [0, 1.69, 0.115]), 'head', L.skin]);
  // Nose bridge and brow ridges make faces read less like featureless spheres.
  P.push([limb([0, 1.75, 0.105], [0, 1.69, 0.145], 0.018, 0.012, 7), 'head', L.skin]);
  P.push([limb([0.018, 1.755, 0.104], [0.057, 1.76, 0.105], 0.012, 0.009, 6), 'head', L.hair],
         [limb([-0.018, 1.755, 0.104], [-0.057, 1.76, 0.105], 0.012, 0.009, 6), 'head', L.hair]);
  P.push([ball(0.013, [0.036, 1.725, 0.098]), 'head', '#1a1410'], [ball(0.013, [-0.036, 1.725, 0.098]), 'head', '#1a1410']);
  P.push([ball(0.022, [0.1, 1.705, 0], [0.5, 1, 0.8]), 'head', L.skin], [ball(0.022, [-0.1, 1.705, 0], [0.5, 1, 0.8]), 'head', L.skin]);
  // Subtle facial landmarks: ears, mouth and optional beard/glasses.
  P.push([ball(0.025,[0.108,1.70,0.008],[0.55,1.15,0.8]),'head',L.skin],
         [ball(0.025,[-0.108,1.70,0.008],[0.55,1.15,0.8]),'head',L.skin],
         [boxg(0.035,0.009,0.008,[0,1.665,0.112]),'head','#704b42']);
  if (L.beard) P.push([ball(0.078,[0,1.645,0.065],[1.12,0.55,0.92]),'head',L.hair],
                      [limb([-0.065,1.69,0.075],[0,1.62,0.11],0.014,0.01,6),'head',L.hair],
                      [limb([0.065,1.69,0.075],[0,1.62,0.11],0.014,0.01,6),'head',L.hair]);
  if (L.glasses) {
    const gm='#25282b';
    P.push([boxg(0.082,0.012,0.012,[-0.045,1.735,0.119]),'head',gm],
           [boxg(0.082,0.012,0.012,[0.045,1.735,0.119]),'head',gm],
           [boxg(0.012,0.055,0.012,[-0.085,1.735,0.119]),'head',gm],
           [boxg(0.012,0.055,0.012,[0.085,1.735,0.119]),'head',gm],
           [boxg(0.025,0.009,0.012,[0,1.735,0.119]),'head',gm]);
  }
  if (L.cap) { P.push([ball(0.112, [0, 1.75, -0.005], [1, 0.7, 1.05], 14, 8), 'head', L.cap === true ? pick(TOPS) : L.cap]); P.push([boxg(0.18, 0.02, 0.12, [0, 1.775, 0.12]), 'head', '#202020']); }
  else if (L.beanie) P.push([ball(0.114, [0, 1.76, -0.01], [1, 0.8, 1.05], 14, 8), 'head', pick(['#8a1a1a', '#1a1a1a', '#2a4a6a', '#c8a020'])]);
  else if (!L.bald) {
    P.push([ball(0.111,[0,1.745,-0.022],[1,0.9,1.06],16,10),'head',L.hair]);
    if (L.long) P.push([boxg(0.2,0.3,0.07,[0,1.6,-0.075]),'head',L.hair]);
    if (L.hairStyle==='parted') P.push([ball(0.06,[0.055,1.785,0.015],[1.15,0.45,0.85]),'head',L.hair]);
    if (L.hairStyle==='curly') for(let q=0;q<5;q++){const x=(q-2)*0.042;P.push([ball(0.043,[x,1.79,-0.005],[1,0.9,0.9],8,6),'head',L.hair]);}
    if (L.hairStyle==='bun' || L.ponytail) P.push([ball(0.052,[0,1.72,-0.12],[1,1,1]),'head',L.hair]);
    if (L.ponytail) P.push([limb([0,1.69,-0.12],[0.025,1.48,-0.18],0.035,0.024,7),'head',L.hair]);
  }
  if (L.mohawk) P.push([boxg(0.035, 0.12, 0.22, [0, 1.85, -0.01]), 'head', L.mohawk]);
  if (L.hood) P.push([ball(0.11, [0, 1.55, -0.085], [1.1, 0.55, 0.65]), 'chest', top]);
  if (L.scarf) P.push([new THREE.TorusGeometry(0.073,0.022,9,24).rotateX(Math.PI/2).translate(0,1.525,0),'chest','#77716a'],
                      [boxg(0.045,0.19,0.025,[0.035,1.39,0.13]),'chest','#77716a']);
  if (L.longCoat) {
    P.push([boxg(0.29,0.42,0.035,[-0.105,1.12,-0.005]),'chest',L.jacket||L.top],
           [boxg(0.29,0.42,0.035,[0.105,1.12,-0.005]),'chest',L.jacket||L.top],
           [boxg(0.012,0.31,0.012,[0,1.15,0.12]),'chest','#a19a8c']);
  }
  // Collar, zipper/placket and lower hem; restrained tonal contrast, not graphic stripes.
  P.push([limb([-0.105, 1.47, 0.105], [0, 1.39, 0.145], 0.018, 0.014, 7), 'chest', L.top],
         [limb([0.105, 1.47, 0.105], [0, 1.39, 0.145], 0.018, 0.014, 7), 'chest', L.top],
         [boxg(0.012, 0.24, 0.012, [0, 1.26, 0.115]), 'chest', L.jacket ? '#777777' : top]);
  if (L.jacket) {
    P.push([boxg(0.11, 0.11, 0.018, [0.105, 1.22, 0.126]), 'chest', '#24272b'],
           [boxg(0.11, 0.11, 0.018, [-0.105, 1.22, 0.126]), 'chest', '#24272b']);
  }
  if (L.bag) {
    const bagTone = pick(['#1a1a1a', '#3a4a5a', '#5a2a2a']);
    P.push([boxg(0.28, 0.36, 0.13, [0, 1.25, -0.16]), 'chest', bagTone],
           [limb([-0.12, 1.43, -0.09], [-0.17, 1.08, 0.06], 0.018, 0.018, 6), 'chest', '#202020'],
           [limb([0.12, 1.43, -0.09], [0.17, 1.08, 0.06], 0.018, 0.018, 6), 'chest', '#202020']);
  }
  if (L.helmet) {
    P.push([ball(0.122, [0, 1.765, -0.012], [1.08, 0.78, 1.12], 18, 12), 'head', L.helmetColor || '#252a30'],
           [boxg(0.19, 0.018, 0.055, [0, 1.715, 0.105]), 'head', '#17191c']);
  }
  if (L.vest) P.push([boxg(0.36, 0.34, 0.27, [0, 1.3, 0]), 'chest', L.vest]);
  for (const s of [1, -1]) {
    const ua = s > 0 ? 'uArmL' : 'uArmR', fa = s > 0 ? 'fArmL' : 'fArmR', th = s > 0 ? 'thighL' : 'thighR', sn = s > 0 ? 'shinL' : 'shinR', x = BP[ua][0];
    P.push([limb([x, 1.46, 0], [x, 1.17, 0], 0.055, 0.046), ua, sleeve], [ball(0.047, [x, 1.17, 0]), ua, sleeve]);
    P.push([limb([x, 1.17, 0], [x, 0.93, 0], 0.045, 0.036), fa, L.short ? L.skin : sleeve], [ball(0.042, [x, 0.88, 0.005], [0.75, 1.25, 0.55]), fa, L.skin]);
    if (!L.short) P.push([limb([x, 0.99, 0], [x, 0.95, 0], 0.047, 0.043, 7), fa, '#777777']);
    const lx = BP[th][0];
    P.push([limb([lx, 0.93, 0], [lx, 0.5, 0], 0.078, 0.056), th, L.skirt ? L.skin : L.pants], [ball(0.056, [lx, 0.5, 0]), th, L.skirt ? L.skin : L.pants]);
    P.push([limb([lx, 0.5, 0], [lx, 0.08, 0], 0.053, 0.04), sn, L.skirt ? L.skin : L.pants]);
    P.push([ball(0.058, [lx, 0.055, 0.045], [0.95, 0.75, 2.2]), sn, L.shoes],
           [boxg(0.105, 0.018, 0.19, [lx, 0.025, 0.055]), sn, '#242424']);
  }
  // Anatomical hands: palm volume, thumb and four compact fingers. They are
  // weighted to the forearm bone so the existing walk/run/drive poses remain valid.
  for (const side of [1, -1]) {
    const arm = side > 0 ? 'fArmL' : 'fArmR', hx = side * 0.205;
    P.push([ball(0.043,[hx,0.855,0.002],[0.82,1.18,0.72],10,8),arm,L.skin]);
    P.push([limb([hx-side*0.018,0.87,0.018],[hx-side*0.055,0.82,0.045],0.014,0.011,6),arm,L.skin]);
    for(let f=0;f<4;f++){
      const fx=hx+side*((f-1.5)*0.017);
      P.push([limb([fx,0.835,0.025],[fx+side*((f-1.5)*0.002),0.795-(f===1||f===2?0.012:0),0.03],0.009,0.007,5),arm,L.skin]);
    }
    // Sleeve cuff and elbow crease help separate arm sections at street distance.
    if(!L.short) P.push([limb([side*0.2,0.985,0],[side*0.2,0.955,0],0.049,0.047,8),arm,L.jacket?'#34383c':top]);
  }
  // Tailored garment seams, jacket lapels and pockets add readable construction
  // without separate scene objects: all pieces are merged into the skinned mesh.
  if(L.jacket){
    P.push([limb([-0.105,1.45,0.112],[0,1.31,0.145],0.012,0.009,6),'chest','#a4a09a'],
           [limb([0.105,1.45,0.112],[0,1.31,0.145],0.012,0.009,6),'chest','#a4a09a'],
           [boxg(0.085,0.075,0.012,[0.115,1.19,0.12]),'chest','#30343a'],
           [boxg(0.085,0.075,0.012,[-0.115,1.19,0.12]),'chest','#30343a']);
  } else {
    P.push([boxg(0.13,0.055,0.012,[0,1.17,0.118]),'chest',top]);
  }
  // Trouser knee shaping and side seams follow the thigh/shin bones.
  for(const side of [1,-1]){
    const thigh=side>0?'thighL':'thighR', shin=side>0?'shinL':'shinR', lx=side*0.095;
    P.push([ball(0.058,[lx,0.49,0.012],[0.94,0.92,0.72],9,7),thigh,L.pants]);
    P.push([limb([lx+side*0.052,0.86,-0.025],[lx+side*0.052,0.57,-0.02],0.006,0.006,5),thigh,L.pants]);
    // Shoe sole, toe cap and heel create a layered footwear silhouette.
    const shoe=L.shoeStyle==='boot'?'#292725':(L.shoeStyle==='dress'?'#252321':'#d0d0cc');
    P.push([boxg(0.112,0.022,0.205,[lx,0.018,0.055]),shin,shoe],
           [ball(0.048,[lx,0.055,0.105],[1.12,0.62,1.05],9,7),shin,L.shoes],
           [boxg(0.014,0.012,0.075,[lx,0.067,0.045]),shin,'#77736d']);
    if(L.shoeStyle==='boot') P.push([limb([lx,0.12,0.005],[lx,0.22,0.005],0.052,0.048,8),shin,L.shoes]);
  }
  // A small collar roll and belt line make the waist/neck transitions less abrupt.
  P.push([new THREE.TorusGeometry(0.052,0.012,8,22).rotateX(Math.PI/2).translate(0,1.475,0),'neck',L.top],
         [boxg(0.29,0.025,0.018,[0,0.99,0.105]),'hips',L.jacket?'#26282a':L.pants]);
  if (L.skirt) P.push([limb([0, 1.0, 0], [0, 0.6, 0], 0.17, 0.25).scale(1, 1, 0.8), 'hips', L.top === '#e8e4dc' ? '#2a2a3a' : L.top]);
  return skinnedGeo(P);
}
// Fine textile microstructure shared by pedestrians and riders. The maps are
// neutral: vertex colours remain authoritative for skin, hair and clothing.
function makeMicroSurface(kind) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d'), im = x.createImageData(256, 256);
  for (let y = 0; y < 256; y++) for (let xx = 0; xx < 256; xx++) {
    const i = (y * 256 + xx) * 4;
    const weave = kind === 'fabric' ? (((xx % 6) < 2) !== ((y % 6) < 2) ? 9 : -3) : 0;
    const grain = (Math.random() - 0.5) * (kind === 'fabric' ? 12 : 5);
    const v = Math.max(0, Math.min(255, 226 + weave + grain));
    im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255;
  }
  x.putImageData(im, 0, 0);
  const t = canvasTex(c); t.repeat.set(kind === 'fabric' ? 2.5 : 3, kind === 'fabric' ? 2.5 : 3);
  return t;
}
const fabricMicro = makeMicroSurface('fabric');
const charMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.86, roughnessMap: fabricMicro, bumpMap: fabricMicro, bumpScale: 0.009, skinning: true }); allMats.push(charMat);
function makeChar(look) {
  const geo = personGeo(look);
  const bones = {};
  for (const n of BONES) { const b = new THREE.Bone(); b.name = n; bones[n] = b; }
  for (const n of BONES) { const p = BP[n], pp = PARENT[n] ? BP[PARENT[n]] : [0, 0, 0]; if (PARENT[n]) bones[PARENT[n]].add(bones[n]); bones[n].position.set(p[0] - pp[0], p[1] - pp[1], p[2] - pp[2]); }
  const mesh = new THREE.SkinnedMesh(geo, charMat);
  mesh.add(bones.root); mesh.bind(new THREE.Skeleton(BONES.map(n => bones[n])));
  mesh.castShadow = true; mesh.receiveShadow = true; mesh.frustumCulled = true;
  mesh.userData.b = bones; mesh.userData.hipY = 0;
  scene.add(mesh); return mesh;
}
/* procedural animation: mode walk|run|idle|sit|down|drive */
function poseChar(m, mode, ph, amt, t) {
  const b = m.userData.b;
  for (const n of BONES) b[n].rotation.set(0, 0, 0);
  b.hips.position.y = 0.95; b.root.rotation.set(0, 0, 0); b.root.position.y = 0;
  if (mode === 'down') { b.root.rotation.x = -1.45; b.root.position.y = 0.12; b.uArmL.rotation.z = 1.1; b.uArmR.rotation.z = -0.8; b.thighL.rotation.x = -0.3; b.shinL.rotation.x = 0.6; return; }
  if (mode === 'sit') { b.hips.position.y = 0.48; b.thighL.rotation.x = b.thighR.rotation.x = -1.5; b.shinL.rotation.x = b.shinR.rotation.x = 1.45; b.uArmL.rotation.x = b.uArmR.rotation.x = -0.5; b.fArmL.rotation.x = b.fArmR.rotation.x = -0.9; b.spine.rotation.x = 0.15; b.head.rotation.x = 0.15 + Math.sin(t * 0.7) * 0.05; return; }
  if (mode === 'drive') { b.hips.position.y = 0.5; b.thighL.rotation.x = b.thighR.rotation.x = -1.4; b.shinL.rotation.x = b.shinR.rotation.x = 1.2; b.uArmL.rotation.x = b.uArmR.rotation.x = -1.0; b.fArmL.rotation.x = b.fArmR.rotation.x = -0.5; return; }
  if (mode === 'idle') {
    const br = Math.sin(t * 1.6) * 0.02;
    b.chest.rotation.x = br; b.uArmL.rotation.z = 0.08; b.uArmR.rotation.z = -0.08; b.fArmL.rotation.x = b.fArmR.rotation.x = -0.15; b.head.rotation.y = Math.sin(t * 0.4) * 0.3;
    if (m.userData.talk) { b.uArmR.rotation.x = -0.5 + Math.sin(t * 3) * 0.2; b.fArmR.rotation.x = -1.1; b.head.rotation.x = Math.sin(t * 5) * 0.05; }
    return;
  }
  const run = mode === 'run', A = amt * (run ? 0.85 : 0.5), s = Math.sin(ph), c = Math.cos(ph);
  // Gait cycle: alternating foot lift, pelvis roll and counter-rotation through the torso.
  const stride = Math.sin(ph), cross = Math.cos(ph), liftL = Math.max(0, Math.sin(ph - 0.65)), liftR = Math.max(0, Math.sin(ph + Math.PI - 0.65));
  b.thighL.rotation.x = -stride * A; b.thighR.rotation.x = stride * A;
  b.shinL.rotation.x = liftL * A * (run ? 2.15 : 1.55); b.shinR.rotation.x = liftR * A * (run ? 2.15 : 1.55);
  b.hips.position.y = 0.95 - (run ? 0.055 : 0.018) + Math.abs(cross) * (run ? 0.045 : 0.018) + Math.max(liftL,liftR) * (run ? 0.018 : 0.008);
  b.hips.rotation.y = stride * 0.11; b.hips.rotation.z = cross * (run ? 0.035 : 0.045);
  b.spine.rotation.x = run ? 0.2 : 0.025; b.spine.rotation.z = -b.hips.rotation.z * 0.55;
  b.chest.rotation.y = -stride * 0.15; b.chest.rotation.z = -cross * 0.018;
  b.uArmL.rotation.x = stride * A * 0.9; b.uArmR.rotation.x = -stride * A * 0.9;
  b.uArmL.rotation.z = 0.07 + cross * 0.025; b.uArmR.rotation.z = -0.07 - cross * 0.025;
  b.fArmL.rotation.x = run ? -1.15 - Math.max(0, stride) * 0.12 : -0.2 - Math.abs(stride) * 0.2;
  b.fArmR.rotation.x = run ? -1.15 - Math.max(0, -stride) * 0.12 : -0.2 - Math.abs(stride) * 0.2;
  b.fArmL.rotation.z = 0.025 + stride * 0.025; b.fArmR.rotation.z = -0.025 - stride * 0.025;
  b.head.rotation.x = run ? 0.025 : -0.012; b.head.rotation.y = Math.sin(ph * 0.5) * 0.035;
  b.head.rotation.z = -b.hips.rotation.z * 0.35;
  if (m.userData.wobble) { b.spine.rotation.z = Math.sin(t * 1.3) * 0.12; b.head.rotation.z = Math.sin(t * 0.9) * 0.2; }
}
/* dog */
function makeDog(color) {
  const D = { root: [0, 0, 0], body: [0, 0.5, 0], head: [0, 0.62, 0.38], tail: [0, 0.6, -0.36], legFL: [0.11, 0.42, 0.26], legFR: [-0.11, 0.42, 0.26], legBL: [0.11, 0.42, -0.26], legBR: [-0.11, 0.42, -0.26] };
  const names = Object.keys(D), par = { body: 'root', head: 'body', tail: 'body', legFL: 'body', legFR: 'body', legBL: 'body', legBR: 'body' };
  const idx = Object.fromEntries(names.map((n, i) => [n, i]));
  const parts = [[ball(0.2, [0, 0.52, 0], [0.85, 0.85, 2.0], 14, 10), 'body'], [ball(0.13, [0, 0.66, 0.44], [0.9, 0.95, 1.1]), 'head'], [ball(0.07, [0, 0.62, 0.56], [0.75, 0.7, 1.3]), 'head'], [ball(0.03, [0, 0.64, 0.64]), 'head', '#111'], [boxg(0.05, 0.12, 0.03, [0.07, 0.79, 0.4], 0.2), 'head'], [boxg(0.05, 0.12, 0.03, [-0.07, 0.79, 0.4], 0.2), 'head'], [limb([0, 0.6, -0.36], [0, 0.75, -0.6], 0.035, 0.02), 'tail'], [limb([0, 0.58, 0.32], [0, 0.6, 0.32], 0.12, 0.12).scale(1.3, 1, 0.3), 'head', '#e0204a']];
  for (const l of ['legFL', 'legFR', 'legBL', 'legBR']) parts.push([limb([D[l][0], 0.45, D[l][2]], [D[l][0], 0.03, D[l][2]], 0.05, 0.035), l]);
  const pos = [], nor = [], col = [], si = [], sw = []; const C = new THREE.Color();
  for (const [g0, bone, cc] of parts) { const g = g0.index ? g0.toNonIndexed() : g0; C.set(cc || color).convertSRGBToLinear(); const p = g.attributes.position.array, n = g.attributes.normal.array; for (let i = 0; i < p.length / 3; i++) { pos.push(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]); nor.push(n[i * 3], n[i * 3 + 1], n[i * 3 + 2]); col.push(C.r, C.g, C.b); si.push(idx[bone], 0, 0, 0); sw.push(1, 0, 0, 0); } }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4)); geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4)); geo.computeBoundingSphere();
  const bones = {}; for (const n of names) bones[n] = new THREE.Bone();
  for (const n of names) { const p = D[n], pp = par[n] ? D[par[n]] : [0, 0, 0]; if (par[n]) bones[par[n]].add(bones[n]); bones[n].position.set(p[0] - pp[0], p[1] - pp[1], p[2] - pp[2]); }
  const m = new THREE.SkinnedMesh(geo, charMat); m.add(bones.root); m.bind(new THREE.Skeleton(names.map(n => bones[n]))); m.castShadow = true; m.userData.b = bones; scene.add(m); return m;
}
function poseDog(m, ph, amt, t) {
  const b = m.userData.b, s = Math.sin(ph) * amt * 0.6;
  b.legFL.rotation.x = s; b.legBR.rotation.x = s; b.legFR.rotation.x = -s; b.legBL.rotation.x = -s;
  b.tail.rotation.y = Math.sin(t * 9) * 0.5; b.head.rotation.x = Math.sin(t * 0.8) * 0.08; b.body.position.y = 0.5 + Math.abs(Math.cos(ph)) * amt * 0.03;
}

/* ---------- cars ---------- */
const CAR_TYPES = {
  hatch: { L: 4.05, W: 1.76, prof: [[-2.0, 0.3], [-2.03, 0.62], [-1.96, 0.96], [-1.74, 1.38], [0.22, 1.45], [0.98, 1.0], [1.86, 0.84], [2.03, 0.6], [2.0, 0.3]], win: [[-1.66, 1.0], [-1.56, 1.33], [0.18, 1.39], [0.86, 1.0]], ws: [[0.24, 1.43], [0.96, 1.01]], rw: [[-1.72, 1.36], [-1.95, 0.98]], wz: 1.3, tail: 0.88 },
  sedan: { L: 4.6, W: 1.8, prof: [[-2.3, 0.3], [-2.33, 0.7], [-2.22, 0.95], [-1.45, 1.02], [-0.85, 1.44], [0.42, 1.46], [1.15, 1.0], [2.15, 0.86], [2.31, 0.62], [2.28, 0.3]], win: [[-1.35, 1.03], [-0.82, 1.38], [0.38, 1.4], [1.03, 1.02]], ws: [[0.44, 1.44], [1.13, 1.01]], rw: [[-0.87, 1.42], [-1.42, 1.04]], wz: 1.45, tail: 0.86 },
  van: { L: 4.3, W: 1.84, prof: [[-2.15, 0.33], [-2.17, 1.72], [-1.95, 1.84], [0.55, 1.85], [1.22, 1.22], [2.06, 1.0], [2.16, 0.65], [2.13, 0.33]], win: [[-0.2, 1.12], [-0.2, 1.72], [0.5, 1.75], [1.12, 1.2]], ws: [[0.57, 1.83], [1.2, 1.23]], rw: [[-2.16, 1.7], [-2.16, 1.2]], wz: 1.4, tail: 1.1 },
  suv: { L: 4.45, W: 1.86, prof: [[-2.2, 0.38], [-2.22, 0.98], [-2.1, 1.6], [0.32, 1.66], [1.05, 1.15], [2.05, 1.0], [2.21, 0.7], [2.18, 0.38]], win: [[-1.95, 1.17], [-1.9, 1.56], [0.28, 1.6], [0.95, 1.17]], ws: [[0.34, 1.64], [1.03, 1.16]], rw: [[-2.12, 1.58], [-2.2, 1.0]], wz: 1.4, tail: 1.0 }
,
  compact: { L: 3.65, W: 1.68, prof: [[-1.82,0.3],[-1.84,0.62],[-1.7,0.94],[-1.42,1.28],[0.18,1.32],[0.86,0.98],[1.68,0.82],[1.83,0.58],[1.8,0.3]], win: [[-1.38,0.98],[-1.28,1.25],[0.15,1.27],[0.78,0.98]], ws: [[0.2,1.3],[0.84,0.98]], rw: [[-1.4,1.27],[-1.65,0.94]], wz: 1.18, tail: 0.82 },
  estate: { L: 4.72, W: 1.82, prof: [[-2.36,0.32],[-2.38,0.72],[-2.2,1.0],[-1.55,1.42],[0.55,1.45],[1.2,1.18],[2.22,1.02],[2.36,0.66],[2.32,0.32]], win: [[-1.48,1.02],[-1.45,1.36],[0.48,1.39],[1.12,1.16]], ws: [[0.52,1.43],[1.18,1.18]], rw: [[-1.58,1.39],[-2.18,0.98]], wz: 1.48, tail: 0.9 }
};
const PAINTS = [0xb8bcc2, 0x1a1c20, 0xe8e8e8, 0x6a1a1a, 0x1a2a4a, 0x3a4048, 0x8a8a82, 0x2a4a3a, 0xa83a1a, 0x5a6a7a, 0x22252a, 0xd0c8b8, 0x1a3a6a];
const paintCache = new Map();
// Shared neutral micro-flake / orange-peel maps give the clearcoat a finer
// response to lighting without baking a colour into individual paint variants.
function makePaintSurfaceMaps() {
  const c = document.createElement('canvas'); c.width = c.height = 512;
  const x = c.getContext('2d'), im = x.createImageData(512, 512);
  for (let y = 0; y < 512; y++) for (let xx = 0; xx < 512; xx++) {
    const i = (y * 512 + xx) * 4;
    const broad = Math.sin(xx * 0.045 + Math.sin(y * 0.027) * 1.8) * 1.3;
    const grain = (Math.random() - 0.5) * 8;
    const v = Math.max(0, Math.min(255, 250 + broad + grain));
    im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255;
  }
  x.putImageData(im, 0, 0);
  const colour = canvasTex(c, true), bump = canvasTex(c);
  colour.repeat.set(2, 2); bump.repeat.set(2, 2);
  const r = document.createElement('canvas'); r.width = r.height = 256;
  const rc = r.getContext('2d'), ri = rc.createImageData(256, 256);
  for (let i = 0; i < ri.data.length; i += 4) { const v = 108 + Math.random() * 32; ri.data[i] = ri.data[i + 1] = ri.data[i + 2] = v; ri.data[i + 3] = 255; }
  rc.putImageData(ri, 0, 0); const rough = canvasTex(r); rough.repeat.set(2, 2);
  return { colour, bump, rough };
}
const paintSurface = makePaintSurfaceMaps();
function paintMat(c) { if (!paintCache.has(c)) { const m = new THREE.MeshPhysicalMaterial({ color: c, map: paintSurface.colour, roughnessMap: paintSurface.rough, bumpMap: paintSurface.bump, bumpScale: 0.006, metalness: 0.34, roughness: 0.36, clearcoat: 0.82, clearcoatRoughness: 0.19, envMapIntensity: 1.15 }); allMats.push(m); paintCache.set(c, m); } return paintCache.get(c); }
const CARMAT = {};
const plateMats = [];
// Build one cached, non-indexed cabin geometry per vehicle silhouette.  The
// cabin is deliberately kept below the glazing so it reads through the glass
// without adding a dozen independently rendered meshes to every traffic car.
function mergeCabinParts(parts) {
  const positions = [], normals = [];
  for (const [geo0, matrix] of parts) {
    const geo = geo0.index ? geo0.toNonIndexed() : geo0.clone();
    if (matrix) geo.applyMatrix4(matrix);
    if (!geo.attributes.normal) geo.computeVertexNormals();
    const pa = geo.attributes.position.array, na = geo.attributes.normal.array;
    for (let i = 0; i < pa.length; i++) positions.push(pa[i]);
    for (let i = 0; i < na.length; i++) normals.push(na[i]);
    if (geo0.index) geo.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  out.computeBoundingSphere();
  return out;
}
function cabinBox(w, h, d, x, y, z, rx=0, ry=0, rz=0) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const m = new THREE.Matrix4().compose(new THREE.Vector3(x,y,z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz)), new THREE.Vector3(1,1,1));
  return [geo,m];
}
function makeCabinGeometry(T) {
  const p = [];
  // Dashboard, centre console and instrument brow.
  p.push(cabinBox(T.W*0.82,0.16,0.24,0,0.91,T.front*0.38));
  p.push(cabinBox(T.W*0.22,0.24,0.34,0,0.79,T.front*0.15));
  p.push(cabinBox(T.W*0.68,0.055,0.10,0,1.015,T.front*0.37));
  // Two front seats with cushions, backs and head restraints.
  for (const x of [-T.W*0.235,T.W*0.235]) {
    p.push(cabinBox(0.43,0.13,0.48,x,0.69,T.front*0.03));
    p.push(cabinBox(0.43,0.55,0.15,x,0.96,T.front*0.12,-0.12));
    p.push(cabinBox(0.23,0.17,0.12,x,1.28,T.front*0.12));
    p.push(cabinBox(0.055,0.19,0.055,x,0.79,T.front*0.03));
  }
  // Rear bench and three headrests (van silhouettes retain a simplified bench).
  p.push(cabinBox(T.W*0.70,0.14,0.46,0,0.70,-T.L*0.19));
  p.push(cabinBox(T.W*0.70,0.42,0.15,0,0.94,-T.L*0.16,-0.10));
  for (const x of [-T.W*0.22,0,T.W*0.22]) p.push(cabinBox(0.19,0.15,0.11,x,1.20,-T.L*0.16));
  // Inner door cards and sill rails, set inward from the exterior glazing.
  for (const side of [-1,1]) {
    p.push(cabinBox(0.045,0.32,T.L*0.47,side*(T.W*0.405),0.78,-0.04));
    p.push(cabinBox(0.055,0.045,T.L*0.48,side*(T.W*0.405),0.55,-0.04));
  }
  return mergeCabinParts(p);
}

function buildCarAssets() {
  CARMAT.glass = M({ color: 0x26313a, roughness: 0.16, metalness: 0.18, side: THREE.DoubleSide });
  CARMAT.trim = M({ color: 0x121314, roughness: 0.6, metalness: 0.1 });
  CARMAT.tyre = M({ color: 0x151515, roughness: 0.9 });
  CARMAT.rim = M({ color: 0xb8bcc4, roughness: 0.25, metalness: 1 });
  CARMAT.head = M({ color: 0xfafaf0, emissive: 0xfff4dc, emissiveIntensity: 2.2, roughness: 0.1 });
  CARMAT.tail = M({ color: 0x5a0000, emissive: 0xff1010, emissiveIntensity: 1.6, roughness: 0.2 });
  CARMAT.blue = M({ color: 0x0010ff, emissive: 0x2050ff, emissiveIntensity: 4 });
  CARMAT.red = M({ color: 0xff0010, emissive: 0xff2030, emissiveIntensity: 4 });
  CARMAT.blueOff = M({ color: 0x102040, roughness: 0.3 });
  CARMAT.chrome = M({ color: 0x89939a, metalness: 0.82, roughness: 0.24 });
  CARMAT.rubber = M({ color: 0x202124, roughness: 0.92 });
  CARMAT.lens = M({ color: 0xdde8e8, roughness: 0.12, metalness: 0.05, transparent: true, opacity: 0.88 });
  CARMAT.indicator = M({ color: 0xffa52a, emissive: 0x6a2600, emissiveIntensity: 0.25, roughness: 0.24 });
  CARMAT.disc = M({ color: 0x73777a, metalness: 0.72, roughness: 0.42 });
  CARMAT.spoke = new THREE.LineBasicMaterial({ color: 0x9ba2a7 });
  CARMAT.fender = M({ color: 0x292d32, roughness: 0.62 });
  CARMAT.interior = M({ color: 0x24272b, roughness: 0.88 });
  for (let k = 0; k < 8; k++) {
    const c = document.createElement('canvas'); c.width = 256; c.height = 56; const g = c.getContext('2d');
    g.fillStyle = '#f4f4f0'; g.fillRect(0, 0, 256, 56); g.fillStyle = '#1a3aa8'; g.fillRect(0, 0, 30, 56); g.fillRect(226, 0, 30, 56);
    g.fillStyle = '#fff'; g.font = '700 16px Arial'; g.textAlign = 'center'; g.fillText('F', 15, 42); g.fillText('35', 241, 42);
    const L = () => 'ABCDEFGHJKLMNPRSTVWXYZ'[(Math.random() * 22) | 0];
    g.fillStyle = '#111'; g.font = '700 32px Arial Narrow, Arial'; g.fillText(`${L()}${L()}-${(100 + Math.random() * 899) | 0}-${L()}${L()}`, 128, 40);
    plateMats.push(M({ map: canvasTex(c, true), roughness: 0.4 }));
  }
  const tw = new THREE.CylinderGeometry(0.33, 0.33, 0.21, 36); tw.rotateZ(Math.PI / 2);
  const rim = new THREE.CylinderGeometry(0.22, 0.22, 0.215, 32); rim.rotateZ(Math.PI / 2);
  CARMAT.wheelGeo = tw; CARMAT.rimGeo = rim;
  for (const k in CAR_TYPES) {
    const T = CAR_TYPES[k], bev = 0.07;
    const sh = new THREE.Shape(T.prof.map(p => new THREE.Vector2(p[0], p[1])));
    const g = new THREE.ExtrudeGeometry(sh, { depth: T.W - 2 * bev, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 5, curveSegments: 8 });
    g.rotateY(-Math.PI / 2); g.translate(T.W / 2 - bev, 0, 0); g.computeVertexNormals();
    T.body = g;
    const win = new THREE.ShapeGeometry(new THREE.Shape(T.win.map(p => new THREE.Vector2(p[0], p[1]))));
    const wl = win.clone().rotateY(-Math.PI / 2).translate(-T.W / 2 - 0.005, 0, 0), wr = win.clone().rotateY(-Math.PI / 2).scale(-1, 1, 1).translate(T.W / 2 + 0.005, 0, 0);
    const quad = (a, b, inset, out) => { const g2 = new THREE.BufferGeometry(); const w = T.W / 2 - inset; const dz = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dz, dy), oz = -dy / l * out, oy = dz / l * out; const v = [-w, a[1] + oy, a[0] + oz, w, a[1] + oy, a[0] + oz, w, b[1] + oy, b[0] + oz, -w, a[1] + oy, a[0] + oz, w, b[1] + oy, b[0] + oz, -w, b[1] + oy, b[0] + oz]; g2.setAttribute('position', new THREE.Float32BufferAttribute(v, 3)); g2.computeVertexNormals(); g2.setAttribute('uv', new THREE.Float32BufferAttribute(new Array(12).fill(0), 2)); return g2; };
    T.glass = mergeGeos([{ geo: wl }, { geo: wr }, { geo: quad(T.ws[0], T.ws[1], 0.1, 0.015) }, { geo: quad(T.rw[0], T.rw[1], 0.1, -0.015) }]);
    const front = T.prof.reduce((m, p) => Math.max(m, p[0]), -9), back = T.prof.reduce((m, p) => Math.min(m, p[0]), 9);
    T.front = front; T.back = back;
    T.cabin = makeCabinGeometry(T);
    const arches = [];
    for (const z of [T.wz, -T.wz]) for (const s of [1, -1]) { const c = new THREE.CircleGeometry(0.4, 16, 0, Math.PI); c.rotateY(s * Math.PI / 2); c.translate(s * (T.W / 2 + 0.008), 0.33, z); arches.push({ geo: c }); }
    T.trim = mergeGeos([{ geo: new THREE.BoxGeometry(T.W + 0.02, 0.2, 0.18), m: MX(0, 0.36, front - 0.04) }, { geo: new THREE.BoxGeometry(T.W + 0.02, 0.2, 0.18), m: MX(0, 0.36, back + 0.04) }, { geo: new THREE.BoxGeometry(0.75, 0.16, 0.06), m: MX(0, 0.56, front + 0.01) }, { geo: new THREE.BoxGeometry(0.16, 0.1, 0.22), m: MX(T.W / 2 + 0.06, T.ws[1][1] + 0.06, T.ws[1][0] - 0.1) }, { geo: new THREE.BoxGeometry(0.16, 0.1, 0.22), m: MX(-T.W / 2 - 0.06, T.ws[1][1] + 0.06, T.ws[1][0] - 0.1) }, ...arches]);
    T.heads = mergeGeos([0.58, -0.58].map(x => ({ geo: new THREE.BoxGeometry(0.4, 0.13, 0.08), m: MX(x * T.W / 1.76, 0.72, front - 0.06) })));
    T.tails = mergeGeos([0.62, -0.62].map(x => ({ geo: new THREE.BoxGeometry(0.34, 0.15, 0.08), m: MX(x * T.W / 1.76, T.tail, back + 0.04) })));
    T.plates = mergeGeos([{ geo: new THREE.PlaneGeometry(0.52, 0.11), m: MX(0, 0.48, front + 0.06) }, { geo: new THREE.PlaneGeometry(0.52, 0.11), m: MX(0, 0.62, back - 0.06, 0, Math.PI, 0) }]);
  }
  /* police livery */
  const lc = document.createElement('canvas'); lc.width = 512; lc.height = 64; const lg = lc.getContext('2d');
  lg.fillStyle = '#1a3a9a'; lg.fillRect(0, 0, 512, 64); lg.fillStyle = '#d01a2a'; lg.fillRect(360, 0, 40, 64); lg.fillStyle = '#fff'; lg.font = '700 44px "Barlow Condensed",Arial'; lg.textAlign = 'center'; lg.fillText('POLICE', 190, 48);
  CARMAT.livery = M({ map: canvasTex(lc, true), roughness: 0.3 });
}
function makeCarMesh(type, color, kind) {
  const T = CAR_TYPES[type], g = new THREE.Group();
  const body = new THREE.Mesh(T.body, paintMat(color)); body.castShadow = true; body.receiveShadow = true; g.add(body);
  const trimM = new THREE.Mesh(T.trim, CARMAT.trim), plateM = new THREE.Mesh(T.plates, pick(plateMats)), detail = [trimM, plateM];
  g.add(new THREE.Mesh(T.glass, CARMAT.glass), trimM, new THREE.Mesh(T.heads, CARMAT.head), new THREE.Mesh(T.tails, CARMAT.tail), plateM);
  const cabin = new THREE.Mesh(T.cabin, CARMAT.interior); cabin.castShadow = false; cabin.receiveShadow = false; g.add(cabin);
  // Steering wheel is a single low-poly ring, oriented toward the driver.
  const steering = new THREE.Mesh(new THREE.TorusGeometry(0.145,0.014,9,28), CARMAT.trim);
  steering.position.set(-T.W*0.235,1.005,T.front*0.28); steering.rotation.x=0.28; g.add(steering);
  const steeringHub = new THREE.Mesh(new THREE.CylinderGeometry(0.027,0.027,0.035,14), CARMAT.chrome);
  steeringHub.position.copy(steering.position); steeringHub.rotation.x=Math.PI/2; g.add(steeringHub);
  const wheels = [];
  for (const z of [T.wz, -T.wz]) for (const s of [1, -1]) {
    const w = new THREE.Group(); w.position.set(s * (T.W / 2 - 0.13), 0.33, z);
    const ty = new THREE.Mesh(CARMAT.wheelGeo, CARMAT.tyre), rm = new THREE.Mesh(CARMAT.rimGeo, CARMAT.rim);
    ty.castShadow = true; w.add(ty, rm);
    // Ventilated brake disc, hub and ten thin spokes on both visible wheel faces.
    const discGeo = new THREE.CylinderGeometry(0.145, 0.145, 0.018, 24); discGeo.rotateZ(Math.PI / 2);
    const disc = new THREE.Mesh(discGeo, CARMAT.disc); disc.position.x = s * 0.105; w.add(disc);
    const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.055,0.16,0.105), CARMAT.trim);
    caliper.position.set(s*0.118,0.095,0.095); w.add(caliper);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.23, 16), CARMAT.chrome); hub.rotation.z = Math.PI / 2; w.add(hub);
    const spokePos = [];
    for (let q = 0; q < 10; q++) {
      const ang = q * Math.PI / 5, r0 = 0.065, r1 = 0.205;
      spokePos.push(s*0.118,Math.cos(ang)*r0,Math.sin(ang)*r0, s*0.118,Math.cos(ang)*r1,Math.sin(ang)*r1);
    }
    const spokeGeo = new THREE.BufferGeometry();
    spokeGeo.setAttribute('position',new THREE.Float32BufferAttribute(spokePos,3));
    w.add(new THREE.LineSegments(spokeGeo,CARMAT.spoke));
    const treadPos=[];
    for(let q=0;q<28;q++){const a=q*Math.PI*2/28, r=0.326; treadPos.push(-0.085,Math.cos(a)*r,Math.sin(a)*r,0.085,Math.cos(a)*r,Math.sin(a)*r);}
    const treadGeo=new THREE.BufferGeometry(); treadGeo.setAttribute('position',new THREE.Float32BufferAttribute(treadPos,3));
    w.add(new THREE.LineSegments(treadGeo,CARMAT.fender));
    g.add(w); wheels.push(w); detail.push(rm);
  }
  // Door shut-lines, flush handles, mirrors, grille, glass lenses and underbody.
  const addPart = (geo, mat, x, y, z, rx=0, ry=0, rz=0) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(x,y,z); m.rotation.set(rx,ry,rz); g.add(m); return m;
  };
  const front = T.front, back = T.back;
  addPart(new THREE.BoxGeometry(0.72,0.18,0.025), CARMAT.trim, 0, 0.53, front+0.018);
  addPart(new THREE.BoxGeometry(0.64,0.12,0.018), CARMAT.chrome, 0, 0.52, front+0.035);
  for (const side of [-1,1]) {
    addPart(new THREE.BoxGeometry(0.075,0.04,0.035), CARMAT.chrome, side*(T.W/2+0.035), 1.02, 0.76);
    addPart(new THREE.BoxGeometry(0.14,0.09,0.17), CARMAT.trim, side*(T.W/2+0.08), 1.03, 0.78, 0, side*0.16, 0);
    addPart(new THREE.BoxGeometry(0.11,0.035,0.025), CARMAT.chrome, side*(T.W/2+0.012), 0.91, 0.22);
    addPart(new THREE.BoxGeometry(0.13,0.055,0.025), CARMAT.indicator, side*(T.W/2+0.012), 0.72, front-0.07);
    addPart(new THREE.BoxGeometry(0.11,0.055,0.025), CARMAT.indicator, side*(T.W/2+0.012), 0.72, back+0.07);
    // Narrow rocker strip and wheel-arch lips visually separate body panels.
    addPart(new THREE.BoxGeometry(1.9,0.045,0.035), CARMAT.trim, side*(T.W/2+0.012), 0.39, 0);
  }
  addPart(new THREE.BoxGeometry(0.56,0.08,0.035), CARMAT.trim, 0, 0.38, back-0.025);
  addPart(new THREE.BoxGeometry(0.48,0.055,0.025), CARMAT.chrome, 0, 0.39, back-0.045);
  // Panel geometry: window seals, door shut-lines and bonnet creases.
  // One buffered line object per car keeps these cues inexpensive to draw.
  const panelPos = [];
  const seg = (a,b) => panelPos.push(a[0],a[1],a[2],b[0],b[1],b[2]);
  for (const side of [-1,1]) {
    const x = side * (T.W / 2 + 0.012);
    const outline = T.win;
    for (let i=0;i<outline.length;i++) {
      const a=outline[i], b=outline[(i+1)%outline.length];
      seg([x,a[1]+0.012,a[0]],[x,b[1]+0.012,b[0]]);
    }
    // B-pillar and rear quarter division make the glazing read as separate panes.
    const midZ = (T.win[1][0] + T.win[2][0]) * 0.5;
    seg([x,T.win[1][1],T.win[1][0]],[x,T.win[2][1],T.win[2][0]]);
    seg([x,0.96,midZ],[x,Math.min(1.34,T.win[2][1]),midZ]);
    // Front and rear door boundaries follow the lower window corners.
    const doorZ = (T.ws[0][0] + T.rw[0][0]) * 0.5;
    seg([x,0.43,doorZ],[x,Math.max(0.92,T.ws[0][1]-0.08),doorZ]);
    seg([x,0.43,T.back+0.42],[x,0.43,T.front-0.42]);
    // Fine sill line and a short rear-quarter panel break.
    seg([x,0.47,T.back+0.22],[x,0.47,T.front-0.22]);
    seg([x,0.82,T.back+0.55],[x,0.95,T.back+0.55]);
  }
  // Two shallow bonnet creases, kept close to the body surface.
  for (const side of [-1,1]) {
    seg([side*0.43,0.665,T.front-0.72],[side*0.34,0.72,T.front-0.16]);
  }
  const panelGeo = new THREE.BufferGeometry();
  panelGeo.setAttribute('position',new THREE.Float32BufferAttribute(panelPos,3));
  g.add(new THREE.LineSegments(panelGeo,new THREE.LineBasicMaterial({color:0x25292d,transparent:true,opacity:0.72})));
  // Windshield wipers and exhaust outlets add small-scale cues at street distance.
  for (const side of [-1,1]) {
    addPart(new THREE.BoxGeometry(0.42,0.012,0.018),CARMAT.trim,side*0.17,1.02,front-0.18,0,side*0.12,0);
    addPart(new THREE.CylinderGeometry(0.035,0.035,0.075,10),CARMAT.chrome,side*0.34,0.34,back-0.025,Math.PI/2,0,0);
  }
  if (kind === 'cop') {
    for (const s of [1, -1]) { const p = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.3), CARMAT.livery); p.rotation.y = s * Math.PI / 2; p.position.set(s * (T.W / 2 + 0.03), 0.78, 0.1); g.add(p); }
    const top = Math.max(...T.prof.map(q => q[1])) + 0.02, bz = -0.2; const bar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 0.28), CARMAT.trim); bar.position.set(0, top + 0.05, bz); g.add(bar);
    const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.12, 0.24), CARMAT.blue), l2 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.12, 0.24), CARMAT.blueOff);
    l1.position.set(0.28, top + 0.13, bz); l2.position.set(-0.28, top + 0.13, bz); g.add(l1, l2); g.userData.lights = [l1, l2];
  }
  if (kind === 'taxi') { const s = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.16, 0.2), CARMAT.head); s.position.set(0, 1.55, -0.1); g.add(s); }
  if (kind === 'food') {
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.86, 0.4, 2.6), paintMat(0xe8e0d0)); box.position.set(0, 2.05, -0.6); g.add(box);
    const c = document.createElement('canvas'); c.width = 512; c.height = 96; const cg = c.getContext('2d'); cg.fillStyle = '#c8141e'; cg.fillRect(0, 0, 512, 96); cg.fillStyle = '#fff'; cg.font = '700 52px "Barlow Condensed",Arial'; cg.textAlign = 'center'; cg.fillText('GALETTES-SAUCISSES', 256, 66);
    const sm = M({ map: canvasTex(c, true), emissiveMap: canvasTex(c, true), emissive: 0xffffff, emissiveIntensity: 0.6 }); sm.userData.sign = true;
    for (const s of [1, -1]) { const p = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.45), sm); p.rotation.y = s * Math.PI / 2; p.position.set(s * 0.94, 2.05, -0.6); g.add(p); }
  }
  g.userData.wheels = wheels; g.userData.T = T; g.userData.detail = detail;
  scene.add(g); return g;
}
function makeBike(color) {
  const g = new THREE.Group(), pm = paintMat(color);
  const bar = (a, b, r, m) => { const d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), L = d.length(); const me = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 10), m); me.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2); me.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); g.add(me); return me; };
  const rearW = [0, 0.34, -0.52], frontW = [0, 0.34, 0.52], bb = [0, 0.32, -0.05], seat = [0, 0.86, -0.25], head = [0, 0.92, 0.38];
  bar(rearW, bb, 0.02, pm); bar(bb, seat, 0.022, pm); bar(seat, head, 0.022, pm); bar(head, bb, 0.024, pm); bar(rearW, seat, 0.016, pm); bar(head, frontW, 0.018, CARMAT.rim);
  bar([-0.24, 1.02, 0.34], [0.24, 1.02, 0.34], 0.015, CARMAT.trim); bar(head, [0, 1.02, 0.34], 0.018, CARMAT.trim);
  const sd = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.26), CARMAT.trim); sd.position.set(0, 0.9, -0.27); g.add(sd);
  const wheels = [], tg = new THREE.TorusGeometry(0.33, 0.026, 8, 32).rotateY(Math.PI / 2);
  for (const z of [0.52, -0.52]) {
    const w = new THREE.Group(); w.position.set(0, 0.34, z); w.add(new THREE.Mesh(tg, CARMAT.tyre));
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.305, 0.012, 6, 32).rotateY(Math.PI/2), CARMAT.rim); w.add(rim);
    const spokePos=[];
    for (let q=0;q<18;q++) {
      const ang=q*Math.PI/9;
      spokePos.push(0,Math.cos(ang)*0.035,Math.sin(ang)*0.035, 0,Math.cos(ang)*0.305,Math.sin(ang)*0.305);
    }
    const spokeGeo=new THREE.BufferGeometry();
    spokeGeo.setAttribute('position',new THREE.Float32BufferAttribute(spokePos,3));
    w.add(new THREE.LineSegments(spokeGeo,CARMAT.spoke));
    const treadPos=[];
    for(let q=0;q<28;q++){const a=q*Math.PI*2/28, r=0.326; treadPos.push(-0.085,Math.cos(a)*r,Math.sin(a)*r,0.085,Math.cos(a)*r,Math.sin(a)*r);}
    const treadGeo=new THREE.BufferGeometry(); treadGeo.setAttribute('position',new THREE.Float32BufferAttribute(treadPos,3));
    w.add(new THREE.LineSegments(treadGeo,CARMAT.fender));
    const hub=new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.09,12),CARMAT.chrome); hub.rotation.z=Math.PI/2; w.add(hub);
    g.add(w); wheels.push(w);
  }
  // Mudguards, crankset, pedals, chain stay and front/rear reflectors.
  const fenderMat = CARMAT.fender;
  for (const z of [0.52,-0.52]) {
    const f=new THREE.Mesh(new THREE.TorusGeometry(0.36,0.018,6,28,Math.PI*0.78),fenderMat);
    f.position.set(0,0.34,z); f.rotation.x=Math.PI*0.11; g.add(f);
  }
  const crank=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,0.045,18),CARMAT.chrome); crank.rotation.z=Math.PI/2; crank.position.set(0,0.34,-0.05); g.add(crank);
  for (const side of [-1,1]) {
    const arm=new THREE.Mesh(new THREE.BoxGeometry(0.018,0.24,0.025),CARMAT.chrome); arm.position.set(side*0.06,0.34,-0.05); arm.rotation.x=side*0.55; g.add(arm);
    const pedal=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.025,0.055),CARMAT.trim); pedal.position.set(side*0.07,0.22,-0.17); g.add(pedal);
  }
  // Brake rotors, chain and derailleur distinguish a modern city bicycle.
  for (const z of [0.52,-0.52]) {
    const rotor=new THREE.Mesh(new THREE.TorusGeometry(0.105,0.009,5,24),CARMAT.disc);
    rotor.position.set(0.09,0.34,z); rotor.rotation.y=Math.PI/2; g.add(rotor);
  }
  const chain=new THREE.Mesh(new THREE.BoxGeometry(0.018,0.022,0.48),CARMAT.chrome); chain.position.set(0.08,0.34,-0.05); g.add(chain);
  const derailleur=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.13,0.06),CARMAT.disc); derailleur.position.set(0.09,0.25,-0.22); g.add(derailleur);
  const rider = makeChar({ ...randomLook(), female: Math.random() < 0.45, helmet: Math.random() < 0.72, helmetColor: '#343a40' });
  scene.remove(rider); rider.position.set(0, 0.0, -0.32); g.add(rider); g.userData.rider = rider;
  const b = rider.userData.b; poseChar(rider, 'idle', 0, 0, 0);
  g.userData.wheels = wheels; g.userData.T = { L: 1.7, W: 0.5 };
  scene.add(g); return g;
}
/* pedalling pose, driven by wheel rotation */
function poseCyclist(r, ph) {
  const b = r.userData.b; for (const n of BONES) b[n].rotation.set(0, 0, 0);
  b.hips.position.y = 0.93; b.spine.rotation.x = 0.45; b.head.rotation.x = -0.35;
  b.uArmL.rotation.x = b.uArmR.rotation.x = -1.05; b.fArmL.rotation.x = b.fArmR.rotation.x = -0.15;
  const s = Math.sin(ph), c = Math.cos(ph);
  b.thighL.rotation.x = -1.0 + s * 0.42; b.thighR.rotation.x = -1.0 - s * 0.42;
  b.shinL.rotation.x = 1.0 - c * 0.35; b.shinR.rotation.x = 1.0 + c * 0.35;
}
function makeScooter(color) {
  const g = new THREE.Group();
  const pm = paintMat(color);
  const parts = [[new THREE.BoxGeometry(0.39, 0.28, 1.05), pm, [0, 0.49, -0.1]], [new THREE.BoxGeometry(0.32, 0.13, 0.58), CARMAT.trim, [0, 0.69, -0.25]], [new THREE.CylinderGeometry(0.04, 0.04, 0.9, 12), CARMAT.chrome, [0, 0.9, 0.55]], [new THREE.BoxGeometry(0.62, 0.05, 0.05), CARMAT.trim, [0, 1.3, 0.62]], [new THREE.BoxGeometry(0.36, 0.52, 0.27), pm, [0, 0.76, 0.55]], [new THREE.BoxGeometry(0.32,0.09,0.62),CARMAT.rubber,[0,0.36,-0.08]]];
  for (const [geo, m, p] of parts) { const me = new THREE.Mesh(geo, m); me.position.set(...p); me.castShadow = true; g.add(me); }
  const wheels = [];
  for (const z of [0.62, -0.6]) { const w = new THREE.Group(); w.position.set(0, 0.25, z); const t = new THREE.Mesh(CARMAT.wheelGeo, CARMAT.tyre); t.scale.set(0.5, 0.75, 0.75); w.add(t); g.add(w); wheels.push(w); }
  // Moulded seat, headlight, indicators, exhaust canister and rear lamp.
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.34,0.12,0.58),CARMAT.interior); seat.position.set(0,0.89,-0.24); g.add(seat);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.105,18,12),CARMAT.lens); head.position.set(0,1.02,0.69); g.add(head);
  const rear = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.09,0.04),CARMAT.tail); rear.position.set(0,0.72,-0.68); g.add(rear);
  for (const side of [-1,1]) {
    const mirrorStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.016,0.28,10),CARMAT.chrome); mirrorStem.position.set(side*0.24,1.42,0.53); mirrorStem.rotation.z=side*0.35; g.add(mirrorStem);
    const mirror = new THREE.Mesh(new THREE.SphereGeometry(0.065,16,12),CARMAT.trim); mirror.scale.set(1,0.55,0.75); mirror.position.set(side*0.29,1.55,0.53); g.add(mirror);
    const ind = new THREE.Mesh(new THREE.BoxGeometry(0.07,0.045,0.035),CARMAT.indicator); ind.position.set(side*0.22,0.87,0.68); g.add(ind);
  }
  const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.055,0.07,0.52,14),CARMAT.chrome); exhaust.rotation.x=Math.PI/2; exhaust.position.set(-0.23,0.35,-0.42); g.add(exhaust);
  const rider = makeChar({ ...randomLook(), female: false, cap: false, beanie: false, hood: true, top: '#111111', pants: '#2a2a6a', helmet: true, helmetColor: '#f0f0f0' });
  scene.remove(rider); rider.position.set(0, 0.25, -0.2); g.add(rider); poseChar(rider, 'drive', 0, 0, 0);
  const helm = new THREE.Mesh(new THREE.SphereGeometry(0.15, 18, 12), paintMat(0xf0f0f0)); helm.position.set(0, 1.97, -0.2); g.add(helm);
  g.userData.wheels = wheels; g.userData.T = { L: 1.8, W: 0.6 };
  scene.add(g); return g;
}


/* ---------- two-wheel variants ---------- */
function makeMotorcycle(color) {
  const g = new THREE.Group(), pm = paintMat(color), wheels = [];
  const bar = (a,b,r,m) => {
    const d=new THREE.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]), L=d.length();
    const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L,12),m);
    o.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2);
    o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize()); g.add(o); return o;
  };
  const rear=[0,0.34,-0.66], front=[0,0.34,0.68];
  const tireGeo=new THREE.TorusGeometry(0.31,0.052,8,28).rotateY(Math.PI/2);
  for (const z of [-0.66,0.68]) {
    const wh=new THREE.Group(); wh.position.set(0,0.34,z);
    wh.add(new THREE.Mesh(tireGeo,CARMAT.tyre));
    wh.add(new THREE.Mesh(new THREE.TorusGeometry(0.265,0.012,6,28).rotateY(Math.PI/2),CARMAT.rim));
    const sp=[]; for(let i=0;i<16;i++){const q=i*Math.PI/8;sp.push(0,Math.cos(q)*0.025,Math.sin(q)*0.025,0,Math.cos(q)*0.265,Math.sin(q)*0.265);}
    const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));wh.add(new THREE.LineSegments(sg,CARMAT.spoke));
    g.add(wh); wheels.push(wh);
  }
  bar(rear,[0,0.78,-0.36],0.035,CARMAT.chrome);
  bar([0,0.78,-0.36],[0,0.91,0.16],0.035,pm);
  bar([0,0.91,0.16],front,0.035,CARMAT.chrome);
  bar(rear,[0,0.48,0.02],0.025,pm);
  bar([0,0.48,0.02],front,0.025,pm);
  const tank=new THREE.Mesh(new THREE.SphereGeometry(0.25,16,12),pm);tank.scale.set(0.72,0.72,1.25);tank.position.set(0,0.88,0.02);g.add(tank);
  const engine=new THREE.Mesh(new THREE.BoxGeometry(0.38,0.38,0.42),CARMAT.disc);engine.position.set(0,0.52,-0.02);g.add(engine);
  const seat=new THREE.Mesh(new THREE.BoxGeometry(0.34,0.1,0.48),CARMAT.interior);seat.position.set(0,1.02,-0.38);g.add(seat);
  bar([-0.34,1.15,0.58],[0.34,1.15,0.58],0.018,CARMAT.chrome);
  const lamp=new THREE.Mesh(new THREE.SphereGeometry(0.12,14,10),CARMAT.lens);lamp.position.set(0,0.95,0.7);g.add(lamp);
  const tail=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.07,0.04),CARMAT.tail);tail.position.set(0,0.94,-0.67);g.add(tail);
  const exhaust=new THREE.Mesh(new THREE.CylinderGeometry(0.045,0.06,0.6,10),CARMAT.chrome);exhaust.rotation.x=Math.PI/2;exhaust.position.set(-0.24,0.42,-0.36);g.add(exhaust);
  // More legible motorcycle mechanics: twin fork legs, rear suspension,
  // chain run, brake rotors and foot pegs. Geometry is static and shared-material.
  for (const side of [-1,1]) {
    const fork=new THREE.Mesh(new THREE.CylinderGeometry(0.026,0.032,0.58,12),CARMAT.chrome);
    fork.position.set(side*0.075,0.62,0.48); fork.rotation.x=-0.22; g.add(fork);
    const shock=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.024,0.43,12),CARMAT.disc);
    shock.position.set(side*0.19,0.66,-0.43); shock.rotation.x=-0.28; g.add(shock);
    const peg=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.025,0.2,12),CARMAT.rubber);
    peg.rotation.z=Math.PI/2; peg.position.set(side*0.17,0.43,-0.08); g.add(peg);
    const rotor=new THREE.Mesh(new THREE.TorusGeometry(0.19,0.012,5,28),CARMAT.disc);
    rotor.position.set(side*0.12,0.34,0.68); rotor.rotation.y=Math.PI/2; g.add(rotor);
  }
  const chain=new THREE.Mesh(new THREE.BoxGeometry(0.025,0.035,0.72),CARMAT.disc); chain.position.set(-0.17,0.39,-0.3); chain.rotation.x=-0.08; g.add(chain);
  const tankCap=new THREE.Mesh(new THREE.CylinderGeometry(0.045,0.045,0.018,12),CARMAT.chrome); tankCap.position.set(0,1.06,0.02); g.add(tankCap);
  const rearShockSpring=new THREE.Mesh(new THREE.CylinderGeometry(0.038,0.038,0.34,8),CARMAT.trim); rearShockSpring.position.set(0.2,0.68,-0.43); rearShockSpring.rotation.x=-0.28; g.add(rearShockSpring);
  const rider=makeChar({...randomLook(),helmet:true,helmetColor:'#20252a'});
  scene.remove(rider);rider.position.set(0,0.02,-0.31);g.add(rider);poseChar(rider,'drive',0,0,0);g.userData.rider=rider;
  g.userData.wheels=wheels;g.userData.T={L:2.0,W:0.8};scene.add(g);return g;
}
function makeEScooter(color) {
  const g=new THREE.Group(), pm=paintMat(color), wheels=[];
  const deck=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.09,0.78),CARMAT.rubber);deck.position.set(0,0.22,-0.04);g.add(deck);
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.035,0.92,12),CARMAT.chrome);stem.position.set(0,0.69,0.34);stem.rotation.x=-0.12;g.add(stem);
  const fork=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.48,0.08),pm);fork.position.set(0,0.45,0.34);g.add(fork);
  const handle=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.018,0.48,12),CARMAT.trim);handle.rotation.z=Math.PI/2;handle.position.set(0,1.17,0.39);g.add(handle);
  const tire=new THREE.TorusGeometry(0.105,0.027,9,28).rotateY(Math.PI/2);
  for(const z of [-0.38,0.42]){const wh=new THREE.Group();wh.position.set(0,0.12,z);wh.add(new THREE.Mesh(tire,CARMAT.tyre));wh.add(new THREE.Mesh(new THREE.TorusGeometry(0.075,0.009,5,16).rotateY(Math.PI/2),CARMAT.rim));g.add(wh);wheels.push(wh);}
  const lamp=new THREE.Mesh(new THREE.BoxGeometry(0.1,0.045,0.025),CARMAT.lens);lamp.position.set(0,0.88,0.42);g.add(lamp);
  const rear=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.035,0.025),CARMAT.tail);rear.position.set(0,0.29,-0.43);g.add(rear);
  const rider=makeChar({...randomLook(),helmet:true,helmetColor:'#343a40'});
  scene.remove(rider);rider.position.set(0,0.06,-0.05);g.add(rider);
  const b=rider.userData.b;poseChar(rider,'drive',0,0,0);
  b.hips.position.y=0.9;b.thighL.rotation.x=-0.12;b.thighR.rotation.x=-0.12;
  b.shinL.rotation.x=0.12;b.shinR.rotation.x=0.12;
  b.uArmL.rotation.x=b.uArmR.rotation.x=-1.05;b.fArmL.rotation.x=b.fArmR.rotation.x=-0.4;
  g.userData.rider=rider;g.userData.wheels=wheels;g.userData.T={L:1.2,W:0.55};scene.add(g);return g;
}

/* ---------- entities ---------- */
const cars = [], peds = [];
function addCar(x, y, h, opt) {
  opt = opt || {};
  const type = opt.type || pick(['hatch','hatch','hatch','sedan','sedan','van','suv','compact','estate','estate']);
  const color = opt.color !== undefined ? opt.color : pick(PAINTS);
  const scooter = opt.kind === 'scooter';
  const bike = opt.kind === 'bike';
  const motorcycle = opt.kind === 'motorcycle';
  const escooter = opt.kind === 'escooter';
  const twoWheel = scooter || bike || motorcycle || escooter;
  const c = { x, y, h, v: 0, steer: 0, r: twoWheel ? 1 : 2.0, ai: opt.ai || null, kind: opt.kind || 'car', type, a: -1, b: -1, path: null, repath: 0, driver: opt.driver !== false, keep: !!opt.keep, born: performance.now(), lastImpact: 0, brake: false, wheelRot: 0 };
  const pk = !opt.ai || opt.ai === 'traffic' ? (twoWheel ? null : `${type}|${opt.kind || 'car'}|${c.driver ? 1 : 0}`) : null;
  if (pk && CARPOOL[pk] && CARPOOL[pk].length && opt.color === undefined) {
    c.mesh = CARPOOL[pk].pop(); c.poolKey = pk; c.mesh.position.set(x, 0, -y); c.mesh.rotation.set(0, Math.PI - h, 0); c.mesh.visible = true; scene.add(c.mesh);
    c.driverMesh = c.mesh.userData.driverMesh || null; cars.push(c); return c;
  }
  c.poolKey = pk;
  c.mesh = bike ? makeBike(opt.color !== undefined ? opt.color : pick([0x1a1a1a, 0x2a5a9a, 0xc8c8c8, 0x8a1a1a, 0x2a6a3a, 0xe0c020])) : scooter ? makeScooter(color) : motorcycle ? makeMotorcycle(color) : escooter ? makeEScooter(color) : makeCarMesh(type, opt.kind === 'cop' ? (opt.copColor !== undefined ? opt.copColor : opt.marked === false ? 0x2a2d33 : 0xf2f2f2) : color, opt.kind === 'cop' && opt.marked === false && opt.copColor === undefined ? 'unmarked' : opt.kind);
  if (c.driver && !twoWheel) { const d = makeChar(randomLook()); scene.remove(d); d.position.set(0.38, 0.05, 0.15); c.mesh.add(d); poseChar(d, 'drive', 0, 0, 0); c.driverMesh = d; c.mesh.userData.driverMesh = d; }
  cars.push(c); return c;
}
function removeCar(c) {
  scene.remove(c.mesh); const i = cars.indexOf(c); if (i >= 0) cars.splice(i, 1);
  const k = c.poolKey; if (k && !c.wrecked && !c.dead && (CARPOOL[k] || (CARPOOL[k] = [])).length < 8) CARPOOL[k].push(c.mesh);
}
function addPed(x, y, opt) {
  opt = opt || {};
  let look = opt.look, mesh = null;
  if (!look && PEDPOOL.length && !opt.cop) { const r = PEDPOOL.splice((Math.random() * PEDPOOL.length) | 0, 1)[0]; look = r.look; mesh = r.mesh; mesh.userData = { b: mesh.userData.b }; mesh.rotation.set(0, 0, 0); mesh.position.set(x, 0, -y); mesh.visible = true; scene.add(mesh); }
  if (!look) look = randomLook();
  const p = { x, y, h: rnd(-3, 3), mesh: mesh || makeChar(look), speed: opt.speed || rnd(1.15, 1.55), phase: Math.random() * 6, state: opt.state || 'walk', t: 0, cop: !!opt.cop, still: !!opt.still, sit: !!opt.sit, dog: opt.dog ? makeDog(opt.dog) : null, name: opt.name, home: opt.home || null, homeR: opt.homeR || 0, keep: !!opt.keep, seg: null, dir: 1, tx: x, ty: y, hp: opt.hp || 100, look };
  peds.push(p); return p;
}
/* meshes of people and cars that leave the area are kept for the next ones (building them is the costly part) */
const PEDPOOL = [], CARPOOL = {};
function removePed(p) {
  if (p.seat) p.seat.taken = null; scene.remove(p.mesh); if (p.dog) scene.remove(p.dog); const i = peds.indexOf(p); if (i >= 0) peds.splice(i, 1);
  if (p.state !== 'dead' && !p.cop && !p.keep && !p.mesh.userData.custom && PEDPOOL.length < 50) PEDPOOL.push({ mesh: p.mesh, look: p.look }); else p.mesh.geometry.dispose();
}

/* nearest sidewalk segment from loaded tiles */
function walkSegNear(x, y, r) {
  let best = null, bd = r || 40;
  tilesIn(x - bd, y - bd, x + bd, y + bd, t => { for (const s of t.walk) { const d = segNear(x, y, s[0], s[1], s[2], s[3], _q); if (d < bd) { bd = d; best = s; } } });
  return best;
}
function randomWalkPoint(x, y, rmin, rmax) {
  const cands = [];
  tilesIn(x - rmax, y - rmax, x + rmax, y + rmax, t => { for (let k = 0; k < 30 && t.walk.length; k++) { const s = t.walk[(Math.random() * t.walk.length) | 0]; const u = Math.random(), px = s[0] + (s[2] - s[0]) * u, py = s[1] + (s[3] - s[1]) * u, d = Math.hypot(px - x, py - y); if (d > rmin && d < rmax) cands.push([px, py, s]); } });
  return cands.length ? pick(cands) : null;
}

/* ---------- population ---------- */
const POP = { peds: 90, traffic: 34, parked: 40 };
function camFacing(x, y) { const d = new THREE.Vector3(); camera.getWorldDirection(d); const dx = x - camera.position.x, dz = -y - camera.position.z, l = Math.hypot(dx, dz) || 1; return (dx * d.x + dz * d.z) / l; }
function populate(dt, pl) {
  const night = MODE.night;
  const soif = Math.hypot(pl.x + 384, pl.y - 124) < 450;
  const targetP = (night ? 70 : 110) + (soif && night ? 45 : 0);
  const targetT = night ? 38 : 58, targetPk = 85;
  /* despawn far */
  for (const p of peds.slice()) if (!p.keep && dist(p, pl) > 210) removePed(p);
  for (const c of cars.slice()) if (!c.keep && c !== player.car && dist(c, pl) > (c.ai === 'traffic' ? 430 : 330) && c.ai !== 'cop') removeCar(c);
  let np = peds.filter(p => !p.keep).length, nt = cars.filter(c => c.ai === 'traffic').length, nk = cars.filter(c => !c.ai && !c.keep).length;
  for (let k = 0; k < 2 && np < targetP; k++) {
    let q = null;
    if (soif && night && Math.random() < 0.5) q = randomWalkPoint(-384, 124, 0, 80);
    if (!q) q = randomWalkPoint(pl.x, pl.y, started ? 60 : 5, 170);
    if (!q || (started && camFacing(q[0], q[1]) > 0.5 && Math.hypot(q[0] - pl.x, q[1] - pl.y) < 90)) continue;
    if (insideBuilding(q[0], q[1])) continue;
    const p = addPed(q[0], q[1]); p.seg = q[2]; p.dir = Math.random() < 0.5 ? 1 : -1; np++;
    if (night && soif && Math.hypot(q[0] + 384, q[1] - 124) < 90) { p.mesh.userData.wobble = Math.random() < 0.3; if (Math.random() < 0.35) { p.state = 'idle'; p.t = rnd(5, 30); p.mesh.userData.talk = Math.random() < 0.5; } }
  }
  /* customers on the terraces */
  let seated = 0; const free = [];
  tilesIn(pl.x - 130, pl.y - 130, pl.x + 130, pl.y + 130, t => { for (const s of t.seats) { if (s.taken) seated++; else if (Math.hypot(s.x - pl.x, s.y - pl.y) < 130) free.push(s); } });
  const wantSeat = Math.round((seated + free.length) * (night ? (soif ? 0.85 : 0.55) : (soif ? 0.6 : 0.45)));
  for (let k = 0; k < 3 && seated < wantSeat && free.length; k++) {
    const s = free.splice((Math.random() * free.length) | 0, 1)[0];
    if (started && camFacing(s.x, s.y) > 0.6 && Math.hypot(s.x - pl.x, s.y - pl.y) < 50) continue;
    const p = addPed(s.x, s.y, { still: true, sit: true }); p.h = s.h; p.state = 'idle'; p.seat = s; s.taken = p; p.mesh.userData.talk = Math.random() < 0.3; seated++;
  }
  for (let k = 0; k < 2 && nt < targetT; k++) {
    let best = -1;
    for (let tries = 0; tries < 20; tries++) {
      const a = Math.random() * Math.PI * 2, r = rnd(160, 380), x = pl.x + Math.cos(a) * r, y = pl.y + Math.sin(a) * r;
      const i = nearestNode(x, y, 1); const d = Math.hypot(nx(i) - pl.x, ny(i) - pl.y);
      if (d > 140 && d < 420 && (!started || camFacing(nx(i), ny(i)) < 0.6)) { best = i; break; }
    }
    if (best < 0) break;
    const e = outEdges(best, 1); if (!e.length) continue;
    const ed = pick(e), b = GNB[ed];
    if (cars.some(c => Math.hypot(c.x - nx(best), c.y - ny(best)) < 12)) continue;
    const r = Math.random(), kind = r < 0.095 ? 'bike' : r < 0.125 ? 'motorcycle' : r < 0.155 ? 'escooter' : r < 0.205 ? 'taxi' : r < 0.245 ? 'scooter' : 'car';
    const c = addCar(nx(best), ny(best), Math.atan2(nx(b) - nx(best), ny(b) - ny(best)), { ai: 'traffic', kind, color: ['scooter','motorcycle','escooter'].includes(kind) ? pick(PAINTS) : undefined });
    if (['scooter','motorcycle','escooter'].includes(kind)) c.driver = true;
    c.a = best; c.b = b; c.hw = !!(GFL[ed] & 4); nt++;
  }
  for (let k = 0; k < 3 && nk < targetPk; k++) {
    const spots = []; tilesIn(pl.x - 220, pl.y - 220, pl.x + 220, pl.y + 220, t => { for (let q = 0; q < 6 && t.parkSpots.length; q++) spots.push(pick(t.parkSpots)); });
    if (!spots.length) break;
    const s = pick(spots), d = Math.hypot(s[0] - pl.x, s[1] - pl.y);
    if (d < (started ? (camFacing(s[0], s[1]) < 0.2 ? 25 : 70) : 8) || d > 240) continue;
    if (cars.some(c => Math.hypot(c.x - s[0], c.y - s[1]) < 5.5) || insideBuilding(s[0], s[1])) continue;
    addCar(s[0], s[1], s[2] + (Math.random() < 0.5 ? 0 : Math.PI), { ai: null, driver: false }); nk++;
  }
}
