# GTR — audit géospatial et plan de validation Rennes

## État du dépôt au 26 novembre 2026

- Dépôt : https://github.com/AgoyyaProd/GTR
- Branche de travail : `refonte-01`
- Commit de départ observé : `be26c930fe821bc1e513854432902af5858879b5`
- Base : `main` au commit `0c2f5b9837af0c49f1cf6507bfc402e514145641`
- Aucun changement sur `main`.
- Une première correction de l'extracteur de détails OSM a été poussée sur `refonte-01` : `a431c9a03fc275f5d642ee5ffe29625bf54c7840`.

## Données jointes

Le fichier `map` est un export OSM XML de 212 028 433 octets. Son en-tête annonce une emprise de 48.0780800–48.1443300 N et -1.7214200–-1.6137900 E, avec une date de base OSM 2026-11-24T14:33:49Z. En parcourant toutes les entités, les coordonnées réelles observées vont de 48.0165562 à 48.1644587 N et -1.7570454 à -1.5594194 E : elles dépassent donc nettement les bounds déclarés dans le XML. Le fichier contient 764 471 nœuds, 115 334 voies et 3 212 relations. Ces totaux sont issus d'un parcours XML intégral.

À contrôler avant toute intégration :
- Pourquoi des nœuds se trouvent-ils hors de l'élément `bounds` ?
- Vérifier l'intégrité de toutes les références `nd ref` et `member ref`, y compris le sens d'ordre des entités XML.
- Filtrer explicitement Rennes et les zones réellement visées par la map finale. L'extraction régionale ne doit pas décaler l'origine métrique du jeu ni gonfler l'emprise de jeu.
- Les relations d'administration et de quartiers sont une source différente des limites de rendu. Ne pas inventer de frontières de quartiers à partir de couleurs de façades.

## Architecture existante observée

- `js/core.js` contient un graphe routier global (`GD.g.xy/off/nb/fl`), une recherche A* et un index spatial des nœuds. `nearestNode` cherche dans un rayon progressif et retourne actuellement `0` même si aucun nœud valable n'a été trouvé : vérifier et remplacer par un échec explicite / null, puis protéger les appelants.
- `js/core.js` indexe les tuiles de 200 m et leurs segments pour collisions et noms de rues.
- `js/world.js` construit les bâtiments, les chaussées, trottoirs, escaliers, murs et géométries à partir de `tiles/t*.json`.
- `outils/street_osm.py` extrait aujourd'hui escaliers, barrières, bollards et trottoirs. Il ne produit pas les rues ni les quartiers : ceux-ci sont dans les données préconstruites / d'autres étapes du pipeline.
- `outils/streets.py` recalcule largeur des chaussées et trottoirs à partir des voies routières déjà présentes dans les tuiles, des empreintes bâties et de lignes de trottoirs OSM.
- `global.json` contient le réseau global et la transformation des coordonnées, mais l'API de récupération du connecteur n'a pas rendu son contenu (fichier volumineux). Il faut l'inspecter depuis un clone Git ou un téléchargement de contenu dédié.
- Le contrôle courant `controle/RAPPORT.md` du 26 novembre indique « OK avec réserves », missions 1–9 et fight club OK, mais une réserve sévère de performance en rendu logiciel (0.286 FPS) ainsi que des vues de jour délavées. Ce rapport ne teste pas la complétude OSM ou la topologie du réseau de rues.

## Correction déjà appliquée

Dans `outils/street_osm.py` :
- chemin OSM configurable via `GTR_OSM_FILE` ;
- chemin de sortie configurable via `GTR_STREET_OSM_PICKLE` ;
- une voie n'est retenue que si tous les nœuds référencés sont résolus, plutôt que d'accepter silencieusement une voie amputée ;
- aucun changement du référentiel métrique historique du jeu.

Cette correction n'est pas encore exécutée sur le fichier joint ni couverte par un contrôle réel. Elle ne constitue pas une validation fonctionnelle.

## Contrôles géospatiaux à automatiser

### A. Import OSM et référentiel
- Parser streaming sans perte de références ; mesurer le taux de références manquantes par type d'objet.
- Vérifier bornes, origine, conversion WGS84 vers plan métrique local ; quantifier erreur d'aller-retour en mètres.
- Détecter lat/lon invalides, doublons d'identifiants, géométries dégénérées et voies tronquées.
- Produire un rapport par familles : voies, bâtiments, adresses, points d'intérêt, espaces verts, hydrographie, ferroviaire, arrêts, limites administratives et quartiers.
- Respecter les mentions ODbL et conserver attribution/provenance/date de base.

### B. Rues et réseau routier
- Construire un graphe par nœuds OSM réels et voies, sans raccorder deux segments simplement parce qu'ils se croisent géométriquement à des niveaux différents.
- Respecter `oneway`, `oneway:bicycle`, `access`, `vehicle`, `motor_vehicle`, `foot`, `bicycle`, `service`, `junction=roundabout`, `bridge`, `tunnel`, `layer`, `ford`, restrictions OSM `type=restriction` et relations via/from/to.
- Distinguer carrefour réel, pont, passage souterrain, voie privée, chemin, escalier, piste cyclable, rue piétonne et voie de service.
- Vérifier que les noms de rues utilisent `name`, `name:fr`, `ref` et références de route de façon déterministe, avec gestion des voies sans nom.
- Vérifier toutes les connexions de tuiles aux bords (aucun segment coupé entre tuiles de 200 m).
- A* : départ/arrivée invalides, nœuds isolés, composantes, chemins impossibles, restrictions de virage, impasses et accès piéton.
- Tests de trajets ancrés sur plusieurs secteurs : centre historique, gare, Villejean, Le Blosne, Cleunay, Beauregard, Thabor, campus, rocade. Les points doivent être pris dans les données effectives, pas estimés au hasard.

### C. Quartiers
- Identifier la source officielle/OSM des quartiers et la nature de chaque relation (administrative, subarea, boundary, neighbourhood, quarter).
- Ne pas confondre communes de Rennes Métropole, quartiers administratifs, lieux-dits et quartiers d'usage.
- Reconstituer les multipolygones avec outer/inner, anneaux fermés et rôles valides.
- Contrôler validité géométrique, intersections, trous, chevauchements, zones non couvertes et doublons de nom.
- Définir une règle de rattachement déterministe d'une adresse / d'un bâtiment / d'un point au quartier (point intérieur ou plus grande intersection), et garder les cas ambigus.
- Afficher / interroger le quartier réel dans le jeu ; les teintes de façade heuristiques du rendu ne sont pas un système de quartiers.

### D. Bâtiments, adresses et objets de ville
- Bâtiments : empreinte et multipolygone, trous, niveaux `building:levels`, `height`, `roof:*`, `min_height`, `building:part`; pas de double extrusion des parties.
- Adresses : `addr:housenumber`, `addr:street`, `addr:place`, `addr:postcode`, `addr:city`, nœuds/voies/relations `associatedStreet`; détection des orphelins.
- Équipements : commerces, services, écoles, hôpitaux, transports, parcs, mobilier et patrimoine, avec catégories OSM sans inventer des attributs absents.

### E. Jeu et simulation
- Positions du joueur, PNJ, véhicules, missions, commerces et objectifs alignées sur le référentiel carte.
- Circulation véhicule et piéton avec masques d'accès distincts ; voiture interdite sur escalier, trottoir ou voie piétonne sauf exception taguée.
- Passants sur surfaces piétonnes réellement accessibles ; spawn sans bâtiments, eau ou barrières.
- Détection du nom de rue et du quartier cohérente avec la position et sans sauts entre segments proches.
- Collision et cheminement cohérents aux frontières de tuiles, ponts, tunnels, clôtures et passages.
- Validation missions 1–9 et fight club conservée ; tester les points d'accès et leurs reachability.
- Rendu distant et proche, chargement/déchargement de tuiles, mémoire, appels draw, FPS sur matériel comparable et navigateur.

## Critères d'acceptation « simulation de Rennes »
1. Couverture intra-Rennes explicitement cartographiée et quantifiée.
2. Zéro voie routière tronquée silencieusement dans la zone de jeu.
3. Graphe topologiquement cohérent avec les règles d'accès et restrictions OSM.
4. Quartiers issus de polygones de référence identifiés, sans partition inventée.
5. Aucun décalage systématique entre carte, bâtiments, routes, joueurs et objectifs.
6. Rapport de tests automatisés, fixtures de cas OSM difficiles et parcours navigateur.
7. Pas de fusion dans `main` tant que toutes les validations cartographiques et de jeu ne sont pas vertes.

## Limites de cette passe

L'environnement courant permet de lire le dépôt et le fichier source, mais pas de lancer le projet complet dans un navigateur ni d'exécuter le pipeline générateur de tuiles dépendant de ses chemins et environnements de build historiques. Le contenu de certains fichiers binaires/JSON volumineux, dont `global.json`, n'est pas servi en texte par l'API de fichier du connecteur. Il manque donc encore une inspection locale du clone et une exécution du contrôle navigateur. Ne pas déclarer la simulation géographique validée avant ces étapes.
