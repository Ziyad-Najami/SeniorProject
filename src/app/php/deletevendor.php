<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers , Authorization , X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if($method == "OPTIONS") {
    die();
 }

 if($_SERVER['REQUEST_METHOD'] !== 'DELETE'):
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'BAD REQUEST Detected. HTTP method should be Delete.',
    ]);
    exit;
    endif;
    ////////////////////////////////////////////////////////////////
 
    require 'connection.php';
$database = new ConnectionDB();
$conn = $database->connect();

    // $data = json_decode(file_get_contents("php://input"));

     $id = $_GET['id'];

    if(!isset($id)){
        echo json_encode([
            'success' => 0,
            'message' => 'Please Provide with Post ID',
        ]);
        exit;
    
    }

    try
    {
        $sql = "SELECT * FROM `asw_vendor` WHERE id=:id";
        $fetch_stmt = $conn->prepare($sql);
        $fetch_stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $fetch_stmt->execute();


        if($fetch_stmt-> rowCount() > 0):
        
            $delete_post = "DELETE FROM `asw_vendor` WHERE id = :id";
            $delete_post_stmt = $conn->prepare($delete_post);
            $delete_post_stmt->bindValue(':id',$id,PDO::PARAM_INT);
            
                if ($delete_post_stmt->execute()){
                    echo json_encode([
                        'success' => 1,
                        'message' =>'Record deleted successfully',
                    ]);
                exit;
                }

                echo json_encode([
                    'success' => 0,
                    'message' =>'Could not delete, Something went wrong'
                ]);
                exit;

        else :
            echo json_encode([
                'success' => 0,
                'message' =>'Invalid ID',
                ]);
                exit;
            endif;
        

    }

    catch(PDOException $e) 
    {
        http_response_code(500);
        echo json_encode([
            'success' => 0,
            'message' => $e->getMessage()
        ]);
        exit;
    }

?>