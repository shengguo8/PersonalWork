<?php
// set http only cookies
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
header("Content-Type: application/json");
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
$username = htmlentities($json_obj['l_username']);
$password = htmlentities($json_obj['l_password']);

# read exisitng users
$stmt = $mysqli->prepare("select id, username, password from user order by id");
if(!$stmt){
	echo json_encode(array(
        "success" => false,
        "message" => htmlentities("Query Prep Failed: ".$mysqli->error),
    ));
	exit;
}

# get existing user info into an array
$stmt->execute();
$result = $stmt->get_result();
$userInfo = array();
while($row = $result->fetch_assoc()){
	array_push($userInfo, array(htmlentities($row["id"]), htmlentities($row["username"]), htmlentities($row["password"])));
}
$stmt->close();

# check if the credentials match the database
$is_real_user = -1;
foreach ($userInfo as list($uid, $user, $pwd)) {
    if (($username == $user) && (password_verify($password, $pwd) == True)) {
        $is_real_user = $uid;
        break;
    }
}

# if matches the credentials, start the session and send user to the welcome.php page, else display the error msg.
if ($is_real_user != -1) {
    $_SESSION['username'] = $username;
    $_SESSION['uid'] = $is_real_user;
    # generate a 32-byte random string for CRSF
    $token = bin2hex(openssl_random_pseudo_bytes(32)); 
    $_SESSION['token'] = $token;
    echo json_encode(array(
		"success" => true,
        "username" => htmlentities($username),
        "token" => $token,
	));
	exit;
} else {
    session_destroy();
    echo json_encode(array(
        "success" => false,
        "message" => "Oops! Username and password do not match.",
    ));
	exit;
}
?>