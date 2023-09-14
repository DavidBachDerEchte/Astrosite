function rerrorhide() {
    const errormessage1 = document.getElementById('Mars-Gallery-Errorid');
    errormessage1.style.visibility = 'hidden';
}

function rerrorshow() {
    const errormessage2 = document.getElementById('Mars-Gallery-Errorid');
    errormessage2.style.visibility = 'visible';
}

function rerrorhidepics() {
    const errormessage1 = document.getElementById('mpic');
    errormessage1.style.visibility = 'hidden';
}

function rerrorshowpics() {
    const errormessage2 = document.getElementById('mpic');
    errormessage2.style.visibility = 'visible';
}

const runMarsGalleryApi = document.getElementById("MarsGalleryRunApi");

runMarsGalleryApi.addEventListener("click", async function (event) {
    event.preventDefault();

    const dateInput = document.getElementById("datemarsgallery");
    const date = dateInput.value;

    const currentDate = new Date().toISOString().split('T')[0];

    if (date > currentDate) {
        rerrorhidepics();
        rerrorshow();
        return;
    }

    try {
        const response = await fetch("https://localhost:3000/astromarsgallery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: date || "2022-06-01",
            }),
        });

        if (!response.ok) {
            throw new Error("Fetch request failed");
        }

        const data = await response.json();

        rerrorhide();
        rerrorshowpics();

        const imageContainer = document.getElementById("mpic");
        imageContainer.innerHTML = '';

        for (const photo of data.photos) {
            const img = document.createElement('img');
            img.src = photo.img_src;
            img.alt = `Mars Rover Bild - Sol: ${photo.sol}, Kamera: ${photo.camera.name}`;
            imageContainer.appendChild(img);
        }
    } catch (error) {
        console.error(error);
    }

});

const gobackupconst = document.querySelector(".go-backup-button");

gobackupconst.addEventListener("click", function () {
    window.scrollTo(0, 0);
});
