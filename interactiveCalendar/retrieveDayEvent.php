<?php
// set http only cookies
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';
$uid = $_SESSION['uid'];
// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
header("Content-Type: application/json");
// get input from js
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
$year = htmlentities($json_obj['year']);
$day = htmlentities($json_obj['day']);
$month = htmlentities($json_obj['month'] + 1);

# read day event
$stmt = $mysqli->prepare("select event_id, event, datetime, emergencyBtn, unimportantBtn from event where (uid=? && month(datetime)=? && day(datetime)=?)");
if (!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => htmlentities("Query Prep Failed: ".$mysqli->error),
	));
	exit;
}
# get existing user info into an array
$stmt->bind_param('iii', $uid, $month, $day);
$stmt->execute();
$result = $stmt->get_result();
$event_messages = array();
while($row = $result->fetch_assoc()){
	array_push($event_messages, array(htmlentities($row["event_id"]), htmlentities($row["event"]), htmlentities($row["datetime"]), 
									  htmlentities($row["emergencyBtn"]), htmlentities($row["unimportantBtn"])));
}
$stmt->close();

echo json_encode(array(
    "success" => true,
    "message" => $event_messages,
));
exit;
?>