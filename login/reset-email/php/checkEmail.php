<?php
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";
require_once '../../../vendor/autoload.php';



$final = array();

if(isset($_GET['email'])){
    $email = $_GET['email'];

    $sqlCheckUser = "SELECT * FROM usuarios WHERE email = '$email'";
    $resultCheck = mysqli_query($cnx, $sqlCheckUser);
    
    //admin@admin.com1 admin
    if (!$resultCheck)
        $status = "sql";
    else {
        
        if(mysqli_num_rows($resultCheck) == 1){
            $user = mysqli_fetch_assoc($resultCheck);
            $nombre=$user['nombre'];
            $id_usuario=$user['id_usuario'];
            $id_encrypt = md5('%ZDF#lex09382$'.$id_usuario);

            /* SEND EMAIL */
            $to = "toninotor5@gmail.com";
            $subject = "Recuperar Password - Sistema de Recuperación FastKeys";
            
            $url = "http://localhost:8888/botiga-online/login/reset-password/reset-password-validated.php?id=".$id_encrypt;
            $message = "
            <html>
            <head>
            <title>Recordar Contraseña</title>
            </head>
            <body>
            <p>Hola ".$nombre."</p>
            <p>Se ha solicitado un reinicio de contraseña.</p>
            <p>Para restaurar visita la siguiente dirección: <a href='".$url."'>Cambiar Password</a></p>
            </body>
            </html>
            ";

            // Always set content-type when sending HTML email
            //$headers = "MIME-Version: 1.0" . "\r\n";
            //$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            //$headers = 'From: ' . $email;
            $headers = "X-Mailer: PHP/" . phpversion() . " \r\n";
            $headers .= "Mime-Version: 1.0 \r\n";
            $headers .= "Content-Type: text/plain";

            // More headers
            $headers .= 'From: <info@fastkeys.com>' . "\r\n";

            if(mail($to,$subject,$message,$headers))
                $status = 'sienviado';
            else
                $status = 'noenviado';
            
        } else {
            $status = 'noresult';
        }
    }
} else {
    $status = 'null';
}


$final['status'] = $status;
$json = json_encode($final);

if(isset($_GET['callback'])){
   echo $_GET['callback'].'('. $json.')';
} 
else {
    echo $json; 
} 

//mysqli_stmt_close($sql);
mysqli_close($cnx);

?>