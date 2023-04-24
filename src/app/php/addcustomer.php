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


if(!isset($data->address) || !isset($data->full_name) || !isset($data->phone_number)) :

        echo json_encode([
            'success' => 0,
            'message' => 'PLease Enter Compulsory fields | address | full_name | phone_number',]);
            exit;

elseif(empty(trim($data->address)) || empty(trim($data->full_name)) || empty(trim($data->phone_number))) :
    echo json_encode([
        'success' => 0,
        'message' => 'Fields Cannot be empty. address | full_name | phone_number',]);
        exit;
    endif;


try
{
$address = htmlspecialchars(trim($data->address));
$full_name = htmlspecialchars(trim($data->full_name));
$phone_number = htmlspecialchars(trim($data->phone_number));
$email = htmlspecialchars(trim($data->email));



$querry = "INSERT INTO `asw_customer`(
    address, phone_number,total_sales,full_name, email)
    values (:address, :phone_number,0, :full_name, :email)";

$stmt = $conn->prepare($querry);

$stmt->bindValue(':address', $address,PDO::PARAM_STR);
$stmt->bindValue(':full_name', $full_name,PDO::PARAM_STR);
$stmt->bindValue(':email', $email,PDO::PARAM_STR);
$stmt->bindValue(':phone_number', $phone_number,PDO::PARAM_STR);


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