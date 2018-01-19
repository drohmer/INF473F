"use strict";


main();

function main() {

    // Creation d'un objet contenant les différentes variables de la scène
    const sceneThreeJs = {
        sceneGraph: null,
        camera: null,
        renderer: null
    };


    initEmptyScene(sceneThreeJs);

    // On passe en paramètre uniquement les données nécessaire: ici uniquement le graphe de scène
    init3DObjects(sceneThreeJs.sceneGraph);

    render(sceneThreeJs);
}

// Initialise les objets composant la scène 3D
function init3DObjects(sceneGraph) {
    // Creation d'un cube
    const boxGeometry = new THREE.BoxGeometry( 1,1,1 );
    const boxMaterial = new THREE.MeshLambertMaterial( {color:0xff0000} );
    const boxObject = new THREE.Mesh( boxGeometry,boxMaterial );
    boxObject.position.set(0,0.5,0);
    sceneGraph.add(boxObject);
}

// Demande le rendu de la scène 3D
function render(sceneThreeJs) {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}





// Fonction d'initialisation d'une scène 3D sans objets
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene();

    sceneThreeJs.camera = createCamera(-5,5,5);
    insertLight(sceneThreeJs.sceneGraph);

    sceneThreeJs.renderer = createRenderer();
    insertRenderInHtml(sceneThreeJs.renderer.domElement);
}

// Création et ajout de lumière dans le graphe de scène
function insertLight(sceneGraph) {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-5,8,0);
    sceneGraph.add(spotLight);
}

// Création d'une caméra
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
function insertRenderInHtml(domElement) {
    const baliseHtml = document.querySelector("#AffichageScene3D");
    baliseHtml.appendChild(domElement);
}
