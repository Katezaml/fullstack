import React from "react";
import { Link } from "react-router-dom";
import { type EventsListProps } from "./types.ts";

const EventsList: React.FC<EventsListProps> = ({ data }) => {
    return (
        <div>
            <h2>Seznam událostí</h2>
            <ul>
                {data.map((event) => (
                    <li key={event.id}>
                        {event.title} - <Link to={`/events/${event.id}`}>Detail</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsList;
