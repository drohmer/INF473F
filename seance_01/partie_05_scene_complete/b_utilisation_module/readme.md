# Scène complète (b)

## Module "primitive"

Ce code reprend la scène précédente, mais utilise cette fois le module "primitive" qui consiste en un ensemble de fonctions permettant de créer et d'orienter plus aisément certaines formes basiques.

Notez que vous êtes libre d'utiliser ou non ce module dans votre projet, ou de l'adapter à vos besoins.

## Hierarchie d'objets

__Q.__ Ajoutez à la fin de la fonction "init3DObjects" le code suivant
```JavaScript
const cylinder2Geometry = primitive.Cylinder( Vector3(0,-0.5,0), Vector3(0,0.5,0),0.15 );
const cylinder2 = new THREE.Mesh( cylinder2Geometry,MaterialRGB(0.1,0.9,0.1) );
cylinder2.name = "cylinder2";
sceneGraph.add(cylinder2);
```

Ainsi que le code suivant avant la demande de rendu dans la fonction "animate"
```JavaScript
const cylinder2 = sceneThreeJs.sceneGraph.getObjectByName("cylinder2");
cylinder2.position.set(0,0,0);
cylinder2.setRotationFromAxisAngle(Vector3(0,0,1),3*Math.PI*t);
cylinder2.position.set(0,1,0.25);
```

Observez le résultat.

__Q.__ Modifiez désormais la ligne
```JavaScript
sceneGraph.add(cylinder2);
```
en
```JavaScript
cylinder.add(cylinder2);
```
 et observez à nouveau le résultat.
Retrouvez l'organisation hiérarchique en affichant à la console la variable _sceneGraph_ à la fin de _init3DObjects_, sachant que les objets fils se retrouvent dans le champ _children_.

Rem. Three.js gère les éléments affichés comme un arbre. Chaque élément possède son repère propre. En ajoutant un élément à un autre existant, il hérite du repère du parent. Cette approche permet une gestion aisée d'organisation ou de mouvements hiérarchiques.
