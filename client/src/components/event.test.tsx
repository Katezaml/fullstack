// src/components/Event.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Event, { EventProps } from "./Event";

describe("Event component", () => {
    const baseProps: EventProps = {
        id: "1",
        title: "Testovací událost",
        location: "Praha",
        dates: [
            {
                timestamp: Date.now(),
                records: [{ name: "Karel", answer: "yes" }],
            },
        ],
    };

    it("zobrazí název události", () => {
        render(<Event {...baseProps} />);
        expect(screen.getByText("Testovací událost")).toBeInTheDocument();
    });

    it("zobrazí místo konání", () => {
        render(<Event {...baseProps} />);
        expect(screen.getByText(/Praha/)).toBeInTheDocument();
    });
});