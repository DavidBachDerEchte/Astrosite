const runMarsGalleryApi = document.getElementById("MarsGalleryRunApi");

runMarsGalleryApi.addEventListener("click", async function (event) {
    event.preventDefault();


    const date = document.getElementById("datemarsgallery").value;


    try {
        const response = await fetch("https://localhost:3000/astromarsgallery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: date || "2015-6-3"
            })
        });

        if (!response.ok) {
            throw new Error("Fetch request failed");
        }

        const data = await response.json();


        const imageContainer = document.getElementById('mpic');

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

const gobackupconst = document.querySelector(".gobackupbutton");

gobackupconst.addEventListener("click", function () {
    window.scrollTo(0, 0);
});
