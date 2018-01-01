"use strict";


// Déclaration des variables globales (initialisation à null)
let sceneGraph = null; // Le graphe de scène
let camera     = null; // La caméra
let renderer   = null; // Le moteur de rendu

// Appel à la fonction principale
main();

function main() {

    initEmptyScene();

    init3DObjects();

    render();


}

// Initialise les objets composant la scène 3D
function init3DObjects() {
    // Creation d'un cube
    const boxGeometry = new THREE.BoxGeometry( 1,1,1 );
    const boxMaterial = new THREE.MeshLambertMaterial( {color:0xff0000} );
    const boxObject = new THREE.Mesh( boxGeometry, boxMaterial );
    boxObject.position.set(0,0.5,0);
    sceneGraph.add(boxObject);
}

// Demande le rendu de la scène 3D
function render() {
    renderer.render(sceneGraph, camera);
}


// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene() {

    sceneGraph = new THREE.Scene();

    camera = createCamera(-5, 5, 5);
    insertLight();

    renderer = createRenderer();
    insertRenderInHtml();
}

// Création et ajout de lumière dans le graphe de scène
function insertLight() {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-5,8,0);
    sceneGraph.add(spotLight);
}

// Création et ajout d'une caméra dans le graphe de scène
function createCamera(x,y,z) {
    const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,500);
    camera.position.set(x,y,z);
    camera.lookAt(0,0,0);

    return camera;
}

// Initialisation du moteur de rendu
function createRenderer() {
    const renderer = new THREE.WebGLRenderer( );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(0xaaaaaa,1.0);
    renderer.setSize( window.innerWidth, window.innerHeight );

    return renderer;
}

// Insertion de la frame de rendu dans le document HTML
function insertRenderInHtml() {
    const baliseHtml = document.querySelector("#AffichageScene3D");
    baliseHtml.appendChild(renderer.domElement);
}
