import createClient from "openapi-fetch";
import type { paths, components } from "./api-types"; // generované typy

export type SimplePollingEvent = components["schemas"]["Event"];
export type EventInput = components["schemas"]["EventInput"];

// Inicializace klienta
const client = createClient<paths>({ baseUrl: "http://localhost:4000" });

// Načtení všech eventů
export const loadEvents = async (): Promise<SimplePollingEvent[]> => {
    const { data, error } = await client.GET("/api/events");
    if (error) throw new Error(error);
    return data.items;
};

// Načtení eventu podle ID
export const loadEventById = async (id: string | number): Promise<SimplePollingEvent> => {
    const { data, error } = await client.GET(`/api/events/${id}`);
    if (error) throw new Error(error);
    return data;
};

// Vytvoření nové události
export const createEvent = async (eventInput: EventInput): Promise<SimplePollingEvent> => {
    const { data, error } = await client.POST("/api/events", { body: eventInput });
    if (error) throw new Error(error);
    return data;
};
