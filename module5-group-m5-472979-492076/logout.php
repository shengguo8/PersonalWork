<?php
// set http only cookies
ini_set("session.cookie_httponly", 1);
session_start();
// destroy session
session_destroy();
?>