<?php

if(!isset($_GET['id'])) {
    http_response_code(400);
    header('Content-type: application/json');
    echo '{"error": "missing id"}';
    exit();
};

if(strlen($_GET['id']) != 13) {
    http_response_code(400);
    header('Content-type: application/json');
    echo '{"error": "id does not have required length"}';
    exit();
}