# Forme 2D

Ce programme propose la création d'une forme 2D à partir d'un contour défini par un ensemble de points.

La fonction _init3DObjects_ génère cette forme à partir de trois types de données
1. Un vecteur basique contenant une suite de coordonnées. Format basique permettant de lire/exporter aisément des données.
1. Un type [THREE.Shape](https://threejs.org/docs/#api/extras/core/Shape), structure de données three.js permettant de stocker une forme 2D. Notez que cette structure peut gérer la notion de trous, et contenir des bords courbes définis par des courbes de Bezier.
1. La conversion de la structure 2D en une géométrie 3D par le biais de [THREE.ShapeGeometry](https://threejs.org/docs/#api/geometries/ShapeGeometry). Cette conversion réalise la triangulation de la forme 2D en un maillage 3D s'appuyant sur les sommets.

__Q.__ Observez l'utilisation de cette structure dans le code proposé, et modifiez la forme 2D. Observez la triangulation générée par _ShapeGeometry_.
