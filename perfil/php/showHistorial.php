<?php
session_start();
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

//if(isset($_SESSION['myid']))
    //$myid = $_SESSION['myid'];
//else 
    $status = "redirect";

$myid = 21;
//SELECT * FROM historial_compra AS hc INNER JOIN articulos_juegos AS aj ON aj.id_articulo_juego = hc.id_articulo_juego WHERE hc.id_usuario = 21
$sql = "SELECT * FROM historial_compra AS hc INNER JOIN articulos_juegos AS aj ON aj.id_articulo_juego = hc.id_articulo_juego WHERE hc.id_usuario = ".$myid;
$result = mysqli_query($cnx, $sql);

if (mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $output[]=$row;
    }
    $status = "true";
} else {
    $status = "false";
}

$final['info'] = $output;
$final['status'] = $status;
$json = json_encode($final);

    if(isset($_GET['callback'])){
        echo $_GET['callback'].'('. $json.')';
    } else {
        echo $json; 
    } 

mysqli_stmt_close($sql);
mysqli_close($cnx);

?>