"use strict";

// ********************* //
//  Interface basique
// ********************* //


// Un conteneur pour les données de l'interface
const interfaceData = {
    slider1: 0,
    slider2: 0,
    checkBox: false,
    bouton: null,
};


// Création d'une interface graphique
const gui = new dat.GUI();

// Ajout de deux sliders
gui.add( interfaceData,'slider1',-5,5 ); // slider entre -5 et 5
gui.add( interfaceData,'slider2', 0,10 ); // slider entre 0 et 10
//  rem. interfaceData.slider1 et interfaceData.slider2 sont des Nombres
//       => data.gui leur attribue automatiquement un slider

gui.add( interfaceData,'checkBox' ); // Une valeur booleenne est interprété comme une checkBox

// Définition d'une fonction appelée lorsque l'on cliquera sur le widget
// La fonction est stockée dans la variable interfaceData.bouton
interfaceData.bouton = function() {
    console.log("Click bouton"); 
    console.log(interfaceData);  
}
// Ajout de la fonction dans l'interface (une fonction correspond à un bouton dans dat.gui)
gui.add( interfaceData,'bouton' );



// ********************* //
//  Fonctions de rappels
// ********************* //

const autresValeurs = {
    slider3: 0,
    slider4: 0,
};

const modificationSlider3 = function() {
    console.log("La valeur du slider 3 vaut ",autresValeurs.slider3);
};
const modificationSlider4 = function() {
    console.log("La valeur du slider 4 vaut ",autresValeurs.slider4);
};

// Ajout de fonctions de rappels (.onChange et onFinishChange) appelés lors de la modification des valeurs
// (les valeurs varient entre -10 et 10 de 1 en 1)
gui.add( autresValeurs,'slider3',-10,10,1) . onChange(modificationSlider3);
gui.add( autresValeurs,'slider4',-10,10,1) . onFinishChange(modificationSlider4);


