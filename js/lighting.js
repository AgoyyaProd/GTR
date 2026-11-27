'use strict';
/* LOT A: physical sky and HDR image-based lighting, layered over the existing
   linear-light composer. All HDR resources are loaded once at startup. */
const hdrLoader = new THREE.RGBELoader().setDataType(THREE.HalfFloatType);
let horizonDay = null;
const physicalSky = new THREE.Sky();
physicalSky.scale.setScalar(10000);
physicalSky.visible = false;
physicalSky.frustumCulled = false;
physicalSky.onBeforeRender = function (_renderer, _scene, activeCamera) {
  this.position.copy(activeCamera.position);
};
scene.add(physicalSky);

function hdrHorizonColor(texture) {
  const image = texture && texture.image;
  if (!image || !image.data || !image.width || !image.height) return null;
  const data = image.data;
  const channels = data.length / (image.width * image.height);
  const row = Math.max(0, Math.min(image.height - 1, Math.floor(image.height * 0.5)));
  let r = 0, g = 0, b = 0, n = 0;
  for (let x = 0; x < image.width; x += 4) {
    const i = (row * image.width + x) * channels;
    let rr, gg, bb;
    if (texture.type === THREE.HalfFloatType && channels >= 3) {
      rr = THREE.DataUtils.fromHalfFloat(data[i]);
      gg = THREE.DataUtils.fromHalfFloat(data[i + 1]);
      bb = THREE.DataUtils.fromHalfFloat(data[i + 2]);
    } else if (channels >= 4) {
      const scale = Math.pow(2, data[i + 3] - 128) / 255;
      rr = data[i] * scale; gg = data[i + 1] * scale; bb = data[i + 2] * scale;
    } else continue;
    if (Number.isFinite(rr + gg + bb)) { r += rr; g += gg; b += bb; n++; }
  }
  if (!n) return null;
  return new THREE.Color().setRGB(r / n, g / n, b / n);
}

async function loadEnvironments(progress) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  async function loadHDR(file, fallback, key) {
    try {
      const hdr = await hdrLoader.loadAsync(file);
      hdr.mapping = THREE.EquirectangularReflectionMapping;
      if (key === 'sky_horizon') {
        horizonDay = hdrHorizonColor(hdr);
        hdr.dispose();
        progress && progress(key);
        return null;
      }
      const target = pmrem.fromEquirectangular(hdr);
      hdr.dispose();
      progress && progress(key);
      return target.texture;
    } catch (error) {
      console.warn('HDR indisponible, retour à l’environnement JPEG : ' + file, error);
      const texture = await loadTex(fallback, true);
      if (!texture) return null;
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      const target = pmrem.fromEquirectangular(texture);
      texture.dispose();
      progress && progress(key + ' (secours)');
      return target.texture;
    }
  }
  try {
    const results = await Promise.all([
      loadHDR('tex/hdr/jour_rue.hdr', 'tex/env_day.jpg', 'env_day'),
      loadHDR('tex/hdr/nuit_ciel.hdr', 'tex/env_night.jpg', 'env_night'),
      loadHDR('tex/hdr/jour_ciel.hdr', 'tex/sky_day.jpg', 'sky_horizon')
    ]);
    ENV.env_day = results[0];
    ENV.env_night = results[1];
    ENV.sky_day = await loadTex('tex/sky_day.jpg', true);
  } finally {
    pmrem.dispose();
  }
}

function solarDirection(hour) {
  /* Equinox approximation at Rennes (48.117° N); game time drives the sun. */
  const lat = 48.1173 * Math.PI / 180;
  const declination = 0;
  const hourAngle = (hour - 12) * Math.PI / 12;
  const east = -Math.cos(declination) * Math.sin(hourAngle);
  const up = Math.sin(lat) * Math.sin(declination)
    + Math.cos(lat) * Math.cos(declination) * Math.cos(hourAngle);
  const north = Math.cos(lat) * Math.sin(declination)
    - Math.sin(lat) * Math.cos(declination) * Math.cos(hourAngle);
  return new THREE.Vector3(east, Math.max(0.08, up), -north).normalize();
}

function updatePhysicalSky(mode) {
  if (!mode || mode.night) {
    physicalSky.visible = false;
    return;
  }
  const hour = mode.wx || mode.auto
    ? ((typeof gameMin === 'number' ? gameMin : 12 * 60) / 60)
    : 12;
  const direction = solarDirection(hour);
  const uniforms = physicalSky.material.uniforms;
  uniforms.sunPosition.value.copy(direction).multiplyScalar(450000);
  uniforms.turbidity.value = mode.rain ? 3.8 : 2.2;
  uniforms.rayleigh.value = mode.rain ? 1.7 : 2.0;
  uniforms.mieCoefficient.value = mode.rain ? 0.0035 : 0.0018;
  uniforms.mieDirectionalG.value = 0.82;
  physicalSky.visible = true;
  scene.background = null;
  sun.userData.dir = direction;
  /* Slightly restrain direct daylight; the HDR environment now supplies fill light. */
  sun.intensity = mode.rain ? 0.42 : 1.35;
  hemi.intensity = mode.rain ? 0.34 : 0.28;
  if (scene.fog && horizonDay) {
    const horizon = horizonDay.clone().multiplyScalar(mode.rain ? 0.16 : 0.20);
    horizon.clampScalar(0, 0.62);
    if (mode.rain) horizon.lerp(new THREE.Color(0x687b8b), 0.28);
    scene.fog.color.copy(horizon);
  }
}

const originalApplyMode = applyMode;
applyMode = function (mode) {
  originalApplyMode(mode);
  updatePhysicalSky(MODE);
};

/* Optional high-quality AO. Kept off by default and inserted before the final
   filmic/sRGB grade so the post-processing chain remains colorimetrically valid. */
const saoPass = new THREE.SAOPass(scene, camera, false, false, new THREE.Vector2(256, 256));
saoPass.enabled = false;
saoPass.params.saoIntensity = 0.14;
saoPass.params.saoKernelRadius = 28;
saoPass.params.saoBlurRadius = 4;
composer.insertPass(saoPass, composer.passes.indexOf(gradePass));
const aoControl = document.getElementById('aoQuality');
if (aoControl) aoControl.addEventListener('change', function () {
  saoPass.enabled = !!this.checked;
});
