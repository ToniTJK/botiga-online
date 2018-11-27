<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$gameId = $_GET['gameId'];
$gameNombre = $_GET['gameNombre'];
$gameDescripcion = $_GET['gameDescripcion'];
$gameImagen = $_GET['gameImagen'];
$gameVideo = $_GET['gameVideo'];
$gamePrecio = $_GET['gamePrecio'];


$output = array();
$sql = "UPDATE articulos_juegos set nombre=?, descripcion=?, imagen=?, video=?, precio=? WHERE id_articulo_juego = ?";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "ssssdi", $gameNombre, $gameDescripcion, $gameImagen, $gameVideo, $gamePrecio, $gameId);

//mysqli_stmt_execute($result);

if (!(mysqli_stmt_execute($result)))
    $output[] = "No se ha podido actualizar el registro.";
else
    $output[] = "Se ha actualizado correctamente!";


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