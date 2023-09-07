document.addEventListener("DOMContentLoaded", function() {
    window.onscroll = function () {
        stickymenufunction3();
    };

    let header = document.getElementById("menu_header");
    let sticky = header.offsetTop;

    function stickymenufunction3() {
        if (window.scrollY > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
});

function openNav3() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav3() {
    document.getElementById("mySidenav").style.width = "0";
}

const runSearch = document.getElementById("runApi");
const inputCity = document.getElementById("locationinputid");
runSearch.addEventListener("click", async (event) => {
    event.preventDefault();
    const value = inputCity.value;
    inputCity.value = "";
    const result = await fetch(`http://localhost:3000/weather`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            location: value || "Kempten"
        })
    }).catch((err) => {
        console.log(err)
    })

    const data = await result.json();

    const timeElement = document.getElementById("time");
    timeElement.textContent = data.localtime;

    const locname = document.getElementById("locationname");
    locname.textContent = data.name;

    const condition = document.getElementById("condition");
    condition.textContent = data.condition;

    const icon = document.getElementById("weathericon");
    icon.src = data.icon;

    const temp = document.getElementById("temp");
    temp.textContent = data.temp + "°C";

    const wind_degree = document.getElementById("wind_degree");
    wind_degree.textContent = "Wind direction: " + data.wind_degree + "°";

    const wind = document.getElementById("wind");
    wind.textContent = "Wind speed: " + data.wind + " km/h";

    const humidity = document.getElementById("humidity");
    humidity.textContent = "Humidity: " + data.humidity + " %";

})
