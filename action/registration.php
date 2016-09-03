<?php

$connect = mysqli_connect('localhost','root') or die(mysqli_error($connect));
mysqli_select_db($connect, 'some_db');

$post = (!empty($_POST)) ? true : false;

if ($post) {
	$email = addslashes($_POST['email']);
	$birthday = addslashes($_POST['birthday']);
	$password = addslashes($_POST['password']);
	$query = mysqli_query($connect,"INSERT INTO customers VALUES('','$email','$birthday','$password')") or die(mysqli_error($connect));
}

?>