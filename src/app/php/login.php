<?php
error_reporting(E_ERROR);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if($_SERVER['REQUEST_METHOD'] !== 'POST') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request Detected! Only POST requests are allowed',
    ]);
    exit;
endif;

require 'connection.php';
$database = new ConnectionDB();
$conn = $database->connect();

$data = json_decode(file_get_contents("php://input"));

if(!isset($data->username) || !isset($data->password)) :
    echo json_encode([
        'success' => 0,
        'message' => 'Please enter username and password',
    ]);
    exit;
elseif(empty(trim($data->username)) || empty(trim($data->password))) :
    echo json_encode([
        'success' => 0,
        'message' => 'Fields cannot be empty. Please enter username and password',
    ]);
    exit;
endif;

try {
    $username = htmlspecialchars(trim($data->username));
    $password = htmlspecialchars(trim($data->password));

    $query = "SELECT * FROM `asw_user` WHERE `username`=:username AND `password`=:password";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(':username', $username, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);

    if($stmt->execute()) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row) {
            $role = ($row['role'] == 1) ? "manager" : "salesman";
            $secret_key = "jgcv32ruwaioeDKSVGFHJCm32ZiyadNajamiKeyldasjgbkf"; // Replace this with your own secret key
            
            // Set the token expiration time to 1 hour from now
            $exp_time = time() + 3600;
            
            
            $payload = array(
                "username" => $username,
                "role" => $role,
                "exp" => $exp_time
            );
            $jwt = jwt_encode($payload, $secret_key);
            echo json_encode([
                'success' => 1,
                'message' => 'Login successful',
                'username' => $username,
                'role' => $role,
                'jwt' => $jwt
            ]);
            exit;
        } else {
            echo json_encode([
                'success' => 0,
                'message' => 'Invalid username or password',
            ]);
            exit;
        }
    } else {
        echo json_encode([
            'success' => 0,
            'message' => 'Failed to execute query',
        ]);
        exit;
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}

function jwt_encode($payload, $key) {
    $jwt = base64_encode(json_encode(array(
        "alg" => "HS256",
        "typ" => "JWT"
    ))) . "." . base64_encode(json_encode($payload));

    return $jwt . "." . hash_hmac('sha256', $jwt, $key);
}
?>
