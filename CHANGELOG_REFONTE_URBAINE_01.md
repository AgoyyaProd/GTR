# Refonte urbaine — correction structurelle 01

## Fichier modifié
- `js/world.js`

## Corrections
- Mesure de la hauteur de rive de chaque segment de façade à partir des sommets du maillage CityJSON (tolérance de 22 cm).
- Les bandeaux d'étage, corniches, encadrements de fenêtres et descentes pluviales utilisent cette hauteur locale plutôt que la hauteur maximale globale du bâtiment.
- Les corniches retrouvent le segment correspondant à leur indice d'origine, même si une arête dégénérée a été écartée.
- Les fascias des toitures inclinées ne sont plus posés sur les rampants obliques des pignons ; seules les rives quasi horizontales sont habillées.

## Points précis à inspecter en jeu
- Rue Saint-Michel : façades à pignons, fenêtres du dernier étage, corniches.
- Place des Lices : bâtiments mitoyens, raccords murs/toitures.
- Halles Martenot : vérifier que le générateur spécifique des Halles reste inchangé.
- Vue aérienne des toits du centre : rampants, arêtes de rive, traits parasites et cheminées.
- Rue Maréchal-Joffre : toitures plates et transitions entre styles.

## Invariants
Aucune modification des données OSM/CityJSON, du relief IGN, des empreintes, des collisions, des missions, des véhicules ou de la circulation. Les éléments restent regroupés dans les buckets géométriques existants ; aucun Mesh supplémentaire par bâtiment.
