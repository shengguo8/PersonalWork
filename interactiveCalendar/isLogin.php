<?php
// set http only cookies
ini_set("session.cookie_httponly", 1);
session_start();

// check if the user is currently logged in and if so return token for CSRF
if (isset($_SESSION['uid']) && $_SESSION['uid'] >= 0) {
    echo json_encode(array(
        "isLogin" => true,
        "token" => htmlentities($_SESSION['token']),
    ));
    exit;
} else {
    echo json_encode(array(
        "isLogin" => false, 
    ));
    exit;
}
?>