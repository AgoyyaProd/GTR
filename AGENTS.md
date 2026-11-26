# Règles pour les agents qui modifient ce dépôt (ChatGPT / Codex, Claude…)

Grand Theft Roazhon est un jeu type GTA dans le vrai Rennes, en HTML/JS (three.js r128 fourni dans `lib/`),
publié sur https://agoyyaprod.github.io/GTR/ depuis la branche `main`. Lire `LISEZMOI.txt` pour l'architecture.

## Contrôle automatique à chaque push — à lire AVANT tout nouveau travail

Chaque push sur `main` déclenche le workflow **« Contrôle automatique »** (`.github/workflows/controle.yml`).
Il lance le jeu dans de vrais navigateurs (trois machines en parallèle) et publie, environ 20 minutes plus tard, un commit
« Contrôle automatique de <commit> : <verdict> » qui met à jour :

- `controle/RAPPORT.md` : verdict, missions, accès, images par seconde, mesures de rendu ;
- `controle/vues/*.png` : les mêmes vues fixes à chaque contrôle (rue Joffre, rue Saint-Michel, Lices,
  halles, Lices de nuit sous la pluie, toits vus d'en haut) ;
- `controle/comparaison/*.jpg` : avant (en haut) / après (en bas) pour chaque vue.

Avant de commencer un nouveau travail :
1. `git pull` puis lire `controle/RAPPORT.md` et regarder les images de `controle/comparaison/`.
2. Si le verdict est **KO** : corriger d'abord ce qui est listé dans « Bloquant ». Ne rien ajouter d'autre.
3. Si le rapport dit **« Changement visuel : anecdotique »** alors que le but était d'améliorer le rendu :
   le travail n'a pas atteint son objectif. Ne pas le présenter comme réussi ; changer d'approche.
4. Les « Réserves » (image délavée, contraste faible, baisse d'images par seconde) sont des problèmes réels
   à traiter, pas des détails.

Le rapport à lire est celui dont le titre de commit cite **ton dernier commit**. Un nouveau push annule le
contrôle en cours : pousser ses modifications en un seul push (et non commit par commit) évite d'attendre
plusieurs contrôles. Si le rapport n'est pas arrivé 35 minutes après le push, regarder l'onglet Actions.

Un push n'est « fini » que lorsque son contrôle est OK. Toujours partir du dernier commit de `main`
(ne jamais repartir d'un ancien zip : des correctifs ont déjà été perdus de cette façon).

## Ce qui ne doit jamais casser

- Le chargement de la ville (aucune erreur JavaScript). `node --check` ne suffit pas : une variable non
  définie passe la vérification de syntaxe mais bloque le jeu à 0 %.
- Les missions 1 à 9 et le fight club.
- L'accès à pied aux éléments de mission : Thabor ouvert (passages coupés dans les clôtures par
  `outils/gates.py`), sacs de la mission 3 tirés seulement s'ils sont accessibles (`reachable()` dans
  `js/core.js`). Ne pas poser d'objet, de mobilier ou de clôture qui ferme un passage.
- Les performances : ombres un frame sur deux, culling par distance, pools d'objets, LOD.

## Contenu

- Réponses et changelogs en français.
- Kaos, le chien, est le boss. Trafic en version cartoon ; pas de moquerie envers les personnes
  toxicomanes ou sans-abri.
- Pas de contenu copié de Google Street View ; enseignes génériques pour les commerces réels.
- Données © contributeurs OpenStreetMap (ODbL), relief IGN RGE ALTI.

## Vérifier en local

```
pip install playwright pillow numpy && python -m playwright install --with-deps chromium
python tests/ci.py        # produit controle/RAPPORT.md, code de sortie 1 si KO
```
