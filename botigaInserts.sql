/* Arnau Viladerrams & Toni Torres & Aldo Menéndez */

/* Aquí están los inserts de la tabla por separado. */

INSERT INTO `plataforma` (`id_plataforma`, `nombre`)
VALUES ('1', 'PS4'),
       ('2', 'Switch'),
       ('3', 'PC'),
       ('4', 'Nintendo 3DS');


INSERT INTO `articulos_juegos` (`id_articulo_juego`, `nombre`, `descripcion`, `imagen`, `video`, `precio`)
VALUES ('1', 'Celeste', 'Juego de plataformas.', 'https://images-na.ssl-images-amazon.com/images/I/51OzzlzJOIL._AC_SY400_.jpg', 'https://www.youtube.com/watch?v=iofYDsA2yqg', '24.99'),
       ('2', 'Frostpunk', 'Juego de supervivencia.', 'https://images-na.ssl-images-amazon.com/images/I/91eQ85RGifL._SY445_.jpg', 'https://www.youtube.com/watch?v=qqEpSOFDXGA', '59.99'),
       ('3', 'Super Mario Party', 'Juego de fiesta (literalmente lo lleva en el nombre).', 'https://i.redd.it/4gpl8yov4m311.jpg', 'https://www.youtube.com/watch?v=OrLEHNF8qTg', '59.99'),
       ('4', 'Kingdom Hearts 3', 'Juego de rol de accion.', 'https://d3fa68hw0m2vcc.cloudfront.net/206/204137863.jpeg', 'https://www.youtube.com/watch?v=AtLkym8-RXU', '69.99'),
       ('5', 'Fallout 76', 'Juego de rol de accion.', 'https://vignette.wikia.nocookie.net/fallout/images/d/d8/FO76_pre-order_boxes.png/revision/latest?cb=20180611032753', 'https://www.youtube.com/watch?v=M9FGaan35s0', '59.99'),
       ('6', 'Pokemon Ultrasol', 'Juego de rol (y de capturar Pokemon).', 'https://projectpokemon.org/home/uploads/monthly_2017_11/large.DHhEDpsU0AAMPbw.jpg.8672be929ee68fbe632adbd3f75d2384.jpg', 'https://www.youtube.com/watch?v=N--MPAhxb50', '39.99'),
       ('7', 'Bloodborne', 'Juego de rol de acción (ARPG).', 'https://i0.wp.com/www.geeksundergrace.com/wp-content/uploads/2015/03/Bloodborne-Box-Art.png', 'https://www.youtube.com/watch?v=G203e1HhixY', '59.99');

INSERT INTO `llaves` (`id_llaves`, `llave`, `id_articulo_juego`)
VALUES ('1', 'f8DS6dfgA78D9S7dSA4D5s6A627S6d14S0f7D8s8w5', '1'),
       ('2', 'p1Gs4Ahyd6SnW980Sfq41AbXrSDyAphGjRnV70Jn23l', '2'),
       ('3', 'h7D6xy2aC93BsHlKbCj89Xa8D28kJDbvPL49G1aXrT', '3'),
       ('4', 'ye6cbNlaSywD78D9x1Ha10JfDnv94D6E1c05KgFbN1', '4'),
       ('5', 'z25B9a23hD7Fy74F47A1kGe9Ic5AqrW3F634G9bT1q', '5'),
       ('6', 'a9D6Sn5Dp94Dh28S9aoW815Dhe7Sjn6V8a10AyqA5', '6'),
       ('7', '7DuwpA9s6Dbe8ShdS5wAheDufD9w1DhfgD6sjVhsA1', '7');
