<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config/database.php";

/* TOTAL INCOME */

$incomeQuery = "
SELECT SUM(amount) AS totalIncome
FROM transactions
WHERE type = 'Income'
";

$incomeResult =
$conn->query($incomeQuery);

$totalIncome =
$incomeResult
->fetch_assoc()["totalIncome"] ?? 0;

/* TOTAL EXPENSE */

$expenseQuery = "
SELECT SUM(amount) AS totalExpense
FROM transactions
WHERE type = 'Expense'
";

$expenseResult =
$conn->query($expenseQuery);

$totalExpense =
$expenseResult
->fetch_assoc()["totalExpense"] ?? 0;

/* BALANCE */

$balance =
$totalIncome - $totalExpense;

echo json_encode([

    "income" => $totalIncome,

    "expense" => $totalExpense,

    "balance" => $balance

]);