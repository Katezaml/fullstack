import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import type { SimplePollingEvent } from "./api"; // typ ze souboru api-types.ts

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors()); // povolení CORS pro frontend

// Inicializace databáze
const db = new Database("events.db");

// Vytvoření tabulek
db.exec(`
    CREATE TABLE IF NOT EXISTS events (
                                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                                          title TEXT NOT NULL,
                                          location TEXT
    );

    CREATE TABLE IF NOT EXISTS dates (
                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                         event_id INTEGER NOT NULL,
                                         timestamp INTEGER NOT NULL,
                                         FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
        );

    CREATE TABLE IF NOT EXISTS answers (
                                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                                           date_id INTEGER NOT NULL,
                                           name TEXT NOT NULL,
                                           answer TEXT CHECK(answer IN ('yes','no','if-needed')),
        FOREIGN KEY(date_id) REFERENCES dates(id) ON DELETE CASCADE
        );
`);

// GET /api/events – všechny události
app.get("/api/events", (req, res) => {
    const events = db.prepare<[], SimplePollingEvent[]>("SELECT * FROM events").all();

    const fullEvents = events.map(event => {
        const dates = db.prepare<[number], { id: number; timestamp: number }[]>(
            "SELECT * FROM dates WHERE event_id = ?"
        ).all(event.id);

        const fullDates = dates.map(date => ({
            ...date,
            records: db.prepare<[number], { id: number; name: string; answer: string }[]>(
                "SELECT * FROM answers WHERE date_id = ?"
            ).all(date.id),
        }));

        return { ...event, dates: fullDates };
    });

    res.json({ items: fullEvents });
});

// GET /api/events/:id – konkrétní událost
app.get("/api/events/:id", (req, res) => {
    const eventId = parseInt(req.params.id);

    const event = db
        .prepare<[number], SimplePollingEvent>("SELECT * FROM events WHERE id = ?")
        .get(eventId);

    if (!event) return res.status(404).json({ error: "Event not found" });

    const dates = db.prepare<[number], { id: number; timestamp: number }[]>(
        "SELECT * FROM dates WHERE event_id = ?"
    ).all(event.id);

    const fullDates = dates.map(date => ({
        ...date,
        records: db.prepare<[number], { id: number; name: string; answer: string }[]>(
            "SELECT * FROM answers WHERE date_id = ?"
        ).all(date.id),
    }));

    res.json({ ...event, dates: fullDates });
});

// POST /api/events – vytvoření nové události
app.post("/api/events", (req, res) => {
    const { title, location, dates } = req.body;
    if (!title) return res.status(400).json({ error: "Missing title" });

    const info = db
        .prepare<[string, string | undefined]>("INSERT INTO events (title, location) VALUES (?, ?)")
        .run(title, location);
    const eventId = info.lastInsertRowid as number;

    dates?.forEach((d: { timestamp: number }) => {
        db.prepare<[number, number]>("INSERT INTO dates (event_id, timestamp) VALUES (?, ?)")
            .run(eventId, d.timestamp);
        // odpovědi zatím necháme prázdné
    });

    const event = db
        .prepare<[number], SimplePollingEvent>("SELECT * FROM events WHERE id = ?")
        .get(eventId);

    res.status(201).json(event);
});

// Spuštění serveru
app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
