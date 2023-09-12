/*Table show and not show*/

function showTable() {
    const table = document.getElementById('starTable');
    table.style.display = 'table';
    table.style.visibility = 'visible';
}



/*Star Search API*/

const runAstroApi = document.getElementById("runastroapi");
let astroApiResponse = {};

runAstroApi.addEventListener("click", async function (event) {
    event.preventDefault();

    let location = document.getElementById("astrosearchinput").value;
    location = location.trim();

    document.getElementById("astrosearchinput").value = "";

    const loadingicona = document.querySelector(".dot-spinner");
    loadingicona.style.display = "flex";

    astroApiResponse = {};
    const response = await fetch("https://localhost:3000/astrostarsearch", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            location: location || null
        })
    }).catch(err => {
        console.error(err);
    })

    let data = await response.json();

    if (data.error) {
        console.log(data.error);
        return;
    }


    loadingicona.style.display = "none";


    data = data.data[0];

    if (data === undefined || data === null) {
        console.log("No data found");
        return;
    }


    astroApiResponse = {
        name: data.name,
        type: data.type.name,
        crossIdentification: data.crossIdentification,
        position: data.position.constellation.name,
        decpos: data.position.equatorial.declination,
        rapos: data.position.equatorial.rightAscension
    };

    console.log(astroApiResponse);


    /* Catalog1 */

    const catalogHDa = document.getElementById('catalogHD');

    catalogHDa.innerHTML = '';

    const crossIdentificationArray = data.crossIdentification;

    const hdObject = crossIdentificationArray.find(obj => obj.catalogId === 'HD');

    if (hdObject) {
        const textElement = document.createElement('p');
        textElement.textContent = `${hdObject.name}`;
        catalogHDa.appendChild(textElement);
    } else {
        const textElement = document.createElement('p');
        textElement.textContent = 'No HD catalog found';
        catalogHDa.appendChild(textElement);
    }

    /* Catalog2 */

    const catalogHDa2 = document.getElementById('catalogHIP');

    catalogHDa2.innerHTML = '';

    const crossIdentificationArray2 = data.crossIdentification;

    const hipObject = crossIdentificationArray2.find(obj => obj.catalogId === 'HIP');

    if (hipObject) {
        const textElement2 = document.createElement('p');
        textElement2.textContent = `${hipObject.name}`;
        catalogHDa2.appendChild(textElement2);
    } else {
        const textElement2 = document.createElement('p');
        textElement2.textContent = 'No HD catalog found';
        catalogHDa2.appendChild(textElement2);
    }

    /* Catalog3 */

    const catalogHDa3 = document.getElementById('catalogHR');

    catalogHDa3.innerHTML = '';

    const crossIdentificationArray3 = data.crossIdentification;

    const hrObject = crossIdentificationArray3.find(obj => obj.catalogId === 'HR');

    if (hrObject) {
        const textElement3 = document.createElement('p');
        textElement3.textContent = `${hrObject.name}`;
        catalogHDa3.appendChild(textElement3);
    } else {
        const textElement3 = document.createElement('p');
        textElement3.textContent = 'No HD catalog found';
        catalogHDa3.appendChild(textElement3);
    }


    /*Name*/

    const objname = document.getElementById("Objectname");
    objname.textContent = astroApiResponse.name;

    /*Type*/

    const objtype = document.getElementById("Objecttype");
    objtype.textContent = astroApiResponse.type;


    /* Catalogconstellation*/


    const catalogconstellation = document.getElementById('Objectconstellationname');

    catalogconstellation.innerHTML = '';


    const Objectconstellationnamejs = astroApiResponse.position;

    if (Objectconstellationnamejs) {
        const textElement1 = document.createElement('p');
        textElement1.textContent = `${Objectconstellationnamejs}`;
        catalogconstellation.appendChild(textElement1);
    } else {
        const textElement1 = document.createElement('p');
        textElement1.textContent = 'No constellation found';
        catalogconstellation.appendChild(textElement1);
    }


    /* Right ascension*/


    const rightAscensionprint = document.getElementById('Objectrightascension');

    rightAscensionprint.innerHTML = '';


    const Objectrightascensionjs = astroApiResponse.rapos;

    if (Objectrightascensionjs) {
        const textElement1 = document.createElement('p');
        textElement1.textContent = `${Objectrightascensionjs.string}`;
        rightAscensionprint.appendChild(textElement1);
    } else {
        const textElement1 = document.createElement('p');
        textElement1.textContent = 'No right ascension found';
        rightAscensionprint.appendChild(textElement1);
    }

    /* Right ascension*/


    const decprint = document.getElementById('Objectdeclination');

    decprint.innerHTML = '';


    const Objectdeclinationjs = astroApiResponse.decpos;

    if (Objectdeclinationjs) {
        const textElement1 = document.createElement('p');
        textElement1.textContent = `${Objectdeclinationjs.string}`;
        decprint.appendChild(textElement1);
    } else {
        const textElement1 = document.createElement('p');
        textElement1.textContent = 'No declination found';
        decprint.appendChild(textElement1);
    }

    showTable();

    return astroApiResponse;




})