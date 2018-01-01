"use strict";


main();

function main() {

    const sceneThreeJs = {
        sceneGraph: null,
        camera: null,
        renderer: null,
        controls: null,
    };


    initEmptyScene(sceneThreeJs);
    init3DObjects(sceneThreeJs.sceneGraph);
    animationLoop(sceneThreeJs);
}

function init3DObjects(sceneGraph,pickableObjects) {
    // Définition d'un polygon 2D
    const vectorPoints = [];
    vectorPoints.push( Vector2(0, 0) );
    vectorPoints.push( Vector2(0.65, 0) );
    vectorPoints.push( Vector2(0.8, 0.15) );
    vectorPoints.push( Vector2(0.8, 0.25) );
    vectorPoints.push( Vector2(0.65, 0.35) );
    vectorPoints.push( Vector2(0, 0.35) );

    // Création d'une forme triangulé
    const curveShape = new THREE.Shape( vectorPoints );
    const geometry = new THREE.ShapeGeometry( curveShape );
    const object = new THREE.Mesh( geometry, MaterialRGB(0.9,0.9,0.9) ) ;
    sceneGraph.add( object );

    // Autre forme permettant d'afficher la triangulation (wireframe)
    const materialWireframe = new THREE.MeshBasicMaterial({color:0xff0000,wireframe: true,wireframeLinewidth:2});
    const objectWireframe = new THREE.Mesh(geometry, materialWireframe);
    sceneGraph.add( objectWireframe );

}



// Demande le rendu de la scène 3D
function render( sceneThreeJs ) {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

function animate(sceneThreeJs, time) {

    const t = time/1000;//time in second
    render(sceneThreeJs);
}







// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene();

    sceneThreeJs.camera = sceneInit.createCamera(1,1.5,3);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(1,2,2));

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

    sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera );

    window.addEventListener('resize', function(event){onResize(sceneThreeJs);}, false);
}

// Fonction de gestion d'animation
function animationLoop(sceneThreeJs) {

    // Fonction JavaScript de demande d'image courante à afficher
    requestAnimationFrame(

        // La fonction (dite de callback) recoit en paramètre le temps courant
        function(timeStamp){
            animate(sceneThreeJs,timeStamp); // appel de notre fonction d'animation
            animationLoop(sceneThreeJs); // relance une nouvelle demande de mise à jour
        }

    );

}

// Fonction appelée lors du redimensionnement de la fenetre
function onResize(sceneThreeJs) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneThreeJs.camera.aspect = width / height;
    sceneThreeJs.camera.updateProjectionMatrix();

    sceneThreeJs.renderer.setSize(width, height);
}

function Vector3(x,y,z) {
    return new THREE.Vector3(x,y,z);
}
function Vector2(x,y) {
    return new THREE.Vector2(x,y);
}

function MaterialRGB(r,g,b) {
    const c = new THREE.Color(r,g,b);
    return new THREE.MeshLambertMaterial( {color:c} );
}
