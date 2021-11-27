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
$username = htmlentities($json_obj['r_username']);
$password = htmlentities($json_obj['r_password']);
$re_password = htmlentities($json_obj['r_re_password']);

$is_good_account = True;
# check if username exists
$duplicate_checker = $mysqli->prepare("select username from user where username=?");
if(!$duplicate_checker) {
	echo json_encode(array(
		"success" => false,
		"message" => htmlentities("Query Prep Failed: ".$mysqli->error),
	));
	exit;
}
$duplicate_checker->bind_param('s', $username);
$duplicate_checker->execute();
$duplicate_result = $duplicate_checker->get_result();
if (mysqli_num_rows($duplicate_result) != 0) {
	$is_good_account = False;
	echo json_encode(array(
		"success" => false,
		"message" => "User account alerady exist!",
	));
	exit;
}
$duplicate_checker->close();
$error_str = "";
# check the password and output error message
if (strlen($password) < 6) {
	$is_good_account = False;
	$error_str .= "Password too short! Need at least 6 characters. ";
} 
if (!preg_match("@[0-9]@", $password)) {
	$is_good_account = False;
	$error_str .= "Password must include at least one number! ";
}
if (!preg_match("@[a-zA-Z]@", $password)) {
	$is_good_account = False;
	$error_str .= "Password must include at least one letter! ";
} 
if (!preg_match('@[^\w]@', $password)) {
	$is_good_account = False;
	$error_str .= "Password must include at least one speical character! ";
} 
if(strcmp((string)$password, (string)$re_password) != 0) {
	$is_good_account = False;
	$error_str .= "Passwords did not match!";
}

# check if the setup of the account is correct, display message accordingly
if ($is_good_account) {
	$hashed_password = password_hash($password, PASSWORD_DEFAULT);
	$stmt = $mysqli->prepare("insert into user (username, password) values (?, ?)");
	if(!$stmt){
		echo json_encode(array(
			"success" => false,
			"message" => htmlentities("Query Prep Failed: ".$mysqli->error),
		));
		exit;
	}
	$stmt->bind_param('ss', $username, $hashed_password);
	$stmt->execute();
	$stmt->close();

	$stmt = $mysqli->prepare("select id from user where username=?");
	if(!$stmt){
		echo json_encode(array(
			"success" => false,
			"message" => htmlentities("Query Prep Failed: ".$mysqli->error),
		));
		exit;
	}

	$stmt->bind_param('s', $username);
	$stmt->execute();
	$stmt->bind_result($uid);
	while($stmt->fetch()){
		$the_uid = $uid;
	}
	$stmt->close();

	$_SESSION['uid'] = $the_uid;
	$_SESSION['username'] = $username;
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
	echo json_encode(array(
		"success" => false,
		"message" => htmlentities($error_str),
	));
	exit;
}
?>