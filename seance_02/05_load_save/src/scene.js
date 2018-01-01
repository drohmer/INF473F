"use strict";


main();

function main() {

    const sceneThreeJs = {
        sceneGraph: null,
        camera: null,
        renderer: null,
        controls: null,
    };


    const pickingData = {
        enabled: false,
        selectableObjects: [],
    };

    initEmptyScene(sceneThreeJs);
    init3DObjects(sceneThreeJs.sceneGraph,pickingData.selectableObjects);


    const raycaster = new THREE.Raycaster();
    const screenSize = {
        w:sceneThreeJs.renderer.domElement.clientWidth,
        h:sceneThreeJs.renderer.domElement.clientHeight
    };

    // Fonction à appeler lors du clic de la souris: selection d'un objet
    //  (Création d'un wrapper pour y passer les paramètres souhaités)
    const wrapperMouseDown = function(event) { onMouseDown(event,raycaster,screenSize, sceneThreeJs.sceneGraph,sceneThreeJs.camera,pickingData); };
    document.addEventListener( 'mousedown', wrapperMouseDown );

    // Fonction de rappels pour le clavier: activation/désactivation du picking par CTRL
    const wrapperKeyDown = function(event) { onKeyDown(event,pickingData,sceneThreeJs.controls); };
    const wrapperKeyUp = function(event) { onKeyUp(event,pickingData,sceneThreeJs.controls); };
    document.addEventListener( 'keydown', wrapperKeyDown );
    document.addEventListener( 'keyup', wrapperKeyUp );

    // *************************** //
    // Interface
    // *************************** //

    const saveFunction = function(){ saveScene(sceneThreeJs.sceneGraph); };
    const loadFunction = function(){ loadScene(sceneThreeJs.sceneGraph,pickingData.selectableObjects); };
    const exportOBJFunction = function(){ exportOBJ(pickingData.selectableObjects); };
    const guiInterface = {
        Save: saveFunction,
        Load: loadFunction,
        ExportOBJ: exportOBJFunction,
    }
    const gui = new dat.GUI();
    gui.add(guiInterface,"Save");
    gui.add(guiInterface,"Load");
    gui.add(guiInterface,"ExportOBJ");




    // *************************** //
    // Lancement de l'animation
    // *************************** //
    animationLoop(sceneThreeJs);
}

function saveScene(sceneGraph,createdObjects) {
    download( JSON.stringify(sceneGraph.toJSON()) );
}

function loadScene(sceneGraph,createdObjects) {

    // Supprime les éléments de la scène actuels
    createdObjects.length = 1; // supprime les cubes précédents (rem. le plan reste et il est le premier élément)
    let cube = sceneGraph.getObjectByName("userCube");
    while( cube!==undefined ) {
        sceneGraph.remove(cube);
        cube = sceneGraph.getObjectByName("userCube");
    }

    // Chargement des objets à partir de JSON
    const loader = new THREE.ObjectLoader();
    loader.load("save.txt",
    function(elementsScene) {

        //sceneGraph.add(elementsScene);
        const children = elementsScene.children;
        const N = children.length;
        const toBeAdded = [];
        for( let k =0; k<N; k++ ) {
            const e = children[k];
            if( e.name==='userCube' ) {
                toBeAdded.push(e);
            }
        }
        for( const k in toBeAdded ) {
            sceneGraph.add(toBeAdded[k]);
            createdObjects.push(toBeAdded[k]);
        }

    }
);
}

function exportOBJ(createdObjects) {

    let stringOBJ = "";
    let offset = 0;



    for( const k in createdObjects ) {

        // *************************************** //
        // Applique préalablement la matrice de transformation sur une copie des sommets du maillage
        // *************************************** //
        createdObjects[k].updateMatrix();
        const matrix = createdObjects[k].matrix;

        const toExport = createdObjects[k].geometry.clone();
        toExport.applyMatrix( matrix );


        // *************************************** //
        // Exporte les sommets et les faces
        // *************************************** //
        if( toExport.vertices!==undefined && toExport.faces!==undefined ) {

            const vertices = toExport.vertices;
            const faces = toExport.faces;

            for( const k in vertices ) {
                const v = vertices[k];
                stringOBJ += "v "+ v.x+ " "+ v.y+ " "+ v.z+ "\n";
            }

            for( const k in faces  ) {
                const f = faces[k];

                // Les faces en OBJ sont indexés à partir de 1
                const a = f.a + 1 + offset;
                const b = f.b + 1 + offset;
                const c = f.c + 1 + offset;

                stringOBJ += "f "+ a+ " "+ b+ " "+ c+ "\n"
            }

            offset += vertices.length;
        }

    }

    download( stringOBJ );

}

function init3DObjects(sceneGraph,pickableObjects) {

    const L = 2*0.75;
    const planeGeometry = new THREE.PlaneGeometry(L,L);//primitive.Quadrangle(Vector3(-L,-L,0),Vector3(L,-L,0),Vector3(L,L,0),Vector3(-L,L,0));
    const plane = new THREE.Mesh(planeGeometry, MaterialRGB(0.5,1,1));
    plane.name="plane";
    plane.receiveShadow = true;
    sceneGraph.add(plane);
    pickableObjects.push(plane);

}


function onKeyDown(event, pickingData, orbitControl) {

    const ctrlPressed = event.ctrlKey;

    // Relachement de ctrl : activation du mode picking
    if ( ctrlPressed ) {
        pickingData.enabled = true;
        orbitControl.enabled = false;
    }

}

function onKeyUp(event, pickingData, orbitControl) {

    const ctrlPressed = event.ctrlKey;

    // Relachement de ctrl : fin du picking actuel
    if ( ctrlPressed===false ) {
        pickingData.enabled = false;
        orbitControl.enabled = true;
    }

}



function onMouseDown(event, raycaster, screenSize, sceneGraph, camera, pickingData) {

    if( pickingData.enabled ) {
        //Calcul d'une intersection entre le point visé à la souris et la plan du fond ainsi que les objets créés
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;

        raycaster.setFromCamera(new THREE.Vector2(x,y),camera);
        const intersects = raycaster.intersectObjects( pickingData.selectableObjects );

        const nbrIntersection = intersects.length;
        if( nbrIntersection>0 ) {

            const intersection = intersects[0];

            const p = intersection.point;
            const n = intersection.face.normal;

            // Creation d'un nouvel objet au point selectionné
            const L = 0.2; // Longueur d'un coté du cube
            const cubeGeometry = new THREE.CubeGeometry(L,L,L);
            const cube = new THREE.Mesh(cubeGeometry, MaterialRGB(1,0.3,0.2));

            // le centre du cube nouveau cube est à la position:
            //   center = p + L/2 n
            const center = p.clone().add(n.clone().multiplyScalar(L/2));
            cube.position.copy( center );

            cube.castShadow = true;
            cube.receiveShadow = true;
            cube.name = "userCube";
            sceneGraph.add(cube);
            pickingData.selectableObjects.push(cube);

        }
    }


}


function onMouseUp(event,pickingData) {
    pickingData.enableDragAndDrop = false;
}

function onMouseMove( event, pickingData, screenSize, camera ) {

    // Gestion du drag & drop
    if( pickingData.enableDragAndDrop===true) {

        // Coordonnées de la position de la souris
        const xPixel = event.clientX;
        const yPixel = event.clientY;

        const x =  2*xPixel/screenSize.w-1;
        const y = -2*yPixel/screenSize.h+1;

        // Projection inverse passant du point 2D sur l'écran à un point 3D
        const selectedPoint = Vector3(x, y, 0.5 /*valeur de z après projection*/ );
        selectedPoint.unproject( camera );

        // Direction du rayon passant par le point selectionné
        const p0 = camera.position;
        const d = selectedPoint.clone().sub( p0 );

        // Intersection entre le rayon 3D et le plan de la camera
        const p = pickingData.selectedPlane.p;
        const n = pickingData.selectedPlane.n;
        // tI = <p-p0,n> / <d,n>
        const tI = ( (p.clone().sub(p0)).dot(n) ) / ( d.dot(n) );
        // pI = p0 + tI d
        const pI = (d.clone().multiplyScalar(tI)).add(p0); // le point d'intersection

        // Translation à appliquer
        const translation = pI.clone().sub( p );

        // Translation de l'objet et de la représentation visuelle
        pickingData.selectedObject.translateX( translation.x );
        pickingData.selectedObject.translateY( translation.y );
        pickingData.selectedObject.translateZ( translation.z );

        pickingData.selectedPlane.p.add( translation );

        pickingData.visualRepresentation.sphereTranslation.visible = true;
        pickingData.visualRepresentation.sphereTranslation.position.copy(p);
    }

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

function MaterialRGB(r,g,b) {
    const c = new THREE.Color(r,g,b);
    return new THREE.MeshLambertMaterial( {color:c} );
}

// Permet la sauvegarde d'un fichier texte
function download(text, name) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
