"use strict";


main();

function main() {

    const sceneThreeJs = {
        sceneGraph: null,
        camera: null,
        renderer: null,
        controls: null
    };

    initEmptyScene(sceneThreeJs);
    init3DObjects(sceneThreeJs.sceneGraph);


    animationLoop(sceneThreeJs);
}

// Initialise les objets composant la scène 3D
function init3DObjects(sceneGraph) {

    const planeGeometry = new THREE.PlaneGeometry( 8,8 );
    planeGeometry.rotateX(-Math.PI/2);
    const plane = new THREE.Mesh( planeGeometry,MaterialRGB(0.8,0.8,0.8) );
    plane.receiveShadow = true;
    plane.name = "plane";
    sceneGraph.add( plane );

    const cubeGeometry = new THREE.BoxGeometry( 1,1,1 );
    cubeGeometry.translate(0,1,0);
    const cube = new THREE.Mesh( cubeGeometry,MaterialRGB(1,0,0) );
    cube.castShadow = true;
    cube.name = "cube";
    sceneGraph.add( cube );

    const sphereGeometry1 = new THREE.SphereGeometry( 0.5, 32,32 );
    sphereGeometry1.translate(-2,0.5,-2);
    const sphere1 = new THREE.Mesh( sphereGeometry1,MaterialRGB(1,1,0) );
    sphere1.castShadow = true;
    sphere1.receiveShadow = true;
    sphere1.name = "sphere1";
    sceneGraph.add( sphere1 );

    const sphereGeometry2 = new THREE.SphereGeometry( 0.5, 32,32 );
    sphereGeometry2.translate(-2,1.5,-2);
    const sphere2 = new THREE.Mesh( sphereGeometry2,MaterialRGB(0,1,0) );
    sphere2.castShadow = true;
    sphere2.name = "sphere2";
    sceneGraph.add( sphere2 );

    const cylinderGeometry = new THREE.CylinderGeometry( 0.15,0.15,2, 32 );
    const cylinder = new THREE.Mesh( cylinderGeometry,MaterialRGB(0.4,0.9,1) );
    cylinder.castShadow = true;
    cylinder.name = "cylinder";
    sceneGraph.add( cylinder );



}

// Demande le rendu de la scène 3D
function render( sceneThreeJs ) {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

function animate(sceneThreeJs, time) {

    const t = time/1000;//time in second

    const cube = sceneThreeJs.sceneGraph.getObjectByName("cube");
    cube.position.set( Math.sin(3*t),0,0 );

    const cylinder = sceneThreeJs.sceneGraph.getObjectByName("cylinder");
    // Rotation du cylinder
    cylinder.setRotationFromAxisAngle(Vector3(0,0,1),Math.PI*t); // rotation de l'objet
    cylinder.position.set(0,1.5,2); // placement de l'objet à sa position dans l'espace

    render(sceneThreeJs);
}










// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene( );

    sceneThreeJs.camera = sceneInit.createCamera(-10,8,10);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(-3,5,1));

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

    sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera );

    const onResizeFunction = function(event) { onResize(sceneThreeJs); };
    window.addEventListener('resize', onResizeFunction );
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

function MaterialRGB(r,g,b) {
    const c = new THREE.Color(r,g,b);
    return new THREE.MeshLambertMaterial( {color:c} );
}
