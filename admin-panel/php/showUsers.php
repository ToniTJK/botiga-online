<?php
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

$output = array();
$sql = "SELECT * FROM usuarios";
$result = mysqli_query($cnx, $sql);

if (mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
    $output[]=$row;
    }
    $json = json_encode($output);
} else {
    echo "No hay Usuarios.";
}

//$json = json_encode("test");
if(isset($_GET['callback'])){
   echo $_GET['callback'].'('. $json.')';
} 
else {
    echo $json; 
} 

mysqli_close($cnx);

?>