<?php
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

$userId = $_GET['userId'];
$userNombre = $_GET['userNombre'];
$userApellido = $_GET['userApellido'];
$userEmail = $_GET['userEmail'];
$userUbicacion = $_GET['userUbicacion'];
$userProvincia = $_GET['userProvincia'];
$userCiudad = $_GET['userCiudad'];
$userTelefono = $_GET['userTelefono'];
$userImagen = $_GET['userImagen'];

$output = array();
/*$sql = "UPDATE usuarios set nombre='".$userNombre."', 
apellido='".$userApellido."', email='".$userEmail."', 
ubicacion='".$userUbicacion."', provincia='".$userProvincia."',
ciudad='".$userCiudad."', telefono=".$userTelefono.", 
imagen='".$userImagen."' WHERE id_usuario = '".$userId."'";
echo $sql;

$result = mysqli_query($cnx, $sql);

if(mysqli_affected_rows($con))
    $output[] = "Actualitzat correctament!";
else 
    $output[] = "No s'ha pogut actualitzar!";
    */
$sql = "UPDATE usuarios set nombre=?, apellido=?, email=?, ubicacion=?, provincia=?, ciudad=?, telefono=?, imagen=? WHERE id_usuario = ?";

//$result = $cnx->prepare($sql);
//$result->bind_param("ssssssis", $userNombre, $userApellido, $userEmail, $userUbicacion, $userProvincia, $userCiudad, $userTelefono, $userImagen);

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "ssssssisi", $userNombre, $userApellido, $userEmail, $userUbicacion, $userProvincia, $userCiudad, $userTelefono, $userImagen, $userId);

mysqli_stmt_execute($result);

if (!(mysqli_stmt_execute($result)))
    $output[] = "No s’ha pogut inserir el registre";
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