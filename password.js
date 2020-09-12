async function resetPassword() {
    
    let data = new FormData(document.querySelector(".password-reset_form"));


    let connectionResetPass = await fetch(
        'password-reset-email.php',
        {
            "method": "POST",
            "body": data
        }
    );

    let sResponse = await connectionResetPass.text();

    console.log(sResponse);

}
