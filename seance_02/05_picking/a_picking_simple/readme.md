# Example de picking

Ce premier code vous donne un exemple de réalisation de picking d'un sommet du cube. La sélection se réalise en réalisant un clic gauche de la souris sur le cube lorsque la touche CTRL est enfoncée.

Le point 3D correspondant sur le cube est alors affiché en rouge, et un plan semi-transparent est affiché. Ce plan passe par le point 3D du cube, et est orienté de manière à être parallèle au plan de la caméra au moment de la sélection.

On pourra noter les choses suivantes:
* Pour simplifier le code de ce premier exemple, les données sont placées en tant que variables globales.
* Un cadre (créé par la fonction _initFrameXYZ_) permet de visualiser les axes (x,y,z) en couleur (respectivement rouge, vert, et bleu) sur les intervalles [0,1].

__Q.__ Observez que le picking fonctionne correctement et affichez en console les éléments contenus dans la variable _intersects_ dans la fonction _onMouseDown_. A quoi correspond la valeur "distance".

__Q.__ Ajoutez d'autres éléments dans la scène et changez la couleur de l'objet sélectionné.
