# Scène complète (a)

Il est cette fois possible de naviguer interactivement dans la scène.
* Rotation de la caméra (suivant des angles en coordonnées sphériques): clic gauche suivi du mouvement de la souris.
* Zoom: molette centrale
* Translation dans le plan de la caméra: clic droit suivi du mouvement de la souris.

Cette gestion de caméra est apportée par le module [OrbitControls](https://threejs.org/docs/#examples/controls/OrbitControls).
Notez l'ajout du fichier dans le code HTML et la ligne
```JavaScript
new THREE.OrbitControls( sceneThreeJs.camera );
```
permettant d'activer cette navigation.


__Q.__ Observez les différents objets créés ainsi que leur animation et retrouvez la correspondance visuelle. Ajouter un élément conique dans la scène.

Notez la présence et l'utilisation des fonctions _Vector3(x,y,z)_ et _MaterialRGB(r,g,b)_. Ces fonctions sont codées pour simplifier l'écriture et éviter les multiples répétitions à new. Leurs utilisations sont cependant purement optionnelles si vous préférez les appels directs aux constructeurs.


__Q.__ La fonction _onResize_ est appelée lors du redimensionnement de la fenêtre. Réalisez un affichage en console dans cette fonction, et vérifiez ce comportement.

Notez que la mise en place de cette fonction se réalise par l'appel à
```JavaScript
window.addEventListener('resize', fonctionAAppeler);
```
* Ici _window_ est une variable globale accessible depuis le code JavaScript (sans nécessiter de déclaration) et contient les différents paramètres de la fenêtre actuelle.
* La méthode _addEventListener_ permet de mettre en relation un évènement: ici 'resize' avec l'exécution d'une fonction (dite de rappel, ou _callback_ en anglais). Il s'agit d'un fonctionnement dit par évènement.
* Dans le cas présent, nous appelons la fonction _onResize_.
On pourra également noter que l'on n’appelle pas directement _onResize_, mais _onResizeFunction_ qui appelle ensuite _onResize_. Cette construction, habituelle en JavaScript, permet de passer une fonction à multiples paramètres (ici onResize) à la place d'une fonction ne prenant pas ou qu'un seul paramètre (ici onResizeFunction) tel qu'attendu par _addEventListener_. Nous retrouverons cette approche plus tard lors de la gestion d'évènements.

Une construction similaire est présente pour la fonction _requestAnimationFrame_. Ici la fonction d'adaptation du nombre d'arguments est directement définie "inline".
