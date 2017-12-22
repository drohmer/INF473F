# Programme 01

Ce premier programme présente une scène 3D minimaliste (un cube rouge statique) utilisant Three.js. Ce programme est constitué de 3 fichiers sources (HTML, CSS, JavaScript) et d'un fichier contenant la bibliothèque Three.js.

* Le fichier html contient une description des métadonnées de la page web (titre, encodage des caractère, etc) ainsi que les appels aux autres fichiers CSS et JavaScript qui doivent être chargés et interprétés. Le reste de la page étant gérée entièrement par le code Javascript, le corps de la page ne contient quasiment aucune description html.
* Le fichier css vient supprimer la marge du corp de l'élément html "body". De cette manière, la scène 3D apparait sans marge sur le navigateur.
* Le fichier JavaScript (extension .js) contient le coeur du code d'affichage de la scène 3D.


#### Documentation de Three.js

La documentation et le code de Three.js est disponible à l'adresse [https://threejs.org/](https://threejs.org/).

Notamment, les liens suivants vous seront généralement utiles:
* [Code source de Three.js ainsi que les codes des exemples](Code source de Three.js)
* [Documentation de référence](https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene)
* [Série d'exemple de scènes 3D](https://threejs.org/examples/)



### Observation du premier programme

__Q.__ Observez les trois fichiers sources et assurez vous que vous puissiez visualiser la scène 3D en ouvrant le fichier html par un navigateur. Notez que celle-ci est pour l'instant statique (il n'est pas possible de modifier la position de la caméra).

### Compréhension du fonctionnement du code JavaScript

#### Remarques générales

* Notez l'utilisateur de l'opérateur _new_ lors de la création d'une instance d'une classe (similaire à l'utilisation de _new_ en Java par exemple). Cela appel le constructeur de la classe. Ce constructeur peut prendre potentiellement des paramètres.

* Les vecteurs Three.js sont des classes de type [THREE.Vector3](https://threejs.org/docs/#api/math/Vector3). Notez l'utilisation des méthodes _set_ permettant d'affecter de nouvelles coordonées sans avoir à réaliser de ré-affectation de variable.
Il existe également les méthodes _copy_ (réalise la copie des champs de la classe dans une autre) et _clone_ (génère un nouvel objet ayant les même valeur que l'objet original).




#### Documentation de Three.js

__Q.__ Modifiez la position et l'orientation de la caméra, observez le résultat obtenu en relancant votre navigateur sur la page html (F5 permet généralement de réinitialiser la page).

__Q.__ Modifiez la couleur de fond d'écran (description d'une couleur RGB sur 24 bits en hexadécimal). Notez qu'il sera souvent avantageux lors de phases de debug de considérer un fond d'écran de couleur autre que blanc et noir (il est courant d'avoir un objet blanc sur fond blanc (res. noir) qui n'apparait alors pas à l'écran).

__Q.__ Commentez la ligne
```javascript
sceneGraph.add(cubeObject);
```
notez que le cube n'apparait plus => Seuls les éléments ajoutés au graphe de scène sont affichés (le moteur de rendu ne considérant que le graphe de scène en entrée). Lors de la création de nouveaux objets, n'oubliez pas d'ajouter celui-ci au graphe de scène.

__Q.__ Ajoutez un nouveau cube vert à coté du premier cube rouge déjà présent.


### Affichage et debug par le navigateur

__Q.__ Ajouter la commande suivante dans votre code
