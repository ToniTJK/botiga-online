<?php
// Game
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$gameNombre = $_GET['gameNombre'];
$gameDescripcion = $_GET['gameDescripcion'];
$gameImagen = $_GET['gameImagen'];
$gameVideo = $_GET['gameVideo'];
$gamePrecio = $_GET['gamePrecio'];

$final = array();
if(!empty($gameNombre) && !empty($gameDescripcion) && !empty($gameImagen) && !empty($gamePrecio)){
    $sql = "INSERT INTO articulos_juegos (nombre,descripcion,imagen,video,precio) VALUES (?, ?, ?, ?, ?)";

    $result = mysqli_prepare($cnx, $sql);
    mysqli_stmt_bind_param($result, "ssssd", $gameNombre, $gameDescripcion, $gameImagen, $gameVideo, $gamePrecio);
    
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