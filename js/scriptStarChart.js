function rerrorhidelat() {
    const errormessage1 = document.getElementById('Star-Chart-Pictureid1');
    errormessage1.style.visibility = 'hidden';
}

function rerrorshowlat() {
    const errormessage2 = document.getElementById('Star-Chart-Pictureid1');
    errormessage2.style.visibility = 'visible';
}

function rerrorhidelong() {
    const errormessage3 = document.getElementById('Star-Chart-Pictureid2');
    errormessage3.style.visibility = 'hidden';
}

function rerrorshowlong() {
    const errormessage4 = document.getElementById('Star-Chart-Pictureid2');
    errormessage4.style.visibility = 'visible';
}


function picshide() {
    const errormessage3 = document.getElementById('Star-Chart-Picid');
    errormessage3.style.visibility = 'hidden';
}

function picsshow() {
    const errormessage5 = document.getElementById('Star-Chart-Picid');
    errormessage5.style.visibility = 'visible';
}

/*Star Search API*/

const runAstroApi = document.getElementById("astroskychartbuttonid");
let astroApiResponse = {};

const card = document.querySelector(".Star-Chart-Picture");


runAstroApi.addEventListener("click", async function (event) {
    event.preventDefault();


    const inputs = document.querySelectorAll(".astro-sky-chart-input");
    const longitude = inputs[0].value;
    const latitude = inputs[1].value;
    const date = inputs[2].value;
    const today = new Date();
    const formatedtoday = today.toISOString().slice(0, 10);

    const loadingicona = document.querySelector(".dot-spinner");
    loadingicona.style.display = "flex";

    let inputData = {
        "style": document.getElementById("astroskychartselectstyle").value,
        "observer": {
            "latitude": parseFloat(latitude),
            "longitude": parseFloat(longitude),
            "date": date || formatedtoday
        },
        "view": {
            "type": "constellation",
            "parameters": {
                "constellation": document.getElementById("astroskychartselectconstellation").value
            }
        }
    }

    if (parseFloat(longitude) <= 90 && parseFloat(longitude) >= -90) {
        if (parseFloat(latitude) <= 90 && parseFloat(latitude) >= -90) {
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

            rerrorhidelat();
            rerrorhidelong();

            let data = await response.json();

            if (data.error) {
                console.log(data.error);
                return;
            }


            loadingicona.style.display = "none";

            const img = document.createElement("img");
            img.src = data.data.imageUrl;
            img.className = "astro-sky-chart-img";

            document.body.appendChild(img);

            picsshow();

            var starChartDiv = document.querySelector(".Star-Chart-Picture");
            starChartDiv.innerHTML = "";
            starChartDiv.appendChild(img);


            return astroApiResponse;
        } else {
            loadingicona.style.display = "none";
            rerrorshowlat();
            rerrorhidelong();
            picshide();
            return;
        }
    } else {
        loadingicona.style.display = "none";
        rerrorshowlong();
        rerrorhidelat();
        picshide();
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