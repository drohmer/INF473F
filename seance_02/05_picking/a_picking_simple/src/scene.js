"use strict";

const sceneThreeJs = {
    sceneGraph: null,
    camera: null,
    renderer: null,
    controls: null
};

// Les données associées au picking
const pickingData = {
    enabled: false,           // Mode picking en cours ou désactivé (CTRL enfoncé)
    selectableObjects: [],    // Les objets selectionnables par picking
    selectedObject: null,     // L'objet actuellement selectionné
    selectedPlane: {p:null,n:null}, // Le plan de la caméra au moment de la selection. Plan donné par une position p, et une normale n.
}

// Une sphère montrant le point d'intersection au moment du picking
let sphereSelection = null;

// Un plan orthogonal à celui de la caméra passant par le point selectionné
let planeSelection = null;

// Creation des objets de base de la scène
initEmptyScene();
init3DObjects();

// Creation d'un lanceur de rayon (ray caster) de Three.js pour le calcul de l'intersection entre un objet et un rayon
const raycaster = new THREE.Raycaster();

// Fonctions de rappel
document.addEventListener( 'mousedown', onMouseDown );
document.addEventListener( 'mouseup', onMouseUp );
document.addEventListener( 'mousemove', onMouseMove );
document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );

// Lancement de l'animation
animationLoop();




// Initialise les objets composant la scène 3D
function init3DObjects() {

    initFrameXYZ( );

    const sceneGraph = sceneThreeJs.sceneGraph;

    // *********************** //
    /// Un objet selectionnable
    // *********************** //
    const cubeGeometry = primitive.Cube(Vector3(0.5,0.125,0.5), 0.25);
    const cube = new THREE.Mesh(cubeGeometry, MaterialRGB(1,1,1));
    cube.name="cube";
    cube.castShadow = true;
    sceneGraph.add(cube);
    pickingData.selectableObjects.push(cube); // Ajout du cube en tant qu'élément selectionnable


    // *********************** //
    /// Une sphère montrant la position selectionnée
    // *********************** //
    sphereSelection = new THREE.Mesh(primitive.Sphere(Vector3(0,0,0),0.015),MaterialRGB(1,0,0) );
    sphereSelection.name = "sphereSelection";
    sphereSelection.visible = false;
    sceneGraph.add(sphereSelection);

    // *********************** //
    /// Un plan passant par le point selectionné
    // *********************** //
    const materialPlane = new THREE.MeshLambertMaterial({color:0xaaaaaa,transparent:true,opacity:0.4});
    planeSelection = new  THREE.Mesh(new THREE.PlaneGeometry(0.3,0.3), materialPlane );
    planeSelection.name = "planSelection";
    planeSelection.visible = false;
    sceneGraph.add(planeSelection);

}


function onKeyDown(event) {

    const ctrlPressed = event.ctrlKey;

    // Relachement de ctrl : activation du mode picking
    if ( ctrlPressed ) {
        pickingData.enabled = true;
        sceneThreeJs.controls.enabled = false;
    }

}

function onKeyUp(event) {

    const ctrlPressed = event.ctrlKey;

    // Relachement de ctrl : fin du picking actuel
    if ( ctrlPressed===false ) {
        pickingData.enabled = false;
        sceneThreeJs.controls.enabled = true;
        pickingData.selectedObject = null;
    }

}



function onMouseDown(event) {

	// Gestion du picking
    if( pickingData.enabled===true ) { // activation si la touche CTRL est enfoncée

        // Coordonnées du clic de souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const windowW = sceneThreeJs.renderer.domElement.clientWidth;
        const windowH = sceneThreeJs.renderer.domElement.clientHeight;

        const x =  2*xPixel/windowW-1;
        const y = -2*yPixel/windowH+1;



        // Calcul d'un rayon passant par le point (x,y)
        //  c.a.d la direction formée par les points p de l'espace tels que leurs projections sur l'écran par la caméra courante soit (x,y).
        const camera = sceneThreeJs.camera;
        raycaster.setFromCamera(new THREE.Vector2(x,y), camera);

        // Calcul des intersections entre le rayon et les objets passés en paramètre
        const intersects = raycaster.intersectObjects( pickingData.selectableObjects );

        const nbrIntersection = intersects.length;
        if( nbrIntersection>0 ) {

            // Les intersections sont classés par distance le long du rayon. On ne considère que la première.
            const intersection = intersects[0];

            // Sauvegarde des données du picking
            pickingData.selectedObject = intersection.object; // objet selectionné
            pickingData.selectedPlane.p = intersection.point.clone(); // coordonnées du point d'intersection 3D
            pickingData.selectedPlane.n = camera.getWorldDirection().clone(); // normale du plan de la caméra


            // Affichage de la selection
            sphereSelection.position.copy( pickingData.selectedPlane.p ); //position de la sphere
            sphereSelection.visible = true;

            // Orientation et position du plan
            const rotation = RotationBetweenTwoAxes(Vector3(0,0,-1), pickingData.selectedPlane.n);
            planeSelection.setRotationFromMatrix( rotation );
            planeSelection.position.copy( pickingData.selectedPlane.p );
            planeSelection.visible = true;

        }
    }

}


function onMouseUp(event) {

}

function onMouseMove( event ) {

}

// Demande le rendu de la scène 3D
function render() {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

function animate(time) {

    const t = time/1000;//time in second
    render();
}







// Fonction d'initialisation d'une scène 3D sans objet
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene( ) {

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
function animationLoop( ) {

    // Fonction JavaScript de demande d'image courante à afficher
    requestAnimationFrame(

        // La fonction (dite de callback) recoit en paramètre le temps courant
        function(timeStamp){
            animate(timeStamp); // appel de notre fonction d'animation
            animationLoop( ); // relance une nouvelle demande de mise à jour
        }

    );

}

// Fonction appelée lors du redimensionnement de la fenetre
function onResize() {
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

// Creation de repères visuels indiquant les axes X,Y,Z entre [-1,1]
function initFrameXYZ( ) {

    const sceneGraph = sceneThreeJs.sceneGraph;

    const rCylinder = 0.01;
    const rCone = 0.04;
    const alpha = 0.1;

    // Creation des axes
    const axeXGeometry = primitive.Arrow(Vector3(0,0,0), Vector3(1,0,0), rCylinder, rCone, alpha);
    const axeX = new THREE.Mesh(axeXGeometry, MaterialRGB(1,0,0));

    const axeYGeometry = primitive.Arrow(Vector3(0,0,0), Vector3(0,1,0), rCylinder, rCone, alpha);
    const axeY = new THREE.Mesh(axeYGeometry, MaterialRGB(0,1,0));

    const axeZGeometry = primitive.Arrow(Vector3(0,0,0), Vector3(0,0,1), rCylinder, rCone, alpha);
    const axeZ = new THREE.Mesh(axeZGeometry, MaterialRGB(0,0,1));

    axeX.receiveShadow = true;
    axeY.receiveShadow = true;
    axeZ.receiveShadow = true;

    sceneGraph.add(axeX);
    sceneGraph.add(axeY);
    sceneGraph.add(axeZ);

    // Sphère en (0,0,0)
    const rSphere = 0.05;
    const sphereGeometry = primitive.Sphere(Vector3(0,0,0), rSphere);
    const sphere = new THREE.Mesh(sphereGeometry, MaterialRGB(1,1,1));
    sphere.receiveShadow = true;
    sceneGraph.add(sphere);



    // Creation des plans
    const L = 1;
    const planeXYGeometry = primitive.Quadrangle(Vector3(0,0,0), Vector3(L,0,0), Vector3(L,L,0), Vector3(0,L,0));
    const planeXY = new THREE.Mesh(planeXYGeometry, MaterialRGB(1,1,0.7));

    const planeYZGeometry = primitive.Quadrangle(Vector3(0,0,0),Vector3(0,L,0),Vector3(0,L,L),Vector3(0,0,L));
    const planeYZ = new THREE.Mesh(planeYZGeometry,MaterialRGB(0.7,1,1));

    const planeXZGeometry = primitive.Quadrangle(Vector3(0,0,0),Vector3(0,0,L),Vector3(L,0,L),Vector3(L,0,0));
    const planeXZ = new THREE.Mesh(planeXZGeometry,MaterialRGB(1,0.7,1));

    planeXY.receiveShadow = true;
    planeYZ.receiveShadow = true;
    planeXZ.receiveShadow = true;


    sceneGraph.add(planeXY);
    sceneGraph.add(planeYZ);
    sceneGraph.add(planeXZ);

}
