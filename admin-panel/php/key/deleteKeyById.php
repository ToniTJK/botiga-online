<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$keyId = $_GET['keyId'];
$output = array();

$sql = "DELETE FROM llaves WHERE id_llaves = ?";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "i", $keyId);

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