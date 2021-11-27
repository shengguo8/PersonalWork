<?php
// set http only cookies
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

$uid = $_SESSION['uid'];

// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
header("Content-Type: application/json");
// get data from js fetch
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
$year = htmlentities($json_obj['yearInput']);
$day = htmlentities($json_obj['dayInput']);
$month = htmlentities($json_obj['monthInput']);
$message = htmlentities($json_obj['message']);
$event_id = htmlentities($json_obj['event_id']);
$hour = htmlentities($json_obj['hourInput']);
$minute = htmlentities($json_obj['minuteInput']);
$emergencyBtn = htmlentities($json_obj['emergencyBtn']);
$unimportantBtn = htmlentities($json_obj['unimportantBtn']);

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

// reformat time
$curr_day = date("Y-m-d H:i:s", mktime($hour, $minute, 0, $month, $day, $year));

// update event
$stmt = $mysqli->prepare("update event set datetime=?, event=?, emergencyBtn=?, unimportantBtn=? where event_id=?;");
if(!$stmt) {
	echo json_encode(array(
        "success" => false,
        "message" => htmlentities("Query Prep Failed: ".$mysqli->error),
    ));
	exit;
}
$stmt->bind_param('ssiii', $curr_day, $message, $emergencyBtn, $unimportantBtn, $event_id);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success" => true,
    "msg" => "Updated!",
));
?>
