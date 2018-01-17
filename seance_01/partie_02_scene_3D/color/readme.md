# Encodage des couleurs

### Système RGB

Une approche courante adaptée à la représentation d'une couleur sur un écran consiste à définir celle-ci sur trois canaux: Rouge, Vert, Bleu. On parle de composantes RVB en français, ou RGB en anglais.

Chaque composante est encodée sur une valeur. Il est standard d'encoder chaque composante sur un octet. C'est-à-dire que chaque composante peut prendre 256 valeurs différentes. La valeur 0 correspond à l'absence de composante, alors que la valeur 255 correspondra à son maximum.

Une couleur complète, peut ainsi être définie par 3 nombres, chacun compris entre 0 et 255. La couleur résultante est obtenue par le modèle de synthèse additive des couleurs. Exemple de quelques couleurs particulières: (0,0,0):noir; (255,0,0):rouge; (0,255,0):vert; (0,0,255):bleu; (255,255,255):blanc; (255,255,0):jaune, etc <br>
Au total il est possible de définir 256x256x256 ~ 16.7 millions de couleurs différentes. On retrouvera souvent ce chiffre dans les caractéristiques des écrans. On pourra également retrouver l'indication _true color_ qui signifie la même chose.

### Encodage en hexadécimal

Une couleur est ainsi stockée sur 3 octets (ou encore 24 bits), chaque octet indiquant la valeur d'une composante.
Il est commode de représenter les valeurs de chaque octet en représentation hexadécimal. En effet, chaque octet correspond exactement à deux chiffres hexadécimaux.

Pour rappel, la représentation hexadécimale (pour un nombre entier positif) consiste à le représenter en base 16. Les symboles hexadécimaux a,b,c,d,e,f représentant respectivement les valeurs décimales 10,11,12,13,14,15.
Soit v(x) la correspondance en base 10 du symbole x hexadécimal.
Convertir le nombre hexadécimal 'xy' en valeur décimale peut se réaliser par l'opération suivante: v(xy) = 16*v(x) + v(y).

En JavaScript un nombre hexadécimal quelconque est précédé de la notion _0x_. <br>
_ex._ 0xa = '10'; 0xb='11'; 0x0f='15'; 0x10='16'; 0x11='17'; 0xff='255'; 0x100='256'

Comme indiqué précédemment, chaque composante d'une couleur étant stockée sur un seul octet, elle est encodée par deux symboles hexadécimaux entre 0x00 et 0xff.
Une couleur complète est définie entièrement par trois composantes, et donc 3 pairs de symboles hexadécimaux (soit 6 symboles).

Les trois composantes RGB sont concaténées sur une seule valeur, généralement dans l'ordre rouge, puis vert, puis bleu (0xRRVVBB, où RR, VV, et BB sont les symboles hexadécimaux de chaque composante).

Exemple: 0xffab00 est interprété comme ayant les composantes:
* rouge: 0xff=255
* vert: 0xab=171
* bleu: 0x00=0.
Soit au final une couleur légèrement orangée.

Quelques couleurs classiques:
* 0x000000: noir
* 0xffffff: blanc
* 0xff0000: rouge
* 0x00ff00: rouge
* 0x0000ff: bleu
* 0xffff00: jaune
* 0xff00ff: magenta
* 0x00ffff: cyan

### Remarques supplémentaires

* Différents outils existent pour simplifier sa sélection de couleur. [Exemple sur w3schools](https://www.w3schools.com/colors/colors_hexadecimal.asp).

* Vous pourrez tomber sur des variantes de cet encodage: ex. Encodage RGBA sur 4 octets, où A est une composante dite 'alpha' que l'on peut utiliser pour gérer de la transparence. Il est possible également d'encoder les composantes de couleurs sur plus qu’un seul octet, ou encore de stocker les composantes RGB dans un ordre différent.

* Vous pourrez également rencontrer des encodages de couleurs dans des bases différentes (on parle d'espaces couleur), par exemple
 * HSL (hue, saturation, lighting) permettant de séparer la teinte (hue) de la valeur de l'illumination/pureté de la couleur (utilisés dans les canaux de transmissions).
 * CMYK (cyan, magenta, yellow, black), utilisé en imprimerie et associée à une synthèse soustractive.
 * LAB permettant de s'approcher de la représentation perceptuelle des couleurs, utilisé dans le cas de rendus de couleurs à haute fidélité.
 * Spectre de fréquences, utilisé pour de la mesure physique ou en simulation numérique.
