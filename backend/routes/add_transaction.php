<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include("../config/database.php");

$data = json_decode(file_get_contents("php://input"));

$title = $data->title;
$amount = $data->amount;
$type = $data->type;
$category = $data->category;

$sql = "INSERT INTO transactions
(title, amount, type, category)

VALUES

('$title', '$amount', '$type', '$category')";

if($conn->query($sql) === TRUE) {

    echo json_encode([
        "success" => true,
        "message" => "Transaction added"
    ]);

} else {

    echo json_encode([
        "success" => false
    ]);

}