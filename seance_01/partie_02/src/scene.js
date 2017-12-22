"use strict";

// ==================================================== //
// Initialisation des variables générales pour le rendu d'une scène 3D
// ==================================================== //

// Initialisation du graphe de scene
const sceneGraph = new THREE.Scene(); // Les classes JavaScript sont sont générés par l'appel à l'opérateur "new nomDeMaClasse()"

// Initialisation d'une caméra réalisant une perspective (angle de vision de 45 degrés, profondeur comprise entre 0.1 et 500)
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,500); // Notez le passage de paramètres au constructeur de la classe
camera.position.set(-5,5,5); // Placement de la caméra dans l'espace
camera.lookAt(0,0,0); // Direction de vue de la caméra

// Initialisation du moteur de rendu
const renderer = new THREE.WebGLRenderer( { antialias: true,alpha:false } );
renderer.setPixelRatio( window.devicePixelRatio ); 
renderer.setClearColor(0xaaaaaa,1.0); // Couleur de fond d'écran (en hexa)
renderer.setSize( window.innerWidth, window.innerHeight );

// Remplacement de la balise html par le canvas approprié pour afficher le résultat issu du moteur de rendu
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
const cubeGeometry = new THREE.BoxGeometry( 1,1,1 ); // Primitive cubique de taille 1x1x1 centré en (0,0,0)
const cubeMaterial = new THREE.MeshLambertMaterial( {color:0xff0000} ); // Couleur rouge
const cubeObject = new THREE.Mesh( cubeGeometry,cubeMaterial ); // Un objet 3D affichable contient une géométrie, et un matériau (~couleur dans ce cas)
cubeObject.position.set(0,0.5,0); // Positionnement de l'objet dans l'espace (par défaut en (0,0,0) ).
sceneGraph.add(cubeObject); // Ajout de l'objet dans le graphe de scène.



// ==================================================== //
// Rendu de la scène
// ==================================================== //
renderer.render(sceneGraph, camera);

console.log(sceneGraph);