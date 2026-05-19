<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json");

include "../config/database.php";

/* TOTAL INCOME */

$incomeQuery = "

SELECT SUM(amount) as total

FROM transactions

WHERE type='Income'

";

$incomeResult =
$conn->query($incomeQuery);

$income =
$incomeResult->fetch_assoc()['total'] ?? 0;

/* TOTAL EXPENSE */

$expenseQuery = "

SELECT SUM(amount) as total

FROM transactions

WHERE type='Expense'

";

$expenseResult =
$conn->query($expenseQuery);

$expense =
$expenseResult->fetch_assoc()['total'] ?? 0;

/* BALANCE */

$balance =
$income - $expense;

echo json_encode([

  "income" => $income,

  "expense" => $expense,

  "balance" => $balance

]);