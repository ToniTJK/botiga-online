/* Arnau Viladerrams & Toni Torres & Aldo Menéndez */

/*drop database if exists dbTiendaOnline;*/
create database dbTiendaOnline;
use dbTiendaOnline;

CREATE TABLE articulos_juegos(
      id_articulo_juego INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(60),
      descripcion VARCHAR(240),
      imagen LONGTEXT,
      video TEXT,
      precio double
      /* FOREIGN KEYS ABAJO */

);

CREATE TABLE historial_compra(
      id_historial_compra INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(60),
      imagen LONGTEXT,
      precio double,
      /* FOREIGN KEYS ABAJO */
      id_usuario INT(11) NOT NULL

);

CREATE TABLE plataforma(
      id_plataforma INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(30)
      /* FOREIGN KEYS ABAJO */

);

CREATE TABLE genero(
      id_genero INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(40)
      /* FOREIGN KEYS ABAJO */

);

CREATE TABLE usuarios(
      id_usuario INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(75),
      apellido VARCHAR(75),
      provincia VARCHAR(75),
      ciudad VARCHAR(75),
      email VARCHAR(75),
      password VARCHAR(75),
      imagen LONGTEXT,
      fecha_creacion VARCHAR(60),
      rol ENUM('user', 'admin') NULL DEFAULT NULL
      /* FOREIGN KEYS ABAJO */

);

CREATE TABLE pedidos(
      id_pedido INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      /* FOREIGN KEYS ABAJO */
      id_articulo_juego INT(11) NOT NULL,
      id_usuario INT(11) NOT NULL,
      id_llaves INT(11) NOT NULL

);

CREATE TABLE favoritos(
      /* FOREIGN KEYS ABAJO */
      id_articulo_juego INT(11) NOT NULL,
      id_usuario INT(11) NOT NULL

);

CREATE TABLE llaves(
      id_llaves INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      llave LONGTEXT,
      /* FOREIGN KEYS ABAJO */
      id_articulo_juego INT(11) NOT NULL

);

CREATE TABLE carrito(
      id_carrito INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      /* FOREIGN KEYS ABAJO */
      id_usuario INT(11) NOT NULL,
      id_articulo_juego INT(11) NOT NULL

);

/* N:Ns */
CREATE TABLE juegos_genero(
      /* FOREIGN KEYS ABAJO */
      id_genero INT(11) NOT NULL,
      id_articulo_juego INT(11) NOT NULL

);

CREATE TABLE juegos_categoria(
      /* FOREIGN KEYS ABAJO */
      id_articulo_juego INT(11) NOT NULL,
      id_plataforma INT(11) NOT NULL

);

CREATE TABLE plataforma_juegos(
      /* FOREIGN KEYS ABAJO */
      id_plataforma INT(11) NOT NULL,
      id_articulo_juego INT(11) NOT NULL

);

/* Claves foráneas de historial_compra. */
ALTER TABLE historial_compra
ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE;

/* Claves foráneas de pedidos. */
ALTER TABLE pedidos
ADD FOREIGN KEY (id_articulo_juego) REFERENCES articulos_juegos(id_articulo_juego) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (id_llaves) REFERENCES llaves(id_llaves) ON DELETE CASCADE ON UPDATE CASCADE;

/* Claves foráneas de favoritos. */
ALTER TABLE favoritos
ADD FOREIGN KEY (id_articulo_juego) REFERENCES articulos_juegos(id_articulo_juego) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE;

/* Claves foráneas de llaves. */
ALTER TABLE llaves
ADD FOREIGN KEY (id_articulo_juego) REFERENCES articulos_juegos(id_articulo_juego) ON DELETE CASCADE ON UPDATE CASCADE;

/* Claves foráneas de carrito. */
ALTER TABLE carrito
ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (id_articulo_juego) REFERENCES articulos_juegos(id_articulo_juego) ON DELETE CASCADE ON UPDATE CASCADE;

/* Claves foráneas de los N:Ns. */
ALTER TABLE juegos_genero
ADD FOREIGN KEY (id_articulo_juego) REFERENCES articulos_juegos(id_articulo_juego) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (id_genero) REFERENCES genero(id_genero) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE juegos_categoria
ADD FOREIGN KEY (id_articulo_juego) REFERENCES articulos_juegos(id_articulo_juego) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (id_plataforma) REFERENCES plataforma(id_plataforma) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE plataforma_juegos
ADD FOREIGN KEY (id_plataforma) REFERENCES plataforma(id_plataforma) ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (id_articulo_juego) REFERENCES articulos_juegos(id_articulo_juego) ON DELETE CASCADE ON UPDATE CASCADE;

/*
Aldo
-titol

-cataleg
INSERT INTO `cataleg` (`id_cataleg`, `comentari`) VALUES ('1', 'Vladimir una empanadilla y a dormir'), ('2', 'Carmelo conocido por su Cotón');
-emissores
INSERT INTO `emissora` (`id_emissora`, `nom_comercial`, `abast`) VALUES ('1', 'RAC 1', 'Estatal'), ('2', 'Europa FM', 'Local');
-propietari
INSERT INTO `propietari` (`id_propietari`, `nom`, `adreça`, `numero_compte`) VALUES ('1', 'Richard Wellington', 'Carrer Sant Sus 56', '76839201'), ('2', 'Giorno Giovanna', 'Carrer L\'Andiamo 21', '11530442'), ('3', 'Nikolay Kozlov', 'Carrer Koltsevaia 35', '19269965');

TONI
-zona
-epubl
-epri
-emisiio
-dretpagament
*/

/*
ALTER TABLE tramesa
ADD FOREIGN KEY (diposit_sortida) REFERENCES diposit(id_diposit) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO `paquet` (`iup`, `pes`, `volum`, `id_tramesa`)
VALUES ('23123', '120', '60', '1'),
('75638', '50', '100', '1');

INSERT INTO `camioAsignat` (`id_matricula`, `id_diposit`, `duracioAsignada`)
VALUES ('1234AFT', '1', 50),
('3456CXT', '2', 40);
*/
