<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

try {

    if(!isset($_POST['email'])) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Email is not set"}';
        exit();
    }

    if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        header('Content-type: application/json');
        echo '{"error": "Email is not valid"}';
        exit();
    }

    require_once('controllers/functions.php');

    $hash = getEmail($_POST['email']);

    if($hash == '0') {
        http_response_code(404);
        header('Content-type: application/json');
        echo '{"error": "Email not found"}';
        exit();
    } else {
        $hash = json_decode($hash);
        $hash = rtrim($hash, '"');
        $hash = ltrim($hash, '"');
        $sendNow = 1;
    }

    if(isset($sendNow)) {
    
        require 'PHPMailer/src/Exception.php';
        require 'PHPMailer/src/PHPMailer.php';
        require 'PHPMailer/src/SMTP.php';

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
            $mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'web.dev3232@gmail.com';                     // SMTP username
            $mail->Password   = 'p@ssw3bdev';                               // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

            //Recipients
            $mail->setFrom('web.dev3232@gmail.com', 'Mailer');
            $mail->addAddress($_POST['email'], 'Brigitta');     // Add a recipient

            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Password Reset';
            $mail->Body    = "Access the following link <a href='http://localhost:8888/views/new-password.php?password=$hash' target='_blank'>password-reset-email.php?password=$hash</a>
            in order to reset your password. Your current password is $hash .";
            // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            // echo 'Message has been sent';
            echo '200';
        } catch (Exception $e) {
            // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }


} catch (Exception $err) {
    http_response_code(500);
    header('Content-type: application/json');
    echo '{"error":"Error '.__LINE__.'"}';
}