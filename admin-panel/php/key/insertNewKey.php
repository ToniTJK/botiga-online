<?php
// Game
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$keyLlave = $_GET['keyLlave'];
$keyIdJuego = $_GET['keyIdJuego'];


$output = array();
$sql = "INSERT INTO llaves (llave,id_articulo_juego) VALUES (?, ?)";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "si", $keyLlave, $keyIdJuego);

// $check = mysqli_stmt_execute($result);

if (!(mysqli_stmt_execute($result)))
    $output[] = "No se ha podido añadir la llave.";
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