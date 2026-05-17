<?php

$host = "localhost";
$db_name = "finance_manager";
$username = "root";
$password = "Acaciosantos7";

$conn = new mysqli($host, $username, $password, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}