document.addEventListener("DOMContentLoaded", function() {
    window.onscroll = function () {
        stickymenufunction7();
    };

    let header = document.getElementById("menu_header");
    let sticky = header.offsetTop;

    function stickymenufunction7() {
        if (window.scrollY > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
});

function openNav7() {
    document.getElementById("mySidenav").style.transform = "translateX(0)";
}

function closeNav7() {
    document.getElementById("mySidenav").style.transform = "translateX(-100%)";
}

/*Star Search API*/

const runAstroApi = document.getElementById("astroskychartbuttonid");
let astroApiResponse = {};

runAstroApi.addEventListener("click", async function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll(".astroskychartinput");
    const longitude = inputs[0].value;
    const latitude = inputs[1].value;
    const date = inputs[2].value;

    let inputData = {
        "style": document.getElementById("astroskychartselectstyle").value,
        "observer": {
            "latitude": parseFloat(latitude),
            "longitude": parseFloat(longitude),
            "date": date
        },
        "view": { 
            "type": "constellation",
            "parameters": {
                "constellation": document.getElementById("astroskychartselectconstellation").value
            }
        }
    }

    /*let inputData = `{
        "observer": {
          "date": "2023-09-06",
          "latitude": 47.73293569575534,
          "longitude": 10.310926959509345
        },
        "style": "inverted",
        "view": {
          "parameters": {
            "constellation": "and"
          },
          "type": "constellation"
        }
      }`*/

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

    const img = document.createElement("img");
    img.src = data.data.imageUrl;
    img.className = "astroskychartimg";

    document.body.appendChild(img);


    return astroApiResponse;
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