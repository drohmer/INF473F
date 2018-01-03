# Dat.gui


Ce code présente une interface succincte avec dat.gui non liée à Three.js.

* Les résultats sont affichés dans la console (après ouverture du fichier HTML)
* Le code est entièrement contenu dans le fichier script.js

## Partie 1 : Interface basique

__Q__. Observez le code de la première partie (interface basique).

Notez en particulier que le type de _Widget_ (slider, élément à clicker, bouton) dépend du type de variable passé en paramètre.

Notez également que la modification de la variable slider1 et slider2 et checkBox n'est pas visible immédiatement dans l'interface. En effet, les valeurs sont modifiées, mais aucune fonction d'affichage n'est appelée.

Observez également l'appel à une fonction appelable par "bouton".

__Q__. Ajoutez un second bouton qui affiche sur la console: "oui" si checkBox est activé, et "non" sinon.

## Partie 2 : Fonctions de rappels/callbacks

Il peut être avantageux d'appeler une fonction spécifique automatiquement dès lors qu'une valeur de l'interface est modifiée. C'est le rôle des _fonctions de rappels_, désignées en anglais par __callback__ (notion déjà rencontrée lors du redimensionnement de la fenêtre).
Rem. Une _fonction de rappel_/_callback_ est une fonction passée en paramètre d'une autre fonction. Cela permet des appels génériques. L'utilisation de telles fonctions dans le cadre d'interface est très répandue. 

__Q__. Observez la mise en place de fonctions de rappels avec les méthodes _.onChange_ et _.onFinishChange_. Quel est la différence entre ces deux méthodes?

Rem. On appelle _programmation évènementielle_ la gestion d'un code interagissant avec des évènements, dont l'ordre et l'instant d'activation n'est pas prévisible à l'avance (ici lié à l'utilisateur).
