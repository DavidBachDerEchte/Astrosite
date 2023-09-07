document.addEventListener("DOMContentLoaded", function() {
    window.onscroll = function () {
        stickymenufunction4();
    };

    let header = document.getElementById("menu_header");
    let sticky = header.offsetTop;

    function stickymenufunction4() {
        if (window.scrollY > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
});

function openNav4() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav4() {
    document.getElementById("mySidenav").style.width = "0";
}