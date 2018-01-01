"use strict";


main();

function main() {

    const sceneThreeJs = {
        sceneGraph: null,
        camera: null,
        renderer: null,
        controls: null
    };

    // Les paramètres de l'interface graphique
    const guiParam = {
        primitiveType: "cube", // Le nom de la primitive à afficher
        x:0, y:0, z:0 // La translation à appliquer sur la primitive
    };


    initEmptyScene(sceneThreeJs);
    init3DObjects(sceneThreeJs.sceneGraph);
    
    initGui(guiParam, sceneThreeJs); // Initialisation de l'interface
    updatedGui(guiParam, sceneThreeJs); //Initialisation de la visualisation en cohérence avec l'interface

    AnimationLoop(sceneThreeJs,guiParam);
}


// Met à jour les paramètres de la scène en fonction des valeurs de l'interface
function updatedGui(guiParam,sceneThreeJs) {
    
    const p0 = Vector3(0.5,0.125,0.5); // position initial du centre de la primitive

    // Récupération de la primitive à afficher
    const sphere = sceneThreeJs.sceneGraph.getObjectByName("sphere");
    const cube = sceneThreeJs.sceneGraph.getObjectByName("cube");
    
    let visibleShape = null;
    if( guiParam.primitiveType==="cube" ) {
    	visibleShape = cube;
    	cube.visible = true;
    	sphere.visible = false;
    }
    else if( guiParam.primitiveType==="sphere" ) {
    	visibleShape = sphere;
    	cube.visible = false;
    	sphere.visible = true;
    }

    // Application de la translation à affecter sur la primitive
    const translation = Vector3(guiParam.x/10, guiParam.y/10, guiParam.z/10);
    const p = p0.clone().add(translation);
    visibleShape.position.copy(p);

}

function initGui(guiParam,sceneThreeJs) {

    // *************************** //
    // Fonctions pour l'interface
    // *************************** //

    // Actions des boutons 'Cube' et 'Sphere' de l'interface (mis sous forme de fonction)
    const drawPrimitiveType = {
        Cube: function(){ guiParam.primitiveType = "cube";  },
        Sphere: function() { guiParam.primitiveType = "sphere";  },
    };

    // Fonction de rappel pour la mise à jour de la scène appelé à chaque action sur un élément de l'interface
    //  Rem. updateFunc sert uniquement de "wrapper" sans paramètres à la fonction updatedGui qui prend 2 paramètres.
    const updateFunc = function() { updatedGui(guiParam,sceneThreeJs); };


    // *************************** //
    // Creation de l'interface
    // *************************** //
    const gui = new dat.GUI();

    gui.add( drawPrimitiveType, "Cube").onFinishChange(updateFunc);  // Bouton cube
    gui.add( drawPrimitiveType, "Sphere").onFinishChange(updateFunc);// Bouton sphere

    // Paramètres de translations
    gui.add( guiParam,"x",-5,5 ).onChange(updateFunc); 
    gui.add( guiParam,"y", 0,6 ).onChange(updateFunc);
    gui.add( guiParam,"z",-5,5 ).onChange(updateFunc);


}

// Initialise les objets composant la scène 3D
function init3DObjects(sceneGraph, dataControler) {

    const textureLoader = new THREE.TextureLoader();

    const groundGeometry = primitive.Quadrangle(Vector3(0,0,0),Vector3(0,0,1),Vector3(1,0,1),Vector3(1,0,0));
    const ground = new THREE.Mesh(groundGeometry,MaterialRGB(1,1,1));
    ground.name="ground";
    ground.receiveShadow = true;
    sceneGraph.add(ground);

    const cubeGeometry = primitive.Cube(Vector3(0,0,0), 0.25);
    const cube = new THREE.Mesh(cubeGeometry,MaterialRGB(1,0,0));
    cube.name="cube";
    cube.castShadow = true;
    sceneGraph.add(cube);

    const sphereGeometry = primitive.Sphere(Vector3(0,0,0), 0.15);
    const sphere = new THREE.Mesh(sphereGeometry,MaterialRGB(1,0,0));
    sphere.name="sphere";
    sphere.castShadow = true;
    sceneGraph.add(sphere);

}

// Demande le rendu de la scène 3D
function render( sceneThreeJs ) {
    sceneThreeJs.renderer.render(sceneThreeJs.sceneGraph, sceneThreeJs.camera);
}

function animate(sceneThreeJs,guiParam, time) {

    const t = time/1000; // temps en seconde

    render(sceneThreeJs);
}






// Fonction d'initialisation d'une scène 3D sans objets 3D
//  Création d'un graphe de scène et ajout d'une caméra et d'une lumière.
//  Création d'un moteur de rendu et ajout dans le document HTML
function initEmptyScene(sceneThreeJs) {

    sceneThreeJs.sceneGraph = new THREE.Scene();

    sceneThreeJs.camera = sceneInit.createCamera(-1,0.5,1);
    sceneInit.insertAmbientLight(sceneThreeJs.sceneGraph);
    sceneInit.insertLight(sceneThreeJs.sceneGraph,Vector3(-1,1,1));

    sceneThreeJs.renderer = sceneInit.createRenderer();
    sceneInit.insertRenderInHtml(sceneThreeJs.renderer.domElement);

    sceneThreeJs.controls = new THREE.OrbitControls( sceneThreeJs.camera, sceneThreeJs.renderer.domElement );
    sceneThreeJs.controls.target.set(0.5, 0, 0.5);
    sceneThreeJs.controls.update();


    window.addEventListener('resize', function(event){onResize(sceneThreeJs);}, false);
}

// Fonction de gestion d'animation
function AnimationLoop(sceneThreeJs,guiParam) {

    // Fonction JavaScript de demande d'image courante à afficher
    requestAnimationFrame(

        // La fonction (dite de callback) recoit en paramètre le temps courant
        function(timeStamp){
            animate(sceneThreeJs,guiParam,timeStamp); // appel de notre fonction d'animation
            AnimationLoop(sceneThreeJs,guiParam); // relance une nouvelle demande de mise à jour
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
