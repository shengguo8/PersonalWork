<?php
// connect to database and output failure msg if unsuccessful
$mysqli = new mysqli('localhost', 'root', 'yhqYHQ2006', 'calendar');
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>