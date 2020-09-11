<?php

try {

    if(!isset($_POST['tweetBody'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Body is not set"}';
        exit();
    }

    if(!isset($_POST['tweetId'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Tweet id is not set"}';
        exit();
    }

    if(!isset($_POST['userId'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "User id is not set"}';
        exit();
    }

    if(!(strlen($_POST['tweetBody']) >= 10)) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Body is less than 10 chars"}';
        exit();
    }

    if(!(strlen($_POST['tweetBody']) <= 140)) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Body is more than 140 chars"}';
        exit();
    }

    if(strlen($_POST['tweetId']) != 13 ) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Tweet id does not have required standards"}';
        exit();
    }

    if(strlen($_POST['userId']) != 13) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "User id does not have required standards"}';
        exit();
    }

    require_once('../controllers/functions.php');

    $aTweet = getTweet($_POST['userId'], $_POST['tweetId']);

    $aTweet->tweetBody = $_POST['tweetBody'];

    $operationStatus = manipulateTweet($_POST['userId'], $aTweet, 'Update');
    
    if($operationStatus != 'Success') {
        http_response_code(404);
        header('Content-type: application/json');
        echo '{"error": "Operation failed"}';
    } else {
        echo 1;
    }

} catch (Exception $err) {
    http_response_code(500);
    header('Content-type: application/json');
    echo '{"error":"Error '.__LINE__.'"}';
}