# Étape 1 — rues : profils, carrefours et marquages

## Modifications de code
- `outils/street_osm.py` extrait les ways OSM et leurs tags de largeur, voies, trottoirs, surface, sens, pont et tunnel.
- `outils/street_profiles.py` applique largeur explicite, largeur estimée par nombre de voies, puis profil de repli par classe `highway`.
- `outils/streets.py` raccorde les axes des tuiles aux ways OSM nommés ; les voies sans nom ne sont appariées qu'à très courte distance et avec une orientation compatible, pour éviter de récupérer le profil d'une rue parallèle.
- `outils/street_geometry.py` formalise la fusion topologique des emprises qui se recouvrent ; les surfaces de carrefour sont fusionnées avant triangulation.
- `js/world.js` différencie les marquages selon le type et la largeur : lignes axiales, rives des chaussées larges et séparateurs de voies, avec phase de tirets continue le long des segments.
- `js/world.js` améliore les ponts : sous-face de tablier, fascia latéral et parapets d'environ 1,05 m au-dessus du tablier. L'ancien mur plein de 2 m descendant 1 m sous la chaussée est remplacé par une structure plus proche d'un tablier de pont.

## Régénération des tuiles
Après tout changement de profils ou de géométrie, exécuter dans cet ordre :
`street_osm.py → streets.py → gates.py → dem_detail3.py`.

Variables attendues : `GTR_ROOT` (racine du jeu) et `GTR_STREET_OSM_PICKLE` (pickle produit par `street_osm.py`). `dem_detail3.py` conserve encore `/home/claude/g2` codé en dur et doit être lancé dans l'environnement où ce chemin est valide, ou adapté avant exécution ailleurs.

## Points à inspecter en jeu
- Rue Saint-Michel : `(-330, 40)` — largeur, trottoirs et continuité des rives.
- Place des Lices : `(-210, 115)` — raccords chaussée/espace piéton et carrefour.
- Place Sainte-Anne : `(-520, 310)` — raccords de branches et marquages.
- Place de la République : `(760, -430)` — voirie large et marquages longitudinaux.
- Ponts sur la Vilaine : inspecter tabliers, sous-faces, chants latéraux et parapets ; vérifier les raccords aux deux culées.

## Validation
Le CI doit passer. Les tuiles doivent être régénérées par Claude avec la chaîne ci-dessus, puis les vues navigateur comparées à `main`. Le rendu des ponts modifié dans `world.js` ne nécessite pas de recalcul OSM, mais doit être vérifié dans le navigateur. Aucun changement de `game.js`, `life.js` ou `police.js`.
