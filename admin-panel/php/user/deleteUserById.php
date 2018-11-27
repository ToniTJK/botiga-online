<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$userId = $_GET['userId'];
$output = array();

$sql = "DELETE FROM usuarios WHERE id_usuario = ?";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "i", $userId);

//mysqli_stmt_execute($result);

if (!(mysqli_stmt_execute($result)))
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