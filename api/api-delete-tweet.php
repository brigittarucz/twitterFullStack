<?php

try {

    if(!isset($_GET['tweetId'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error":"Id is not set"}';
        exit();
    }

    if(strlen($_GET['tweetId']) != 13 ) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error":"Id does not have required standards"}';
        exit();
    }

    if(!isset($_GET['userId'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error":"Id is not set"}';
        exit();
    }

    if(strlen($_GET['userId']) != 13 ) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error":"Id does not have required standards"}';
        exit();
    }

    require_once('../controllers/functions.php');

    echo $_GET['tweetId'];

    $operationStatus = manipulateTweet($_GET['userId'], $_GET['tweetId'], 'Delete');

    echo $operationStatus;

} catch (Exception $err) {
    http_response_code(500);
    header('Content-type: application/json');
    echo '{"error":"Error '.__LINE__.'"}';
}