<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../config/database.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$id = $data["id"];

$title = $data["title"];

$amount = $data["amount"];

$type = $data["type"];

$category = $data["category"];

$sql = "
UPDATE transactions

SET

title = '$title',
amount = '$amount',
type = '$type',
category = '$category'

WHERE id = '$id'
";

if($conn->query($sql) === TRUE) {

    echo json_encode([
        "message" => "Updated"
    ]);

}
else {

    echo json_encode([
        "error" => $conn->error
    ]);

}