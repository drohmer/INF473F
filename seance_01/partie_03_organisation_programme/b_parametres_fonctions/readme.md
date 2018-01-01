# Classes et paramètres

Dans le programme précédent, les variables principales étaient déclarées globalement.

Comme dans tout langage de programmation, l'utilisation de variables globales est à éviter.
En effet, cela rend le code difficile à analyser: on ne voit pas dans la signature de la fonction les paramètres d'entrées (puisqu'ils sont globaux, on ne sait pas lesquels sont utilisés sans lire le code). De plus, il tend à faciliter les effets de bords des fonctions (modifications d'états globaux lors du passage dans une fonction) qui sont difficiles à debuger.

L'exemple de code suivant propose de déclarer l'ensemble des variables nécessaire au programme dans la fonction main(), puis passe les données nécessaires en paramètre des fonctions respectives.

De plus, pour éviter de déclarer de trop nombreux paramètres, ceux-ci sont structurés dans un objet JavaScript (sceneThreeJs) tel que vu dans la toute première partie.
Pour rappel
```JavaScript
unObjetJavaScript = {
    nomChamp1: valeur1,
    nomChamp2: valeur2,
    // etc
};
```
Cet objet peut alors être lui-même passé en paramètre aux fonctions devant lire ou modifier son contenu.

__Q.__ Observez le code et assurez vous de bien comprendre la création de l'objet sceneThreeJs ainsi que les différents passages en paramètres. Afficher sceneThreeJs en console et retrouvez les différents paramètres.



__Remarque générale___ Bien que les paramètres globaux sont à éviter pour les codes finaux conséquents, ils peuvent cependant posséder certains avantages:
* Permet le prototypage rapide lorsque l'on souhaite utiliser des valeurs à différents endroits.
* Peut simplifier le code, en particulier, lors de l'utilisation de fonctions dites de _callback_ que nous verrons plus tard.

=> Votre objectif premier n'est pas le design du code, mais la création de votre modeleur et de ses fonctionnalités. Un compromis peut donc être choisi entre utilisation de variables globales et simplicité du code.
En pratique, il vous est suggéré de satisfaire le plus possible aux bonnes pratiques, vous êtes cependant libre d'utiliser à bon escient les outils proposés ou non. En particulier, vous pourrez garder l'utilisation de variables globales dans votre projet si cela vous permet de simplifier votre code.
