<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

include "../config/database.php";

$data = json_decode(

    file_get_contents("php://input"),

    true

);

$title = trim($data["title"]);

$target_amount =
$data["target_amount"];

$current_amount =
$data["current_amount"];

$deadline =
$data["deadline"];

if(empty($title)) {

    echo json_encode([

        "error" =>
        "Title required"

    ]);

    exit;

}

$sql = "

INSERT INTO goals

(title,target_amount,current_amount,deadline)

VALUES

(

'$title',

'$target_amount',

'$current_amount',

'$deadline'

)

";

if($conn->query($sql) === TRUE) {

    echo json_encode([

        "message" =>
        "Goal created"

    ]);

}
else {

    echo json_encode([

        "error" =>
        $conn->error

    ]);

}