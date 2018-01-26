# Création par extrusion

Une approche pour donner du volume à une forme plane consiste à décrire sa courbe de bord 2D, puis d'extruder celle-ci, c'est à dire la translater selon un vecteur donné pour former un volume.
Three.js propose la fonctionnalité d'[extrusion](https://threejs.org/docs/#api/geometries/ExtrudeGeometry) par défaut.

Les deux codes suivants proposent
*a. La création et la visualisation d'une forme 2D.
*b. La création d'une forme extrudée et son utilisation dans une animation.


Notez que les formes définies par des contours planaires et d'épaisseurs faibles peuvent être physiquement réalisées par découpage laser dans du bois (le contour doit être sauvegardé au format svg), ce qui est plus simple et rapide à mettre en oeuvre qu'une impression 3D.
