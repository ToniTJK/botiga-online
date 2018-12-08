<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$userId = $_GET['userId'];
$userNombre = $_GET['userNombre'];
$userApellido = $_GET['userApellido'];
$userEmail = $_GET['userEmail'];
$userProvincia = $_GET['userProvincia'];
$userCiudad = $_GET['userCiudad'];
$userImagen = $_GET['userImagen'];
$userRol = $_GET['userRol'];
$final = array();

if(isset($_GET['userImagen'])){
    $sql = "UPDATE usuarios set nombre=?, apellido=?, email=?, provincia=?, ciudad=?, imagen=?, rol=? WHERE id_usuario = ?";

    $result = mysqli_prepare($cnx, $sql);
    mysqli_stmt_bind_param($result, "sssssssi", $userNombre, $userApellido, $userEmail, $userProvincia, $userCiudad, $userImagen, $userRol, $userId);    
} else {
    $sql = "UPDATE usuarios set nombre=?, apellido=?, email=?, provincia=?, ciudad=?, rol=? WHERE id_usuario = ?";

    $result = mysqli_prepare($cnx, $sql);
    mysqli_stmt_bind_param($result, "ssssssi", $userNombre, $userApellido, $userEmail, $userProvincia, $userCiudad, $userRol, $userId);

}


//mysqli_stmt_execute($result);

if (!(mysqli_stmt_execute($result)))
    $status[] = "No se ha podido actualizar el registro.";
else
    $status[] = "Se ha actualizado correctamente!";

$final['status'] = $status;
$json = json_encode($final);

if(isset($_GET['callback'])){
   echo $_GET['callback'].'('. $json.')';
} 
else {
    echo $json; 
} 

mysqli_stmt_close($sql);
mysqli_close($cnx);

?>