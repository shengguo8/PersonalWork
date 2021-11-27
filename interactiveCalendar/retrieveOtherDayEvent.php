<?php
// set http only cookies
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
header("Content-Type: application/json");

// retrieve js input
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
$year = htmlentities($json_obj['year']);
$day = htmlentities($json_obj['day']);
$month = htmlentities($json_obj['month'] + 1);
$uid = htmlentities($json_obj['otherID']); // target user

# read day events
$stmt = $mysqli->prepare("select event_id, event, datetime from event where (uid=? && month(datetime)=? && day(datetime)=?)");
if (!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => htmlentities("Query Prep Failed: ".$mysqli->error),
	));
	exit;
}
$stmt->bind_param('iii', $uid, $month, $day);
$stmt->execute();
$result = $stmt->get_result();
$event_messages = array();
while($row = $result->fetch_assoc()){
	array_push($event_messages, array(htmlentities($row["event_id"]), htmlentities($row["event"]), htmlentities($row["datetime"])));
}
$stmt->close();

echo json_encode(array(
    "success" => true,
    "message" => $event_messages,
));
exit;
?>