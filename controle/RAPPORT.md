# Contrôle automatique — OK avec réserves

Commit `8ffd17d` · 2026-11-26 15:56 UTC · chargement 142 s · 0.198 images/s en rendu logiciel

## Réserves
- Rue Saint-Michel, jour : image délavée (luminosité moyenne 0.611, saturation 0.184 ; une photo de rue en plein jour tourne autour de 0,40-0,50 de luminosité et 0,20-0,30 de saturation).
- Place des Lices, escalier, jour : image délavée (luminosité moyenne 0.631, saturation 0.172 ; une photo de rue en plein jour tourne autour de 0,40-0,50 de luminosité et 0,20-0,30 de saturation).
- Halles des Lices, jour : image délavée (luminosité moyenne 0.634, saturation 0.18 ; une photo de rue en plein jour tourne autour de 0,40-0,50 de luminosité et 0,20-0,30 de saturation).

## Rendu
Images par seconde : 0.198 sur une machine de vitesse 13.091 (référence en construction, 0/3 contrôles).
**Changement visuel : limité.** 1 vue(s) sur 6 changent nettement (plus de 10 % de l'image).

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
| Mission 8 | OK |
| Mission 9 | OK |
| Fight club | OK |

## Accès aux éléments de mission
- OK — Mission 3 : les 3 sacs tirés sont accessibles à pied
- OK — Thabor (à pied, depuis la rue de Paris)
- OK — Thabor (en voiture, depuis le bd de la Duchesse-Anne)

## Vues fixes
Changement = part de l’image qui change nettement par rapport au contrôle précédent (moins de 10 % : anecdotique). Entre parenthèses : écart avec le contrôle précédent.

| Vue | Changement | Luminosité | Contraste | Saturation | Quasi blanc |
|---|---|---|---|---|---|
| Rue Maréchal Joffre, jour | 17 % | 0.519 (-0.008) | 0.232 (+0.004) | 0.27 (+0.003) | 4 % |
| Rue Saint-Michel, jour | 0 % | 0.611 (+0.0) | 0.193 (+0.0) | 0.184 (+0.0) | 10 % |
| Place des Lices, escalier, jour | 0 % | 0.631 (+0.0) | 0.155 (+0.0) | 0.172 (+0.0) | 8 % |
| Halles des Lices, jour | 5 % | 0.634 (-0.015) | 0.197 (+0.016) | 0.18 (+0.021) | 17 % |
| Place des Lices, nuit sous la pluie | 3 % | 0.274 (+0.0) | 0.156 (+0.0) | 0.376 (+0.0) | 0 % |
| Toits du centre vus d’en haut | 0 % | 0.666 (+0.0) | 0.149 (+0.0) | 0.151 (+0.0) | 4 % |

Comparaisons avant (en haut) / après (en bas) :

![halles.jpg](comparaison/halles.jpg)
![joffre.jpg](comparaison/joffre.jpg)
![lices.jpg](comparaison/lices.jpg)
![lices_nuit.jpg](comparaison/lices_nuit.jpg)
![saint_michel.jpg](comparaison/saint_michel.jpg)
![toits.jpg](comparaison/toits.jpg)

Captures actuelles :

![joffre](vues/joffre.png)
![saint_michel](vues/saint_michel.png)
![lices](vues/lices.png)
![halles](vues/halles.png)
![lices_nuit](vues/lices_nuit.png)
![toits](vues/toits.png)

---
Ce rapport est produit par `tests/ci.py` (workflow « Contrôle automatique »). Les règles de travail sont dans `AGENTS.md`.
