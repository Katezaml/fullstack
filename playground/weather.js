document.getElementById("weather-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const input = document.getElementById("cities").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    let cities = input.split(/[,;]+/).map(city => city.trim()).filter(Boolean);
    if (cities.length === 0 || cities.length > 3) {
        resultsDiv.textContent = "Zadejte 1 až 3 města oddělená čárkou nebo středníkem.";
        return;
    }
    const geoResults = await Promise.allSettled(
        cities.map(async (city) => {
            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
            );
            if (!geoResponse.ok) {
                throw new Error(`Chyba při načítání souřadnic pro "${city}"`);
            }
            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error(`Město "${city}" nebylo nalezeno.`);
            }

            return {
                city,
                latitude: geoData.results[0].latitude,
                longitude: geoData.results[0].longitude
            };
        })
    );
    const coordsOk = geoResults
        .filter(r => r.status === "fulfilled")
        .map(r => r.value);

    const weatherResults = await Promise.allSettled(
        coordsOk.map(async ({ city, latitude, longitude }) => {
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&timezone=auto`
            );
            if (!weatherResponse.ok) {
                throw new Error(`Chyba při načítání předpovědi pro "${city}"`);
            }
            const weatherData = await weatherResponse.json();

            return {
                city,
                min: weatherData.daily.temperature_2m_min[0],
                max: weatherData.daily.temperature_2m_max[0]
            };
        })
    );

    geoResults.forEach((res, i) => {
        if (res.status === "rejected") {
            resultsDiv.innerHTML += `<p>${res.reason.message}</p>`;
        }
    });

    weatherResults.forEach(res => {
        if (res.status === "fulfilled") {
            const { city, min, max } = res.value;
            resultsDiv.innerHTML += `<p><strong>${city}:</strong> Min: ${min}°C, Max: ${max}°C</p>`;
        } else {
            resultsDiv.innerHTML += `<p>Chyba při načítání předpovědi pro město.</p>`;
        }
    });
});
