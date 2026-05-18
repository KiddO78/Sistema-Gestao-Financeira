<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

include "../config/database.php";

$data = json_decode(

    file_get_contents("php://input"),

    true

);

$name = trim($data["name"]);

$type = trim($data["type"]);

if(empty($name)) {

    echo json_encode([

        "error" => "Category name required"

    ]);

    exit;

}

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
else {

    echo json_encode([

        "error" => $conn->error

    ]);

}