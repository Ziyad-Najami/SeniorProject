<?php
error_reporting(E_ERROR);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("content-type: application/json; charset=UTF-8");


if($_SERVER['REQUEST_METHOD'] !== 'GET') :
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

if(isset($_GET['id']))
{
    $item_id = filter_var($_GET['id'], FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_items',
            'min_range' => 1
        ]
        ]);


}

try{
    $sql = is_numeric($item_id) ?"SELECT * FROM `asw_item` WHERE id= '$item_id' AND role = 0" :"SELECT * FROM `asw_item` ";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    if($stmt->rowCount() > 0) :
        $data = null;
        if(is_numeric($item_id)){
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        else
        {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode([
            'success' => 1,
            'data' => $data,
        ]);

        else : 
            echo json_encode([
                'success' => 0,
                'message' => 'No Records Found',
            ]);
        endif;
}



catch(PDOExeptionException $e)
{
http_response_code(500);
echo json_encode([
    'success' => 0,
    'message' => $e->getMessage()
]);
exit;
}


?>