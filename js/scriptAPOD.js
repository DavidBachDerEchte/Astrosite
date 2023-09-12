const runAPODApi = document.getElementById("APODRunApi");

runAPODApi.addEventListener("click", async function (event) {
    event.preventDefault();

    const loadingicona = document.querySelector(".dot-spinner");
    loadingicona.style.display = "flex";


    try {
        const response = await fetch("https://localhost:3000/astroapod", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error("Fetch request failed");
        }


        loadingicona.style.display = "none";

        const data = await response.json();
        console.log(data);

        const imageContainer = document.getElementById('apodpic');

        imageContainer.innerHTML = '';

        const img = document.createElement('img');
        img.src = data.url;
        img.classList.add('APODImage');
        imageContainer.appendChild(img);

        const p3 = document.createElement('h2');
        p3.textContent = data.title;
        p3.classList.add('APODEX');
        imageContainer.appendChild(p3);

        const p2 = document.createElement('p');
        p2.textContent = "Explanation: ";
        p2.classList.add('APODEX');
        imageContainer.appendChild(p2);

        const p = document.createElement('p');
        p.textContent = data.explanation;
        p.classList.add('APODText');
        imageContainer.appendChild(p);


    } catch (error) {
        console.error(error);
    }
});
