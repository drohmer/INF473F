# Interfaces

Cette partie propose d'introduire l'utilisation d'interface graphique dite GUI (Graphical User Interface) dans votre code.

Une interface consiste à placer des éléments graphiques que l'on appelle _Widgets_ (ex. boutons, sliders, etc pour interagir avec des valeurs du code ou appeler certaines fonctions.

Les GUI consistent à:
- Placer des représentations graphiques appelées _Widgets_ (ex. bouton, text, slider, checkBox/comboBox, etc).
- Définir les actions à effectuer dans le code lors de la sélection/modification de ces widgets: généralement par signaux/slots.

Il existe différentes bibliothèques permettant de réaliser des interfaces. En particulier, HTML possède des éléments de base pour créer des boutons et champs à remplir.
Cependant la mise en place directe à partir d'HTML peut être fastidieuse pour du prototypage rapide d'interface.

Nous proposons d'utiliser __[dat.gui](https://github.com/dataarts/dat.gui)__, une bibliothèque permettant de rapidement prototyper une interface simple.
Notons que [dat.gui](https://github.com/dataarts/dat.gui) est une bibliothèque JavaScript indépendante de Three.js, elle peut donc être utilisée pour d'autres projets non liés à la 3D.

N'hésitez pas à vous référer aux liens suivants:
* La [documentation de l'API](https://github.com/dataarts/dat.gui/blob/master/API.md)
* Le [tutoriel de dat.gui](http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage)


Nous proposons dans cette partie deux codes d'exemples:
* __a_dat_gui_intro__: Une introduction minimaliste de dat.gui indépendamment de Three.js
* __b_ui_scene3D__: L'utilisation de dat.gui combinée avec une scène 3D.
