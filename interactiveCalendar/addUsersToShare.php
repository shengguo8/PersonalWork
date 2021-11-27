<?php
// set http only cookies
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

$uid = $_SESSION['uid'];
$user_username = $_SESSION['username'];

// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
header("Content-Type: application/json");
// read input from js fetch
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
$shared_user = $json_obj['newUser'];

// check if shared user exist
$is_exist = false;
$duplicate_checker = $mysqli->prepare("select username from user where username=?");
if(!$duplicate_checker) {
	echo json_encode(array(
		"success" => false,
		"message" => htmlentities("Query Prep Failed: ".$mysqli->error),
        "added" => false,
	));
	exit;
}
$duplicate_checker->bind_param('s', $shared_user);
$duplicate_checker->execute();
$duplicate_result = $duplicate_checker->get_result();
if (mysqli_num_rows($duplicate_result) > 0) {
	$is_exist = true;
}
$duplicate_checker->close();

if($is_exist == false) {
    echo json_encode(array(
		"success" => false,
        "message" => "Shared user account does not exist.",
		"added" => false,
	));
    exit;
}

// check if alerady shared with the user
$is_shared = false;
$duplicate_checker = $mysqli->prepare("select shared_username from share where uid=? && shared_username=?");
if(!$duplicate_checker) {
	echo json_encode(array(
		"success" => false,
		"message" => "Query Prep Failed: ".$mysqli->error,
        "added" => false,
	));
	exit;
}
$duplicate_checker->bind_param('is', $uid, $shared_user);
$duplicate_checker->execute();
$duplicate_result = $duplicate_checker->get_result();
if (mysqli_num_rows($duplicate_result) > 0) {
	$is_shared = true;
}
$duplicate_checker->close();

if($is_shared == true) {
    echo json_encode(array(
		"success" => false,
        "message" => "Alerady shared with this user.",
		"added" => false,
	));
    exit;
}

// if shared user exist, insert into database
$stmt = $mysqli->prepare("insert into share (uid, shared_username, user_username) values (?, ?, ?)");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => htmlentities("Query Prep Failed: ".$mysqli->error),
        "added" => false,
    ));
    exit;
}
$stmt->bind_param('iss', $uid, $shared_user, $user_username);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success" => true,
    "message" => "Success!",
    "added" => true,
));
exit;
?>