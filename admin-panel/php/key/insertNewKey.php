<?php
// Game
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$keyLlave = $_GET['keyLlave'];
$keyIdJuego = $_GET['keyIdJuego'];
$final = array();

if(!empty($keyLlave)){
    $sql = "INSERT INTO llaves (llave,id_articulo_juego) VALUES (?, ?)";
    $result = mysqli_prepare($cnx, $sql);
    mysqli_stmt_bind_param($result, "si", $keyLlave, $keyIdJuego);
    if (!(mysqli_stmt_execute($result)))
        $status = "false";
    else
        $status = "true";

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