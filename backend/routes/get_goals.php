<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json");

include "../config/database.php";

$sql = "

SELECT *

FROM goals

ORDER BY id DESC

";

$result =
$conn->query($sql);

$goals = [];

while(

$row = $result->fetch_assoc()

) {

    $goals[] = $row;

}

echo json_encode($goals);