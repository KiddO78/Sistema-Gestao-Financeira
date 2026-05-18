<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/database.php");

$sql = "SELECT * FROM transactions
ORDER BY created_at DESC";

$result = $conn->query($sql);

$transactions = [];

while($row = $result->fetch_assoc()) {

    $transactions[] = $row;

}

echo json_encode($transactions);