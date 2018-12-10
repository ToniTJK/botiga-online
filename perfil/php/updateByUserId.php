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

$final = array();

if(filter_var($userEmail, FILTER_VALIDATE_EMAIL) !== false){
    if(isset($_GET['userImagen'])){
        $sql = "UPDATE usuarios set nombre=?, apellido=?, email=?, provincia=?, ciudad=?, imagen=? WHERE id_usuario = ?";

        $result = mysqli_prepare($cnx, $sql);
        mysqli_stmt_bind_param($result, "ssssssi", $userNombre, $userApellido, $userEmail, $userProvincia, $userCiudad, $userImagen, $userId);    
    } else {
        $sql = "UPDATE usuarios set nombre=?, apellido=?, email=?, provincia=?, ciudad=? WHERE id_usuario = ?";

        $result = mysqli_prepare($cnx, $sql);
        mysqli_stmt_bind_param($result, "sssssi", $userNombre, $userApellido, $userEmail, $userProvincia, $userCiudad, $userId);
    }

    if (!(mysqli_stmt_execute($result)))
        $status = "false";
    else
        $status = "true";

} else {
    $status = "email";
}




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