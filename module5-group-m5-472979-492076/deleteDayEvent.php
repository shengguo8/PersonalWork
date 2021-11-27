<?php
// set http only cookies
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';
$uid = $_SESSION['uid'];
// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
header("Content-Type: application/json");
// read input from js fetch
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
$event_id = htmlentities($json_obj['event_id']);

// CSRF
$token = htmlentities($json_obj['token']);
if(!hash_equals($_SESSION['token'], $token)){
	die("Request forgery detected");
    echo json_encode(array(
		"success" => false,
		"message" => htmlentities("Request forgery detected"),
	));
    exit;
}

// delete event
$stmt = $mysqli->prepare("delete from event where event_id=?;");
if(!$stmt) {
    echo json_encode(array(
		"success" => false,
		"message" => htmlentities("Query Prep Failed: ".$mysqli->error),
	));
    exit;
}
$stmt->bind_param('i', $event_id);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success" => true,
    "message" => "Event ".$event_id." is deleted.",
));
exit;
?>