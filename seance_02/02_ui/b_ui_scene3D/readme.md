# GUI et scène 3D


Ce code présente l'utilisation d'une interface en [interaction avec la scène 3D](https://htmlpreview.github.io/?https://github.com/drohmer/INF473F/blob/master/seance_02/02_ui/b_ui_scene3D/src/index.html).

__Q.__ Retrouvez à partir du code comment sont gérés les différentes actions.

Rem.1 Le code actuel sépare la gestion des données de l'interface (_guiParam_) de celle affichée dans la scène (_sceneThreeJs_). Deux autres solutions auraient été possibles:
* Placer l'ensemble des variables en globale. Cela simplifie le code, car l'ensemble des valeurs seraient accessibles de partout. D'une manière générale, cette approche est possible pour du prototypage rapide, mais serait peu recommandée pour des codes plus volumineux.

* A l'inverse, il serait possible de séparer les données d'interaction (typiquement les objets visibles et invisibles, ainsi que la position de l'objet actuel) de la scène gérée par Three.js. Cela ajouterait une couche supplémentaire de code, mais permettrait de mieux séparer les données de la GUI de celles de Three.js. On parle alors de méthode dite MVC, Modèle Vue Controleur. Le modèle étant ici la scène 3D, la vue étant les variables de la GUI, et le contrôleur réalisant le lien entre les données de la GUI et de la scène 3D.


__Q.__ Ajoutez un slider permettant de modifier la hauteur du plan.

__Q.__ dat.gui dispose de la possibilité de sélectionner une couleur dans une palette (voir la méthode [addColor](https://github.com/dataarts/dat.gui/blob/master/API.md#guiaddcolorobject-property--controller)). Ajoutez une telle palette à votre interface de manière à pouvoir modifier interactivement la couleur de la forme.
