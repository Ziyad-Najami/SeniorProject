<?php
error_reporting(E_ERROR);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("content-type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request Detected! Only GET requests are allowed',
    ]);
    exit;
}

require 'connection.php';
$database = new ConnectionDB();
$conn = $database->connect();

$query = "SELECT * FROM asw_item ORDER BY total_qty_sold ASC LIMIT 1";

$result = $conn->query($query);

if ($result) {
    $row = $result->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        $item = $row;
        echo json_encode(['data' => $item]);
    } else {
        echo json_encode(['error' => 'No items found in the table']);
    }
} else {
    echo json_encode(['error' => 'Error executing the query']);
}

$conn = null;
?>
