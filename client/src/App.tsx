import React from "react";
import Event, { EventProps } from "./components/Event";

const testEvent: EventProps = {
    id: "1",
    title: "Schůzka vývojového týmu",
    location: "Praha",
    dates: [
        {
            timestamp: new Date("2025-08-30").getTime(),
            records: [
                { name: "Kate", answer: "yes" },
                { name: "Jan", answer: "no" },
            ],
        },
        {
            timestamp: new Date("2025-09-01").getTime(),
            records: [
                { name: "Kate", answer: "if-needed" },
                { name: "Jan", answer: "yes" },
            ],
        },
    ],
};

function App() {
    return (
        <div>
            <h1>Ukázka komponenty Event</h1>
            <Event {...testEvent} />
        </div>
    );
}

export default App;