# Picking et déplacement d'objet

Ce second code propose de réaliser la [sélection ainsi que le déplacement de l'objet par une approche de type "drag and drop"](https://htmlpreview.github.io/?https://github.com/drohmer/INF473F/blob/master/seance_02/05_picking/b_drag_and_drop/src/index.html).

Notez que le code n'utilise cette fois plus de variables globales et adapte les fonctions de _callback_ passées en paramètres de manière à ne recevoir que les données nécessaires.

Dans le cas général, le déplacement de la souris ne peut déterminer qu'un déplacement 2D, il manque donc une information pour réaliser un déplacement 3D complet. Plusieurs options sont possibles, par exemple
* limiter la translation sur un axe global (x, y, z).
* limiter la translation sur un axe local à la caméra (horizontal, vertical, profondeur)

L'une des approches permettant d'imiter l'impression de "drag and drop" de l'objet consiste à déplacer celui-ci dans le plan de la caméra, de manière à ce que le sommet sélectionné suive exactement le mouvement de la souris. Il s'agit du cas présenté ici.

Considérons qu'un point p0 ait été sélectionné sur l'objet 3D à partir du point (x,y) sélectionné sur l'écran. La souris est ensuite déplacée sur l'écran en un nouveau point 2D (x',y'). L'objectif est de calculer la translation à appliquer à p0 telle que l'image de p0+translation ait pour image le point 2D (x',y').

Soit P le plan passant par le point 3D sélectionné p, et de normale n. Soit R le rayon ayant pour origine le centre de la caméra p0, et de direction d (calculé à partir de (x',y')). On pourra considérer que le rayon R est paramétré par un paramètre t>0, et R(t) = p0 + t d. Soit pI le point d'intersection entre le rayon R et le plan P. On considèrera que R(tI) = pI.

__Q.__ Donnez l'expression de la valeur tI en fonction de p, p0, n, et d. En déduire la valeur de pI et la translation à appliquer à p0.

__Q.__ Retrouvez ces différentes informations dans le code (fonction _onMouseMove_).
On notera l'utilisation de la fonction _unproject_ permettant de réaliser la projection inverse d'un point 2D de l'écran vers l'espace 3D (à un degré de liberté prêt en termes de profondeur).

__Q.__ Modifiez le code de manière à gérer la collision en empêchant l'objet de sortir du cube unité [0,1]x[0,1][0,1].

__Q.__ Modifiez le code de manière à pouvoir faire tourner à la souris l'objet sur lui même autour d'un axe dépendant de l'angle de vu de la caméra (rem. vous n'êtes plus obligés de gérer la collision lors de la rotation).