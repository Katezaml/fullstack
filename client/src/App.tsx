import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsList from "./EventsList";
import EventDetail from "./EventDetail";
import NewEvent from "./NewEvent";
import { type PollingEvent } from "./types";

const data: PollingEvent[] = [
    {
        title: "Tým building",
        id: "1",
        location: "Praha",
        dates: [
            {
                timestamp: 1726514405258,
                records: [
                    { name: "Honza", answer: "yes" },
                    { name: "Jana", answer: "no" },
                ],
            },
            {
                timestamp: 1726600861177,
                records: [{ name: "Jana", answer: "no" }],
            },
        ],
    },
];

function App() {
    return (
        <Router>
            <nav>
                <Link to="/events">Seznam událostí</Link> |{" "}
                <Link to="/events/new">Nová událost</Link>
            </nav>
            <Routes>
                <Route path="/events" element={<EventsList data={data} />} />
                <Route path="/events/:id" element={<EventDetail event={data[0]} />} />
                <Route path="/events/new" element={<NewEvent />} />
            </Routes>
        </Router>
    );
}

export default App;
