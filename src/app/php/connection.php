<?php

class ConnectionDB
{
    private $db_host = 'localhost';
    private $db_name = 'asw_senior project';
    private $db_user = 'root';
    private $db_pass = '';
public function connect(){

    
    try
    {
        $conn = new PDO('mysql:host='.$this->db_host.';dbname='.$this->db_name,$this->db_user,$this->db_pass);

            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            return $conn;
    }
    catch(Exception $e)
    {
        echo "Connection Error: ".$e->getMessage();
            exit;
    }
}
}


?>