<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$userNombre = $_GET['userNombre'];
$userApellido = $_GET['userApellido'];
$userEmail = $_GET['userEmail'];
$userPassword = $_GET['userPassword'];
$userRepeatPassword = $_GET['userRepeatPassword'];
$userProvincia = $_GET['userProvincia'];
$userCiudad = $_GET['userCiudad'];
$userRol = $_GET['userRol'];
$userImagen = $_GET['userImagen'];
$currentDate = $date = date('d/m/Y');

$final = array();
if(!empty($userEmail) && !empty($userPassword) && !empty($userRepeatPassword)){
    if(filter_var($userEmail, FILTER_VALIDATE_EMAIL) !== false){
        if($userPassword === $userRepeatPassword){
            if(isset($_GET['userImagen'])){
                //INSERT INTO usuarios (nombre,apellido,provincia,ciudad,email,password,imagen,fecha_creacion,rol) VALUES ('asd1', 'asd2', 'asd3', 'asd4', 'asd5', 'asd6', 'asd7', 'asd8', 'asd9')
                $sql = "INSERT INTO usuarios (nombre,apellido,provincia,ciudad,email,password,imagen,fecha_creacion,rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

                $result = mysqli_prepare($cnx, $sql);
                mysqli_stmt_bind_param($result, "sssssssss", $userNombre, $userApellido, $userProvincia, $userCiudad, $userEmail, md5($userPassword), $userImagen, $currentDate, $userRol);
            } else {
                $sql = "INSERT INTO usuarios (nombre,apellido,provincia,ciudad,email,password,fecha_creacion,rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

                $result = mysqli_prepare($cnx, $sql);
                mysqli_stmt_bind_param($result, "ssssssss", $userNombre, $userApellido, $userProvincia, $userCiudad, $userEmail, md5($userPassword), $currentDate, $userRol);
            }
            // $check = mysqli_stmt_execute($result);

            if (!(mysqli_stmt_execute($result))){ 
                $status = "false";
            } else { $status = "true"; }     
        } else { $status = "pw"; }
    } else { $status = "email"; } 
} else { $status = "obli"; }

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