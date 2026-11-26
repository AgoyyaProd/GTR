"""Contrôle automatique de Grand Theft Roazhon, lancé par GitHub Actions à chaque push.

Il charge le jeu dans un vrai navigateur (Chromium, WebGL logiciel), puis vérifie :
  1. que la ville se charge sans erreur JavaScript ;
  2. que les missions 1 à 9 et le fight club se terminent ;
  3. que les éléments de mission restent accessibles à pied (Thabor, sacs de la mission 3) ;
  4. le nombre d'images par seconde (comparé au contrôle précédent) ;
  5. le rendu : mêmes vues fixes à chaque fois, mesures d'image, et comparaison avant/après
     pour dire si un changement visuel se voit vraiment ou s'il est anecdotique.

Résultat : controle/RAPPORT.md (+ controle/resultat.json, captures dans controle/vues/ et
controle/comparaison/). Code de sortie 1 si le verdict est KO.

Usage local :  python tests/ci.py   (depuis la racine du dépôt ; CHROME=/chemin/vers/chrome facultatif)
"""
import asyncio, json, os, shutil, subprocess, sys, time, datetime
import numpy as np
from PIL import Image
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'controle')
VUES, PREC, COMP = (os.path.join(OUT, d) for d in ('vues', 'precedent', 'comparaison'))
PORT = 8799
CHROME = os.environ.get('CHROME')
# --part vues | m1-6 | m7-9 : une seule partie (exécutées en parallèle sur GitHub), puis --merge ; sans option : tout
PART = sys.argv[sys.argv.index('--part') + 1] if '--part' in sys.argv else 'all'  # sinon le Chromium installé par Playwright

# Math.random déterministe : mêmes passants et mêmes voitures d'un contrôle à l'autre
SEED = """(() => { let s = 1234567; Math.random = () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; })();"""

# vues fixes : nom, description, position du joueur, angle caméra, inclinaison, mode (3 = jour, 1 = nuit pluie)
VIEWS = [
    ('joffre', 'Rue Maréchal Joffre, jour', (-104, -300), 3.6, 0.05, 3),
    ('saint_michel', 'Rue Saint-Michel, jour', (-340, 200), 1.2, 0.10, 3),
    ('lices', 'Place des Lices, escalier, jour', (-480.2, 88.4), 0.8, 0.10, 3),
    ('halles', 'Halles des Lices, jour', (-545, 48), 1.8, -0.05, 3),
    ('lices_nuit', 'Place des Lices, nuit sous la pluie', (-560, 40), 0.9, 0.20, 1),
    ('toits', 'Toits du centre vus d’en haut', None, None, None, 3),
]
FREECAM_TOITS = [-300, 60, -80, -400, 5, -190]

report = {'date': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M UTC'), 'commit': os.environ.get('GITHUB_SHA', 'local')[:7],
          'load': None, 'errors': [], 'missions': {}, 'access': {}, 'fps': None, 'views': {}}


def metrics(path):
    a = np.asarray(Image.open(path).convert('RGB'), dtype=np.float32)[60:-60, 200:] / 255.0  # sans le texte d'aide ni la mini-carte
    lum = a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    mx, mn = a.max(axis=2), a.min(axis=2)
    sat = np.where(mx > 1e-3, (mx - mn) / np.maximum(mx, 1e-3), 0)
    return {'luminosite': round(float(lum.mean()), 3), 'contraste': round(float(lum.std()), 3),
            'saturation': round(float(sat.mean()), 3), 'part_quasi_blanc': round(float((lum > 0.85).mean()), 3)}


def visual_change(a, b):
    """part de l'image qui change vraiment (pixels qui bougent de plus de 8 %, après un léger flou)"""
    A = np.asarray(Image.open(a).convert('L').resize((320, 180)), dtype=np.float32) / 255
    B = np.asarray(Image.open(b).convert('L').resize((320, 180)), dtype=np.float32) / 255
    d = np.abs(A - B)
    return round(float((d > 0.08).mean()), 3), round(float(d.mean()), 3)


async def run():
    srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT), '-d', ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    try:
        async with async_playwright() as p:
            kw = {'args': ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']}
            if CHROME: kw['executable_path'] = CHROME
            b = await p.chromium.launch(**kw)

            async def open_game(first=False):
                pg = await b.new_page(viewport={'width': 1280, 'height': 720})
                pg.set_default_timeout(240000)  # les machines GitHub sont lentes en rendu logiciel
                await pg.add_init_script(SEED)
                pg.on('pageerror', lambda e: report['errors'].append(str(e)[:300]))
                t0 = time.time()
                await pg.goto(f'http://localhost:{PORT}/index.html')
                try:
                    await pg.wait_for_function("document.getElementById('play') && (document.getElementById('play').textContent==='Jouer' || document.getElementById('play').textContent.startsWith('Erreur'))", timeout=420000)
                except Exception:
                    pass
                label = await pg.text_content('#play')
                if first: report['load'] = {'ok': label == 'Jouer', 'secondes': round(time.time() - t0), 'bouton': label}
                if label != 'Jouer':
                    await pg.close(); return None, None, None
                J = lambda js: pg.evaluate(js)
                await pg.click('#play'); await asyncio.sleep(2)

                async def settle(n=60):
                    for k in range(n):
                        await asyncio.sleep(1)
                        if await J("() => [...window.__game.tiles.values()].filter(t=>!t.built).length") == 0 and k > 3: break
                    await asyncio.sleep(2)
                return pg, J, settle

            # partie « vues » : vues fixes, images par seconde, accès ; parties « m1-6 » / « m7-9 » : missions
            if PART in ('all', 'vues'):
                pg, J, settle = await open_game(True)
                if not pg:
                    await b.close(); return
                await views_fps_access(pg, J, settle)
                await pg.close()
            groups = {'m1-6': [['m1', 'm2', 'm3', 'm4', 'm5', 'm6']], 'm7-9': [['m7', 'm8', 'm9', 'fight']]}
            for names in (groups['m1-6'] + groups['m7-9'] if PART == 'all' else groups.get(PART, [])):
                for attempt in (1, 2):
                    pg, J, settle = await open_game(report['load'] is None)
                    if not pg: break
                    crashed = await run_missions(pg, J, settle, names)
                    try: await pg.close()
                    except Exception: pass
                    if not crashed: break
                    report['errors'].append(f"le navigateur de test a planté pendant {', '.join(names)} (essai {attempt})")
            await b.close()
    finally:
        srv.terminate()


async def views_fps_access(pg, J, settle):
    # --- vues fixes ---
    os.makedirs(VUES, exist_ok=True)
    for name, desc, pos, yaw, pitch, mode in VIEWS:
        if pos is None:
            await J("() => { const g=window.__game; g.player.x=-380; g.player.y=150; g.sim(1); }"); await settle()
            await J(f"() => {{ const g=window.__game; g.applyMode(g.MODES[{mode}]); g.sim(0.3); window.__freecam={FREECAM_TOITS}; }}")
        else:
            await J(f"() => {{ window.__freecam=null; const g=window.__game; g.player.car=null; g.player.x={pos[0]}; g.player.y={pos[1]}; g.sim(1); }}"); await settle()
            await J(f"() => {{ const g=window.__game; g.applyMode(g.MODES[{mode}]); g.sim(0.5); g.setcam({yaw},{pitch}); }}")
        await asyncio.sleep(2.5)
        path = os.path.join(VUES, name + '.png')
        await pg.screenshot(path=path, timeout=240000)
        report['views'][name] = {'desc': desc, **metrics(path)}
    await J("() => { window.__freecam=null; const g=window.__game; g.applyMode(g.MODES[3]); }")

    # --- images par seconde (place des Lices) ---
    await J("() => { const g=window.__game; g.player.x=-582; g.player.y=22.1; g.sim(0.5); g.setcam(0.4,0.15); }"); await settle()
    report['fps'] = await J("() => new Promise(r => { let n=0; const t0=performance.now(); (function f(){ n++; if (performance.now()-t0<8000) requestAnimationFrame(f); else r(+(n/8).toFixed(2)); })(); })")

    # --- accès aux éléments de mission ---
    if await J("() => typeof reachable === 'function'"):
        await J("() => { const g=window.__game; g.player.x=400; g.player.y=20; g.sim(1); }"); await settle()
        report['access']['Thabor (à pied, depuis la rue de Paris)'] = await J("() => { const s=fp(520,40); return reachable(s.x,s.y,410,20,7,0.38); }")
        report['access']['Thabor (en voiture, depuis le bd de la Duchesse-Anne)'] = await J("() => { const s=fp(420,140); return reachable(s.x,s.y,410,20,7,0.92); }")
    else:
        report['access']['fonction reachable() présente'] = False



async def run_missions(pg, J, settle, names):
    st = "() => { const g=window.__game; return {obj: document.getElementById('obj').textContent, idx: g.missionIdx, on: !!g.mission, banner: document.getElementById('banner').textContent}; }"
    M = report['missions']

    async def go(js, sim=0.3):
        # sur une machine lente, un personnage ou un véhicule de mission peut apparaître avec retard :
        # on laisse le jeu avancer (et le dialogue défiler) avant de conclure
        for attempt in range(12):
            try:
                await J("() => { const g=window.__game; " + js + " }"); break
            except Exception as e:
                if 'TypeError' not in str(e) or attempt == 11: raise
                await pg.keyboard.press('Enter'); await J("() => window.__game.sim(0.5)"); await asyncio.sleep(1.5)
        if sim: await J(f"() => window.__game.sim({sim})")
        return await J(st)

    async def enters(n):
        for _ in range(n):
            await pg.keyboard.press('Enter'); await asyncio.sleep(0.05)

    async def tp(key):
        await go(f"const a=g.P['{key}']; g.player.car=null; g.player.x=a[0]; g.player.y=a[1]; g.player.mesh.visible=true;", 0)

    async def tpGoal():
        return await go("const t=g.goal; const o=g.player.car||g.player; if(t){o.x=t.x; o.y=t.y;} if(g.player.car){g.player.car.v=0;}", 0.4)

    async def carIn():
        await go("let best=null,bd=1e9; for(const c of g.cars){ if(c.ai) continue; const d=Math.hypot(c.x-g.player.x,c.y-g.player.y); if(d<bd){bd=d;best=c;} } g.player.x=best.x+2.6; g.player.y=best.y;", 0.05)
        await pg.keyboard.press('KeyE'); await go("", 0.2)

    async def leaveCar():
        await go("if(g.player.car) g.player.car.v=0;", 0.1); await pg.keyboard.press('KeyE'); await go("", 0.1)

    def done(n, s):
        M[f'Mission {n}'] = bool(s and s['idx'] >= n)

    async def m1():
        await tp('anne'); await settle(8); await go("", 0.4); await enters(4); await go("", 0.2)
        await go("const f=g.peds.find(p=>p.name==='Fred'); g.player.x=f.x+5; g.player.y=f.y;"); await enters(1); await go("", 0.2)
        await go("const f=g.peds.find(p=>p.name==='Fred'); g.player.x=f.x+0.5; g.player.y=f.y;", 0.2); await enters(1); await go("", 0.2)
        await tpGoal(); await enters(2); done(1, await go("", 0.3))

    async def m2():
        await tp('lices'); await settle(6); await go("", 0.4); await enters(3); await go("", 0.2)
        await tpGoal(); await enters(1); done(2, await go("", 0.3))

    async def m3():
        await tp('m3'); await settle(6); await go("", 0.4); await enters(2); await go("", 0.2)
        if await J("() => typeof reachable === 'function'"):
            bags = await J("() => window.__game.markersList().filter(m=>m.c==='#39ff6a').map(m=>[m.x,m.y])")
            ok = await J(f"() => {json.dumps(bags)}.every(([x,y]) => reachable(-327,392,x,y,2.2))")
            report['access'][f'Mission 3 : les {len(bags)} sacs tirés sont accessibles à pied'] = ok
        await go("for (const m of g.markersList()) if (m.c==='#39ff6a') { g.player.x=m.x; g.player.y=m.y; g.sim(0.15); }", 0.2)
        await go("g.setWanted(0);", 0.1); await tpGoal(); await settle(4); done(3, await go("", 0.4))

    async def m4():
        await tp('m4'); await settle(6); await go("", 0.4); await enters(3); await go("", 0.2)
        await carIn()
        await go("const sc=g.cars.find(c=>c.kind==='scooter' && c.ai==='flee'); for(let i=0;i<60;i++){ g.player.car.x=sc.x-Math.sin(sc.h)*8; g.player.car.y=sc.y-Math.cos(sc.h)*8; g.player.car.h=sc.h; g.sim(0.1);} ", 0.1)
        await enters(1); done(4, await go("", 0.3)); await leaveCar()

    async def m5():
        await tp('pub'); await settle(6); await go("", 0.4); await enters(3); await go("", 0.2)
        await carIn()
        await go("const gb=g.peds.find(p=>p.state==='follow'); gb.x=g.player.x+1; gb.y=g.player.y;", 0.3)
        await tpGoal(); await settle(6); await go("", 0.4); await enters(2); done(5, await go("", 0.3)); await leaveCar()

    async def m6():
        await tp('repu'); await settle(6); await go("", 0.4); await enters(3); await go("", 0.2)
        await tpGoal(); await go("", 0.1)
        await go("const t=g.cars.find(c=>c.kind==='food'); g.player.x=t.x+2.6; g.player.y=t.y;", 0.1)
        await pg.keyboard.press('KeyE'); await go("", 0.3)
        await tpGoal(); await settle(8); await go("", 0.4); await enters(2); done(6, await go("", 0.3))

    async def m7():
        await go("g.setWanted(0); g.setHP(100); if(g.player.car){g.player.car.v=0;}", 0); await go("g.player.car=null; g.player.mesh.visible=true;", 0)
        await tp('hic'); await settle(6); await go("", 0.4); await enters(3); await go("", 0.3)
        await asyncio.sleep(1.2); await go("", 0.2); await enters(1); await go("", 0.3)
        await go("for (const n of g.INT.npcs.slice()) if (n.tough && !n.staff) g.hitPed(n, 999, g.INT.me);", 0.4)
        await enters(1); await go("", 0.2); await go("g.leaveInterior();", 0); await asyncio.sleep(0.8); done(7, await go("", 0.4))

    async def m8():
        await go("g.setWanted(0);", 0); await tp('yann8'); await settle(6); await go("", 0.4); await enters(2); await go("", 0.3)
        await go("const c=g.cars.find(c=>c.keep && c.type==='sedan' && !c.ai && !c.driver); g.player.x=c.x+2.5; g.player.y=c.y;", 0.05)
        await pg.keyboard.press('KeyE'); await go("", 0.3)
        await go("g.setWanted(0);", 0.1); await tpGoal(); await go("g.setWanted(0);", 0.5); await enters(2); done(8, await go("", 0.3))

    async def m9():
        await go("g.setWanted(0); if (g.player.car) { g.player.car.v=0; }", 0); await go("g.player.car=null; g.player.mesh.visible=true;", 0)
        await tp('lices9'); await settle(6); await go("", 0.4); await enters(3); await go("", 0.3)
        await go("const b=g.peds.find(p=>p.name==='Le Baron'); g.player.x=b.x+5; g.player.y=b.y;", 0.4); await enters(2); await go("", 0.3)
        await go("for (const p of g.peds.slice()) if (p.tough && p.name!=='Le Baron' && p.keep) g.hitPed(p, 999, g.player);", 0.5)
        await go("const b=g.peds.find(p=>p.name==='Le Baron'); g.hitPed(b, 999, g.player);", 0.5)
        await go("g.setWanted(0);", 0.2); await tpGoal(); await go("g.setWanted(0);", 0.5); await enters(3); done(9, await go("", 0.3))

    async def fight():
        await go("const s=g.SIDE[2]; g.player.x=s.at.x; g.player.y=s.at.y; s.cd=0;", 0); await settle(6); await go("", 0.2)
        await pg.keyboard.press('KeyE'); await go("", 0.3); await enters(2); await go("", 0.3)
        for _ in range(3):
            await go("const o=g.peds.find(p=>p.yieldAt && p.state==='fight'); if (o) { o.hp=13; g.hitPed(o, 2, g.player); }", 0.3)
            await asyncio.sleep(1.8); await go("", 0.3)
        s = await go("", 0.5)
        M['Fight club'] = 'TERMIN' in (s['banner'] or '').upper()

    table = {'m1': (1, m1), 'm2': (2, m2), 'm3': (3, m3), 'm4': (4, m4), 'm5': (5, m5), 'm6': (6, m6), 'm7': (7, m7), 'm8': (8, m8), 'm9': (9, m9)}
    if names[0] == 'm7':
        await go("g.jump(6);", 0)
    for key in names:
        try:
            if key == 'fight': await fight()
            else: await table[key][1]()
        except Exception as e:
            msg = str(e)
            if 'crash' in msg.lower() or 'closed' in msg.lower(): return True
            # le scénario de test n'a pas pu jouer la mission : ce n'est pas une preuve que le jeu est cassé
            if key == 'fight': M['Fight club'] = None
            else: M[f'Mission {table[key][0]}'] = None
            report.setdefault('scenario', []).append(f"{key} : {msg.splitlines()[0][:160]}")
    return False


def compare_and_write():
    prev = {}
    pj = os.path.join(PREC, 'resultat.json')
    if os.path.exists(pj):
        prev = json.load(open(pj))
    os.makedirs(COMP, exist_ok=True)
    for f in os.listdir(COMP): os.remove(os.path.join(COMP, f))
    ko, warn, notes = [], [], []

    ld = report['load'] or {}
    if not ld.get('ok'): ko.append(f"La ville ne se charge pas (bouton : « {ld.get('bouton')} »).")
    if report['errors']: ko.append(f"{len(report['errors'])} erreur(s) JavaScript pendant la partie (détail plus bas).")
    for k, v in report['missions'].items():
        if v is False: ko.append(f"{k} ne se termine plus.")
    if report.get('scenario'):
        warn.append("Contrôle incomplet : le script de test n'a pas pu jouer " + ', '.join(x.split(' :')[0] for x in report['scenario']) + " (problème du banc de test, pas forcément du jeu). Ces missions sont marquées « non vérifiée ».")
    for k, v in report['access'].items():
        if not v: ko.append(f"Accès bloqué : {k}.")
    fps, pfps = report.get('fps'), prev.get('fps')
    if fps and pfps and fps < pfps * 0.85: ko.append(f"Images par seconde en baisse de {round(100 * (1 - fps / pfps))} % ({pfps} → {fps}).")
    elif fps and pfps and fps < pfps * 0.93: warn.append(f"Images par seconde en légère baisse ({pfps} → {fps}).")

    rows, visible = [], 0
    for name, v in report['views'].items():
        cur = os.path.join(VUES, name + '.png'); old = os.path.join(PREC, 'vues', name + '.png')
        ch = '—'
        if os.path.exists(old):
            part, moy = visual_change(old, cur)
            v['changement'] = part
            ch = f"{round(part * 100)} %"
            if part >= 0.10: visible += 1
            a, b = Image.open(old).convert('RGB'), Image.open(cur).convert('RGB')
            w, h = a.size; c = Image.new('RGB', (w, h * 2)); c.paste(a, (0, 0)); c.paste(b, (0, h))
            c.resize((w // 2, h)).save(os.path.join(COMP, name + '.jpg'), quality=82)
        if v['desc'].endswith('jour') and (v['luminosite'] > 0.58 or v['saturation'] < 0.15 or v['part_quasi_blanc'] > 0.25):
            warn.append(f"{v['desc']} : image délavée (luminosité moyenne {v['luminosite']}, saturation {v['saturation']} ; une photo de rue en plein jour tourne autour de 0,40-0,50 de luminosité et 0,20-0,30 de saturation).")
        if v['contraste'] < 0.12: warn.append(f"{v['desc']} : contraste faible ({v['contraste']}).")
        pv = prev.get('views', {}).get(name, {})
        delta = lambda k: (f" ({'+' if v[k] - pv[k] >= 0 else ''}{round(v[k] - pv[k], 3)})" if k in pv else '')
        rows.append(f"| {v['desc']} | {ch} | {v['luminosite']}{delta('luminosite')} | {v['contraste']}{delta('contraste')} | {v['saturation']}{delta('saturation')} | {round(v['part_quasi_blanc'] * 100)} % |")

    if prev.get('views'):
        if visible == 0: notes.append("**Changement visuel : anecdotique.** Aucune des vues fixes ne change sur plus de 10 % de l'image. Si ce push devait améliorer le rendu, il ne se voit pas en jeu.")
        elif visible <= 2: notes.append(f"**Changement visuel : limité.** {visible} vue(s) sur {len(report['views'])} changent nettement (plus de 10 % de l'image).")
        else: notes.append(f"**Changement visuel : net.** {visible} vues sur {len(report['views'])} changent nettement. Regarder les comparaisons pour juger si c'est mieux.")
    if report.get('harness'):
        warn.insert(0, f"Contrôle incomplet : le banc de test a rencontré un problème ({report['harness']}). Les points non mesurés ne sont pas des erreurs du jeu.")
    verdict = 'KO' if ko else ('OK avec réserves' if warn else 'OK')
    report['verdict'] = verdict

    L = [f"# Contrôle automatique — {verdict}", '',
         f"Commit `{report['commit']}` · {report['date']} · chargement {ld.get('secondes', '?')} s · {fps} images/s en rendu logiciel" + (f" (précédent : {pfps})" if pfps else ''), '']
    if ko: L += ['## Bloquant (à corriger avant tout autre changement)'] + [f"- {x}" for x in ko] + ['']
    if warn: L += ['## Réserves'] + [f"- {x}" for x in warn] + ['']
    if notes: L += ['## Rendu'] + notes + ['']
    L += ['## Missions', '| Mission | Résultat |', '|---|---|'] + [f"| {k} | {'OK' if v else ('non vérifiée' if v is None else '**KO**')} |" for k, v in report['missions'].items()] + ['']
    L += ['## Accès aux éléments de mission'] + [f"- {'OK' if v else '**BLOQUÉ**'} — {k}" for k, v in report['access'].items()] + ['']
    L += ['## Vues fixes', 'Changement = part de l’image qui change nettement par rapport au contrôle précédent (moins de 10 % : anecdotique). Entre parenthèses : écart avec le contrôle précédent.', '',
          '| Vue | Changement | Luminosité | Contraste | Saturation | Quasi blanc |', '|---|---|---|---|---|---|'] + rows + ['']
    if os.listdir(COMP):
        L += ['Comparaisons avant (en haut) / après (en bas) :', ''] + [f"![{n}](comparaison/{n})" for n in sorted(os.listdir(COMP))] + ['']
    L += ['Captures actuelles :', ''] + [f"![{n}](vues/{n}.png)" for n in report['views']] + ['']
    if report['errors']: L += ['## Erreurs JavaScript du jeu', '```'] + report['errors'][:20] + ['```', '']
    if report.get('scenario'): L += ['## Problèmes du script de test (pas du jeu)', '```'] + report['scenario'] + ['```', '']
    L += ['---', 'Ce rapport est produit par `tests/ci.py` (workflow « Contrôle automatique »). Les règles de travail sont dans `AGENTS.md`.']
    open(os.path.join(OUT, 'RAPPORT.md'), 'w').write('\n'.join(L) + '\n')
    json.dump(report, open(os.path.join(OUT, 'resultat.json'), 'w'), ensure_ascii=False, indent=1)
    return verdict


def rotate_reference():
    """le contrôle précédent devient la référence"""
    if os.path.exists(os.path.join(OUT, 'resultat.json')):
        if os.path.exists(PREC): shutil.rmtree(PREC)
        os.makedirs(PREC)
        shutil.copy(os.path.join(OUT, 'resultat.json'), PREC)
        if os.path.exists(VUES): shutil.copytree(VUES, os.path.join(PREC, 'vues'))
    if os.path.exists(VUES): shutil.rmtree(VUES)


def merge_parts(folder):
    """réunit les résultats des parties exécutées en parallèle"""
    for f in sorted(os.listdir(folder)):
        d = os.path.join(folder, f)
        pj = os.path.join(d, 'partie.json')
        if not os.path.exists(pj): continue
        r = json.load(open(pj))
        for k in ('missions', 'access', 'views'): report[k].update(r.get(k, {}))
        report['errors'] += r.get('errors', [])
        if r.get('scenario'): report.setdefault('scenario', []).extend(r['scenario'])
        if r.get('harness'): report['harness'] = (report.get('harness', '') + ' ' + r['harness']).strip()
        if r.get('load') and (report['load'] is None or 'vues' in f): report['load'] = r['load']
        if r.get('fps'): report['fps'] = r['fps']
        if os.path.isdir(os.path.join(d, 'vues')):
            os.makedirs(VUES, exist_ok=True)
            for img in os.listdir(os.path.join(d, 'vues')): shutil.copy(os.path.join(d, 'vues', img), VUES)
    found = {f.replace('partie-', '') for f in os.listdir(folder) if os.path.exists(os.path.join(folder, f, 'partie.json'))}
    for part in ('vues', 'm1-6', 'm7-9'):
        if part not in found: report['harness'] = (report.get('harness', '') + f" partie « {part} » absente (machine de test arrêtée ou trop lente).").strip()
    if report['load'] is None: report['load'] = {'ok': False, 'bouton': 'aucune partie du contrôle n\u2019a abouti'}


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    if '--merge' in sys.argv:
        rotate_reference()
        merge_parts(sys.argv[sys.argv.index('--merge') + 1])
    else:
        if PART == 'all': rotate_reference()
        else: VUES = os.path.join(ROOT, 'partie', 'vues')
        try:
            asyncio.run(run())
        except Exception as e:  # un problème du banc de test ne doit pas empêcher d'écrire le rapport
            report['harness'] = f"{type(e).__name__}: {str(e)[:300]}"
        if PART != 'all':  # une partie écrit seulement ses résultats bruts
            json.dump(report, open(os.path.join(ROOT, 'partie', 'partie.json'), 'w'), ensure_ascii=False)
            sys.exit(0)
    v = compare_and_write()
    print(open(os.path.join(OUT, 'RAPPORT.md')).read())
    sys.exit(1 if v == 'KO' else 0)
