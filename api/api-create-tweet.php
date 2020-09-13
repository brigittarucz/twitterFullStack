<?php

try {

    if(!isset($_POST['userId'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "User id is not set"}';
        exit();
    }

    if(strlen($_POST['userId']) != 13) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "User id does not have required standards"}';
        exit();
    }

    if(!isset($_POST['tweetBody'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Body is not set"}';
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

    require_once('../controllers/functions.php');

    $user = getUser($_POST['userId']);

    $jTweet = new stdClass();
    $jTweet->tweetId = uniqid();
    $jTweet->tweetBody = $_POST['tweetBody'];
    $jTweet->tweetDate = date_format(new DateTime(),"Y/m/d");
    $jTweet->postedBy = $user->name;
    $jTweet->postedByAt = '@'.$user->name;
    $jTweet->postTagAt = 0;
    $jTweet->link = isset($_POST['urlName']) ? 1 : 0;
    $jTweet->media = 0;
    $jTweet->hidden = 0;

    if(isset($_POST['urlName'])) {
        $jTweet->urlName = $_POST['urlName'];
        $jTweet->urlImage = $_POST['urlImage'];
        $jTweet->urlTitle = $_POST['urlTitle'];
        $jTweet->urlDescription = $_POST['urlDescription'];
    }

    $action = manipulateTweet($_POST['userId'], $jTweet, 'Add');

} catch (Exception $err) {
    http_response_code(500);
    header('Content-type: application/json');
    echo '{"error":"Error '.__LINE__.'"}';
}
