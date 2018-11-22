<?php
// User
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

$userId = $_GET['userId'];
$userNombre = $_GET['userNombre'];
$userApellido = $_GET['userApellido'];
$userEmail = $_GET['userEmail'];
$userProvincia = $_GET['userProvincia'];
$userCiudad = $_GET['userCiudad'];
$userImagen = $_GET['userImagen'];
$userRol = $_GET['userRol'];

$output = array();
/* 
        FORMA TRADICIONAL
$sql = "UPDATE usuarios set nombre='".$userNombre."', 
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
$sql = "UPDATE usuarios set nombre=?, apellido=?, email=?, provincia=?, ciudad=?, imagen=?, rol=? WHERE id_usuario = ?";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "sssssssi", $userNombre, $userApellido, $userEmail, $userProvincia, $userCiudad, $userImagen, $userRol, $userId);

mysqli_stmt_execute($result);

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