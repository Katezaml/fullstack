import React, { useState } from "react";

const NewEvent: React.FC = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [dates, setDates] = useState<string[]>([""]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name: "Team building",
            location,
            title,
            dates: dates.map((d) => new Date(d).getTime()),
        };

        fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }).then(() => {
            alert("Událost odeslána!");
        });
    };

    const handleDateChange = (index: number, value: string) => {
        const newDates = [...dates];
        newDates[index] = value;
        setDates(newDates);
    };

    const addDate = () => {
        if (dates.length < 10) {
            setDates([...dates, ""]);
        }
    };

    return (
        <div>
            <h2>Nová událost</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Název"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    placeholder="Místo"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                {dates.map((date, i) => (
                    <input
                        key={i}
                        type="date"
                        value={date}
                        onChange={(e) => handleDateChange(i, e.target.value)}
                    />
                ))}

                <button type="button" onClick={addDate}>
                    Přidat datum
                </button>
                <button type="submit">Vytvořit</button>
            </form>
        </div>
    );
};

export default NewEvent;
