<?php
error_reporting(E_ERROR);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST,GET,DELETE,PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request Detected! Only POST requests are allowed',
    ]);
    exit;
}

require 'connection.php';
$database = new ConnectionDB();
$conn = $database->connect();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->vendor) || !isset($data->user_id) || !isset($data->posting_date)) {
    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fields | vendor | user_id | posting_date',
    ]);
    exit;
} elseif (empty(trim($data->vendor)) || empty(trim($data->user_id)) || empty(trim($data->posting_date))) {
    echo json_encode([
        'success' => 0,
        'message' => 'Fields cannot be empty. vendor | user_id | posting_date',
    ]);
    exit;
}

try {
    $vendor = htmlspecialchars(trim($data->vendor));
    $user_id = htmlspecialchars(trim($data->user_id));
    $posting_date = htmlspecialchars(trim($data->posting_date));
    $status = isset($data->status) ? htmlspecialchars(trim($data->status)) : null;

    $query = "INSERT INTO `asw_purchase_header` (vendor_id, user_id, posting_date, status) VALUES (:vendor, :user_id, :posting_date, :status)";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(':vendor', $vendor, PDO::PARAM_STR);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_STR);
    $stmt->bindValue(':posting_date', $posting_date, PDO::PARAM_STR);
    $stmt->bindValue(':status', $status, PDO::PARAM_STR);

    if ($stmt->execute()) {
        $headerID;
        try {
            $sql = "SELECT * FROM `asw_purchase_header` ORDER BY ID DESC LIMIT 1";
            $stmt1 = $conn->prepare($sql);
            $stmt1->execute();
            $headerID = $stmt1->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e1) {
            http_response_code(500);
            echo json_encode([
                'success' => 0,
                'message' => $e1->getMessage(),
            ]);
            exit;
        }

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'header' => $headerID,
            'message' => 'Data inserted successfully',
        ]);
        exit;
    } else {
        echo json_encode([
            'success' => 0,
            'message' => 'There is some problem in data inserting',
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
}