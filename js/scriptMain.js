const navMenuIconButton = document.querySelector(".menu-icon");
const nav = document.querySelector("nav");

const scrollPos = { x: "", y: "" };

navMenuIconButton.addEventListener("click", function () {
    navMenuIconButton.classList.toggle("close");
    nav.classList.toggle("open");
    scrollPos.x = window.scrollX;
    scrollPos.y = window.scrollY;

    if (nav.classList.contains("open")) {
        document.querySelector("html").style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        window.onscroll = function () {
            window.scrollTo(0, 0);
        }

        if (window.innerWidth <= 515) return;
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.prepend(overlay);

    } else {
        if (window.innerWidth <= 515) return;
        window.onscroll = function () { }
        document.querySelector("html").style.scrollBehavior = "";
        document.querySelector(".overlay").remove();
    }
})

document.addEventListener("click", (event) => {
    if (window.innerWidth <= 515) return;
    if (event.target.className === "overlay") {
        navMenuIconButton.classList.remove("close");
        nav.classList.remove("open");
        document.querySelector(".overlay").remove();
        window.onscroll = function () { }
        document.querySelector("html").style.scrollBehavior = "";
    }
})



const themeSwitchDark = document.querySelector(".theme-switch__checkbox");

themeSwitchDark.addEventListener("change", () => {
    const htmlElement = document.querySelector("html");
    if (htmlElement.hasAttribute("data-theme")) {
        const currentTheme = htmlElement.getAttribute("data-theme");
        if (currentTheme === "dark") {
            htmlElement.removeAttribute("data-theme", "dark");
        } else {
            htmlElement.setAttribute("data-theme", "dark");
        }
    } else {
        htmlElement.setAttribute("data-theme", "dark");
    }
});










