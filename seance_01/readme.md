# Programmation web et Three.js

Lors des seances pratiques de ce modal, vous allez développer un modeleur 3D s'exécutant sur un navigateur web.

## Langages web sur un navigateur

Vos programmes pourront comporter 3 types de fichiers différents, associés chacun à un langage standard spécifique: HTML, CSS, et Javascript.

 * __HTML__ [Hypertext Markup Language]: est un langage permettant de décrire, par un système de balises, le contenu d'une page web. Le navigateur est capable d'interpréter directement un fichier écrit en html, et d'en générer un résultat graphique (typiquement l'affichage de texte et d'images). La plupart des programmes web consistent ainsi à définir un fichier html qui est sera lu par votre navigateur.


* __CSS__ [Cascading Style Sheets]: est un langage permettant de décrire l'apparence associé aux balises html. L'objectif de CSS est de pouvoir gérer séparément le contenu d'une page web décrite en HTML de son apparence (couleur, taille, placement, etc) qui va être décrite par des balises CSS.

* __JavaScript__ (fichiers d'extension .js): est un langage de programmation permettant d'automatiser des tâches et d'interagir de manière avancée avec un page web. Le code javascript peut être intéreprété par le navigateur web qui va alors executer le code définie.
Note: Javascript est un langage typé dynamiquement, et dont la mémoire est gérée dynamiquement par un _garbage collector_.

## WebGL et bibliothèque Three.js

__WebGl__ est une API (Application Programming Interface) javascript permettant de décrire du contenu graphique à partir du navigateur. En pratique, cela signifie que votre navigateur est capable d'interpréter les fonctions décrites dans la norme WebGL afin d'afficher du contenu 2D et 3D. WebGL est une adaptation de la norme [OpenGL](https://www.opengl.org/) pour l'execution sur un navigateur. L'intérêt de WebGL réside dans son efficacité: en effet le navigateur est capable d'utiliser, si disponible, votre carte graphique pour réaliser les calculs nécessaire à l'affichage de la scène graphique.

WebGL, tout comme OpenGL sont des ensemble de fonctionalités qualifiés de "bas niveau": à s'avoir qu'il est nécessaire de gêrer manuellement des buffers de données (tels que des ensembles de coordonnées pour la géométrie, texture, normales, etc) et d'y appliquer des fonctions de traitements appelées shaders, décrites dans un langage spécifique GLSL.
Les notions de "plus haut niveaux" d'une scène 3D tels que la decription et manipulation simplifié de primitives géométriques, de couleurs, de lumières, caméra, d'interaction avec le clavier et la souris, etc, ne sont pas prises en charge par WebGL et doivent être codées par le développeur.

Cependant, différentes bibilothèques JavaScript ont été développées afin de simplifier cette partie en fournissant des interfaces au dessus de WebGL permettant de décrire des scènes 3D de manière simplifiée et d'interagir avec celles-ci. Ces bibliothèques tels que Three.js ou encore Babylon.js proposent ainsi ensemble de fonctions javascript de plus haut niveau pour décrire des objets et appliquer des actions sur ceux-ci, puis viennent réaliser les appels WebGL pour l'affichage.

__Three.js__ est une bibliothèque JavaScript permettant de gérer aisément le prototypage rapide d'une scène 3D. Elle propose, de manière non exhaustive, les fonctions suivantes:
* Création de primitives et matéraux (couleurs et apparence de la forme).
* Modification de la position et orientation des primitives.
* Placement et paramétrage de lumières et caméras.
* Gestion d'un graphe de scène: c'est à dire que chaque objet de la scène est définie de manière hiérarchique dans un arbre. Cela permet de définir aisément le placement relatif d'un objet parent et de ses enfants.
* Gestion du picking: sélection d'une partie d'un objet 3D suivant le clic de la souris.
* Réception des clics et déplacement de la souris, création et interaction avec des widgets graphiques (boutons, entrée textuelle, etc).

Votre code consistera ainsi à déveloper votre modeleur expressif 3D en JavaScript, en utilisant la bibiothèque Three.js (elle même utilisant WebGL de manière sos-jacente pour le rendu 3D).
