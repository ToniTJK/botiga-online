<?php
// User
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

$userNombre = $_GET['userNombre'];
$userEmail = $_GET['userEmail'];
$userPassword = $_GET['userPassword'];
$userRepeatPassword = $_GET['userRepeatPassword'];
$userRol = 'user';
$currentDate = $date = date('d/m/Y');

$output = array();
$sql = "INSERT INTO usuarios (nombre,email,password,rol,fecha_creacion) VALUES (?, ?, ?, ?, ?)";

$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "sssss", $userNombre, $userEmail, md5($userPassword), $userRol, $currentDate);

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
