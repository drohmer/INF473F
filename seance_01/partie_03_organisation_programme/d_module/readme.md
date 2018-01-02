# "Module pattern"

Il est commode de pouvoir placer dans un fichier un ensemble de fonctionnalités communes. Ces fonctionnalités peuvent être placées dans un espace de nom commun (typiquement des "namespace" dans certains langages).
Par exemple, les fonctionnalités de Three.js sont appelés par "THREE.nomDeLaFonction", alors que celles de math en Javascript sont appelées par "Math.nomDeLaFonction" (ex. Math.cos, Math.PI, etc).

Il est possible de créer son propre module suivant le ["Module pattern"](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html) en suivant la syntaxe JavaScript suivante:
```Javascript
const nomDuModule = (function() {
    return {
        nomFonction1: function(parametres) {

        },
        nomFonction2: function(parametres) {

        },
        // etc.
    };

})();
```

Le code suivant propose la mise en place d'un tel module pour l'initialisation de la scène vide.

__Q.__ Observez la mise en place de ce module. Modifiez à nouveau le code de manière à pouvoir paramétrer la position et la couleur de la lumière.

__Q.__ Ajoutez à ce module la possibilité de créer et de renvoyer un cube dont le centre, longueur d'un coté, et la couleur soient paramétrables (notez que dans les programmes suivants, on proposera un module permettant d'initialiser différentes formes de bases dans un module "primitive").
