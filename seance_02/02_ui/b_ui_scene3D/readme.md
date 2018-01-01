# GUI et scène 3D


Ce code présente l'utilisation d'une interface en interaction avec la scène 3D.

__Q.__ Retrouvez à partir du code comment sont gérés les différentes actions.

Rem.1 Le code actuel sépare la gestion des données de l'interface (_guiParam_) de celle affichée dans la scène (_sceneThreeJs_). Deux autres solutions auraient été possibles:
* Placer l'ensemble des valeurs en tant que variable globales. Cela simplifie le code car l'ensemble des valeurs seraient accessibles de partout. Cette approche est possible pour du prototypage rapide, mais peu recommandé pour des codes plus volumineux.

* A l'inverse, il serait possible de séparer les données d'interaction (typiquement les objets visibles et invisibles, ainsi que la position de l'objet actuel) de la scène gérée par Three.js. Cela ajouterait une couche supplémentaire de code, mais permettrait de mieux séparer les données de la GUI de celle de Three.js. On parle alors de méthode dite MVC, Modèle Vue Controleur. Le modèle étant ici la scène 3D, la vue étant les variables de la GUI, et le controleur étant la partie donnée et logique faisant le lien entre celle de la GUI et celle de la scène 3D.

Rem.2 Le code proposé déclanche une action (translation, changement de type de forme) uniquement lors de la modification de l'une des valeurs de la GUI à l'aide de fonction de rappel. Une autre solution possible aurait  été de venir lire à chaque affichage d'image (dans la fonction d'animation) l'état actuel de la GUI, et d'adapter la scène en conséquence sans avoir à passer par les fonctions de rappels issuent de l'interface.

__Q.__ D'après-vous quelle solution est à privilégier dans le cas général?

__Q.__ Ajoutez un slider permettant de modifier la hauteur du plan.

__Q.__ dat.gui dispose de la possibilité de selectionner une couleur dans une palette (voir la méthode [addColor](https://github.com/dataarts/dat.gui/blob/master/API.md#guiaddcolorobject-property--controller)). Ajoutez une telle palette à votre interface de manière à modifier interactivement la couleur de la forme.
