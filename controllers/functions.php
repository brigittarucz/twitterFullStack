<?php

function callDb() {
    // If we have an associative array + second arg true = $aUser['email']
    $sUsers = file_get_contents('../database/users.txt');
    $aUsers = json_decode($sUsers);
    return $aUsers;
}

function postUser($email, $password) {

    $aUsers = callDb();

    // TODO: validate password
    foreach($aUsers as $aUser) {
       if($aUser->{'email'} == $email) {
           if(password_verify($password, $aUser->{'password'})) {
               $aUserToSend;
               $aUserToSend["id"] = $aUser->{'id'};
               $aUserToSend["name"] = $aUser->{'name'};

               return json_encode($aUserToSend);
            } else {
               return 0;
           }
       }
    }

}

function createUser($email, $password, $name, $birthdate) {

    $aUsers = callDb();

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

function getUser($id) {

    $aUsers = callDb();

    foreach($aUsers as $aUser) {
        if($aUser->id == $id) {
            return $aUser;
        }
    }
}

function manipulateTweet($userId, $tweet, $action) {

    $aUsers = callDb();

    if($action == 'Add') {

        foreach($aUsers as $aUser) {
            if($aUser->id == $userId) {
                array_push($aUser->tweets, $tweet);
                file_put_contents('../database/users.txt', json_encode($aUsers));
                return 'Success';
            }
        }
    }
}