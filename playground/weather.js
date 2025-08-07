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

    for (const city of cities) {
        try {
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                resultsDiv.innerHTML += `<p>Město "${city}" nebylo nalezeno.</p>`;
                continue;
            }

            const { latitude, longitude } = geoData.results[0];

            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&timezone=auto`);
            const weatherData = await weatherResponse.json();

            const min = weatherData.daily.temperature_2m_min[0];
            const max = weatherData.daily.temperature_2m_max[0];

            resultsDiv.innerHTML += `<p><strong>${city}:</strong> Min: ${min}°C, Max: ${max}°C</p>`;
        } catch (error) {
            resultsDiv.innerHTML += `<p>Chyba při načítání dat pro "${city}".</p>`;
        }
    }
});