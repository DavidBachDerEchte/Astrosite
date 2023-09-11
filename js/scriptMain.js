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

const windowprefertscheme = window.matchMedia('(prefers-color-scheme: light)');
const themeSwitchDark = document.querySelector(".theme-switch__checkbox");

themeSwitchDark.addEventListener("change", () => {
    nav.style.transition = "none"
    setTimeout(() => {
        nav.style.transition = ""
    }, 10)
})

if (windowprefertscheme.matches) {
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute("data-theme", "light");
    themeSwitchDark.addEventListener("change", () => {
        if (htmlElement.hasAttribute("data-theme")) {
            const currentTheme = htmlElement.getAttribute("data-theme");
            if (currentTheme === "dark") {
                htmlElement.removeAttribute("data-theme", "dark");
                htmlElement.setAttribute("data-theme", "light");
            } else {
                htmlElement.setAttribute("data-theme", "dark");
            }
        } else {
            htmlElement.setAttribute("data-theme", "dark");
        }
    });
}

if (windowprefertscheme.matches === false) {
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute("data-theme", "dark");
    themeSwitchDark.setAttribute("checked", "true");
    themeSwitchDark.addEventListener("change", () => {
        if (htmlElement.hasAttribute("data-theme")) {
            const currentTheme = htmlElement.getAttribute("data-theme");
            if (currentTheme === "light") {
                htmlElement.removeAttribute("data-theme", "light");
                htmlElement.setAttribute("data-theme", "dark");
            } else {
                htmlElement.setAttribute("data-theme", "light");
            }
        } else {
            htmlElement.setAttribute("data-theme", "light");
        }
    });

}

