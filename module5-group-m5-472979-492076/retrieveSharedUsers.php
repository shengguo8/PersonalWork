<?php
// set http only cookies
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';
$uid = $_SESSION['uid'];

// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
header("Content-Type: application/json");

# retrieve username by user id
$stmt = $mysqli->prepare("select username from user where id=?");
if (!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => htmlentities("Query Prep Failed: ".$mysqli->error),
	));
	exit;
}
$stmt->bind_param('i', $uid);
$stmt->execute();
$result = $stmt->get_result();
$shared_users = array();
while($row = $result->fetch_assoc()){
	$username = $row['username'];
}
$stmt->close();

# get shared users
$stmt = $mysqli->prepare("select uid, user_username from share where shared_username=?");
if (!$stmt) {
	echo json_encode(array(
		"success" => false,
		"message" => htmlentities("Query Prep Failed: ".$mysqli->error),
	));
	exit;
}

# get shared users into an array
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$shared_users = array();
while($row = $result->fetch_assoc()){
	array_push($shared_users, array(htmlentities($row["uid"]), htmlentities($row['user_username'])));
}
$stmt->close();

echo json_encode(array(
    "success" => true,
    "shared_users" => $shared_users,
));
exit;
?>