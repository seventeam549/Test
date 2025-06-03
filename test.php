<?php


//  token example: 331776984:AAEiIH-qRVeFmrtnTw_BZs5oGTSsjNM0LB4
//  chat_id example: -1001112893288
// https://www.youtube.com/channel/UCYuMRNb_SRZ4FMsZjnHRZUA video


$token = "***************"; // 7841305499:AAElwSSCBPF6-2cf_NEL3TXiK760exGM9pg
$chat_id = "***************"; // 7570861617
$proovl_token = "***************"; // Proovl.com Token

    $id = $_REQUEST['id'];
	$token = $_REQUEST['token'];
	$from = $_REQUEST['from'];
	$to = $_REQUEST['to'];
	$text = $_REQUEST['text'];
	
	
	if ($token == "$proovl_token") {
	
	
	$url = "https://api.telegram.org/bot$token/sendMessage";

	$postfields = array(
   		'chat_id' => "$chat_id",
   		'disable_notification' => "True",
   		'parse_mode' => "HTML",
        'text' => "From number<b>$from</b>  To number:<pre>$to</pre>  SMS text:<i>$text</i>",
	);


if (!$curld = curl_init()) {
		exit;
	}

	curl_setopt($curld, CURLOPT_POST, true);
	curl_setopt($curld, CURLOPT_POSTFIELDS, $postfields);
	curl_setopt($curld, CURLOPT_URL,$url);
	curl_setopt($curld, CURLOPT_RETURNTRANSFER, true);

$output = curl_exec($curld);

 curl_close ($curld);
	
	
		echo "Thank you $from for sending $message";
	} else {
		echo "Incorrect token";
		die;
	}



?>
