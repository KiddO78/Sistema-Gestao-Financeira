<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json");

include "../config/database.php";

$sql = "
SELECT *
FROM categories
ORDER BY id DESC
";

$result = $conn->query($sql);

$categories = [];

while($row = $result->fetch_assoc()) {

    $categories[] = $row;

}

echo json_encode($categories);