# Séparation en différents fichiers

Lorsqu'un code devient très volumineux, il peut être intéressant de le scinder en différents fichiers. Idéalement, chaque fichier regroupe des fonctionnalités modélisant une partie spécifique de la manière la plus indépendante possible.

Le code suivant scinde le programme en deux fichiers.
* Le fichier scene.js contient la mise en place spécifique de la scène et de ses objets.
* Le fichier sceneInit.js contient les fonctions que l'on réutilise classiquement permettant d'initialiser une scène vide par défaut.

__Q.__ Observez la séparation du code en deux fichiers.
