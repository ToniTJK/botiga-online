<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$keyId = $_GET['keyId'];
$keyLlave = $_GET['keyLlave'];
$keyIdJuego = $_GET['inputIdJuego'];


$output = array();
$sql = "UPDATE llaves set llave=?, id_articulo_juego=? WHERE id_llaves = ?";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "sii", $keyLlave, $keyIdJuego, $keyId);

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