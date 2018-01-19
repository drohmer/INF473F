# Fonctions en JavaScript

Les fonctions JavaScript peuvent se déclarer de la manière suivante:
```JavaScript
function nomFonction( [Paramètres] ) {
    // Corps de la fonction
    ...
    return valeur; // 'return' est optionnel
}
```

Les paramètres d'entrés sont donnés par leurs identifiants: leurs types étant déterminés automatiquement et s'adaptent dynamiquement. Idem pour le paramètre optionnel de retour qui suit l'appel à "return".

Les fonctions peuvent être déclarées après leur utilisation, on parle de "[function hoisting](https://www.w3schools.com/js/js_function_definition.asp)" (les déclarations sont déplacées en haut de leur bloc de portée par l'interpréteur).

Comme dans tout langage, l'organisation par fonctions permet de définir des blocs de traitements indépendants et réutilisables. Vous aurez donc avantage à placer vos ensembles de traitements dans des fonctions afin de rendre votre code plus simple à lire, et d'éviter des répétitions.

Le code du fichier scene.js reproduit la même scène que dans la partie précédente, mais l'organise en une série de fonctions.

Rem.
* Notez que pour l'instant, les variables associées au graphe de scène, à la caméra, et au moteur de rendus sont déclarées en tant que variables globales, et donc accessibles dans l'ensemble des fonctions.
* Notez que la fonction de création de caméra prend en entrée trois paramètres: les coordonnées x,y,z de celle-ci.

__Q.__ Lisez le code et assurez vous que vous compreniez ce que réalise chaque partie.

__Q.__ Demandez l'affichage en console de la fonction createCamera
```JavaScript
console.log(createCamera);
```
Notez qu'il est possible d'afficher les fonctions. En JavaScript les fonctions sont des données comme les autres et peuvent être stockées dans des variables (et donc affichées en console).

__Q.__ Adaptez le code de manière à pouvoir paramétrer la position de la lumière ainsi que sa couleur depuis la fonction _initEmptyScene_.
