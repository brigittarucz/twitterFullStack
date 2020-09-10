<?php

function postUser($email, $password) {

    $sUsers = file_get_contents('../database/users.txt');

    // If we have an associative array + second arg true = $aUser['email']
    $aUsers = json_decode($sUsers);

    // TODO: validate password
    foreach($aUsers as $aUser) {
       if($aUser->{'email'} == $email) {
           if(password_verify($password, $aUser->{'password'})) {
               $aUserToSend;
               $aUserToSend["id"] = $aUser->{'id'};
               $aUserToSend["name"] = $aUser->{'name'};

               return json_encode($aUserToSend);
               break;
            } else {
               return 0;
           }
       }
    }

}

function createUser($email, $password, $name, $birthdate) {

    $aUsers = file_get_contents('../database/users.txt');
    $aUsers = json_decode($aUsers);

    // TODO: check for email duplicate
    foreach($aUsers as $aUser) {
        if($aUser->email == $email) {
            return 0;
        }
    }

    $stdNewUser = new stdClass();
    $stdNewUser->id = uniqid();
    $stdNewUser->email = $email;
    $stdNewUser->password = password_hash($password, PASSWORD_DEFAULT);
    $stdNewUser->name = $name;
    $stdNewUser->birthdate = $birthdate;
    $stdNewUser->tweets = [];

    array_push($aUsers, $stdNewUser);

    file_put_contents('../database/users.txt', json_encode($aUsers));

    return 1;
}