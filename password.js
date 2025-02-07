async function sendRecoveryEmail() {
    
    let data = new FormData(document.querySelector(".password-reset_form"));

    if(data.get("email") != '') {
    event.target.querySelector("button").disabled = "true";
    }

    let connectionResetPass = await fetch(
        'password-reset-email.php',
        {
            "method": "POST",
            "body": data
        }
    );

    let sResponse = await connectionResetPass.text();

    if(sResponse.includes('200')) {
        location.href = 'authenticate';
    }
}

async function modifyPassword() {
    
    let data = new FormData(document.querySelector(".password-reset_form_2"));

    console.log(event.target.querySelector("button"));

    if(data.get("passwordNew") != '') {
        event.target.querySelector("button").disabled = "true";
    }

    let connectionModifyPass = await fetch(
        '../password-update-database.php',
        {
            "method": "POST",
            "body": data
        }
    )
    
    let sResponse = await connectionModifyPass.text();
    console.log(sResponse);

    if(sResponse.includes('200')) {
        location.href = '../authenticate';
    }
}