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


if(!isset($data->user_name) || !isset($data->full_name) || !isset($data->password)) :

        echo json_encode([
            'success' => 0,
            'message' => 'PLease Enter Compulsory fields | user_name | full_name | password',]);
            exit;

elseif(empty(trim($data->user_name)) || empty(trim($data->full_name)) || empty(trim($data->password))) :
    echo json_encode([
        'success' => 0,
        'message' => 'Fields Cannot be empty. user_name | full_name | password',]);
        exit;
    endif;


try
{
$user_name = htmlspecialchars(trim($data->user_name));
$full_name = htmlspecialchars(trim($data->full_name));
$role = htmlspecialchars(trim($data->role));
$password = htmlspecialchars(trim($data->password));



$querry = "INSERT INTO `asw_user`(
    username, password, full_name, role)
    values (:user_name, :password, :full_name, :role)";

$stmt = $conn->prepare($querry);

$stmt->bindValue(':user_name', $user_name,PDO::PARAM_STR);
$stmt->bindValue(':full_name', $full_name,PDO::PARAM_STR);
$stmt->bindValue(':role', $role,PDO::PARAM_STR);
$stmt->bindValue(':password', $password,PDO::PARAM_STR);


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