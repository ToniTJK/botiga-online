<?php
// User Image
header('Content-type:application/javascript');

if($_FILES["file"]["name"] != '')
{
    $image = explode('.', $_FILES["file"]["name"]);
    $ext = end($image);
    $originalName = $image[0];
    $name = 'FastKeys_' . rand(100, 9999) . $originalName . rand(100, 9999) . '.' . $ext;
    $location = '../../uploads/user/' . $name;  
    move_uploaded_file($_FILES["file"]["tmp_name"], $location);
    $status = "UPLOADED";
} else {
    $status = "error";
}

$final['status'] = $status;
$final['imagen_name'] = $name;
$json = json_encode($final);

if(isset($_GET['callback']))
   echo $_GET['callback'].'('. $json.')';
else 
    echo $json; 


?>