<?php
// Keys
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

$sql = "SELECT * FROM `llaves` INNER JOIN articulos_juegos ON llaves.id_articulo_juego = articulos_juegos.id_articulo_juego ORDER BY id_llaves DESC LIMIT $start_from, $limit_page";
$result = mysqli_query($cnx, $sql);

if (mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
    $output[]=$row;
    }

} else {
    echo "No hay Llaves.";
}

$page_query = "SELECT * FROM llaves ORDER BY id_llaves DESC";
$page_result = mysqli_query($cnx, $page_query);
$total_records = mysqli_num_rows($page_result);
$total_pages = ceil($total_records/$limit_page);
    
    for($i=1; $i<=$total_pages; $i++){
        $output_pagination .= "<span class='pagination_link_key' id='".$i."'>".$i."</span>"; 
    }

$final['data1'] = $output;
$final['data2'] = $output_pagination;
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