# Sauvegarde et chargement de scène

Ce programme permet de placer des cubes les uns au-dessus des autres dans la direction de la caméra de manière interactive (CTRL+clic gauche de la souris).
Elle propose également une interface disposant des trois options suivantes
* La sauvegarde de la scène au format JSON dans un fichier que l'on peut sauvegarder
* Le chargement d'une scène sauvegardée au format JSON depuis un fichier sur le disque dur
* L'export d'un ensemble de formes 3D au format .obj


__Q.__ Observez la mise en place du picking pour la création des cubes dans le code.
__Q.__ Créez une scène arbitraire et cliquez sur 'Save'.

Notez les points suivants
* Pour les mêmes raisons de sécurités vues lors du chargement de texture à partir d'un fichier, JavaScript ne peut pas écrire directement sur votre disque dur. Sauvegarder un fichier passe ici par la demande de téléchargement d'un fichier, ici réalisé par la fonction _download_. Cette fonction vient créer un objet HTML de type 'lien' sur lequel il clique.
* Le format de sauvegarde [JSON](https://www.json.org/) (JavaScript Object Notation) est un format de description de données sous forme de (pair,valeur). Ce format aisément lisible et modifiable en tant que texte est particulièrement adapté à l'encodage des structures JavaScript qui peuvent nativement s'exporter et s'importer depuis du JSON.

Sauvergardez le fichier téléchargé (save_scene.js) dans le répertoire src/ contenant le code.
Observez le fichier JSON avec un éditeur de texte, notez qu'il s'agit d'une description ASCII que l'on peut potentiellement modifier à la main.

__Q.__ Cliquez désormais sur 'Load' qui vient lire le fichier 'save_scene.js'. Si vous avez ouvert le fichier index.html directement avec votre navigateur, votre scène ne s'affiche pas. Observez le message d'erreur en console et corrigez le problème en suivant la démarche expliquée dans le cas du chargement de la texture.

Notez que le code du chargement réalisé à partir de la fonction [THREE.ObjectLoader](https://threejs.org/docs/#api/loaders/ObjectLoader) est réalisé directement en tant que fonction dans cet appel. ObjectLoader possède en effet, comme l'ensemble des fonctions de chargement de ressources, un comportement asynchrone. Le code situé à l'intérieur de l'appel à ObjectLoader se réalise lorsque le chargement a été réalisé (potentiellement plusieurs secondes plus tard après l'appui sur le bouton, sans pour autant bloquer l'exécution du script d'animation). Si ce code avait été placé après la fonction, il n'y aurait pas de garantie que le fichier ait été chargé.

__Q.__ Lorsqu'une scène contient différents cubes, cliquez désormais sur ExportOBJ. Cela permet de télécharger un maillage au format d'échange standard OBJ.
Chargez ce fichier OBJ depuis un programme externe capable de charger des maillages tels que [MeshMixer](https://www.meshmixer.com/), [Blender](https://www.blender.org/), ou [Meshlab](http://www.meshlab.net/), observez que votre scène soit correctement exportée.
