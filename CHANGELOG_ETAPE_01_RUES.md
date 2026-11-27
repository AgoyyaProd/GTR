# Étape 1 — rues : profils OSM et largeurs

## Modifications
- \`outils/street_osm.py\` extrait désormais les voies OSM avec leurs identifiants, géométries et tags \`highway\`, \`width\`, \`est_width\`, \`lanes\`, \`sidewalk\`, \`surface\`, \`oneway\`, \`layer\`, \`bridge\` et \`tunnel\`.
- \`outils/street_profiles.py\` convertit les largeurs explicites, calcule une largeur depuis \`lanes\` en leur absence, puis applique un profil de repli par classe \`highway\`.
- Les tags de trottoir gauche/droite sont conservés séparément ; une absence de donnée n'est pas confondue avec un trottoir explicitement absent.

## Points à inspecter en jeu
- Rue Saint-Michel : \`(-330, 40)\` — rue ancienne et continuité des trottoirs.
- Place des Lices : \`(-210, 115)\` — raccords chaussée/espace piéton.
- Place Sainte-Anne : \`(-520, 310)\` — largeur des rues adjacentes.
- Place de la République : \`(760, -430)\` — voirie structurante et carrefours.

## Limite
Cette étape extrait et teste les profils ; leur appariement aux lignes simplifiées des tuiles et le rendu des polygones d'intersection doivent encore être intégrés et vérifiés en navigateur. Aucun changement de \`game.js\`, \`life.js\` ou \`police.js\`.
