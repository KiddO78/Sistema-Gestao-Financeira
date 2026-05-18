<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json");

include "../config/database.php";

/* INCOME */

$incomeQuery = "
SELECT SUM(amount) AS total
FROM transactions
WHERE type = 'Income'
";

$incomeResult =
$conn->query($incomeQuery);

$income =
$incomeResult
->fetch_assoc()["total"] ?? 0;

/* EXPENSE */

$expenseQuery = "
SELECT SUM(amount) AS total
FROM transactions
WHERE type = 'Expense'
";

$expenseResult =
$conn->query($expenseQuery);

$expense =
$expenseResult
->fetch_assoc()["total"] ?? 0;

echo json_encode([

    "income" => $income,

    "expense" => $expense

]);