<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$idKey = $_GET['idKey'];
$output = array();
$sql = "SELECT * FROM llaves WHERE id_llaves = ".$idKey;
$result = mysqli_query($cnx, $sql);

if (mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
    $output[]=$row;
    }
    $json = json_encode($output);
} else {
    echo "No hay Usuarios.";
}

if(isset($_GET['callback'])){
   echo $_GET['callback'].'('. $json.')';
} 
else {
    echo $json; 
} 

mysqli_close($cnx);

?>