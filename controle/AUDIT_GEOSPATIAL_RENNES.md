# GTR — audit géospatial et plan de validation Rennes

## État du dépôt au 27 novembre 2026

- Dépôt : https://github.com/AgoyyaProd/GTR
- Branche de travail : `refonte-01`, issue de `main` au commit `0c2f5b9837af0c49f1cf6507bfc402e514145641`.
- Aucun changement direct sur `main`.
- Les corrections et contrôles ci-dessous sont publiés sur `refonte-01` uniquement.

## Analyse intégrale du fichier OSM fourni

Fichier `map` : 212 028 433 octets, XML OSM 0.6, base OSM `2026-11-24T14:33:49Z`.

Parcours intégral du XML :
- 764 471 nœuds ;
- 115 334 ways ;
- 3 212 relations ;
- 0 référence `nd ref` manquante dans les ways ;
- 2 211 noms distincts de voies portant `highway` et `name` ;
- 958 relations `associatedStreet` ;
- 618 relations `restriction` ;
- 619 multipolygones ;
- 139 relations taguées `boundary`.

L'en-tête `bounds` décrit la fenêtre demandée à Overpass. Des nœuds situés hors de cette fenêtre peuvent être des dépendances géométriques de ways qui traversent l'emprise ; cette différence d'emprise ne prouve donc pas une corruption du fichier. Le contrôle déterminant est la complétude des références et des géométries utiles à la zone de jeu.

### Quartiers : constat critique

Le fichier contient bien les relations de hiérarchie des quartiers rennais :
- relation OSM `5833095`, « Rennes - quartiers » : 12 relations administratives de niveau 10 ;
- relation OSM `6796360`, « Rennes - sous-quartiers » : 45 relations administratives de niveau 11.

Mais l'extrait est incomplet pour une partie de ces frontières :
- quartiers niveau 10 : 7 relations complètes sur 12 ; 5 incomplètes ; 28 ways membres référencés mais absents de l'extrait ;
- sous-quartiers niveau 11 : 38 relations complètes sur 45 ; 7 incomplètes ; 28 ways membres référencés mais absents de l'extrait.

Quartiers niveau 10 incomplets : Bourg l'Évesque - La Touche - Moulin du Comte, Bréquigny, Cleunay - Arsenal-Redon, Maurepas - Patton, Villejean - Beauregard.

Conséquence : il ne faut surtout pas publier ces cinq polygones incomplets ni combler leurs trous par des limites inventées. Il faut récupérer les ways manquants depuis la source OSM correspondante, puis contrôler la fermeture et la validité des multipolygones avant de les utiliser dans le jeu.

Le script reproductible `tests/geospatial_osm.py` mesure ces éléments. Commandes :
```bash
python tests/geospatial_osm.py --input map --output controle/osm-audit.json
python tests/geospatial_osm.py --input map --strict
```
Le mode strict doit échouer sur le fichier fourni tant que les membres de frontières manquants ne sont pas récupérés.

### Restrictions de virage : constat et extraction

Le même extrait contient 618 relations `type=restriction` :
- 610 relations dont tous les membres `from/via/to` sont présents ;
- 8 relations incomplètes ;
- 14 références de membres absentes, correspondant à 12 IDs de ways distincts.

Ces 12 IDs sont distincts des 23 IDs de ways absents des relations de quartiers/sous-quartiers : 35 IDs distincts sont donc à récupérer au total. Les relations peuvent utiliser un nœud ou une way comme membre `via` ; l'extraction conserve les deux formes, les tags de restriction par mode, les exceptions et les restrictions conditionnelles.

`outils/street_osm.py` écrit les relations dans le pickle des détails OSM et dans un sidecar JSON. Un test synthétique vérifie les restrictions classiques, les `via-way`, les restrictions vélo et le signalement des membres manquants.

Un outil de complément ciblé a été ajouté : `outils/complete_osm_extract.py`. Il lit les rapports d'audit, interroge Overpass uniquement pour les ways absents et leurs nœuds, vérifie que toutes les voies demandées sont revenues, puis écrit un nouvel extrait sans modifier `map`.

Exécution depuis un shell Bash, avec le fichier OSM original dans le dossier courant :
```bash
python tests/geospatial_osm.py --input map --output controle/osm-audit.json
GTR_OSM_FILE=map GTR_STREET_OSM_PICKLE=controle/street_osm.pkl python outils/street_osm.py
python outils/complete_osm_extract.py --input map \
  --audit controle/osm-audit.json \
  --restrictions controle/street_osm.restrictions.json \
  --output map-complete.osm
python tests/geospatial_osm.py --input map-complete.osm --strict
```

Le complément n'a pas encore été récupéré depuis Overpass dans cet environnement ; les tests locaux et CI valident le mécanisme de fusion, pas la disponibilité externe du service ni la validité finale des multipolygones.

## Architecture du jeu observée

- `js/core.js` contient le graphe global `GD.g.xy/off/nb/fl`, l'index spatial des nœuds et A*.
- Les tuiles de 200 m contiennent le réseau de rues et ses segments pour collisions, circulation et noms de rues.
- `js/world.js` construit les bâtiments, chaussées, trottoirs, escaliers, murs et géométries depuis `tiles/t*.json`.
- `outils/street_osm.py` ajoute escaliers, barrières, bollards et trottoirs, et extrait maintenant les relations de restriction ; il ne construit pas le graphe routier principal ni les quartiers.
- `outils/complete_osm_extract.py` prépare un extrait OSM complété à partir des rapports, sans écraser la source.
- `outils/streets.py` dimensionne chaussées et trottoirs à partir des routes déjà préconstruites, des bâtiments et des lignes de trottoir OSM.
- `global.json` contient le graphe global et la transformation métrique ; son contenu volumineux n'a pas été exposé par l'API de lecture de fichier utilisée ici.
- `controle/RAPPORT.md` du 26 novembre signale un chargement de 83 s, 0.286 FPS en rendu logiciel et des vues diurnes délavées. Le contrôle existant valide les missions, pas la complétude du graphe OSM ni les frontières des quartiers.

## Corrections de robustesse déjà poussées sur refonte-01

1. `outils/street_osm.py` :
   - source et sortie configurables par `GTR_OSM_FILE` et `GTR_STREET_OSM_PICKLE` ;
   - une way n'est pas utilisée si un seul de ses nœuds référencés manque ;
   - gestion du répertoire de sortie courant.
2. `js/core.js` :
   - `nearestNode` renvoie maintenant `-1` si aucun nœud compatible n'est trouvé, au lieu de renvoyer silencieusement le nœud `0` ;
   - `outEdges` et A* protègent leurs indices.
3. `js/game.js`, `js/actors.js`, `js/life.js`, `js/police.js` :
   - les appelants traitent explicitement l'absence d'ancrage routier ;
   - les points de spawn et de navigation n'utilisent plus le nœud zéro comme faux substitut.

Ces corrections ont été relues depuis GitHub. Elles doivent encore passer la suite navigateur complète avant d'être considérées comme validées.

## Contrôles géospatiaux requis avant la simulation complète

### Réseau routier
- Construire le graphe depuis les nœuds et ways OSM réels ; conserver les identifiants source.
- Respecter `oneway`, `access`, `vehicle`, `motor_vehicle`, `foot`, `bicycle`, `bridge`, `tunnel`, `layer`, `junction=roundabout`, `ford` et relations `restriction` via/from/to.
- Ne pas connecter automatiquement les croisements à niveaux différents.
- Vérifier les composantes connexes, nœuds isolés, voies coupées aux bords des tuiles, impasses et chemins interdits.
- Vérifier les masques piéton / voiture / vélo indépendamment.
- Tester A* avec départ/arrivée hors carte, sans nœud, sur pont, tunnel, escalier, rue à sens unique et composantes déconnectées.

### Quartiers
- Récupérer les 28 ways absents des relations de niveau 10 et les 28 absents du niveau 11 ; dédupliquer les IDs communs.
- Reconstituer outer/inner et multipolygones, vérifier anneaux fermés, validité géométrique, chevauchements et couverture.
- Conserver relation OSM, niveau administratif, nom et hiérarchie parent/enfant.
- Ne rattacher une adresse, un bâtiment ou le joueur à un quartier que par géométrie validée ; les cas ambigus restent signalés.
- Ne pas confondre quartiers administratifs (niveau 10), sous-quartiers (niveau 11), communes et secteurs d'usage.

### Bâtiments et adresses
- Vérifier multipolygones, trous, `building:levels`, `height`, `roof:*`, `min_height`, `building:part` et éviter les doubles extrusions.
- Vérifier `addr:housenumber`, `addr:street`, `addr:place`, `addr:postcode`, `addr:city` et relations `associatedStreet`.
- Contrôler les équipements, parcs, transports, commerces et services à partir des tags présents, sans inventer de données.

### Simulation et rendu
- Positions du joueur, PNJ, véhicules, missions et objectifs dans un référentiel métrique unique.
- Circulation distincte pour piétons, voitures et vélos ; pas de voiture sur escaliers, trottoirs ou voies piétonnes sans règle explicite.
- Spawn et cheminements hors bâtiments, eau et barrières ; passages de clôtures et accès mission conservés.
- Nom de rue et quartier cohérents avec la position.
- Continuité aux frontières de tuiles, ponts, tunnels, murs et passages.
- Tests navigateur : chargement, missions 1–9, fight club, accessibilité, erreurs JS, performances et vues fixes.

## Critères d'acceptation

1. Tous les quartiers utilisés ont des multipolygones complets et valides.
2. Zéro way tronquée silencieusement dans la zone de jeu.
3. Graphe cohérent avec la topologie et les règles d'accès OSM.
4. Les noms de rues, quartiers et positions d'objets sont géographiquement cohérents.
5. Aucune régression sur missions, circulation, collisions, chargement et performances.
6. Rapport automatique attaché au commit de la PR et tests navigateur verts.
7. Aucune fusion dans `main` avant validation.

## Limites restantes

Le fichier OSM joint a été parcouru intégralement et les audits de quartiers et restrictions ont été exécutés localement. Les tests synthétiques de l'extraction et du complément OSM passent dans la CI. Le complément Overpass réel, le mode strict sur l'extrait complété, la génération des tuiles et l'intégration des frontières au runtime restent à faire. La provenance des ways n'est pas conservée dans `global.json` ; les restrictions ne sont donc pas encore appliquées par A*. La PR reste en brouillon jusqu'à validation réelle.


## Générateur candidat du graphe OSM (27 novembre 2026)

Un premier générateur indépendant du runtime a été ajouté : `outils/build_osm_graph.py`.
Il ne remplace pas `global.json` et n'est pas encore chargé par le navigateur.
Son rôle est de produire un graphe vérifiable avec la provenance OSM nécessaire à la suite.

Commande :
```bash
python outils/build_osm_graph.py --input map-complete.osm --output controle/routing-osm.json
```

Format `gtr-osm-routing-graph-v1` :
- nœuds : identifiant OSM, niveau, coordonnées métriques ;
- arêtes dirigées CSR : offsets, destination, masque de modes, longueur et identifiant OSM de la way ;
- métadonnées : classe highway, nom, bridge, tunnel et layer ;
- relations de restriction conservées avec membres from/via/to, variantes par mode et liste des références absentes.

Masques actuels : piéton (1), voiture (2), vélo (4). Le générateur applique les sens uniques OSM, les exceptions vélo explicites et les règles d'accès de base. Les ways sans accès compatible sont écartées. Seuls les niveaux `layer` explicitement renseignés séparent les nœuds. Les tags bridge/tunnel sont conservés comme métadonnées, sans déduire un niveau : cette déduction déconnectait les extrémités partagées des ponts/tunnels avec les voies de raccordement. Les croisements à niveaux différents sans `layer` explicite restent à contrôler dans l'audit topologique.

Limites connues à ce stade :
- ce générateur est une première base de reconstruction, pas encore un moteur de routage certifié ;
- les restrictions sont exportées, mais pas encore compilées en automate de transitions ni appliquées par A* ;
- les accès conditionnels, horaires, exceptions complexes et toutes les subtilités de hiérarchie des tags OSM ne sont pas encore résolus ;
- les ponts/tunnels sans `layer` explicite ne sont pas séparés automatiquement ; les croisements dénivelés mal tagués nécessitent une validation topologique dédiée ;
- la sortie n'a pas encore été exécutée sur l'extrait rennais complété : les ways manquantes doivent d'abord être récupérées et l'audit strict doit réussir.

Le test synthétique `tests/test_build_osm_graph.py` vérifie le CSR, la conservation des identifiants OSM, les sens uniques, les accès et la séparation des niveaux. Il est ajouté au job géospatial CI.
