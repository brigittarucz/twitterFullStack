function changeView() {
    var sRoute = event.target.getAttribute("href");
    sRoute = sRoute.slice(1, sRoute.length);

    document.querySelectorAll(".view").forEach(domElement => {
        domElement.style.display = "none";
    })

    var previouslyClicked = document.querySelector("a.active");
    if (previouslyClicked !== event.target) {

        event.target.classList.add("active");
        event.target.querySelector('svg').classList.add("active");

        previouslyClicked.classList.remove("active");
        previouslyClicked.querySelector("svg").classList.remove("active");

    }

    if (document.querySelector("#middle-" + sRoute) !== null) {
        document.querySelector("#middle-" + sRoute).style.display = "block";
    } else {
        console.log("yes");
    }
}

function closeModal() {
    if (event.target.parentElement.getAttribute("data-queryElement") != null) {
        document.querySelector(event.target.parentElement.getAttribute("data-queryElement")).style.display = "none";
    }
}

function openModal() {
    document.querySelector(event.target.getAttribute("data-queryElement")).style.display = "block";
}

function closePopup() {
    document.querySelector(event.target.getAttribute("data-queryElement")).style.display = "none";
}

function openPopup() {
    if(event.target.getAttribute("data-queryElement") != null ) {
    document.querySelector(event.target.getAttribute("data-queryElement")).style.display = "block";
    }
}

(async function() {

    // TODO: get session id

    let connectionGetSession = await fetch(
        'get-session.php',
        {
            "method": "GET"
        }
    )

    let sResponseSession = await connectionGetSession.text();
    
    // TODO: get user's tweets

    let connectionGetTweets = await fetch(
        'api/api-get-tweets.php?id='+sResponseSession,
        {
            "method": "GET"
        }
    )

    let sResponseTweets = await connectionGetTweets.text();
    console.log(sResponseTweets);
})();