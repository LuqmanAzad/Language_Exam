<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: X-Custom-Header");
header("Access-Control-Allow-Credentials: true");
require_once 'php/connection.php';

$offset = 0;
if (isset($_GET['offset'])) {
  $offset = intval($_GET['offset']);
}

$sql = "SELECT * FROM question LIMIT 1 OFFSET $offset";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    // Return the question as a JSON object
  echo json_encode($row);
} else {
    echo "No questions found";
}

mysqli_close($conn);

?>
