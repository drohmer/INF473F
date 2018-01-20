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


    const elementsToAdd = [];

    // Un plan en dessous des objets animés
    const Lp = 4;
    const planeGeometry = primitive.Quadrangle(Vector3(-Lp,-2,-Lp),Vector3(-Lp,-2,Lp),Vector3(Lp,-2,Lp),Vector3(Lp,-2,-Lp));
    const plane = new THREE.Mesh( planeGeometry,MaterialRGB(0.8,0.8,0.8) );
    plane.name = "plane";
    plane.receiveShadow = true;
    sceneGraph.add(plane);

    // Une sphère permettant de visualiser l'origine
    const sphereGeometry = primitive.Sphere( Vector3(0,0,0), 0.05 );
    const sphere = new THREE.Mesh( sphereGeometry,MaterialRGB(1,1,1) );
    sphere.name = "sphere";
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sceneGraph.add(sphere);

    // Le cylindre vert
    const cylinderGeometry = primitive.Cylinder( Vector3(1,1,1), Vector3(1,3,1),0.15 );
    const cylinder = new THREE.Mesh( cylinderGeometry,MaterialRGB(0,1,0) );
    cylinder.name = "cylinder";
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    sceneGraph.add(cylinder);

    // Le cylindre rouge
    const cylinderSonGeometry = primitive.Cylinder( Vector3(0,3,1), Vector3(2,3,1),0.1 );
    const cylinderSon = new THREE.Mesh( cylinderSonGeometry,MaterialRGB(1,0,0) );
    cylinderSon.name = "cylinderSon";
    cylinderSon.castShadow = true;
    cylinderSon.receiveShadow = true;
    cylinder.add(cylinderSon);


}

// Demande le rendu de la scène 3D
function render( sceneThreeJs ) {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

function animate(sceneThreeJs, time) {

    const t = time/1000;//time in second


    const cylinder = sceneThreeJs.sceneGraph.getObjectByName("cylinder");
    const cylinderSon = sceneThreeJs.sceneGraph.getObjectByName("cylinderSon");


    // Composition des transformations souhaitée:
    // translation(-1,-1,-1) o rotationX(dTheta) o translation(1,1,1)
    cylinder.translateX(1).translateY(1).translateZ(1);
    cylinder.rotateX(0.01);
    cylinder.translateX(-1).translateY(-1).translateZ(-1);

    // Composition des transformations souhaitée:
    // translation(-1,-3,-1) o rotationY(dPhi) o translation(1,3,1)
    cylinderSon.translateX(1).translateY(3).translateZ(1);
    cylinderSon.rotateY(0.2);
    cylinderSon.translateX(-1).translateY(-3).translateZ(-1);


    render(sceneThreeJs);
}






// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene();

    sceneThreeJs.camera = sceneInit.createCamera(-10,8,10);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(-3,5,1));

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

    sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera );

    window.addEventListener('resize', function(event){onResize(sceneThreeJs);} );
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
