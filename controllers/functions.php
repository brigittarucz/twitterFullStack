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

function getEmail($email) {

    $sUsers = file_get_contents('database/users.txt');
    $aUsers = json_decode($sUsers);

    // TODO: send back changed password

    foreach($aUsers as $aUser) {
        if($aUser->email == $email) {
            $hash = password_hash(uniqid(), PASSWORD_DEFAULT);
            $aUser->password = $hash;
            file_put_contents('database/users.txt', json_encode($aUsers));
            return json_encode($hash.'&id='.$aUser->id);
        }
    }

    return 0;

}

function updatePassword($oldPassword, $newPassword, $userId) {

    $sUsers = file_get_contents('database/users.txt');
    $aUsers = json_decode($sUsers);

    foreach($aUsers as $aUser) {
        if($aUser->id == $userId) {

            echo $aUser->password.'.........';
            echo $oldPassword; 
            if($aUser->password == $oldPassword) {
                $aUser->password = password_hash($newPassword, PASSWORD_DEFAULT);
                echo json_encode($aUser);
                file_put_contents('database/users.txt', json_encode($aUsers));
                
                return 200;            
            }
        }
    }

    return 404;

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

    return json_encode($stdNewUser);
}

function getUser($id) {

    $aUsers = callDb();

    foreach($aUsers as $aUser) {
        if($aUser->id == $id) {
            return $aUser;
        }
    }

    echo '{"error": "User does not exist"}';
}

function getTweet($userId, $tweetId) {
    
    $aUsers = callDb();

    foreach($aUsers as $aUser) {
        if($aUser->id == $userId) {
            foreach($aUser->tweets as $aTweet) {
                if($aTweet->tweetId == $tweetId) {
                    return $aTweet;
                }
            }
        } 
    }

    echo '{"error": "User / id does not exist"}';
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

    if($action == 'Update') {

        foreach($aUsers as $aUser) {
            if($aUser->id == $userId) {

                for($i = 0; $i < sizeof($aUser->tweets); $i++) {
                    if($aUser->tweets[$i]->tweetId == $tweet->tweetId) {
                        $aUser->tweets[$i] = $tweet;
                        var_dump($aUsers);
                     file_put_contents('../database/users.txt', json_encode($aUsers));
                     return 'Success';
                    };
                }
            }
        }

        return 'Fail';
    }

    if($action == 'Delete') {

        foreach($aUsers as $aUser) {
            if($aUser->id == $userId) {
                $aTweets = $aUser->tweets;
                foreach($aTweets as $tweetIndex => $index) {
                    if($aTweets[$tweetIndex]->tweetId == $tweet) {
                        array_splice($aTweets, $tweetIndex, 1);
                        $aUser->tweets = $aTweets;
                        file_put_contents('../database/users.txt', json_encode($aUsers));
                        return json_encode($aUsers);
                    }
                }
            }
        }

        return 'Fail';
    }
}

