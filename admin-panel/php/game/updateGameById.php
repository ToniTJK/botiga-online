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


$final = array();
if(isset($_GET['gameImagen'])){
    $sql = "UPDATE articulos_juegos set nombre=?, descripcion=?, imagen=?, video=?, precio=? WHERE id_articulo_juego = ?";

    $result = mysqli_prepare($cnx, $sql);
    mysqli_stmt_bind_param($result, "ssssdi", $gameNombre, $gameDescripcion, $gameImagen, $gameVideo, $gamePrecio, $gameId);
} else {
    $sql = "UPDATE articulos_juegos set nombre=?, descripcion=?, video=?, precio=? WHERE id_articulo_juego = ?";

    $result = mysqli_prepare($cnx, $sql);
    mysqli_stmt_bind_param($result, "sssdi", $gameNombre, $gameDescripcion, $gameVideo, $gamePrecio, $gameId);
}

//mysqli_stmt_execute($result);

if (!(mysqli_stmt_execute($result)))
    $status = "No se ha podido actualizar el registro.";
else
    $status = "Se ha actualizado correctamente!";


$final['status'] = $status;
$json = json_encode($final);

if(isset($_GET['callback'])){
   echo $_GET['callback'].'('. $json.')';
} 
else {
    echo $json; 
} 

mysqli_stmt_close($sql);
mysqli_close($cnx);

?>