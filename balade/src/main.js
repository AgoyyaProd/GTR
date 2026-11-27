// Grand Theft Roazhon — prototype « Rennes photoréaliste »
// Le vrai Rennes (Google Photorealistic 3D Tiles) affiché avec three.js, et une balade à pied.
import * as THREE from 'three';
import { TilesRenderer } from '3d-tiles-renderer';
import { GoogleCloudAuthPlugin } from '3d-tiles-renderer/core/plugins';
import { ReorientationPlugin, GLTFExtensionsPlugin, TilesFadePlugin, TileCompressionPlugin, UnloadTilesPlugin } from '3d-tiles-renderer/plugins';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const DEG = Math.PI / 180;
// Lieux de Rennes (latitude, longitude en degrés)
const LIEUX = {
  'Place Sainte-Anne': [48.11466, -1.68033],
  'Rue Saint-Michel': [48.11380, -1.68110],
  'Place des Lices': [48.11288, -1.68428],
  'Place de la Mairie': [48.11140, -1.67950],
  'Parlement de Bretagne': [48.11220, -1.67631],
  'République': [48.10999, -1.67904],
  'Parc du Thabor': [48.11420, -1.67000],
  'Gare': [48.10350, -1.67230],
};
const ORIGINE = LIEUX['Place Sainte-Anne'];

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
let cle = params.get('key') || localStorage.getItem('gtr_google_key') || '';

function demarrerAvecCle() {
  const v = $('cle').value.trim();
  if (!v) return;
  localStorage.setItem('gtr_google_key', v);
  cle = v; $('ecranCle').style.display = 'none'; lancer();
}
$('valider').onclick = demarrerAvecCle;
$('cle').addEventListener('keydown', (e) => { if (e.key === 'Enter') demarrerAvecCle(); });
$('oublier').onclick = () => { localStorage.removeItem('gtr_google_key'); location.reload(); };
if (cle) { $('ecranCle').style.display = 'none'; lancer(); }

function lancer() {
  const renderer = new THREE.WebGLRenderer({ canvas: $('vue'), antialias: true, logarithmicDepthBuffer: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setSize(innerWidth, innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa9c4dc);
  scene.fog = new THREE.Fog(0xa9c4dc, 600, 4000);
  const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 20000);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x666655, 1.0));

  const tiles = new TilesRenderer();
  tiles.registerPlugin(new GoogleCloudAuthPlugin({ apiToken: cle, autoRefreshToken: true }));
  const draco = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  tiles.registerPlugin(new GLTFExtensionsPlugin({ dracoLoader: draco }));
  tiles.registerPlugin(new TileCompressionPlugin());
  tiles.registerPlugin(new TilesFadePlugin());
  tiles.registerPlugin(new UnloadTilesPlugin());
  tiles.registerPlugin(new ReorientationPlugin({ lat: ORIGINE[0] * DEG, lon: ORIGINE[1] * DEG, height: 0, recenter: true }));
  tiles.errorTarget = 6; // plus fin que le réglage par défaut : on marche au niveau de la rue
  tiles.setCamera(camera);
  tiles.setResolutionFromRenderer(camera, renderer);
  scene.add(tiles.group);

  // Accélération des rayons (sol, murs) sur chaque tuile chargée
  tiles.addEventListener('load-model', ({ scene: s }) => {
    s.traverse((o) => { if (o.isMesh && o.geometry && !o.geometry.boundsTree) o.geometry.computeBoundsTree(); });
  });
  tiles.addEventListener('dispose-model', ({ scene: s }) => {
    s.traverse((o) => { if (o.isMesh && o.geometry && o.geometry.boundsTree) o.geometry.disposeBoundsTree(); });
  });
  tiles.addEventListener('load-error', (e) => { $('etat').textContent = 'Erreur de chargement des tuiles : vérifie la clé API et que « Map Tiles API » est activée.'; console.error(e); });

  // ---- joueur ----
  const joueur = { pos: new THREE.Vector3(0, 400, 0), vy: 0, yaw: 0, pitch: -0.05, auSol: false, vol: false, pose: false };
  const TAILLE = 1.7, RAYON = 0.35;
  const touches = {};
  addEventListener('keydown', (e) => {
    touches[e.code] = true;
    if (e.code === 'KeyF') { joueur.vol = !joueur.vol; joueur.vy = 0; majAide(); }
    if (e.code === 'Space' && joueur.auSol && !joueur.vol) { joueur.vy = 4.5; joueur.auSol = false; }
  });
  addEventListener('keyup', (e) => { touches[e.code] = false; });
  $('vue').addEventListener('click', () => $('vue').requestPointerLock());
  addEventListener('mousemove', (e) => {
    if (document.pointerLockElement !== $('vue')) return;
    joueur.yaw -= e.movementX * 0.0022;
    joueur.pitch = Math.max(-1.45, Math.min(1.45, joueur.pitch - e.movementY * 0.0022));
  });
  addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); tiles.setResolutionFromRenderer(camera, renderer); });

  function versLocal(lat, lon, h) {
    const v = new THREE.Vector3();
    tiles.ellipsoid.getCartographicToPosition(lat * DEG, lon * DEG, h, v);
    tiles.group.updateMatrixWorld(true);
    return v.applyMatrix4(tiles.group.matrixWorld);
  }
  function teleporter(nom) {
    const [lat, lon] = LIEUX[nom];
    const p = versLocal(lat, lon, 0);
    joueur.pos.set(p.x, p.y + 300, p.z); joueur.vy = 0; joueur.pose = false; joueur.auSol = false;
    $('etat').textContent = 'Chargement de ' + nom + '…';
  }
  const sel = $('lieux');
  for (const nom of Object.keys(LIEUX)) { const o = document.createElement('option'); o.textContent = nom; sel.appendChild(o); }
  sel.onchange = () => { teleporter(sel.value); sel.blur(); };

  const ray = new THREE.Raycaster(); ray.firstHitOnly = true;
  const BAS = new THREE.Vector3(0, -1, 0);
  function sol(x, y, z, depuis = 2.5) {
    ray.set(new THREE.Vector3(x, y + depuis, z), BAS); ray.far = depuis + 600;
    const h = ray.intersectObject(tiles.group, true)[0];
    return h ? h.point.y : null;
  }
  function bloque(from, dir, dist) {
    ray.set(from, dir); ray.far = dist + RAYON;
    return ray.intersectObject(tiles.group, true).length > 0;
  }

  function majAide() {
    $('aide').innerHTML = 'Clic : prendre la souris · ZQSD/WASD : marcher · Maj : courir · Espace : sauter · F : ' +
      (joueur.vol ? '<b>vol (actif)</b>' : 'vol') + ' · Échap : libérer la souris';
  }
  majAide();

  const horloge = new THREE.Clock();
  const avant = new THREE.Vector3(), droite = new THREE.Vector3(), dep = new THREE.Vector3();
  function boucle() {
    const dt = Math.min(horloge.getDelta(), 0.05);
    // déplacement
    avant.set(-Math.sin(joueur.yaw), 0, -Math.cos(joueur.yaw));
    droite.set(-avant.z, 0, avant.x);
    dep.set(0, 0, 0);
    if (touches.KeyW || touches.KeyZ || touches.ArrowUp) dep.add(avant);
    if (touches.KeyS || touches.ArrowDown) dep.sub(avant);
    if (touches.KeyD || touches.ArrowRight) dep.add(droite);
    if (touches.KeyA || touches.KeyQ || touches.ArrowLeft) dep.sub(droite);
    const vit = joueur.vol ? (touches.ShiftLeft ? 60 : 18) : (touches.ShiftLeft ? 6.5 : 1.6);
    if (dep.lengthSq() > 0) {
      dep.normalize().multiplyScalar(vit * dt);
      if (joueur.vol) {
        joueur.pos.add(dep);
      } else if (joueur.pose) {
        const tete = joueur.pos.clone(); tete.y += 1.0;
        const d = dep.clone().normalize();
        if (!bloque(tete, d, dep.length())) {
          // pas de mur à hauteur de hanche : on avance, en suivant les marches de 40 cm au plus
          const nx = joueur.pos.x + dep.x, nz = joueur.pos.z + dep.z;
          const g = sol(nx, joueur.pos.y, nz, 0.45);
          if (g === null || g <= joueur.pos.y + 0.45) { joueur.pos.x = nx; joueur.pos.z = nz; }
        }
      }
    }
    if (joueur.vol) {
      if (touches.Space) joueur.pos.y += vit * dt;
      if (touches.ControlLeft || touches.KeyC) joueur.pos.y -= vit * dt;
    } else {
      const g = sol(joueur.pos.x, joueur.pos.y, joueur.pos.z, joueur.pose ? 0.6 : 600);
      if (g !== null) {
        if (!joueur.pose) { joueur.pos.y = g; joueur.pose = true; $('etat').textContent = ''; }
        joueur.vy -= 9.8 * dt;
        joueur.pos.y += joueur.vy * dt;
        if (joueur.pos.y <= g) { joueur.pos.y = g; joueur.vy = 0; joueur.auSol = true; }
      } else if (!joueur.pose) {
        $('etat').textContent = $('etat').textContent || 'Chargement de la ville…';
      }
    }
    camera.position.set(joueur.pos.x, joueur.pos.y + (joueur.vol ? 0 : TAILLE), joueur.pos.z);
    camera.rotation.set(joueur.pitch, joueur.yaw, 0, 'YXZ');
    camera.updateMatrixWorld();
    tiles.update();
    renderer.render(scene, camera);
    // attribution obligatoire (Google + fournisseurs de données)
    const att = tiles.getAttributions().filter((a) => a.type === 'string').map((a) => a.value).join(' · ');
    $('credits').textContent = att ? 'Google · ' + att : 'Google';
    requestAnimationFrame(boucle);
  }
  boucle();
}
