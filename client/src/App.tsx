import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsList from "./events/eventslist";
import EventDetail from "./eventsid/eventdetail";
import NewEvent from "./eventsnew/newevent";

// Příklad dat
const data = [
    {
        title: "Tým building",
        id: "1",
        location: "Praha",
        dates: [
            { timestamp: 1726514405258, records: [{ name: "Honza", answer: "yes" }, { name: "Jana", answer: "no" }] },
            { timestamp: 1726600861177, records: [{ name: "Jana", answer: "no" }] },
        ],
    },
];

function App() {
    return (
        <Router>
            <nav>
                <Link to="/events">Seznam událostí</Link> | <Link to="/events/new">Nová událost</Link>
            </nav>

            <Routes>
                <Route path="/events" element={<EventsList data={data} />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/events/new" element={<NewEvent />} />
            </Routes>
        </Router>
    );
}

export default App;
