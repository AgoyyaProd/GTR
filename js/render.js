'use strict';
/* ===== render: renderer, lighting modes, materials, procedural facades ===== */
const canvasEl = $('view');
const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: false, powerPreference: 'high-performance', stencil: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
/* Color pipeline: keep the scene/composer target linear. The final grade pass below
   performs the single filmic tone-map and the single linear-to-sRGB conversion.
   Applying ACES + sRGB here and then grading/gamma-encoding again washed out daylight
   and compressed material contrast. */
renderer.outputEncoding = THREE.LinearEncoding;
renderer.toneMapping = THREE.NoToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
/* ---------- relief: every vertex is lifted by the real terrain height (IGN RGE ALTI) in the vertex shader ---------- */
const TERR = { tex: { value: null }, info: { value: new THREE.Vector4(0, 0, 1, 0) }, size: { value: new THREE.Vector2(2, 2) }, on: { value: 0 },
  dtex: { value: null }, dinfo: { value: new THREE.Vector4(0, 0, 1, 0) }, dsize: { value: new THREE.Vector2(2, 2) } };
let TH = null, THW = 2, THH = 2, TX0 = 0, TY1 = 0, TRES = 1;
/* finer model (2 m, IGN 1 m data) in the centre, where OpenStreetMap has retaining walls and flights of steps */
let TD = null, TDW = 2, TDH = 2, TDX0 = 0, TDY1 = 0, TDRES = 1;
const TERR_GLSL = `uniform sampler2D tMap, dMap; uniform vec4 tInfo, dInfo; uniform vec2 tSize, dSize; uniform float tOn;
float tTex(vec2 ij) { vec4 c = texture2D(tMap, (ij + 0.5) / tSize); return (floor(c.r * 255. + .5) * 256. + floor(c.g * 255. + .5) - 32768.) / 10.; }
float dTex(vec2 ij) { vec4 c = texture2D(dMap, (ij + 0.5) / dSize); return (floor(c.r * 255. + .5) * 256. + floor(c.g * 255. + .5) - 32768.) / 10.; }
float terrainH(vec2 xz) {
  if (tOn < .5) return 0.;
  if (dInfo.y > .5) { vec2 g = vec2((xz.x - dInfo.x) / dInfo.z - .5, (dInfo.w + xz.y) / dInfo.z - .5);
    if (g.x > 0. && g.y > 0. && g.x < dSize.x - 1.001 && g.y < dSize.y - 1.001) { vec2 i = floor(g), t = g - i;
      return mix(mix(dTex(i), dTex(i + vec2(1., 0.)), t.x), mix(dTex(i + vec2(0., 1.)), dTex(i + vec2(1.)), t.x), t.y); } }
  vec2 f = vec2((xz.x - tInfo.x) / tInfo.z - .5, (tInfo.w + xz.y) / tInfo.z - .5);
  f = clamp(f, vec2(0.), tSize - 1.001); vec2 i = floor(f), t = f - i;
  return mix(mix(tTex(i), tTex(i + vec2(1., 0.)), t.x), mix(tTex(i + vec2(0., 1.)), tTex(i + vec2(1.)), t.x), t.y);
}`;
function terrainPatch(sh) {
  if (!sh.vertexShader.includes('#include <project_vertex>') || !sh.vertexShader.includes('#include <common>')) return;
  Object.assign(sh.uniforms, { tMap: TERR.tex, tInfo: TERR.info, tSize: TERR.size, tOn: TERR.on, dMap: TERR.dtex, dInfo: TERR.dinfo, dSize: TERR.dsize });
  sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\n' + TERR_GLSL)
    .replace('#include <project_vertex>', 'vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\nmvPosition = instanceMatrix * mvPosition;\n#endif\nvec4 tWP = modelMatrix * mvPosition; tWP.y += terrainH(tWP.xz); mvPosition = viewMatrix * tWP;\ngl_Position = projectionMatrix * mvPosition;')
    .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\n#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\nworldPosition.y += terrainH(worldPosition.xz);\n#endif');
}
THREE.Material.prototype.onBeforeCompile = function (sh) { if (!this.isShaderMaterial && !(this.userData && this.userData.noTerrain)) terrainPatch(sh); };
/* frustum culling must see objects where the shader moved them (lifted by the terrain) */
{ const _sph = new THREE.Sphere(), F = THREE.Frustum.prototype;
  F.intersectsObject = function (object) {
    const geometry = object.geometry; if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    if (object.userData.bs) _sph.copy(object.userData.bs); else _sph.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);
    const mt = object.material; if (TERR.on.value && mt && !mt.isShaderMaterial && !(mt.userData && mt.userData.noTerrain)) { _sph.center.y += th(_sph.center.x, -_sph.center.z); if (_sph.radius > 40) _sph.radius += 25; }
    return this.intersectsSphere(_sph);
  };
}
/* same bilinear lookup on the CPU (camera, lights, bridges) */
function th(x, y) {
  if (!TH || !TERR.on.value) return 0;
  if (TD) { const gx = (x - TDX0) / TDRES - 0.5, gy = (TDY1 - y) / TDRES - 0.5;
    if (gx > 0 && gy > 0 && gx < TDW - 1.001 && gy < TDH - 1.001) { const i = gx | 0, j = gy | 0, tx = gx - i, ty = gy - j, o = j * TDW + i;
      return (TD[o] * (1 - tx) + TD[o + 1] * tx) * (1 - ty) + (TD[o + TDW] * (1 - tx) + TD[o + TDW + 1] * tx) * ty; } }
  let fx = (x - TX0) / TRES - 0.5, fy = (TY1 - y) / TRES - 0.5;
  fx = Math.min(Math.max(fx, 0), THW - 1.001); fy = Math.min(Math.max(fy, 0), THH - 1.001);
  const i = fx | 0, j = fy | 0, tx = fx - i, ty = fy - j, o = j * THW + i;
  return (TH[o] * (1 - tx) + TH[o + 1] * tx) * (1 - ty) + (TH[o + THW] * (1 - tx) + TH[o + THW + 1] * tx) * ty;
}
async function loadTerrain() {
  const meta = await (await fetch('terrain.json')).json(), img = await loadImg('terrain.png');
  const c = document.createElement('canvas'); c.width = meta.W; c.height = meta.H; const g = c.getContext('2d'); g.drawImage(img, 0, 0);
  const px = g.getImageData(0, 0, meta.W, meta.H).data;
  TH = new Float32Array(meta.W * meta.H); const rgba = new Uint8Array(meta.W * meta.H * 4);
  for (let k = 0; k < TH.length; k++) { TH[k] = (px[k * 4] * 256 + px[k * 4 + 1] - 32768) / 10; rgba[k * 4] = px[k * 4]; rgba[k * 4 + 1] = px[k * 4 + 1]; rgba[k * 4 + 3] = 255; }
  const tex = new THREE.DataTexture(rgba, meta.W, meta.H, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.flipY = false; tex.needsUpdate = true;
  TERR.rgba = rgba; TERR.dt = tex;
  TERR.tex.value = tex; TERR.info.value.set(meta.x0, 0, meta.res, meta.y0 + meta.H * meta.res); TERR.size.value.set(meta.W, meta.H);
  THW = meta.W; THH = meta.H; TX0 = meta.x0; TY1 = meta.y0 + meta.H * meta.res; TRES = meta.res;
  if (meta.detail) { const d = meta.detail, im = await loadImg('terrain_d.png'), c2 = document.createElement('canvas'); c2.width = d.W; c2.height = d.H; const g2 = c2.getContext('2d'); g2.drawImage(im, 0, 0);
    const q = g2.getImageData(0, 0, d.W, d.H).data, r2 = new Uint8Array(d.W * d.H * 4); TD = new Float32Array(d.W * d.H);
    for (let k = 0; k < TD.length; k++) { TD[k] = (q[k * 4] * 256 + q[k * 4 + 1] - 32768) / 10; r2[k * 4] = q[k * 4]; r2[k * 4 + 1] = q[k * 4 + 1]; r2[k * 4 + 2] = q[k * 4 + 2]; r2[k * 4 + 3] = 255; }
    const t2 = new THREE.DataTexture(r2, d.W, d.H, THREE.RGBAFormat, THREE.UnsignedByteType); t2.magFilter = t2.minFilter = THREE.NearestFilter; t2.generateMipmaps = false; t2.flipY = false; t2.needsUpdate = true;
    TERR.dtex.value = t2; TERR.dinfo.value.set(d.x0, 1, d.res, d.y0 + d.H * d.res); TERR.dsize.value.set(d.W, d.H);
    TDW = d.W; TDH = d.H; TDX0 = d.x0; TDY1 = d.y0 + d.H * d.res; TDRES = d.res; }
  else TERR.dtex.value = tex;
  TERR.on.value = 1;
}
const camera = new THREE.PerspectiveCamera(68, 1, 0.25, 900);
const MAXANISO = renderer.capabilities.getMaxAnisotropy();
const W3 = (x, y, h) => new THREE.Vector3(x, h || 0, -y);

const hemi = new THREE.HemisphereLight(0x8090c0, 0x302820, 0.4); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -70, right: 70, top: 70, bottom: -70, near: 10, far: 500 });
sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target);
const lampLights = []; for (let i = 0; i < 6; i++) { const l = new THREE.PointLight(0xffb060, 0, 26, 2); scene.add(l); lampLights.push(l); }
const headLight = new THREE.SpotLight(0xfff2d8, 0, 70, 0.5, 0.5, 1.4); scene.add(headLight, headLight.target);

/* post-processing */
/* composer target carries a stencil buffer: carriageways mark it so the raised sidewalk plane is cut out above them */
const composer = new THREE.EffectComposer(renderer, new THREE.WebGLRenderTarget(16, 16, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: true }));
composer.setPixelRatio(renderer.getPixelRatio());
composer.addPass(new THREE.RenderPass(scene, camera));
const bloom = new THREE.UnrealBloomPass(new THREE.Vector2(512, 512), 0.48, 0.42, 0.9);
composer.addPass(bloom);
/* Filmic grade: restrained contrast, controlled highlights and a subtle
   warm/cool split. Kept in the final pass so it does not alter scene materials. */
const gradePass = new THREE.ShaderPass({
  uniforms: { tDiffuse: { value: null }, vig: { value: 0.16 }, tint: { value: new THREE.Vector3(1, 1, 1) }, exposure: { value: 1.0 }, contrast: { value: 1.0 }, saturation: { value: 1.0 }, time: { value: 0 } },
  vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader: `uniform sampler2D tDiffuse;uniform float vig;uniform vec3 tint;uniform float exposure;uniform float contrast;uniform float saturation;uniform float time;varying vec2 vUv;
    float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
    vec3 filmic(vec3 x){x=max(vec3(0.),x);return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14),0.,1.);}
    void main(){
      /* tDiffuse is linear HDR: grade once, then encode once for the display. */
      vec3 c=max(texture2D(tDiffuse,vUv).rgb,vec3(0.))*tint;
      float lum=dot(c,vec3(.2126,.7152,.0722));
      c=mix(vec3(lum),c,saturation);
       /* Restore midtone separation before the highlight shoulder; avoids a flat, chalky daytime image. */
       c=max(vec3(0.),(c-vec3(.18))*contrast+vec3(.18));
      float shadow=1.-smoothstep(.025,.34,lum);
      float highlight=smoothstep(.48,1.35,lum);
      c*=vec3(1.006,1.002,.998);
      c+=shadow*vec3(-.001,.0005,.002);
      c+=highlight*vec3(.004,.002,-.003);
      c=filmic(c*exposure);
      vec2 d=vUv-.5;
      c*=1.-vig*dot(d,d)*1.25;
      c+=(h(vUv*vec2(1920.,1080.)+time)-.5)*.002;
      c=max(c,vec3(0.));
      c=mix(1.055*pow(c,vec3(1./2.4))-.055,12.92*c,vec3(lessThan(c,vec3(.0031308))));
      gl_FragColor=vec4(c,1.);
    }`
});
composer.addPass(gradePass);
const fxaa = new THREE.ShaderPass(THREE.FXAAShader); composer.addPass(fxaa);

function onResize() {
  const w = innerWidth, h = innerHeight, pr = renderer.getPixelRatio();
  renderer.setSize(w, h, false); composer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
  fxaa.material.uniforms.resolution.value.set(1 / (w * pr), 1 / (h * pr));
  bloom.setSize(w * pr / 3, h * pr / 3);
}
addEventListener('resize', onResize);

/* ---------- textures ---------- */
const texLoader = new THREE.TextureLoader();
function loadTex(url, srgb, rep) {
  return new Promise(res => texLoader.load(url, t => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = MAXANISO; if (srgb) t.encoding = THREE.sRGBEncoding;
    if (rep) t.repeat.set(rep, rep); res(t);
  }, undefined, () => res(null)));
}
function loadImg(url) { return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; }); }
function canvasTex(c, srgb) { const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = MAXANISO; if (srgb) t.encoding = THREE.sRGBEncoding; return t; }
const allMats = [];
function M(o) { const m = new THREE.MeshStandardMaterial(o); allMats.push(m); return m; }

const MAT = {};
/* Shared dry albedo for the global sidewalk/square ground, also used by world.js. */
MAT.groundAlbedo = 0x807b73;
const ENV = {};
async function loadEnvironments(progress) {
  const pmrem = new THREE.PMREMGenerator(renderer); pmrem.compileEquirectangularShader();
  for (const k of ['env_night', 'env_day', 'sky_day']) {
    const t = await loadTex('tex/' + k + '.jpg', true); progress && progress(k);
    if (!t) continue;
    t.mapping = THREE.EquirectangularReflectionMapping; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (k.startsWith('env')) { ENV[k] = pmrem.fromEquirectangular(t).texture; t.dispose(); } else ENV[k] = t;
  }
  pmrem.dispose();
}

async function loadGroundMaterials() {
  const g = {};
  const names = ['asphalt', 'pave', 'cobble', 'square', 'grass', 'concrete', 'slate', 'slab', 'sw'];
  await Promise.all(names.map(async n => {
    g[n] = { map: await loadTex(`tex/${n}_d.jpg`, true), normalMap: await loadTex(`tex/${n}_n.jpg`), roughnessMap: await loadTex(`tex/${n}_r.jpg`) };
  }));
  MAT.asphalt = M({ ...g.asphalt, roughnessMap: null, color: 0x9a9a9a, roughness: 1 });
  /* Reprises d'enrobé : même famille de texture, teinte et rugosité légèrement différentes. */
  MAT.asphaltRepair = M({ ...g.asphalt, roughnessMap: null, color: 0x777875, roughness: 0.96 });
  MAT.highway = M({ ...g.asphalt, roughnessMap: null, color: 0x7c7c7c, roughness: 1 });
  MAT.pave = M({ ...g.pave, roughnessMap: null, color: 0x807b73, roughness: 1 });
  MAT.cobble = M({ ...g.cobble, roughnessMap: null, color: 0x807b73, roughness: 1 });
  MAT.square = M({ ...g.square, roughnessMap: null, color: 0x807b73, roughness: 1 });
  MAT.grass = M({ ...g.grass, color: 0x5c8a34, roughness: 1 });
  MAT.path = M({ ...g.sw, roughnessMap: null, color: 0x827d75, roughness: 1 });
  MAT.ballast = M({ ...g.concrete, roughnessMap: null, color: 0x6a5f55, roughness: 1 });
  MAT.slate = M({ ...g.slate, color: 0xa8b0bc, roughness: 0.75 });
  MAT.zinc = M({ ...g.concrete, color: 0x6c7078, roughness: 0.5, metalness: 0.5 });
  MAT.flatroof = M({ ...g.concrete, color: 0x8a8680, roughness: 1 });
  MAT.mark = M({ color: 0xe8e8e0, roughness: 0.6, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 });
  MAT.curb = M({ ...g.sw, roughnessMap: null, color: 0xa7a39b, roughness: 0.8 });
  /* lowered carriageway: writes stencil 1 so the raised sidewalk plane skips it */
  MAT.road = M({ ...g.asphalt, roughnessMap: null, color: 0x9a9a9a, roughness: 1 });
  MAT.sett = M({ ...g.cobble, roughnessMap: null, color: 0x827c74, roughness: 1 }); /* cobbled carriageway of the old town's living streets */
  MAT.stair = M({ ...g.slab, roughnessMap: null, color: 0x99938a, roughness: 0.8 }); MAT.stairNose = M({ color: 0x8a857c, roughness: 0.7 });
  MAT.fence = M({ color: 0x2a3a34, roughness: 0.5, metalness: 0.6 }); MAT.wallLow = M({ ...g.slab, roughnessMap: null, color: 0x8e877b, roughness: 0.9 }); MAT.hedge = M({ color: 0x3c5a2a, roughness: 1 });
  for (const m of [MAT.road, MAT.highway, MAT.sett]) Object.assign(m, { stencilWrite: true, stencilRef: 1, stencilFunc: THREE.AlwaysStencilFunc, stencilZPass: THREE.ReplaceStencilOp });
  MAT.gutter = M({ ...g.slab, roughnessMap: null, color: 0x898985, roughness: 0.9, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
  MAT.grate = M({ color: 0x2a2a2a, roughness: 0.5, metalness: 0.7, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
  MAT.manhole = M({ color: 0x3a3836, roughness: 0.45, metalness: 0.6, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
  MAT.groundTex = g;
  MAT.eave = M({ color: 0x34363a, roughness: 0.55, metalness: 0.2, side: THREE.DoubleSide });
  MAT.coping = M({ ...g.concrete, color: 0xa8a49c, roughness: 0.9 });
  MAT.slateT = M({ ...g.slate, color: 0xffffff, roughness: 0.72, vertexColors: true }); MAT.tileRoofT = MAT.slateT;
  MAT.flatT = M({ ...g.concrete, color: 0xffffff, roughness: 1, vertexColors: true });
  MAT.metal = M({ color: 0x2a2d33, roughness: 0.45, metalness: 0.8 });
  MAT.metalLight = M({ color: 0x9aa0a8, roughness: 0.35, metalness: 0.9 });
  MAT.rail = M({ color: 0x8a8a8a, roughness: 0.3, metalness: 1 });
  MAT.lampHead = M({ color: 0xfff1d0, emissive: 0xffc070, emissiveIntensity: 2 });
  MAT.trunk = M({ color: 0x4a3c30, roughness: 1 });
  MAT.glassBus = M({ color: 0x8ab0c0, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.35 });
  MAT.bollard = M({ color: 0x2c2e32, roughness: 0.45, metalness: 0.6 });
  MAT.wood = M({ color: 0x7a5a3a, roughness: 0.8 });
  MAT.stone = M({ ...g.concrete, color: 0xd8d0c0, roughness: 0.9 });
  MAT.quay = M({ ...g.square, color: 0x9a9488, roughness: 0.9 });
  for (const k of ['asphalt', 'highway', 'pave', 'cobble', 'square', 'path', 'ballast']) { MAT[k].polygonOffset = true; MAT[k].polygonOffsetFactor = -2; MAT[k].polygonOffsetUnits = -2; }
  MAT.grass.polygonOffset = true; MAT.grass.polygonOffsetFactor = -1; MAT.grass.polygonOffsetUnits = -1;
  /* water with animated normals */
  const wn = document.createElement('canvas'); wn.width = wn.height = 256; const wg = wn.getContext('2d'); const id = wg.createImageData(256, 256);
  const hgt = new Float32Array(256 * 256); for (let k = 0; k < 40; k++) { const fx = rnd(1, 6) | 0, fy = rnd(1, 6) | 0, ph = rnd(0, 6), a = rnd(0.3, 1) / (fx + fy); for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) hgt[y * 256 + x] += Math.sin((x * fx + y * fy) / 256 * Math.PI * 2 + ph) * a; }
  for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) { const dx = hgt[y * 256 + ((x + 1) & 255)] - hgt[y * 256 + ((x + 255) & 255)], dy = hgt[((y + 1) & 255) * 256 + x] - hgt[((y + 255) & 255) * 256 + x]; const o = (y * 256 + x) * 4; id.data[o] = 128 + dx * 300; id.data[o + 1] = 128 + dy * 300; id.data[o + 2] = 255; id.data[o + 3] = 255; }
  wg.putImageData(id, 0, 0);
  MAT.water = M({ color: 0x0e1c22, roughness: 0.06, metalness: 0.1, normalMap: canvasTex(wn), normalScale: new THREE.Vector2(0.6, 0.6) });
  MAT.water.normalMap.repeat.set(1 / 14, 1 / 14);
  MAT.groundMat = MAT.pave;
}

/* ---------- procedural facades ---------- */
const FLOOR = 3.1, BAY = 3.2;
const facadeMats = {}; // style -> [materials]
let wallImgs = {};
async function loadWallImages() {
  for (const k of ['tuffeau', 'plaster', 'grey', 'yellow', 'brick', 'stone']) wallImgs[k] = await loadImg(`tex/w_${k}_d.jpg`);
}
function tiled(g, img, W, H, px, tint, alpha) {
  g.save(); g.globalAlpha = alpha || 1;
  for (let y = 0; y < H; y += px) for (let x = 0; x < W; x += px) g.drawImage(img, x, y, px, px);
  g.restore();
  if (tint) { g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = tint; g.fillRect(0, 0, W, H); g.restore(); }
}
function heightToNormal(hc, strength) {
  const w = hc.width, h = hc.height, src = hc.getContext('2d').getImageData(0, 0, w, h).data;
  const out = document.createElement('canvas'); out.width = w; out.height = h; const og = out.getContext('2d'); const id = og.createImageData(w, h);
  const H = (x, y) => src[(((y + h) % h) * w + ((x + w) % w)) * 4] / 255;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const dx = (H(x + 1, y) - H(x - 1, y)) * strength, dy = (H(x, y + 1) - H(x, y - 1)) * strength;
    const l = Math.hypot(dx, dy, 1), o = (y * w + x) * 4;
    id.data[o] = (-dx / l * 0.5 + 0.5) * 255; id.data[o + 1] = (dy / l * 0.5 + 0.5) * 255; id.data[o + 2] = (1 / l * 0.5 + 0.5) * 255; id.data[o + 3] = 255;
  }
  og.putImageData(id, 0, 0); return out;
}
/* draws one facade texture: cols bays x rows floors */
function makeFacade(style, v, R) {
  const cols = 4, rows = 4, S = 1024, ppm = S / (cols * BAY), ppf = S / (rows * FLOOR);
  const c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
  const hc = document.createElement('canvas'); hc.width = hc.height = 512; const hg = hc.getContext('2d');
  const ec = document.createElement('canvas'); ec.width = ec.height = 256; const eg = ec.getContext('2d');
  const rc = document.createElement('canvas'); rc.width = rc.height = 256; const rg = rc.getContext('2d');
  eg.fillStyle = '#000'; eg.fillRect(0, 0, 256, 256); rg.fillStyle = '#e0e0e0'; rg.fillRect(0, 0, 256, 256);
  const hs = 512 / S, es = 256 / S;
  const rect = (gg, x, y, w, h, col) => { gg.fillStyle = col; gg.fillRect(x, y, w, h); };
  const H = (x, y, w, h, val) => rect(hg, x * hs, y * hs, w * hs, h * hs, `rgb(${val},${val},${val})`);
  const E = (x, y, w, h, col) => rect(eg, x * es, y * es, w * es, h * es, col);
  const Rg = (x, y, w, h, val) => rect(rg, x * es, y * es, w * es, h * es, `rgb(${val},${val},${val})`);
  const base = { 0: ['tuffeau', ['#f2e6cf', '#e8dcc4']], 1: ['plaster', ['#efe2c8', '#e8c89a', '#e9d2c8', '#dfe0da']], 2: ['plaster', ['#efe6d2', '#f2e2c0', '#e8e0d8']], 3: ['brick', ['#ffffff']], 4: ['grey', ['#e8e8e6', '#d8d4cc']], 5: ['grey', ['#9aa2aa', '#b8b2a6']], 6: ['stone', ['#c8c4bc']], 7: ['plaster', ['#f6f4ee', '#efe8da']], 8: ['grey', ['#6a6a70']] }[style];
  const img = wallImgs[base[0]];
  tiled(g, img, S, S, style === 3 ? 150 : style === 0 ? 210 : 230, style === 3 ? null : '#ffffff');
  /* Les enduits et pierres claires doivent conserver leur nuance sous le soleil :
     réduction d'albedo à la source, avant de dessiner vitrages, menuiseries et détails. */
  if ([0, 1, 2, 6, 7].includes(style)) {
    g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = 'rgb(205,198,186)'; g.fillRect(0, 0, S, S); g.restore();
  }
  /* Conserver la chromie et les micro-variations des textures photographiques.
     La neutralisation en niveaux de gris suivie d'un voile screen écrasait les
     nuances de pierre, les reprises d'enduit et les différences de vieillissement.
     La teinte urbaine reste appliquée proprement par vertex dans world.js. */
  /* height base from photo luminance */
  hg.drawImage(c, 0, 0, 512, 512); hg.globalCompositeOperation = 'source-over'; hg.globalAlpha = 0.55; hg.fillStyle = '#808080'; hg.fillRect(0, 0, 512, 512); hg.globalAlpha = 1;
  const glass = (x, y, w, h, lit) => {
    const gr = g.createLinearGradient(x, y, x + w * 0.6, y + h);
    gr.addColorStop(0, '#5a6a7a'); gr.addColorStop(0.45, '#26303c'); gr.addColorStop(1, '#141a22'); g.fillStyle = gr; g.fillRect(x, y, w, h);
    if (R() < 0.6) { g.fillStyle = pick(['rgba(240,232,215,.55)', 'rgba(210,200,180,.5)', 'rgba(160,40,40,.35)', 'rgba(230,230,230,.6)']); const cw = w * rnd(0.2, 0.45); g.fillRect(x, y, cw, h); g.fillRect(x + w - cw, y, cw, h); }
    H(x, y, w, h, 40); Rg(x, y, w, h, 58);
    if (lit) { const col = pick(['#ffcf85', '#ffbf66', '#ffe0a8', '#ffd59a', '#a8c8ff']); E(x, y, w, h, col); if (R() < 0.5) E(x, y, w * rnd(0.2, 0.45), h, 'rgba(255,170,80,.7)'); }
  };
  const litP = style === 5 ? 0.05 : style === 6 ? 0 : 0.32;
  if (style === 2) {
    /* colombage: half-timbered */
    const beam = ['#462a1c', '#782820', '#2c4a6a', '#3e341e', '#6a5a2a'][v % 5];
    for (let r = 0; r < rows; r++) {
      const y0 = r * FLOOR * ppf, fh = FLOOR * ppf;
      for (let cc = 0; cc < cols; cc++) {
        const x0 = cc * BAY * ppm, bw = BAY * ppm;
        const ww = 0.95 * ppm, wh = 1.35 * ppf, wx = x0 + (bw - ww) / 2, wy = y0 + fh * 0.3;
        g.strokeStyle = beam; g.lineWidth = 0.2 * ppm; g.lineCap = 'square';
        const diag = R();
        g.beginPath();
        if (diag < 0.45) { g.moveTo(x0, y0 + fh); g.lineTo(wx - 4, y0 + fh * 0.32); g.moveTo(x0 + bw, y0 + fh); g.lineTo(wx + ww + 4, y0 + fh * 0.32); }
        else if (diag < 0.8) { g.moveTo(x0, y0); g.lineTo(wx - 6, wy + wh); g.moveTo(x0 + bw, y0); g.lineTo(wx + ww + 6, wy + wh); }
        g.moveTo(wx - 8, y0); g.lineTo(wx - 8, y0 + fh); g.moveTo(wx + ww + 8, y0); g.lineTo(wx + ww + 8, y0 + fh);
        g.stroke();
        hg.strokeStyle = '#b0b0b0'; hg.lineWidth = g.lineWidth * hs; hg.save(); hg.scale(hs, hs); hg.stroke(); hg.restore();
        rect(g, wx - 6, wy - 6, ww + 12, wh + 12, beam);
        glass(wx, wy, ww, wh, R() < litP);
        g.fillStyle = beam; g.fillRect(wx + ww / 2 - 2, wy, 4, wh); g.fillRect(wx, wy + wh * 0.4, ww, 4);
      }
      rect(g, 0, y0 + fh - 0.28 * ppf, S, 0.28 * ppf, beam); H(0, y0 + fh - 0.28 * ppf, S, 0.28 * ppf, 190);
      rect(g, 0, y0, S, 0.14 * ppf, beam);
    }
  } else if (style === 4 || style === 5 || style === 8) {
    /* modern block / commercial cladding */
    for (let r = 0; r < rows; r++) {
      const y0 = r * FLOOR * ppf, fh = FLOOR * ppf;
      if (style === 5) {
        for (let x = 0; x < S; x += 14) { rect(g, x, y0, 3, fh, 'rgba(0,0,0,.18)'); H(x, y0, 3, fh, 90); }
        if (r === 1 && v % 2) { glass(0, y0 + fh * 0.3, S, fh * 0.35, false); }
        continue;
      }
      if (style === 8) { rect(g, 0, y0 + fh * 0.8, S, 6, 'rgba(0,0,0,.3)'); continue; }
      const band = v % 2 === 0;
      if (band) {
        glass(0, y0 + fh * 0.32, S, fh * 0.5, false);
        for (let cc = 0; cc <= cols * 2; cc++) { rect(g, cc * S / (cols * 2) - 3, y0 + fh * 0.32, 6, fh * 0.5, '#8a8e94'); }
        for (let cc = 0; cc < cols * 2; cc++) if (R() < litP) E(cc * S / (cols * 2) + 3, y0 + fh * 0.32, S / (cols * 2) - 6, fh * 0.5, pick(['#ffd59a', '#ffe9c4', '#cfe0ff']));
        rect(g, 0, y0 + fh * 0.82, S, fh * 0.06, '#cfcfcc'); H(0, y0 + fh * 0.82, S, fh * 0.06, 210);
        for (let x = 0; x < S; x += 9) { rect(g, x, y0 + fh * 0.62, 2, fh * 0.2, 'rgba(40,44,50,.7)'); }
        rect(g, 0, y0 + fh * 0.62, S, 3, '#444');
      } else {
        for (let cc = 0; cc < cols; cc++) {
          const x0 = cc * BAY * ppm, ww = 1.6 * ppm, wh = 1.55 * ppf, wx = x0 + (BAY * ppm - ww) / 2, wy = y0 + fh * 0.25;
          rect(g, wx - 5, wy - 5, ww + 10, wh + 10, '#b4b4b0'); glass(wx, wy, ww, wh, R() < litP); rect(g, wx + ww / 2 - 2, wy, 4, wh, '#9a9a98');
          if (R() < 0.4) { rect(g, wx - 10, wy + wh * 0.55, ww + 20, wh * 0.45, 'rgba(60,66,74,.55)'); H(wx - 10, wy + wh * 0.55, ww + 20, wh * 0.45, 200); }
        }
      }
    }
  } else if (style === 6) {
    for (let cc = 0; cc < cols; cc++) {
      const x0 = cc * BAY * ppm, ww = 1.2 * ppm, wh = 6 * ppf, wx = x0 + (BAY * ppm - ww) / 2, wy = S * 0.22;
      g.fillStyle = '#2a2430'; g.beginPath(); g.moveTo(wx, wy + wh); g.lineTo(wx, wy + ww / 2); g.arc(wx + ww / 2, wy + ww / 2, ww / 2, Math.PI, 0); g.lineTo(wx + ww, wy + wh); g.fill();
      H(wx, wy, ww, wh, 40); E(wx, wy, ww, wh, pick(['#3a2a6a', '#5a2a2a', '#2a4a6a']));
      rect(g, x0, 0, 0.35 * ppm, S, 'rgba(0,0,0,.12)'); H(x0, 0, 0.35 * ppm, S, 200);
    }
  } else {
    /* classical: tuffeau / plaster / brick / house */
    const house = style === 7;
    for (let r = 0; r < rows; r++) {
      const y0 = r * FLOOR * ppf, fh = FLOOR * ppf;
      if (!house) { rect(g, 0, y0 + fh - 0.22 * ppf, S, 0.12 * ppf, 'rgba(255,250,240,.35)'); rect(g, 0, y0 + fh - 0.1 * ppf, S, 0.05 * ppf, 'rgba(0,0,0,.18)'); H(0, y0 + fh - 0.22 * ppf, S, 0.12 * ppf, 200); }
      for (let cc = 0; cc < cols; cc++) {
        const x0 = cc * BAY * ppm, bw = BAY * ppm;
        const ww = (house ? 1.0 : 1.15) * ppm, wh = (house ? 1.3 : 1.95) * ppf, wx = x0 + (bw - ww) / 2, wy = y0 + fh * (house ? 0.3 : 0.2);
        if (house && R() < 0.15) continue;
        const frame = style === 3 ? '#e8e2d6' : 'rgba(255,248,236,.85)';
        if (style !== 7) { rect(g, wx - 0.16 * ppm, wy - 0.16 * ppm, ww + 0.32 * ppm, wh + 0.3 * ppm, frame); H(wx - 0.16 * ppm, wy - 0.16 * ppm, ww + 0.32 * ppm, wh + 0.3 * ppm, 175); }
        rect(g, wx - 0.22 * ppm, wy + wh + 0.06 * ppm, ww + 0.44 * ppm, 0.1 * ppm, '#ddd6c8'); H(wx - 0.22 * ppm, wy + wh + 0.06 * ppm, ww + 0.44 * ppm, 0.1 * ppm, 230);
        rect(g, wx - 0.22 * ppm, wy + wh + 0.16 * ppm, ww + 0.44 * ppm, 0.05 * ppm, 'rgba(0,0,0,.25)');
        const lit = R() < litP;
        const shut = R() < (house ? 0.75 : style === 1 ? 0.35 : 0.1);
        glass(wx, wy, ww, wh, lit);
        rect(g, wx, wy, ww, 3, '#f0ece4'); rect(g, wx + ww / 2 - 2, wy, 4, wh, '#efebe2'); rect(g, wx, wy + wh * 0.28, ww, 3, '#efebe2'); rect(g, wx, wy + wh * 0.64, ww, 3, '#efebe2');
        if (style === 0 && r > 0 && R() < 0.7) { /* wrought-iron balconette */
          const by = wy + wh * 0.62; rect(g, wx - 3, by, ww + 6, 3, '#1a1a1a');
          g.strokeStyle = '#1a1a1a'; g.lineWidth = 2; for (let x = wx; x < wx + ww; x += 7) { g.beginPath(); g.moveTo(x, by); g.lineTo(x, wy + wh); g.stroke(); }
        }
        if (shut) {
          const sc = house ? pick(['#4a6a8a', '#e8e8e8', '#6a8a6a', '#8a9aa8', '#3a5a7a']) : pick(['#c8c0b0', '#8a9aa0', '#6a7a6a']);
          const closed = R() < 0.35;
          const sw = ww / 2;
          if (closed) { rect(g, wx, wy, ww, wh, sc); for (let y = wy; y < wy + wh; y += 5) rect(g, wx, y, ww, 1.5, 'rgba(0,0,0,.25)'); E(wx, wy, ww, wh, '#000'); }
          else { for (const sx of [wx - sw - 3, wx + ww + 3]) { rect(g, sx, wy, sw, wh, sc); for (let y = wy; y < wy + wh; y += 5) rect(g, sx, y, sw, 1.5, 'rgba(0,0,0,.25)'); H(sx, wy, sw, wh, 170); } }
        }
      }
    }
  }
  /* Weathering: runoff stains are concentrated below ledges and openings,
     rather than being uniformly scattered across the whole facade atlas. */
  for (let k = 0; k < 40; k++) {
    const x = R() * S, y = R() * S, w = rnd(2, 10), h = rnd(30, 200);
    const grad = g.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, 'rgba(34,30,26,0)');
    grad.addColorStop(0.18, `rgba(34,30,26,${rnd(0.025, 0.065)})`);
    grad.addColorStop(0.82, `rgba(34,30,26,${rnd(0.018, 0.045)})`);
    grad.addColorStop(1, 'rgba(34,30,26,0)');
    g.fillStyle = grad; g.fillRect(x, y, w, h);
  }
  // Fine mineral grain in the height field. It is deliberately low amplitude:
  // visible under grazing light, not as noisy embossed plaster.
  {
    const hd = hg.getImageData(0, 0, 512, 512), px = hd.data;
    for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
      const i = (y * 512 + x) * 4, v0 = px[i];
      if (v0 > 78 && v0 < 246) {
        const n1 = Math.sin(x * 1.73 + Math.sin(y * 0.31) * 2.1);
        const n2 = Math.sin(y * 2.17 + Math.sin(x * 0.19) * 1.7);
        const n3 = Math.sin((x + y) * 0.73);
        const grain = (n1 * 0.9 + n2 * 0.65 + n3 * 0.35) * 1.25;
        const v = Math.max(0, Math.min(255, v0 + grain));
        px[i] = px[i + 1] = px[i + 2] = v;
      }
    }
    hg.putImageData(hd, 0, 0);
  }
  // Roughness is not a flat constant: mineral surfaces get subtle variation,
  // while glass retains its lower roughness from the window masks above.
  {
    const rd = rg.getImageData(0, 0, 256, 256), px = rd.data;
    for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
      const i = (y * 256 + x) * 4, v0 = px[i];
      if (v0 > 145) {
        const n = Math.sin(x * 0.71 + Math.sin(y * 0.13)) * 4.0
                + Math.sin(y * 1.37 + Math.sin(x * 0.21)) * 2.5
                + Math.sin((x - y) * 0.29) * 1.5;
        const v = Math.max(0, Math.min(255, v0 + n));
        px[i] = px[i + 1] = px[i + 2] = v;
      }
    }
    rg.putImageData(rd, 0, 0);
  }
  const nm = canvasTex(heightToNormal(hc, 4.1));
  nm.repeat.set(1, 1);
  const roughTex = canvasTex(rc);
  const mat = M({ map: canvasTex(c, true), normalMap: nm, normalScale: new THREE.Vector2(0.72, 0.72), roughnessMap: roughTex, emissiveMap: canvasTex(ec, true), emissive: 0xffffff, emissiveIntensity: 1, roughness: 0.96, vertexColors: true });
  mat.userData = { perU: cols * BAY, perV: rows * FLOOR, facade: true, avg: avgLinear(c) };
  return mat;
}
function avgLinear(c) {
  const s = document.createElement('canvas'); s.width = s.height = 32; const g = s.getContext('2d'); g.drawImage(c, 0, 0, 32, 32);
  const d = g.getImageData(0, 0, 32, 32).data, a = [0, 0, 0], L = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  for (let i = 0; i < d.length; i += 4) { a[0] += L(d[i]); a[1] += L(d[i + 1]); a[2] += L(d[i + 2]); }
  return a.map(x => x / 1024);
}
/* shopfronts: 4 bays x 4.2m, shops with signs, some closed metal shutters */
const SHOP_WORDS = ['BOULANGERIE', 'TABAC PRESSE', 'PHARMACIE', 'CAFÉ', 'BAR', 'COIFFURE', 'OPTIQUE', 'CRÊPERIE', 'KEBAB', 'PRESSING', 'IMMOBILIER', 'FLEURS', 'LIBRAIRIE', 'BOUCHERIE', 'ÉPICERIE', 'BANQUE', 'ASSURANCES', 'PIZZERIA', 'SUSHI', 'TATOUAGE', 'VINS', 'FROMAGERIE', 'CORDONNERIE', 'PHOTO'];
function makeShopfront(v, R) {
  const S = 1024, Hh = 336, ppm = S / (4 * BAY), ppf = Hh / 4.2;
  const c = document.createElement('canvas'); c.width = S; c.height = Hh; const g = c.getContext('2d');
  const hc = document.createElement('canvas'); hc.width = 512; hc.height = 168; const hg = hc.getContext('2d');
  const ec = document.createElement('canvas'); ec.width = 512; ec.height = 168; const eg = ec.getContext('2d');
  const rc = document.createElement('canvas'); rc.width = 256; rc.height = 84; const rg = rc.getContext('2d');
  tiled(g, wallImgs.stone, S, Hh, 200, '#d8d0c0'); hg.fillStyle = '#909090'; hg.fillRect(0, 0, 512, 168);
  eg.fillStyle = '#000'; eg.fillRect(0, 0, 512, 168); rg.fillStyle = '#d0d0d0'; rg.fillRect(0, 0, 256, 84);
  const sx = 0.5, sr = 0.25;
  for (let b = 0; b < 4; b++) {
    const x0 = b * BAY * ppm + 0.25 * ppm, w = BAY * ppm - 0.5 * ppm, top = 0.9 * ppf, bot = Hh - 0.1 * ppf;
    const kind = R();
    const signCol = pick(['#1e3a5a', '#5a1e2a', '#1e4a2e', '#2a2a2a', '#6a4a1a', '#8a1a1a', '#1a1a4a']);
    g.fillStyle = signCol; g.fillRect(x0 - 0.1 * ppm, 0.25 * ppf, w + 0.2 * ppm, 0.6 * ppf);
    const word = pick(SHOP_WORDS);
    g.fillStyle = '#f4efe4'; g.font = `700 ${Math.round(0.34 * ppf)}px "Barlow Condensed", Arial Narrow, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(word, x0 + w / 2, 0.56 * ppf, w * 0.9);
    const neonOn = (v === 0 ? 0.55 : 0.25) > R();
    if (neonOn) { eg.fillStyle = '#ffffff'; eg.font = g.font.replace(/\d+px/, Math.round(0.34 * ppf * sx) + 'px'); eg.textAlign = 'center'; eg.textBaseline = 'middle'; eg.fillText(word, (x0 + w / 2) * sx, 0.56 * ppf * sx, w * 0.9 * sx); }
    if (kind < (v === 0 ? 0.25 : 0.6)) {
      /* closed metal shutter with tags */
      g.fillStyle = '#8e9296'; g.fillRect(x0, top, w, bot - top);
      for (let y = top; y < bot; y += 6) { g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(x0, y, w, 2); hg.fillStyle = '#606060'; hg.fillRect(x0 * sx, y * sx, w * sx, 1); }
      if (R() < 0.7) { g.font = `italic 900 ${Math.round(rnd(22, 40))}px Impact, sans-serif`; g.fillStyle = pick(['#d23', '#222', '#2a6', '#83c', '#f0a', '#29d']); g.save(); g.translate(x0 + w * rnd(0.3, 0.7), top + (bot - top) * rnd(0.3, 0.7)); g.rotate(rnd(-0.2, 0.1)); g.fillText(pick(['ROAZHON', 'BZH', 'RNS', 'KAOS', '35', 'SOIF', 'GWEN', 'TAGZ', 'BREIZH', 'R35']), 0, 0); g.restore(); }
      rg.fillStyle = '#909090'; rg.fillRect(x0 * sr, top * sr, w * sr, (bot - top) * sr);
    } else {
      /* shop window */
      g.fillStyle = '#2a2a2a'; g.fillRect(x0, top, w, bot - top);
      const gx = x0 + 6, gy = top + 6, gw = w - 12, gh = bot - top - 12;
      const gr = g.createLinearGradient(gx, gy, gx + gw * 0.5, gy + gh); gr.addColorStop(0, '#4a5866'); gr.addColorStop(1, '#141a20'); g.fillStyle = gr; g.fillRect(gx, gy, gw, gh);
      for (let k = 0; k < 6; k++) { g.fillStyle = `hsla(${rnd(0, 360)},40%,${rnd(30, 70)}%,.5)`; g.fillRect(gx + rnd(0, gw * 0.8), gy + gh * rnd(0.4, 0.8), rnd(10, 40), rnd(10, 50)); }
      const door = R() < 0.5; if (door) { g.fillStyle = '#1a1a1a'; g.fillRect(gx + gw * 0.62, gy, 4, gh); }
      hg.fillStyle = '#404040'; hg.fillRect(gx * sx, gy * sx, gw * sx, gh * sx); rg.fillStyle = '#202020'; rg.fillRect(gx * sr, gy * sr, gw * sr, gh * sr);
      if (R() < (v === 0 ? 0.7 : 0.35)) { eg.fillStyle = pick(['#4a3420', '#5a4228', '#3e3020', '#36404e']); eg.fillRect(gx * sx, gy * sx, gw * sx, gh * sx); }
    }
  }
  const mat = M({ map: canvasTex(c, true), normalMap: canvasTex(heightToNormal(hc, 3)), roughnessMap: canvasTex(rc), emissiveMap: canvasTex(ec, true), emissive: 0xffffff, emissiveIntensity: 1, roughness: 1, vertexColors: true });
  mat.userData = { perU: 4 * BAY, perV: 4.2, facade: true };
  return mat;
}
function makeSeatsMat() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 256; const g = c.getContext('2d');
  for (let y = 0; y < 256; y += 16) { g.fillStyle = '#1a1a1a'; g.fillRect(0, y, 256, 16); for (let x = 0; x < 256; x += 12) { g.fillStyle = (y / 16 | 0) % 6 < 3 ? '#c0141e' : '#151515'; g.fillRect(x + 1, y + 3, 10, 9); } }
  return M({ map: canvasTex(c, true), roughness: 0.7 });
}
function makeDormerMat() {
  const c = document.createElement('canvas'); c.width = 128; c.height = 128; const g = c.getContext('2d');
  g.fillStyle = '#e8e2d6'; g.fillRect(0, 0, 128, 128); const gr = g.createLinearGradient(0, 20, 60, 128); gr.addColorStop(0, '#5a6a7a'); gr.addColorStop(1, '#141a22'); g.fillStyle = gr; g.fillRect(24, 24, 80, 100);
  g.fillStyle = '#f0ece4'; g.fillRect(62, 24, 4, 100); g.fillRect(24, 64, 80, 4);
  const e = document.createElement('canvas'); e.width = e.height = 64; const eg = e.getContext('2d'); eg.fillStyle = '#000'; eg.fillRect(0, 0, 64, 64);
  const mats = [];
  for (const lit of [false, true]) { if (lit) { eg.fillStyle = '#ffcf85'; eg.fillRect(12, 12, 40, 50); } mats.push(M({ map: canvasTex(c, true), emissiveMap: canvasTex(e, true), emissive: 0xffffff, emissiveIntensity: 1, roughness: 0.6 })); }
  return mats;
}
async function buildFacadeMaterials(progress) {
  { const t = await loadTex('tex/w_stone_d.jpg', true), n = await loadTex('tex/w_stone_n.jpg'); MAT.monument = M({ map: t, normalMap: n, vertexColors: true, roughness: 0.92 }); MAT.monument.userData.avg = [0.42, 0.4, 0.37]; }
  const R = srand(1234);
  const variants = { 0: 2, 1: 3, 2: 5, 3: 2, 4: 2, 5: 2, 6: 1, 7: 3, 8: 1 };
  for (const s in variants) {
    facadeMats[s] = [];
    for (let v = 0; v < variants[s]; v++) { facadeMats[s].push(makeFacade(+s, v, R)); await new Promise(r => setTimeout(r, 0)); progress && progress('façades'); }
  }
  facadeMats.shop = [makeShopfront(0, R), makeShopfront(1, R), makeShopfront(2, R)];
  MAT.seats = makeSeatsMat();
  MAT.dormer = makeDormerMat();
  MAT.chimney = M({ map: null, color: 0x9a5a48, roughness: 0.9 });
  MAT.cornice = MAT.stone;
}

/* ---------- light pools / reflections / rain ---------- */
const glowTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.2, 'rgba(255,255,255,.55)'); gr.addColorStop(0.5, 'rgba(255,255,255,.15)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c);
})();
const streakTex = (() => {
  const c = document.createElement('canvas'); c.width = 64; c.height = 256; const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 128, 0, 32, 128, 128); gr.addColorStop(0, 'rgba(255,255,255,.9)'); gr.addColorStop(0.3, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.save(); g.scale(0.25, 1); g.translate(96, 0); g.fillStyle = gr; g.fillRect(-128, 0, 256, 256); g.restore(); return new THREE.CanvasTexture(c);
})();
const poolMat = new THREE.MeshBasicMaterial({ map: glowTex, color: 0x1e1208, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6 });
const POOLGEO = new THREE.PlaneGeometry(1, 1); POOLGEO.rotateX(-Math.PI / 2);

/* reflections: a pool of camera-facing streaks under light sources */
const STREAKS = 160;
const streakMesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: streakTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: false, polygonOffset: true, polygonOffsetFactor: -8, polygonOffsetUnits: -8 }), STREAKS);
streakMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(STREAKS * 3), 3);
streakMesh.frustumCulled = false; scene.add(streakMesh);

const RAIN = 5000;
const rainGeo = new THREE.BufferGeometry();
const rainPos = new Float32Array(RAIN * 6);
for (let i = 0; i < RAIN; i++) { const x = rnd(-40, 40), y = rnd(0, 30), z = rnd(-40, 40); rainPos.set([x, y, z, x - 0.05, y - 0.7, z], i * 6); }
rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
const rain = new THREE.LineSegments(rainGeo, new THREE.LineBasicMaterial({ color: 0x9aaabb, transparent: true, opacity: 0.32, depthWrite: false }));
rain.material.userData.noTerrain = true;
rain.frustumCulled = false; scene.add(rain);

/* ---------- skies ---------- */
function skyTex(top, mid, bot, stars) {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 512); gr.addColorStop(0, top); gr.addColorStop(0.42, mid); gr.addColorStop(0.5, bot); gr.addColorStop(1, '#05070c'); g.fillStyle = gr; g.fillRect(0, 0, 1024, 512);
  if (stars) for (let k = 0; k < 500; k++) { g.fillStyle = `rgba(255,255,255,${rnd(0.2, 0.9)})`; g.fillRect(rnd(0, 1024), rnd(0, 200), 1, 1); }
  const t = new THREE.CanvasTexture(c); t.mapping = THREE.EquirectangularReflectionMapping; t.encoding = THREE.sRGBEncoding; return t;
}
const SKY = { nightClear: skyTex('#03050c', '#121a33', '#3a2a40', true), nightRain: skyTex('#0e1220', '#1c2230', '#2a2a34', false), dayRain: skyTex('#6e747c', '#8a9098', '#9aa0a6', false) };

/* ---------- time of day / weather ---------- */
const MODES = [
  { id: 'auto', label: 'Automatique (heure et météo aléatoire)', auto: true },
  { id: 'nuit-pluie', label: 'Nuit, crachin', night: true, rain: true },
  { id: 'nuit', label: 'Nuit sèche', night: true, rain: false },
  { id: 'jour', label: 'Jour', night: false, rain: false },
  { id: 'jour-pluie', label: 'Jour gris, pluie', night: false, rain: true }
];
let MODE = MODES[1];
/* ---------- automatic weather: Rennes skies, picked at random and changing as the game clock turns ----------
   states last a few real minutes; rain fades in and out, the streets stay wet for a while after a shower */
const WX = { auto: true, state: 'crachin', t: 240, k: 0.75, target: 0.75, wetT: 0, applied: null };
const WXS = { clair: { rain: 0, next: [['nuageux', 5], ['clair', 2], ['crachin', 2]] }, nuageux: { rain: 0, next: [['crachin', 5], ['clair', 3], ['averse', 1]] }, crachin: { rain: 0.55, next: [['nuageux', 4], ['averse', 2], ['crachin', 2], ['clair', 1]] }, averse: { rain: 1, next: [['crachin', 4], ['nuageux', 3]] } };
const WXMSG = { clair: 'Le ciel se dégage', nuageux: 'Les nuages s\'installent', crachin: 'Le crachin breton est de retour', averse: 'Grosse averse sur Rennes' };
/* Wetness is a continuous material response, not a binary weather preset.
   The residual term keeps streets damp briefly after the rain particles stop. */
function updateWetSurfaceBlend(amount, night) {
  const k = clamp(amount, 0, 1);
  const wetColors = {
    asphalt: 0x6e6e6e, road: 0x6e6e6e, highway: 0x5e5e5e,
    ground: 0x9a9690, groundF: 0x9a9690
  };
  const keys = ['asphalt', 'highway', 'road', 'pave', 'cobble', 'square', 'path', 'mark', 'curb', 'gutter', 'ground', 'groundF'];
  for (const key of keys) {
    const mt = MAT[key]; if (!mt || !mt.userData.wetDryRoughness) continue;
    const u = mt.userData;
    mt.roughness = THREE.MathUtils.lerp(u.wetDryRoughness, u.wetRoughness, k);
    mt.envMapIntensity = THREE.MathUtils.lerp(u.wetDryEnv, u.wetEnv, k);
    if (wetColors[key] !== undefined) {
      if (!u.wetDryColor) u.wetDryColor = mt.color.clone();
      if (!u.wetColor) u.wetColor = new THREE.Color(wetColors[key]);
      mt.color.copy(u.wetDryColor).lerp(u.wetColor, k);
    }
  }
}
function wxNight() { const h = (typeof gameMin !== 'undefined' ? gameMin : 23 * 60) / 60; return h < 8 || h >= 17.5; }
function wxMode() { const wet = WX.k > 0.08 || WX.wetT > 0, n = wxNight(); return { id: (n ? 'nuit' : 'jour') + (wet ? '-pluie' : ''), label: '', night: n, rain: wet, wx: true }; }
function weatherStep(dt) {
  if (!WX.auto) return;
  WX.t -= dt;
  if (WX.t <= 0) {
    const opts = WXS[WX.state].next, tot = opts.reduce((a, o) => a + o[1], 0); let r = Math.random() * tot, nx = opts[0][0];
    for (const [k, w] of opts) { if ((r -= w) <= 0) { nx = k; break; } }
    if (nx !== WX.state && typeof toast === 'function') toast(WXMSG[nx], 2.5);
    WX.state = nx; WX.target = WXS[nx].rain; WX.t = rnd(150, 420);
  }
  const was = WX.k; WX.k += clamp(WX.target - WX.k, -dt / 25, dt / 25);
  if (WX.k > 0.05) WX.wetT = 90; else if (WX.wetT > 0) WX.wetT -= dt; /* puddles dry slowly */
  const m = wxMode(); if (m.id !== WX.applied) { WX.applied = m.id; applyMode(m); }
  const k = Math.max(0, WX.k);
  const residualWet = WX.wetT > 0 ? 0.28 * (WX.wetT / 90) : 0;
  updateWetSurfaceBlend(Math.max(k, residualWet), MODE.night);
  rain.visible = k > 0.03 && !underRoof(player.x, player.y); rainGeo.setDrawRange(0, Math.round(RAIN * Math.min(1, 0.15 + k)) * 2); rain.material.opacity = 0.12 + 0.3 * k;
  if (scene.fog) scene.fog.density = (MODE.night ? 0.0042 : 0.0026) + k * (MODE.night ? 0.0026 : 0.0028) + (WX.state === 'nuageux' ? 0.0006 : 0);
}
function applyMode(m) {
  if (m.auto) { WX.auto = true; m = wxMode(); WX.applied = m.id; }
  else if (!m.wx) { WX.auto = false; rainGeo.setDrawRange(0, Infinity); rain.material.opacity = 0.32; }
  MODE = m;
  const night = m.night;
  scene.background = night ? (m.rain ? SKY.nightRain : SKY.nightClear) : (m.rain ? SKY.dayRain : (ENV.sky_day || new THREE.Color(0x9ab8d8)));
  scene.environment = night ? ENV.env_night : ENV.env_day;
  const fogC = night ? (m.rain ? 0x1a2030 : 0x121828) : (m.rain ? 0x737f8a : 0x9eafbd);
  scene.fog = new THREE.FogExp2(fogC, night ? (m.rain ? 0.0062 : 0.0042) : (m.rain ? 0.0025 : 0.00145));
  hemi.intensity = night ? 0.25 : (m.rain ? 0.52 : 0.36); hemi.color.set(night ? 0x5a6aa0 : 0xcfe0ff); hemi.groundColor.set(night ? 0x201810 : 0x5a5040);
  sun.color.set(night ? 0x8aa0ff : 0xfff0d8); sun.intensity = night ? 0.35 : (m.rain ? 0.6 : 2.6);
  sun.userData.dir = night ? new THREE.Vector3(-0.4, 0.8, 0.35) : new THREE.Vector3(-0.55, 0.62, 0.45);
  /* Exposure now belongs to the final linear-HDR grade, not the renderer. */
  gradePass.uniforms.exposure.value = night ? 0.92 : (m.rain ? 0.91 : 0.90);
  gradePass.uniforms.contrast.value = night ? 1.06 : (m.rain ? 1.10 : 1.18);
  gradePass.uniforms.saturation.value = night ? 1.04 : (m.rain ? 1.08 : 1.12);
  renderer.toneMappingExposure = 1.0;
  const wet = m.rain;
  for (const mt of allMats) {
    mt.envMapIntensity = night ? 0.42 : 0.9;
    if (mt.userData.facade || mt === MAT.lampHead || (MAT.dormer && MAT.dormer.includes(mt)) || mt.userData.sign) mt.emissiveIntensity = night ? (mt === MAT.lampHead ? 3 : 1.15) : 0;
  }
  if (MAT.dormer) MAT.dormer[1].emissiveIntensity = night ? 1 : 0;
  const ground = ['asphalt', 'highway', 'road', 'pave', 'cobble', 'square', 'path', 'mark', 'curb', 'gutter', 'ground', 'groundF'];
  for (const k of ground) {
    const mt = MAT[k]; if (!mt) continue;
    mt.userData.wetDryRoughness = 1;
    mt.userData.wetRoughness = k === 'mark' ? 0.2 : (k === 'asphalt' || k === 'road' || k === 'highway' ? 0.34 : 0.48);
    mt.userData.wetDryEnv = night ? 0.35 : 0.7;
    mt.userData.wetEnv = night ? 0.82 : 1.05;
    mt.roughness = mt.userData.wetDryRoughness;
    mt.envMapIntensity = mt.userData.wetDryEnv;
  }
  MAT.asphalt.color.set(0x858585); MAT.road.color.set(0x858585); MAT.highway.color.set(0x707070);
  for (const gm of [MAT.ground, MAT.groundF]) if (gm) gm.color.set(MAT.groundAlbedo);
  updateWetSurfaceBlend(WX.auto ? WX.k : (wet ? 1 : 0), night);
  if (typeof ROOMLIT !== 'undefined') ROOMLIT.value = night ? 1.1 : 0.55;
  poolMat.opacity = night ? 1 : 0; poolMat.visible = night;
  streakMesh.visible = night && wet; rain.visible = wet && (!WX.auto || WX.k > 0.03) && !underRoof(player.x, player.y);
  bloom.strength = night ? 0.58 : 0.18; bloom.radius = night ? 0.48 : 0.34; bloom.threshold = night ? 0.86 : 0.94;
  gradePass.uniforms.tint.value.set(...(night ? [0.985, 0.995, 1.025] : (m.rain ? [0.99, 1.0, 1.015] : [1.0, 1.0, 1.0])));
  lampLights.forEach(l => l.visible = night);
}
