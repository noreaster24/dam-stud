

// movement animation to happen
const card = document.querySelector("#card");
const container = document.querySelector("#profile-container");
//items
const title = document.querySelector(".title");
const dogImg = document.querySelector(".profile-pic");
const comment = document.querySelector(".comment");
const info = document.querySelector(".info");

// moving animation event
container.addEventListener("mousemove", (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

//Animate In
container.addEventListener("mouseenter", (e) => {
    card.style.transition = "none";
    //Popout
    title.style.transform = "translateZ(150px)";
    dogImg.style.transform = "translateZ(200px)";
    info.style.transform = "translateZ(125px)";
    comment.style.transform = "translateZ(75px)";
});
//Animate Out
container.addEventListener("mouseleave", (e) => {
    card.style.transition = "all 0.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    //Popback
    title.style.transform = "translateZ(0px)";
    dogImg.style.transform = "translateZ(0px)";
    info.style.transform = "translateZ(0px)";
    comment.style.transform = "translateZ(0px)";
});