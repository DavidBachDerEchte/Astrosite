document.addEventListener("DOMContentLoaded", function() {
    window.onscroll = function () {
        stickymenufunction2();
    };

    let header = document.getElementById("menu_header");
    let sticky = header.offsetTop;

    function stickymenufunction2() {
        if (window.scrollY > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
});

function openNav2() {
    document.getElementById("mySidenav").style.transform = "translateX(0)";
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav2() {
    document.getElementById("mySidenav").style.transform = "translateX(-100%)";
    document.getElementById("mySidenav").style.width = "0";
}