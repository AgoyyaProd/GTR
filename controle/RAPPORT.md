# Contrôle automatique — KO

Commit `075f62b` · 2026-11-26 12:47 UTC · chargement 186 s · 0.38 images/s en rendu logiciel

## Bloquant (à corriger avant tout autre changement)
- Fight club ne se termine plus.

## Réserves
- Contrôle incomplet : le script de test n'a pas pu jouer m8, m9 (problème du banc de test, pas forcément du jeu). Ces missions sont marquées « non vérifiée ».
- Place des Lices, escalier, jour : image délavée (luminosité moyenne 0.616, saturation 0.17 ; une photo de rue en plein jour tourne autour de 0,40-0,50 de luminosité et 0,20-0,30 de saturation).
- Halles des Lices, jour : image délavée (luminosité moyenne 0.648, saturation 0.16 ; une photo de rue en plein jour tourne autour de 0,40-0,50 de luminosité et 0,20-0,30 de saturation).

## Missions
| Mission | Résultat |
|---|---|
| Mission 1 | OK |
| Mission 2 | OK |
| Mission 3 | OK |
| Mission 4 | OK |
| Mission 5 | OK |
| Mission 6 | OK |
| Mission 7 | OK |
| Mission 8 | non vérifiée |
| Mission 9 | non vérifiée |
| Fight club | **KO** |

## Accès aux éléments de mission
- OK — Mission 3 : les 3 sacs tirés sont accessibles à pied
- OK — Thabor (à pied, depuis la rue de Paris)
- OK — Thabor (en voiture, depuis le bd de la Duchesse-Anne)

## Vues fixes
Changement = part de l’image qui change nettement par rapport au contrôle précédent (moins de 10 % : anecdotique). Entre parenthèses : écart avec le contrôle précédent.

| Vue | Changement | Luminosité | Contraste | Saturation | Quasi blanc |
|---|---|---|---|---|---|
| Rue Maréchal Joffre, jour | — | 0.554 | 0.257 | 0.25 | 4 % |
| Rue Saint-Michel, jour | — | 0.45 | 0.235 | 0.154 | 2 % |
| Place des Lices, escalier, jour | — | 0.616 | 0.162 | 0.17 | 6 % |
| Halles des Lices, jour | — | 0.648 | 0.189 | 0.16 | 15 % |
| Place des Lices, nuit sous la pluie | — | 0.229 | 0.147 | 0.35 | 0 % |
| Toits du centre vus d’en haut | — | 0.667 | 0.147 | 0.15 | 4 % |

Captures actuelles :

![joffre](vues/joffre.png)
![saint_michel](vues/saint_michel.png)
![lices](vues/lices.png)
![halles](vues/halles.png)
![lices_nuit](vues/lices_nuit.png)
![toits](vues/toits.png)

## Problèmes du script de test (pas du jeu)
```
m8 : Page.evaluate: TypeError: Cannot read properties of undefined (reading 'x')
m9 : Page.evaluate: TypeError: Cannot read properties of undefined (reading 'x')
```

---
Ce rapport est produit par `tests/ci.py` (workflow « Contrôle automatique »). Les règles de travail sont dans `AGENTS.md`.
