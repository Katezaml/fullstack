import React, { useEffect, useState } from "react";
import { EventsApi, Event } from "../api-client";
import EventsList from "./EventsList";

const EventsContainer: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const api = new EventsApi();

        api.getEvents()
            .then((res) => {
                setEvents(res.data.items);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Nepodařilo se načíst události");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Načítám události...</p>;
    if (error) return <p>{error}</p>;

    return <EventsList data={events} />;
};

export default EventsContainer;
