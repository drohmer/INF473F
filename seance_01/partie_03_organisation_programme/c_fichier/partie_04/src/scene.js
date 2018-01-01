"use strict";


main();

function main() {

    const sceneThreeJs = {
        sceneGraph: null,
        camera: null,
        renderer: null
    };

    initEmptyScene(sceneThreeJs);
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
