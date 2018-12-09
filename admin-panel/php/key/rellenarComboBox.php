<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$keyId = $_GET['keyId'];

$sql = "SELECT * FROM `llaves` INNER JOIN articulos_juegos ON llaves.id_articulo_juego = articulos_juegos.id_articulo_juego ORDER BY id_llaves DESC";
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