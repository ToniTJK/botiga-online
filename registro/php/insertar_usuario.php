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
$resultaDos = array();

if ($userPassword == $userRepeatPassword) {

  $sql = "INSERT INTO usuarios (nombre,email,password,rol,fecha_creacion) VALUES (?, ?, ?, ?, ?)";

  $result = mysqli_prepare($cnx, $sql);
  mysqli_stmt_bind_param($result, "sssss", $userNombre, $userEmail, md5($userPassword), $userRol, $currentDate);

  if (!(mysqli_stmt_execute($result)))
      $status = "0";
  else
      $status = "1";

} else {

  $status = "0";

}

$resultaDos["status"] = $status;
$json = json_encode($resultaDos);

if(isset($_GET['callback'])){
   echo $_GET['callback'].'('. $json.')';
}
else {
    echo $json;
}

mysqli_stmt_close($sql);
mysqli_close($cnx);

?>
