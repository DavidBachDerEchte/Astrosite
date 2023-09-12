const runSearch = document.getElementById("runApi");
const inputCity = document.getElementById("locationinputid");




runSearch.addEventListener("click", async (event) => {
    event.preventDefault();
    const value = inputCity.value;
    inputCity.value = "";
    const result = await fetch(`https://localhost:3000/weather`, {
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


    const card = document.querySelector(".card");
    const container = card.querySelector(".container");
    const resulta = card.querySelector("#result");
    const errora = card.querySelector(".Error");
    const p3 = document.createElement('h2');

    if (data.error) {


        if (container) {
            container.style.display = 'none';
        }
        if (resulta) {
            resulta.style.display = 'none';
        }

        p3.textContent = "Failed to fetch";
        p3.classList.add('Error');
        card.appendChild(p3);
    } else {

        errora.remove();
        container.style.display = 'block';
        resulta.style.display = 'block';


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
    }

})
