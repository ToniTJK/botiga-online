<?php
// User
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

$idUser = $_GET['idUser'];
$output = array();
$sql = "SELECT * FROM usuarios WHERE id_usuario = ".$idUser;
$result = mysqli_query($cnx, $sql);


if (mysqli_num_rows($result) == 1){
    while($row = mysqli_fetch_assoc($result)){
        $output[]=$row;
    }
        $status = 'true';
} else {
     $status = 'noUserFound';
}


$final['status'] = $status;
$final['output'] = $output;
$json = json_encode($final);

if(isset($_GET['callback'])){
   echo $_GET['callback'].'('. $json.')';
} 
else {
    echo $json; 
} 

mysqli_close($cnx);

?>