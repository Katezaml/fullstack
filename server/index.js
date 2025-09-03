import express from "express";

const app = express();
const port = 4000;

app.use(express.json());

const events = {
    items: [
        {
            id: 1,
            location: "Praha",
            title: "Super akce",
            dates: [
                {
                    timestamp: 1726514405258,
                    records: [
                        { name: "Honza", answer: "yes" },
                        { name: "Jana", answer: "no" }
                    ]
                },
                {
                    timestamp: 1726600861177,
                    records: [{ name: "Jana", answer: "no" }]
                }
            ]
        },
        {
            id: 2,
            location: "Brno",
            title: "Super akce 2",
            dates: [
                {
                    timestamp: 1726514405258,
                    records: [
                        { name: "Honza", answer: "no" },
                        { name: "Jana", answer: "no" },
                        { name: "Petr", answer: "no" }
                    ]
                },
                {
                    timestamp: 1726600861177,
                    records: [{ name: "Jana", answer: "no" }]
                }
            ]
        }
    ]
};

app.get("/api/events", (req, res) => {
    res.json(events);
});

app.get("/api/events/:id", (req, res) => {
    const event = events.items.find(
        (ev) => ev.id === Number(req.params.id)
    );
    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
});

app.post("/api/events", (req, res) => {
    const { title, location, dates } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Missing title" });
    }
    const newEvent = {
        id: events.items.length + 1,
        title,
        location,
        dates: dates || []
    };
    events.items.push(newEvent);
    res.status(201).json(newEvent);
});

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
