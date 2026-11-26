# Contrôle automatique — KO

Commit `386ef72` · 2026-11-26 16:08 UTC · chargement 420 s · None images/s en rendu logiciel

## Bloquant (à corriger avant tout autre changement)
- La ville ne se charge pas (bouton : « Construction de Rennes… 0 % »).
- 3 erreur(s) JavaScript pendant la partie (détail plus bas).

## Rendu
**Changement visuel : anecdotique.** Aucune des vues fixes ne change sur plus de 10 % de l'image. Si ce push devait améliorer le rendu, il ne se voit pas en jeu.

## Missions
| Mission | Résultat |
|---|---|

## Accès aux éléments de mission

## Vues fixes
Changement = part de l’image qui change nettement par rapport au contrôle précédent (moins de 10 % : anecdotique). Entre parenthèses : écart avec le contrôle précédent.

| Vue | Changement | Luminosité | Contraste | Saturation | Quasi blanc |
|---|---|---|---|---|---|

Captures actuelles :


## Erreurs JavaScript du jeu
```
edgeH is not defined
edgeH is not defined
edgeH is not defined
```

---
Ce rapport est produit par `tests/ci.py` (workflow « Contrôle automatique »). Les règles de travail sont dans `AGENTS.md`.
