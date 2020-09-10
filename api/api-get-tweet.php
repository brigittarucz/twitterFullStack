<?php

try{

    if(!isset($_GET['userId'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "User id is not set"}';
        exit();
    }

    if(!isset($_GET['tweetId'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Tweet id is not set"}';
        exit();
    }

    if(strlen($_GET['userId']) != 13) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "User id does not have required standards"}';
        exit();
    }

    if(strlen($_GET['tweetId']) != 13) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Tweet id does not have required standards"}';
        exit();
    }

    require_once('../controllers/functions.php');

    $oTweet = getTweet($_GET['userId'], $_GET['tweetId']);

    echo json_encode($oTweet);

} catch(Exception $err) {
    http_response_code(500);
    header('Content-type: application/json');
    echo '{"error":"Error '.__LINE__.'"}';
}