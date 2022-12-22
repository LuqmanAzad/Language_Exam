<?php
header('location: question.html');
require_once 'connection.php';
$name = mysqli_real_escape_string($conn, $_POST['name']);
$age = mysqli_real_escape_string($conn, $_POST['age']);

$sql = "INSERT INTO `users` (`Name`, `Age`) VALUES(?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param('si', $name, $age); // S for String and i for integer
$stmt->execute();

