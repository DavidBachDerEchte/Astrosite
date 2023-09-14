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
        window.onscroll = function () { }
        document.querySelector("html").style.scrollBehavior = "";
        if (window.innerWidth <= 515) return;
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

// ########## Theme Switch ############

const themeSwitchDark = document.querySelector(".theme-switch__checkbox");
const htmlElement = document.querySelector("html");
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isDarkModeEnabled = localStorage.getItem("darkmodeon") === "true";


function toggleDarkMode() {
    if (htmlElement.getAttribute("data-theme") === "dark") {
        htmlElement.removeAttribute("data-theme");
        localStorage.setItem("darkmodeon", "false");
    } else {
        htmlElement.setAttribute("data-theme", "dark");
        localStorage.setItem("darkmodeon", "true");
    }
}

if (prefersDarkMode === true) {
    htmlElement.removeAttribute("data-theme");
    htmlElement.setAttribute("data-theme", "dark");
    themeSwitchDark.checked = true;
} else {
    htmlElement.setAttribute("data-theme", "light");
    htmlElement.removeAttribute("data-theme");
    themeSwitchDark.checked = false;
}


themeSwitchDark.checked = isDarkModeEnabled;

themeSwitchDark.addEventListener("change", () => {
    toggleDarkMode();
});

if (isDarkModeEnabled) {
    htmlElement.setAttribute("data-theme", "dark");
} else {
    htmlElement.removeAttribute("data-theme", "light");
}



// ########## Nav toggle links ############

const toggleMenuTools = document.querySelector("#toggleMenuTools");
const toggleMenuInformation = document.querySelector("#toggleMenuInformation");

const elements = [toggleMenuTools, toggleMenuInformation];


elements.forEach((element) => {
    element.addEventListener("click", () => {
        element.nextElementSibling.classList.toggle("showList");
    })
})
