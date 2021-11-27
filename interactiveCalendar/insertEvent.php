<?php
// set http only cookies
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

$uid = $_SESSION['uid'];

// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
header("Content-Type: application/json");
// read input from js
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
$year = htmlentities($json_obj['year']);
$day = htmlentities($json_obj['day']);
$month = htmlentities($json_obj['month'] + 1);
$message = htmlentities($json_obj['message']);
$hour = htmlentities($json_obj['hourInput']);
$minute = htmlentities($json_obj['minuteInput']);
$emergencyBtn = htmlentities($json_obj['emergencyBtn']);
$unimportantBtn = htmlentities($json_obj['unimportantBtn']);
$groupMember = htmlentities($json_obj['groupMember']);

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

// reformat date
$curr_day = date("Y-m-d H:i:s", mktime($hour, $minute, 0, $month, $day, $year));

// insert for oneself
$stmt = $mysqli->prepare("insert into event (uid, datetime, event, emergencyBtn, unimportantBtn) values (?, ?, ?, ?, ?)");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Query Prep Failed: ".$mysqli->error,
    ));
    exit;
}
$stmt->bind_param('issii', $uid, $curr_day, $message, $emergencyBtn, $unimportantBtn);
$stmt->execute();
$stmt->close();

// check if group memeber is entered
if (empty($groupMember)) {
    echo json_encode(array(
        "success" => true,
        "Message" => "Event added for user!",
    ));
    exit;
}

// insert for group member
// check if group member exist
$group_member_checker = $mysqli->prepare("select id from user where username=?");
if(!$group_member_checker) {
	echo json_encode(array(
		"success" => false,
		"message" => htmlentities("Query Prep Failed: ".$mysqli->error),
	));
	exit;
}
$group_member_checker->bind_param('s', $groupMember);
$group_member_checker->execute();
$result = $group_member_checker->get_result();
if (mysqli_num_rows($result) > 0) {
	$group_member_id = htmlentities(mysqli_fetch_assoc($result)['id']);
} else {
    echo json_encode(array(
		"success" => false,
        "message" => "Could not add for group member because group member does not exist.",
	));
    exit;
}
$group_member_checker->close();

// insert event for group member
$stmt = $mysqli->prepare("insert into event (uid, datetime, event, emergencyBtn, unimportantBtn) values (?, ?, ?, ?, ?)");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => htmlentities("Query Prep Failed: ".$mysqli->error),
    ));
    exit;
}
$stmt->bind_param('issii', $group_member_id, $curr_day, $message, $emergencyBtn, $unimportantBtn);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success" => true,
    "message" => "Event added for user and the group member!",
));
exit;
?>