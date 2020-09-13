<?php

try {

    if(!isset($_POST['passwordNew'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "New password is not set"}';
        exit();
    }

    if(!isset($_POST['passwordOld'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Old password is not set"}';
        exit();
    }

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

    require_once('controllers/functions.php');

    $status = updatePassword($_POST['passwordOld'], $_POST['passwordNew'], $_POST['userId']);
    // $status = json_decode($status);

    echo $status;

    // if($status == '404') {
    //     http_response_code(404);
    //     header('Content-type: application/json');
    //     echo '{"error": "Record not found"}';
    //     exit();
    // } else {
    //     http_response_code(200);
    //     header('Location: authenticate');
    //     exit();
    // }   


} catch (Exception $err) {
    http_response_code(500);
    header('Content-type: application/json');
    echo '{"error":"Error '.__LINE__.'"}';
}
