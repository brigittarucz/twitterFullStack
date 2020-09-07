function changeView() {
    var sRoute = event.target.getAttribute("href");
    sRoute = sRoute.slice(1, sRoute.length);

    document.querySelectorAll(".view").forEach(domElement => {
        domElement.style.display = "none";
    })

    var previouslyClicked = document.querySelector("a.active");
    if(previouslyClicked !== event.target) {
    
    event.target.classList.add("active");
    event.target.querySelector('svg').classList.add("active");

    previouslyClicked.classList.remove("active");
    previouslyClicked.querySelector("svg").classList.remove("active");

    }

    if(document.querySelector("#middle-"+sRoute) !== null) {
    document.querySelector("#middle-"+sRoute).style.display = "block";
    } else {
        console.log("yes");
    }
}

function closeModal() {
    document.querySelector("#modal-tweet").style.display = "none";
}

function openModal() {
    document.querySelector("#modal-tweet").style.display = "block";
}