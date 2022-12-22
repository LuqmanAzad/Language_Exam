<?php

$username = 'root';
$password = '';
$database = 'project_1';
$host = 'localhost';
if ($conn = mysqli_connect($host, $username, $password, $database))
{
    //echo "connecting to $database established";
}
else
{
    echo "connecting to $database not established";
}