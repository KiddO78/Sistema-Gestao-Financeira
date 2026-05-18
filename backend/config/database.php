<?php

$host = "localhost";

$user = "root";

$password = "Acaciosantos7";

$database = "finance_manager";

$conn = new mysqli(
    $host,
    $user,
    $password,
    $database
);

if ($conn->connect_error) {

    die(
        "Connection failed: " .
        $conn->connect_error
    );

}