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

$current_amount =
$data["current_amount"];

$sql = "

UPDATE goals

SET current_amount='$current_amount'

WHERE id='$id'

";

if($conn->query($sql) === TRUE) {

    echo json_encode([

        "message" =>
        "Goal updated"

    ]);

}