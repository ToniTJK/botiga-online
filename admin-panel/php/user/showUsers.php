<?php
// User
header('Content-type:application/javascript');
require "../../../baseDatos/dbConect.php";

$final = array();
$output = array();
$output_pagination = "";
$limit_page = 10;
$page = '';

    if (isset($_GET['page']) && $_GET['page']>0)
        $page = $_GET['page'];
    else
        $page = 1;

$start_from = ($page - 1) * $limit_page;
    
$sql = "SELECT * FROM usuarios ORDER BY id_usuario DESC LIMIT $start_from, $limit_page";
$result = mysqli_query($cnx, $sql);

    if (mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
        $output[]=$row;
        }
        
    } else {
        echo "No hay Usuarios.";
    }

$page_query = "SELECT * FROM usuarios ORDER BY id_usuario DESC";
$page_result = mysqli_query($cnx, $page_query);
$total_records = mysqli_num_rows($page_result);
$total_pages = ceil($total_records/$limit_page);
    
    //for($i=1; $i<=$total_pages; $i++){
    //   $output_pagination .= "<span class='pagination_link_user' id='".$i."'>".$i."</span>"; 
    //}

$final['data1'] = $output;
$final['data2'] = $total_pages;
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