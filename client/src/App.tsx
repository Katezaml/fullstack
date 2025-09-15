import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsContainer from "./EventsContainer"; // nový container
import EventDetail from "./EventDetail";
import NewEvent from "./NewEvent";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/events">Seznam událostí</Link> |{" "}
                <Link to="/events/new">Nová událost</Link>
            </nav>
            <Routes>
                <Route path="/events" element={<EventsContainer />} />
                <Route path="/events/:id" element={<EventDetail event={null as any} />} />
                <Route path="/events/new" element={<NewEvent />} />
            </Routes>
        </Router>
    );
}

export default App;
