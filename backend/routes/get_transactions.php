<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config/database.php";

$transactions = [];

$sql = "
SELECT *
FROM transactions
ORDER BY id DESC
";

$result = $conn->query($sql);

if($result) {

    while($row = $result->fetch_assoc()) {

        $transactions[] = $row;

    }

}

echo json_encode($transactions);

$conn->close();
exit;