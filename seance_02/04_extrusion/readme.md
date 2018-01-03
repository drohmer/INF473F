# Création par extrusion

Une approche pour construire certaine forme plane en volume consiste à décrire une courbe de bord 2D d'un objet, puis d'extruder celui-ci suivant la direction normale au plan.
Three.js propose la fonctionnalité d'[extrusion](https://threejs.org/docs/#api/geometries/ExtrudeGeometry) par défaut.

Les deux codes suivants proposent
*a. La création et la visualisation d'une forme 2D.
*b. La création d'une forme extrudée et son utilisation dans une animation.


Notez que les formes définies par des contours planaires et d'épaisseurs faibles peuvent être physiquement réalisés par découpage laser dans du bois (le contour doit être sauvegardé au format svg), ce qui est plus simple et rapide à mettre en oeuvre qu'une impression 3D plastique.