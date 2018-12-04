<?php
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$id = $_GET['id'];
$pw = $_GET['pw'];
$pwr = $_GET['pwr'];


if($pw === $pwr){
    $sql = "UPDATE usuarios set password=? WHERE id_usuario = ?";

    $result = mysqli_prepare($cnx, $sql);
    mysqli_stmt_bind_param($result, "si", $pw, $id);

    if (!(mysqli_stmt_execute($result)))
        $status = "false";
    else
        $status = "true";

} else 
    $status = "pw";

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