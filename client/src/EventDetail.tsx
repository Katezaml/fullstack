import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventsApi, Event } from "../api-client";

type Weather = {
    temperature: number;
    description?: string;
};

const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [weather, setWeather] = useState<Weather | null>(null);

    useEffect(() => {
        if (!id) return;

        const api = new EventsApi();

        api.getEventById({ id: parseInt(id) }) // volání generovaného klienta
            .then((res) => {
                setEvent(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Nepodařilo se načíst událost");
                setLoading(false);
            });
    }, [id]);

    // Načítání počasí zůstává fetch, protože je externí API
    useEffect(() => {
        if (event?.location) {
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
    }, [event?.location]);

    if (loading) return <p>Načítám událost...</p>;
    if (error) return <p>{error}</p>;
    if (!event) return <p>Událost nenalezena</p>;

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
