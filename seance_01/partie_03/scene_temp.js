"use strict";
// Point technique: La ligne "use strict" indique à l'interpréteur JavaScript que notre code doit être executé suivant les nouvelles directives définies dans la norme ECMAScript 5 et 6.
// Le "mode strict" est moins permissif que les mode précédent et reflète de meilleurs pratiques de programmation. On prendra donc l'habitude d'utiliser cette option.



// ==================================================== //
// Initialisation des variables générales pour le rendu d'une scène 3D
// ==================================================== //

// Initialisation du graphe de scene
const sceneGraph = new THREE.Scene();

// Initialisation d'une caméra réalisant une perspective (angle de vision de 45 degrés, profondeur comprise entre 0.1 et 500)
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,500);
camera.position.set(-5,5,5); // Placement de la caméra dans l'espace
camera.lookAt(0,0,0);

// Initialisation du moteur de rendu
const renderer = new THREE.WebGLRenderer( { antialias: true,alpha:false } );
renderer.setPixelRatio( window.devicePixelRatio ); 
renderer.setClearColor(0xffffff,1.0); // Couleur de fond d'écran (en hexa)
renderer.setSize( window.innerWidth, window.innerHeight );

// Remplacement dynamique de la balise html par le résulta du moteur de rendu
const baliseHtml = document.querySelector("#AffichageScene3D");
baliseHtml.appendChild(renderer.domElement);



// ==================================================== //
// Mise en place des éléments visuels de la scène
// ==================================================== //

// Initialisation d'une lumière
const spotLight = new THREE.SpotLight(0xffffff); // Lumière blanche ponctuelle emettant dans toutes les directions
spotLight.position.set(-5,8,0); // Positionnement dans du spot lumineux dans l'espace
sceneGraph.add(spotLight); // Ajout de la lumière dans le graphe de scène.

// Initialisation d'un objet 3D: 
const boxGeometry = new THREE.BoxGeometry( 1,1,1 ); // Primitive cubique de taille 1x1x1 centré en (0,0,0)
const boxMaterial = new THREE.MeshLambertMaterial( {color:0xff0000} ); // Couleur rouge
const boxObject = new THREE.Mesh( boxGeometry,boxMaterial ); // Un objet 3D affichable contient une géométrie, et un matériau (~couleur dans ce cas)
sceneGraph.add(boxObject); // Ajout de l'objet dans le graphe de scène.


// ==================================================== //
// Affichage de la scène
// ==================================================== //
renderer.render(sceneGraph, camera);








// // Déclaration d'une variable globale pour stocker les données de Three.js
// //    Cette variable contient 3 champs (initialisés à null pour l'instant)
// const sceneThreeJs {
// 	sceneGraph: null; // Le graphe de la scène 3D contenant les différentes primitives
// 	camera:     null; // La caméra d'où sera vue la scène 3D
// 	renderer:   null; // Le moteur de rendu utilisant WebGL
// };


// // Mise en place des fonctions à appeler
// window.onload = initThreeJs; // L'initialisation de la fenêtre conduit à l'appel de la fonction initThreeJs


// // Cette fonction va initialiser les variables et paramètres de la scène 3D.
// function initThreeJs() {

	
// 	// Initialisation du graph de scene
// 	sceneThreeJs.sceneGraph = new THREE.Scene();

// 	// Initialisation d'une caméra réalisant une perspective (angle de vision de 45 degrés, profondeur comprise entre 0.1 et 500)
// 	sceneThreeJs.camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,500);
// 	sceneThreeJs.camera.position.set(-5,5,5); // Placement de la caméra dans l'espace

// 	// Initialisation d'une lumière
// 	const spotLight = new THREE.SpotLight(0xffffff); // Lumière blanche ponctuelle emettant dans toutes les directions
// 	spotLight.position.set(-5,5,0); // Positionnement dans du spot lumineux dans l'espace
// 	sceneThreeJs.add(spotLight); // Ajout de la lumière dans le graphe de scène.



// 	// Initialisation du moteur de rendu
// 	sceneThreeJs.rendere = new THREE.WebGLRenderer( );
// 	renderer.setPixelRatio( window.devicePixelRatio ); 
// 	renderer.setClearColor(0xffffff,0.0); // Couleur de fond d'écran (en hexa)
// 	renderer.setSize( window.innerWidth, window.innerHeight );

// 	// Remplacement dynamique de la balise html par le résulta du moteur de rendu
// 	const baliseHtml = document.querySelector("AffichageScene3D");
// 	baliseHtml.appendChild(renderer.domElement);

// }