/*Planetary Search API*/

const runAstroApi = document.getElementById("PlanetarySearchrunApi");
let astroApiResponse = {};

runAstroApi.addEventListener("click", async function (event) {
    event.preventDefault();

    const LongInput = document.querySelector("#PlanetaryInputLONG");
    const LatInput = document.querySelector("#PlanetaryInputLONG");

    const loadingicona = document.querySelector(".dot-spinner");
    loadingicona.style.display = "flex";

    inputData = checkAndSetToNull(inputData);


    astroApiResponse = {};

    const response = await fetch("https://localhost:3000/astrostarchart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData)
    }).catch(err => {
        console.error(err);
    })

    let data = await response.json();

    if (data.error) {
        console.log(data.error);
        return;
    }

});

function checkAndSetToNull(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                // Wenn der Wert ein Objekt ist, rufe die Funktion rekursiv auf
                checkAndSetToNull(obj[key]);
            } else if (!obj[key]) {
                // Wenn der Wert leer (falsy) ist, setze das gesamte Objekt auf null und beende die Schleife
                obj = null;
                break;
            }
        }
    }
    return obj;
}