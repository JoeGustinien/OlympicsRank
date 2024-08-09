# Tableau de Suivi des Médailles Olympiques

Ce projet est une application web simple permettant de suivre le tableau des médailles des Jeux Olympiques. Il récupère les données de médailles via une API, les trie et les affiche dans un tableau interactif.

## Fonctionnalités

- **Affichage des médailles** : Affiche les médailles d'or, d'argent et de bronze, ainsi que le total des médailles pour chaque pays.
- **Tri** : Permet de trier le tableau selon différents critères :
  - **Total** : Tri basé sur le nombre total de médailles.
  - **Pondéré** : Tri basé sur une pondération où l'or vaut 3 points, l'argent 2 points, et le bronze 1 point.
  - **Or** : Tri basé sur le nombre de médailles d'or, puis d'argent, puis de bronze.
- **Émoji de drapeau** : Affiche les drapeaux des pays en utilisant des émojis basés sur les codes ISO 3166-1 alpha-2.

## Utilisation

1. **Chargement des Données** : Lors du chargement de la page, les données des médailles sont automatiquement récupérées depuis l'API et affichées dans un tableau.
2. **Tri des Données** : Utilisez les boutons pour trier le tableau selon vos préférences :
   - Tri par total de médailles
   - Tri pondéré (or : 3 points, argent : 2 points, bronze : 1 point)
   - Tri par nombre de médailles d'or

## Dépendances

- Ce projet utilise l'API des Jeux Olympiques pour récupérer les données en temps réel.