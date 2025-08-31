import React from "react";
import { PollingEvent } from "./types.ts";

type EventDetailProps = {
    event: PollingEvent;
};

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
    return (
        <div>
            <h2>{event.title}</h2>
            <p>Místo: {event.location}</p>
            <h3>Termíny</h3>
            <ul>
                {event.dates.map((date) => (
                    <li key={date.timestamp}>
                        {new Date(date.timestamp).toLocaleDateString()} –{" "}
                        {date.records.map((r) => `${r.name}: ${r.answer}`).join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventDetail;
