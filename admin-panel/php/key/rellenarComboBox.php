<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$sql = "SELECT id_articulo_juego, nombre FROM `articulos_juegos` ORDER BY id_articulo_juego DESC";
$result = mysqli_query($cnx, $sql);

if (mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
    $output[]=$row;
    }

} else {
    echo "No hay Llaves.";
}

$final['data'] = $output;
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