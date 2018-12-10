<?php
session_start();
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

//if(isset($_SESSION['myid']))
    //$myid = $_SESSION['myid'];
//else 
    $status = "redirect";

$myid = 21;
$userOldPassword = $_GET['userOldPassword'];
$md5OldPassword = md5($userOldPassword);
$userNewPassword = $_GET['userNewPassword'];
$userNewRepeatPassword = $_GET['userNewRepeatPassword'];
$final = array();

//SELECT * FROM historial_compra AS hc INNER JOIN articulos_juegos AS aj ON aj.id_articulo_juego = hc.id_articulo_juego WHERE hc.id_usuario = 21
$checkPassword = "SELECT password FROM usuarios WHERE password = '".$md5OldPassword."'  AND id_usuario = ".$myid;
$resultCheck = mysqli_query($cnx, $checkPassword);

if($userNewPassword === $userNewRepeatPassword){
    if (mysqli_num_rows($resultCheck) == 1){
        $sql = "UPDATE usuarios set password=? WHERE id_usuario = ?";
        $result = mysqli_prepare($cnx, $sql);
        mysqli_stmt_bind_param($result, "si", md5($userNewPassword), $myid);
        $status = "pwyes";

        if (!(mysqli_stmt_execute($result)))
            $status = "false";
        else
            $status = "true";

        
    } else {
        $status = "pwno";
    }
} else {
    $status = "pwnoCoincide";
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