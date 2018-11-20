<?php
// User
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

$userNombre = $_GET['userNombre'];
$userApellido = $_GET['userApellido'];
$userEmail = $_GET['userEmail'];
$userUbicacion = $_GET['userUbicacion'];
$userProvincia = $_GET['userProvincia'];
$userCiudad = $_GET['userCiudad'];
$userTelefono = $_GET['userTelefono'];
$userImagen = $_GET['userImagen'];

$output = array();
$sql = "INSERT INTO usuarios (nombre,apellido,email,ubicacion,provincia,ciudad,telefono,imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "ssssssis", $userNombre, $userApellido, $userEmail, $userUbicacion, $userProvincia, $userCiudad, $userTelefono, $userImagen);

mysqli_stmt_execute($result);

if (!(mysqli_stmt_execute($result)))
    $output[] = "No se ha podido añadir el usuario.";
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