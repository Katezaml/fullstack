import React, { useEffect, useState } from "react";
import { loadEvents, SimplePollingEvent } from "../api";
import EventsList from "./EventsList";

const EventsContainer: React.FC = () => {
    const [events, setEvents] = useState<SimplePollingEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadEvents()
            .then(setEvents)
            .catch(err => {
                console.error(err);
                setError("Nepodařilo se načíst události");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Načítám události...</p>;
    if (error) return <p>{error}</p>;

    return <EventsList data={events} />;
};

export default EventsContainer;
