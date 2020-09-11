<?php

try {
if(!isset($_GET['id'])) {
    http_response_code(400);
    header('Content-type: application/json');
    echo '{"error": "Missing id"}';
    exit();
};

if(strlen($_GET['id']) != 13) {
    http_response_code(400);
    header('Content-type: application/json');
    echo '{"error": "Id does not have required standards"}';
    exit();
}

// TODO: get user

require_once('../controllers/functions.php');

$aTweets = getUser($_GET['id'])->tweets;
echo json_encode($aTweets);

} catch (Exception $err) {
    http_response_code(500);
    header('Content-type: application/json');
    echo '{"error":"Error '.__LINE__.'"}';
}