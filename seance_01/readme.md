# Programmation web et Three.js

Lors des séances pratiques de ce modal, vous allez développer un modeleur 3D s'exécutant sur un navigateur web.

## Langages web sur un navigateur

Vos programmes pourront comporter 3 types de fichiers différents, associés chacun à un langage standard spécifique: HTML, CSS, et JavaScript.

* __HTML__ [Hypertext Markup Language]: est un langage permettant de décrire, par un système de balises, le contenu d'une page web. Le navigateur est capable d'interpréter directement un fichier écrit en html, et d'en générer un résultat graphique (typiquement l'affichage de texte et d'images). La plupart des programmes web consistent ainsi à définir un fichier html qui est sera lu par votre navigateur.

* __CSS__ [Cascading Style Sheets]: est un langage permettant de décrire l'apparence associé aux balises html. L'objectif de CSS est de pouvoir gérer séparément le contenu d'une page web décrite en HTML de son apparence (couleur, taille, placement, etc) qui va être décrite par des balises CSS.

* __JavaScript__ (fichiers d'extension .js): est un langage de programmation permettant d'automatiser des tâches et d'interagir de manière avancée avec un page web. Le code JavaScript peut être interprété par le navigateur web qui va alors exécuter le code défini.
Note: JavaScript est un langage typé dynamiquement, et dont la mémoire est gérée également dynamiquement par un _garbage collector_.

## WebGL et bibliothèque Three.js

__WebGl__ est une [API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) (Application Programming Interface) JavaScript permettant de décrire du contenu graphique à partir du navigateur. En pratique, cela signifie que votre navigateur est capable d'interpréter les fonctions décrites dans la norme WebGL afin d'afficher du contenu 2D et 3D. WebGL est une adaptation de la norme [OpenGL](https://www.opengl.org/) pour l'exécution dans un navigateur. L'intérêt de WebGL réside dans son efficacité: en effet le navigateur est capable d'utiliser, si disponible, votre carte graphique pour réaliser les calculs nécessaires à l'affichage de la scène graphique.

WebGL, tout comme OpenGL sont des ensembles de fonctionnalités qualifiées de "bas niveaux": à s'avoir qu'il est nécessaire de gérer manuellement des buffers de données (tels que des ensembles de coordonnées pour la géométrie, texture, normales, etc) et d'y appliquer des fonctions de traitements appelés shaders, décrites dans un langage spécifique (le GLSL).
Les notions de "plus hauts niveaux" d'une scène 3D tels que la description et manipulation simplifiée de primitives géométriques, de couleurs, de lumières, caméra, d'interaction avec le clavier et la souris, etc, ne sont pas prises en charge par WebGL et doivent être codées par le développeur.

Différentes bibliothèques JavaScript ont cependant été développées afin de simplifier cette partie en fournissant des interfaces au-dessus de WebGL permettant de décrire des scènes 3D de manière simplifiée et d'interagir avec celles-ci. Ces bibliothèques telles que Three.js ou encore Babylon.js proposent ainsi ensemble de fonctions JavaScript de plus haut niveau pour décrire des objets et appliquer des actions sur ceux-ci, puis viennent réaliser les appels WebGL pour l'affichage.

__[Three.js](https://threejs.org/)__ est une bibliothèque JavaScript permettant de gérer aisément le prototypage rapide d'une scène 3D. Elle propose, de manière non exhaustive, les fonctions suivantes:
* Création de primitives et "matériaux" (couleurs et apparence de la forme).
* Modification de la position et orientation des primitives.
* Placement et paramétrage de lumières et caméras.
* Gestion d'un graphe de scène: c'est à dire que chaque objet de la scène est défini de manière hiérarchique dans un arbre. Cela permet de définir aisément le placement relatif d'un objet parent et de ses enfants.
* Gestion du picking par "lancer de rayons" (sélection d'une partie d'un objet 3D à partir de la position de la souris).

Votre code consistera à développer un modeleur 3D expressif - c'est à dire adapté et facilitant la création du type d'objet que vous souhaitez - en JavaScript, en utilisant la bibliothèque Three.js (elle-même utilisant WebGL de manière sous-jacente pour le rendu 3D).
