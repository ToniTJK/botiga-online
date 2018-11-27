<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$userNombre = $_GET['userNombre'];
$userApellido = $_GET['userApellido'];
$userEmail = $_GET['userEmail'];
$userProvincia = $_GET['userProvincia'];
$userCiudad = $_GET['userCiudad'];
$userRol = $_GET['userRol'];
$userImagen = $_GET['userImagen'];
$currentDate = $date = date('d/m/Y');

$output = array();
$sql = "INSERT INTO usuarios (nombre,apellido,provincia,ciudad,email,imagen,fecha_creacion,rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "ssssssss", $userNombre, $userApellido, $userEmail, $userProvincia, $userCiudad, $userImagen, $currentDate, $userRol);

// $check = mysqli_stmt_execute($result);

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