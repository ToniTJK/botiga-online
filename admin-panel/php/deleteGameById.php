<?php
// User
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

$gameId = $_GET['gameId'];
$output = array();

$sql = "DELETE FROM articulos_juegos WHERE id_articulo_juego = ?";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "i", $gameId);

$check = mysqli_stmt_execute($result);

if (!$check)
    $output[] = "No se ha podido eliminar correctamente.";
else
    $output[] = "Se ha eliminado correctamente!";


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