<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../config/database.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$name = $data["name"];

$type = $data["type"];

$sql = "
INSERT INTO categories
(name, type)

VALUES

('$name', '$type')
";

if($conn->query($sql) === TRUE) {

    echo json_encode([
        "message" => "Category added"
    ]);

}