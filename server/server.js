import fetch from "node-fetch"
import express, { json } from "express"
const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());

import fs from "fs";
import https from "https";

const httpsOptions = {
    key: fs.readFileSync("cert/key.pem"),
    cert: fs.readFileSync("cert/cert.pem"),
};

const httpsServer = https.createServer(httpsOptions, app);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.post("/weather", async (req, res) => {

    console.log(req.body)

    const location = req.body.location;

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${location}&aqi=yes`)

    const data = await response.json();
    console.log(data);

    const inputDate = data.location.localtime;
    const date = new Date(inputDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${day}.${month}.${year}`;

    res.json({
        name: data.location.name,
        localtime: formattedDate,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        wind: data.current.wind_kph,
        wind_degree: data.current.wind_degree,
        humidity: data.current.humidity,
    })
})

// Astrostarseach api

const authString = btoa(`${process.env.ASTRO_API_ID}:${process.env.ASTRO_API_SECRET}`);

app.post("/astrostarsearch", async (req, res) => {
    const location = req.body.location;

    if (location === undefined || location === null) {
        res.json({ error: "No location provided" });
        return;
    }

    const response = await fetch(`https://api.astronomyapi.com/api/v2/search?term=${location}&ra=&dec=&match_type=exact`, {
        headers: {
            Authorization: `Basic ${authString}`
        }
    }).catch(err => {
        console.error(err);
    })

    const data = await response.json();

    console.log(data);

    res.json(data)
})

// Astrostarchart api

app.post("/astrostarchart", async (req, res) => {
    const location = req.body;
    console.log(location);

    //const stringData = `{\"style\":\"${location.style}\\",\"observer\":{\"latitude\":${location.observer.latitude},\"longitude\":${location.observer.longitude},\"date\":\"${location.observer.date}\"},\"view\":{\"type\":\"constellation\",\"parameters\":{\"constellation\":\"${location.view.parameters.constellation}\"}}};`;

    if (location === undefined || location === null) {
        console.log("No location provided");
        res.json({ error: "No location provided" });
        return;
    }

    const response = await fetch(`https://api.astronomyapi.com/api/v2/studio/star-chart`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${authString}`
        },
        body: JSON.stringify(location),
    }).catch(err => {
        console.error(err);
    })

    const data = await response.json();

    if (data.error) {
        console.log(data.error);
        res.json({ error: data.error });
        return;
    }
    console.log(data);

    res.json(data)
})

httpsServer.listen(3000, () => {
    console.log("server started on port 3000");
})


