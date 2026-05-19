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

$sql = "

DELETE FROM goals

WHERE id='$id'

";

if($conn->query($sql) === TRUE) {

    echo json_encode([

        "message" =>
        "Goal deleted"

    ]);

}