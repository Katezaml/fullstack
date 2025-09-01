import React, { useEffect, useState } from "react";
import { type PollingEvent } from "./types.ts";

type EventDetailProps = {
    event: PollingEvent;
};

type Weather = {
    temperature: number;
    description?: string;
};

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
    const [weather, setWeather] = useState<Weather | null>(null);

    useEffect(() => {
        if (event.location) {
            // jednoduché volání na Open-Meteo API (příklad)
            fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                    event.location
                )}`
            )
                .then((res) => res.json())
                .then((geo) => {
                    if (geo.results && geo.results.length > 0) {
                        const { latitude, longitude } = geo.results[0];
                        return fetch(
                            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                        );
                    }
                })
                .then((res) => (res ? res.json() : null))
                .then((data) => {
                    if (data?.current_weather) {
                        setWeather({
                            temperature: data.current_weather.temperature,
                            description: `${data.current_weather.weathercode}`,
                        });
                    }
                })
                .catch(() => {
                    setWeather(null);
                });
        }
    }, [event.location]);

    return (
        <div>
            <h2>{event.title}</h2>

            {event.location && (
                <>
                    <p>Místo: {event.location}</p>
                    {weather && (
                        <p>
                            Aktuální počasí: {weather.temperature}°C{" "}
                            {weather.description}
                        </p>
                    )}
                </>
            )}

            <h3>Termíny</h3>
            <ul>
                {event.dates.map((date) => (
                    <li key={date.timestamp}>
                        {new Date(date.timestamp).toLocaleDateString()} –{" "}
                        {date.records
                            .map((r) => `${r.name}: ${r.answer}`)
                            .join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventDetail;
