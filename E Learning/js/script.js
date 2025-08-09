let hamburger = document.querySelector(".hamburger");
let nav = document.querySelector("nav ul");
let navBtns = document.querySelectorAll("nav ul li");
let loginBtns = document.querySelector(".buttons");

hamburger.addEventListener("click", () => {
    if (nav.style.display === "flex") {
        nav.style.display = "none";
        loginBtns.style.display = "none";
    } else {
        nav.style.display = "flex";
        loginBtns.style.display = "flex";
    }
});

navBtns.forEach((index) => {
    index.addEventListener("click", () => {
        nav.style.display = "none";
        loginBtns.style.display = "none";
    });
});