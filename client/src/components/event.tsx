// src/components/Event.tsx
import React from "react";

type UserRecord = {
    name: string;
    answer: "yes" | "no" | "if-needed";
};

type DateRecord = {
    timestamp: number;
    records: UserRecord[];
};

export type EventProps = {
    location?: string;
    id: string;
    title: string;
    dates: DateRecord[];
};

const Event: React.FC<EventProps> = ({ location, title, dates }) => {
    return (
        <div>
            <h2>{title}</h2>
            {location && <p><strong>Místo:</strong> {location}</p>}

            <table border={1}>
                <thead>
                <tr>
                    <th>Účastník</th>
                    {dates.map((date) => (
                        <th key={date.timestamp}>
                            {new Date(date.timestamp).toLocaleDateString()}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {/* projdeme všechny unikátní uživatele */}
                {Array.from(
                    new Set(dates.flatMap((d) => d.records.map((r) => r.name)))
                ).map((name) => (
                    <tr key={name}>
                        <td>{name}</td>
                        {dates.map((date) => {
                            const record = date.records.find((r) => r.name === name);
                            return (
                                <td key={date.timestamp}>
                                    {record ? record.answer : "-"}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Event;