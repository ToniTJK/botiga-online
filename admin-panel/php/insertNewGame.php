<?php
// Game
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

$gameNombre = $_GET['gameNombre'];
$gameDescripcion = $_GET['gameDescripcion'];
$gameImagen = $_GET['gameImagen'];
$gameVideo = $_GET['gameVideo'];
$gamePrecio = $_GET['gamePrecio'];

$output = array();
$sql = "INSERT INTO articulos_juegos (nombre,descripcion,imagen,video,precio) VALUES (?, ?, ?, ?, ?)";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "ssssd", $gameNombre, $gameDescripcion, $gameImagen, $gameVideo, $gamePrecio);

// $check = mysqli_stmt_execute($result);

if (!(mysqli_stmt_execute($result)))
    $output[] = "No se ha podido añadir el Juego.";
else
    $output[] = "Se ha añadido correctamente!";


$json = json_encode($output);

if(isset($_GET['callback'])){
   echo $_GET['callback'].'('. $json.')';
} 
else {
    echo $json; 
} 

mysqli_stmt_close($sql);
mysqli_close($cnx);

?>