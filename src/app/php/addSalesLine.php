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


if(!isset($data->product_id) || !isset($data->product_price) || !isset($data->quantity)) :

        echo json_encode([
            'success' => 0,
            'message' => 'PLease Enter Compulsory fields | product_id | product_price | quantity',]);
            exit;

elseif(empty(trim($data->product_id)) || empty(trim($data->product_price)) || empty(trim($data->quantity))) :
    echo json_encode([
        'success' => 0,
        'message' => 'Fields Cannot be empty. product_id | product_price | quantity',]);
        exit;
    endif;


try
{
$item_id = htmlspecialchars(trim($data->product_id));
$product_price = htmlspecialchars(trim($data->product_price));
$quantity = htmlspecialchars(trim($data->quantity));
$order_id = htmlspecialchars(trim($data->order_id));
$line_amount = $quantity * $product_price;



$querry = "INSERT INTO `asw_sales_lines`(
    item_id, qty ,line_amount , order_id)
    values (:item_id, :quantity, :line_amount, :order_id)";

$stmt = $conn->prepare($querry);

$stmt->bindValue(':item_id', $item_id,PDO::PARAM_STR);
$stmt->bindValue(':line_amount', $line_amount,PDO::PARAM_STR);
$stmt->bindValue(':order_id', $order_id,PDO::PARAM_STR);
$stmt->bindValue(':quantity', $quantity,PDO::PARAM_STR);


if($stmt->execute()){


    $stmt = $conn->prepare("SELECT item_id, SUM(qty) as total_qty, SUM(line_amount) as total_line_amount
                        FROM asw_sales_lines
                        WHERE item_id = :item_id
                        GROUP BY item_id");
$stmt->bindValue(':item_id', $item_id, PDO::PARAM_INT);


$stmt->execute();


$result = $stmt->fetch(PDO::FETCH_ASSOC);


if ($result) {
   
        $total_qty = $result['total_qty'];
        $total_line_amount = $result['total_line_amount'];
        $unit_price = $total_line_amount / $total_qty;

        // Update the asw_item table
        $stmt = $conn->prepare("UPDATE asw_item SET unit_price = :unit_price,
                                                     total_sales = total_sales + :line_amount,
                                                     total_qty_sold = total_qty_sold + :quantity,
                                                     inventory = inventory - :quantity
                                WHERE id = :item_id");
        $stmt->bindValue(':unit_price', $unit_price, PDO::PARAM_STR);
        $stmt->bindValue(':line_amount', $line_amount,PDO::PARAM_INT);
        $stmt->bindValue(':quantity', $quantity, PDO::PARAM_INT);
        $stmt->bindValue(':item_id', $item_id, PDO::PARAM_INT);
        $stmt->execute();

                
        $stmt = $conn->prepare("UPDATE asw_customer SET total_sales = total_sales + :total_line_amount WHERE id = (SELECT customer_id FROM asw_sales_header WHERE id = :order_id)");
        $stmt->bindValue(':total_line_amount', $total_line_amount, PDO::PARAM_STR);
        $stmt->bindValue(':order_id', $order_id, PDO::PARAM_INT);
        $stmt->execute();

    
    
}
















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
        'message' => $e
    ]);

 }   
?>