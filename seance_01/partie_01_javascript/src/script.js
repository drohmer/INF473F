"use strict";

// ================================ //
// Déclaration de variables
// ================================ //

// Déclaration de variables
let a = 5;
let b = a+9;
let c = "Hello JavaScript";

// Le contenu des variables peuvent s'afficher dans la console de votre navigateur
console.log("a = ",a);
console.log("b = ",b);
console.log("c = ",c);

// Les variables déclarées par "let" peuvent être ré-assignée, potentiellement avec d'autres types
a = 12;
b = "Une chaine de caractère";
console.log("a = ",a);
console.log("b = ",b);

// Les variables déclarées par "const" ne peuvent pas être ré-assignée
const d = 10;
console.log("Valeur const d=",d);

// La ligne suivante décommentée aboutirait à une erreur d'exécution
// d = 12;

// ================================ //
// Boucles et conditionnelles
// ================================ //
console.log("===== Boucles et conditionnelles =====");

// Boucles et conditionnelles
for( let k=2; k<8; k++ ) {

    if( k%2 == 0 ) {
        console.log(k," est pair");
    }
    else {
        console.log(k," est impair");
    }

}

// ================================ //
// Array
// ================================ //
console.log("===== Arrray =====");

// "Tableau" JavaScript (Array)
const T = [4,5,-7,"torchon",8,"serviette"]; // les tableaux peuvent contenir des éléments de différents types (indexé à partir de 0)

// Parcours du tableau par boucle
for( let k in T ) {
    const valeur = T[k];
    console.log("T[",k,"]=",valeur);
}

console.log(T); //Affichage complet du tableau

// Modification d'une valeur du tableau
T[1] = -4; // Rem: il est possible de modifier le contenu d'une variable déclarée const (mais pas de la ré-assigner).
console.log(T);

// Ajout d'un élément dans le tableau
T[12] = -7; // Les tableaux sont potentiellement creux et l'ensemble des entrées ne sont pas forcément remplies par une valeur. (Les tableaux JavaScript (Array) sont en fait des structures de données de type dictionnaire).
console.log(T);


// ================================ //
// Objets javascripts
// ================================ //
console.log("===== Objets JavaScript =====");

// Les objets JavaScripts sont des dictionnaires: paire clé/valeur jouant le rôle des attributs et champs en programmation orienté objet.
const monObjet = {
    cle1:"valeur1",
    cle2:"valeur2"
};

console.log(monObjet);
monObjet.cle1 = 12; // accès de la forme objet.cle
monObjet["cle2"] = -4; // accès de la forme objet["cle"]
console.log(monObjet);

// Exemple pour des vecteurs
const v1 = {x:0, y:0};

// Les variables sont des références à l'objet sous jacent.
// L'affectation d'une variable par une autre vient décrire le même objet.
const v2 = v1;
v2.x = 12;

// v1.x et v2.x références les mêmes emplacements en mémoire
console.log("v1=",v1);
console.log("v2=",v2);

// ================================ //
// Fonctions
// ================================ //
console.log("===== Fonctions JavaScript =====");

// Déclaration d'une fonction
function somme(a,b) {
    return a+b;
}
console.log(somme(7,8));
console.log(somme(-1,2));

// Les variables peuvent stocker des Fonctions
const s = somme;
console.log( s(7,8) );
console.log( s(-1,2) );

// On peut définir directement des fonctions en tant que variables
const s2 = function(a,b) { return a+b; }
console.log( s2(7,8) );
console.log( s2(-1,2) );


// ================================ //
// Modification du HTML à partir du code JavaScript
// ================================ //

// document contient la description dite DOM (Document Object Model) de la page HTML
// document.querySelector permet de récupérer un élément à partir de son identifiant (ici: ensemble3)
const elementHTML = document.querySelector("#ensemble3");

// Une fois récupéré, il est possible de modifier le contenu de l'élément.
elementHTML.textContent = "Ce texte est créé lors de l'exécution de JavaScript. ";

// Il est possible d'afficher ainsi le résultat d'un calcul
elementHTML.textContent += "7+8 vaut "+(7+8);
