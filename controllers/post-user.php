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