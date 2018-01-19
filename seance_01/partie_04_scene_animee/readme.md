# Animation

Cette partie présente la possibilité d'animer vos formes, typiquement par l'application de translations et rotations dont les paramètres dépendent du temps.

Le code proposé reprend la scène précédente, mais ajoute une translation dépendante du temps au cube ([voir scène en ligne](https://htmlpreview.github.io/?https://github.com/drohmer/INF473F/blob/master/seance_01/partie_04_scene_animee/src/index.html)).

L'animation est réalisée par une fonction (ici _animationLoop_) qui se rappelle régulièrement. _animationLoop_ fait-elle même appelle à la fonction JavaScript [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) qui permet de mettre à jour et de synchroniser l'affichage à l'écran. <br>
La fonction _requestAnimationFrame_ prend elle-même en paramètre une autre fonction (on appelle cela une fonction de rappel (ou _callback_ en anglais)).
La fonction de _callback_ (ici _animate_) reçoit en paramètre le temps écoulé en ms.

__Q.__ Observez la mise en place de l'animation dans le code. Ajouter un mouvement de rotation au cube. Vous pourrez par exemple utiliser la syntaxe
```javascript
box.rotation.y += 0.01;
```
