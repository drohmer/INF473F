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

    const Lp = 4; // taille du plan
    const planeGeometry = primitive.Quadrangle(Vector3(-Lp,0,-Lp),Vector3(-Lp,0,Lp),Vector3(Lp,0,Lp),Vector3(Lp,0,-Lp));
    const plane = new THREE.Mesh( planeGeometry,MaterialRGB(0.8,0.8,0.8) );
    plane.name = "plane";
    elementsToAdd.push(plane);

    const cubeGeometry = primitive.Cube( Vector3(0,1,0),1 );
    const cube = new THREE.Mesh( cubeGeometry,MaterialRGB(1,0,0) );
    cube.name = "cube";
    elementsToAdd.push(cube);

    const sphere1Geometry = primitive.Sphere( Vector3(-2,0.5,-2),0.5 );
    const sphere1 = new THREE.Mesh( sphere1Geometry,MaterialRGB(1,1,0) );
    sphere1.name = "sphere1";
    elementsToAdd.push(sphere1);

    const sphere2Geometry = primitive.Sphere( Vector3(-2,1.5,-2),0.5 );
    const sphere2 = new THREE.Mesh( sphere2Geometry,MaterialRGB(0,1,0) );
    sphere2.name = "sphere2";
    elementsToAdd.push(sphere2);

    const cylinderGeometry = primitive.Cylinder( Vector3(0,-1,0), Vector3(0,1,0),0.15 );
    const cylinder = new THREE.Mesh( cylinderGeometry,MaterialRGB(0.4,0.9,1) );
    cylinder.name = "cylinder";
    elementsToAdd.push(cylinder);



    for( const k in elementsToAdd ) {
        const element = elementsToAdd[k];
        element.castShadow = true;
        element.receiveShadow = true;
        sceneGraph.add(element);
    }


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
    cylinder.position.set(0,0,0); //objet initialement centré autour de son centre de rotation
    cylinder.setRotationFromAxisAngle(Vector3(0,0,1),Math.PI*t); // application de la rotation
    cylinder.position.set(0,1.5,2); // placement de l'objet à sa position dans l'espace


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
