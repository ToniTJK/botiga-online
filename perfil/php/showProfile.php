<?php
session_start();
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";

//if(isset($_SESSION['myid']))
    //$myid = $_SESSION['myid'];
//else 
    $status = "redirect";

$myid = 21;
//$index = 0;
$sql = "SELECT * FROM usuarios WHERE id_usuario = ".$myid;
//$result = mysqli_query($cnx, $sql);

/*$result = mysqli_prepare($cnx, $sql);
mysqli_stmt_bind_param($result, "i", $myid);    

if (!(mysqli_stmt_execute($result))){ 
    $status = "false"; 
} else {
        mysqli_stmt_store_result($result);
        if (mysqli_stmt_num_rows($result) == 1){
            //$data = mysqli_stmt_get_result($result);
            //mysqli_stmt_bind_result($result, $id, $nombre, $apellidos, $provincia, $ciudad, $imagen);
            
            while ($reg = mysqli_stmt_fetch($result)) {
                
                $elJSON[$index]['id'] = $reg['id'];
                $elJSON[$index]['nombre'] = $reg['nombre'];
                $elJSON[$index]['apellido'] = $reg['apellido'];
                $elJSON[$index]['provincia'] = $reg['provincia'];
                $elJSON[$index]['ciudad'] = $reg['ciudad'];
                $elJSON[$index]['email'] = $reg['email'];
                $elJSON[$index]['imagen'] = $reg['imagen'];
                $elJSON[$index]['fecha_creacion'] = $reg['fecha_creacion'];
            
            }
            
            $status = "true";

        } else { $status = "NoUsers"; }
}*/
$result = mysqli_query($cnx, $sql);

if (mysqli_num_rows($result) == 1){
    while($row = mysqli_fetch_assoc($result)){
        $output[]=$row;
    }
    $status = "true";
} else {
    $status = "redirect";
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