# Étape 1 — rues : profils, carrefours et marquages

## Modifications de code
- `outils/street_osm.py` extrait les voies OSM et leurs tags de largeur, voies, trottoirs et géométrie.
- `outils/street_profiles.py` applique largeur explicite, largeur estimée par nombre de voies, puis profil de repli par classe `highway`.
- `outils/streets.py` raccorde les axes simplifiés des tuiles aux ways OSM nommés, calcule les emprises de chaussée, puis les fusionne avant triangulation.
- `outils/street_geometry.py` formalise la fusion topologique des tronçons qui se recouvrent : les carrefours sont une surface polygonale unifiée.
- `js/world.js` différencie les marquages selon le type et la largeur : lignes axiales, lignes de rive sur les voies larges et séparateurs de voies lorsque la largeur le permet. La phase des tirets reste continue entre les segments.
- Un test géométrique vérifie qu'un carrefour en T produit un polygone valide et connecté.

## Régénération des tuiles
Après tout changement de profils ou de géométrie, exécuter dans cet ordre :
`street_osm.py → streets.py → gates.py → dem_detail3.py`.

Variables attendues : `GTR_ROOT` (racine du jeu) et `GTR_STREET_OSM_PICKLE` (pickle produit par `street_osm.py`). `dem_detail3.py` conserve encore `/home/claude/g2` codé en dur et doit être lancé dans l'environnement où ce chemin est valide, ou adapté avant exécution ailleurs.

## Points à inspecter en jeu
- Rue Saint-Michel : `(-330, 40)` — continuité des rives et marquages.
- Place des Lices : `(-210, 115)` — raccords chaussée/espace piéton.
- Place Sainte-Anne : `(-520, 310)` — carrefour et lignes axiales.
- Place de la République : `(760, -430)` — voirie large, lignes de rive et séparateurs.

## Validation
Les tests géométriques et le contrôle navigateur doivent passer. Les tuiles doivent ensuite être régénérées par Claude avec la chaîne ci-dessus, puis comparées aux vues de `main`. Aucun changement de `game.js`, `life.js` ou `police.js`.
