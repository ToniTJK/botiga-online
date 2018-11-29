<?php
session_start();
header('Content-type:application/javascript');
require "../../baseDatos/dbConect.php";



$final = array();
$output = array();

if(isset($_GET['email']) && $_GET['password']){
    $email = $_GET['email'];
    $pw = $_GET['password'];
    trim($email);
    trim($pw);
    
    $sqlCheckUser = "SELECT * FROM usuarios WHERE email = '$email' AND password = '$pw'";
    //$resultCheck = mysqli_prepare($cnx, $sqlCheckUser);
    //mysqli_stmt_bind_param($resultCheck, "ss", $email, $pw);
    //$check = mysqli_stmt_execute($resultCheck);

    $resultCheck = mysqli_query($cnx, $sqlCheckUser);

    //$check = true;
    //admin@admin.com1 admin
    if (!$resultCheck)
        $status = "sql";
    else {
        //$user = mysqli_fetch_array($check);
        //mysqli_stmt_bind_result($resultCheck, $col1, $col2);
        //$status=$user['id_usuario'];
        //while ($user = mysqli_stmt_fetch($resultCheck)) {
        //    printf("%s %s\n", $col1, $col2);
        //}
        //$status = $id;
        //$status = 'true';
        if(mysqli_num_rows($resultCheck) == 1){
            $user = mysqli_fetch_assoc($resultCheck);
            $_SESSION['email']=$user['email'];
            $_SESSION['myid']=$user['id_usuario'];
            $status = 'true';
        } else {
            $status = 'false';
        }
    }
} else {
    $status = 'null';
}


$final['status'] = $status;
$final['session'] = $_SESSION;
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