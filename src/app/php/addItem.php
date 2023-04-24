<?php
error_reporting(E_ERROR);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST,GET , DELETE,PUT");
header("content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers , Authorization , X-Requested-With");
$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if($_SERVER['REQUEST_METHOD'] !== 'POST') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request Detected! Only GET requests are allowed',
    ]);
    exit;
endif;



require 'connection.php';
$database = new ConnectionDB();
$conn = $database->connect();

$data = json_decode(file_get_contents("php://input"));


if(!isset($data->Description)) :

        echo json_encode([
            'success' => 0,
            'message' => 'PLease Enter Compulsory fields. Description',]);
            exit;

elseif(empty(trim($data->Description))) :
    echo json_encode([
        'success' => 0,
        'message' => 'Fields Cannot be empty. Description',]);
        exit;
    endif;


try
{
$Description = htmlspecialchars(trim($data->Description));



$querry = "INSERT INTO `asw_item`(
    description, unit_cost, unit_price, total_sales , total_qty_sold , inventory)
    values (:Description,0 , 0, 0, 0 ,0)";

$stmt = $conn->prepare($querry);

$stmt->bindValue(':Description', $Description,PDO::PARAM_STR);



if($stmt->execute()){

    http_response_code(201);
    echo json_encode([
        'success' => 1,
        'message' =>'Data Inserted Successfully'
    ]);
    exit;
}
else 
{
    echo json_encode([
        'success' => 0,
        'message' =>'There is some problem in data inserting'
    ]);

}


}
 catch(PDOException $e)
 {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e.getMessage()
    ]);

 }   
?>