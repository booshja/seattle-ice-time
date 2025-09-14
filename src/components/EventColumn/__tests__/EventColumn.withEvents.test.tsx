import type { EventObject } from "@/types/events";
import { render, screen } from "@testing-library/react";

import { EventColumn } from "../EventColumn";

function event(overrides?: Partial<EventObject>): EventObject {
    return {
        color: "#000",
        day: "Monday",
        end: { date: "2025-09-08", military: "10:00", time: "10:00am" },
        start: { date: "2025-09-08", military: "09:00", time: "9:00am" },
        title: "Open Skate",
        url: "https://example.com",
        location: "Kraken Community Iceplex",
        ...(overrides || {}),
    } as EventObject;
}

describe("EventColumn with events", () => {
    test("renders EventCell items", () => {
        render(<EventColumn day="Monday" date={8} events={[event()]} />);
        expect(screen.getByText("Open Skate")).toBeInTheDocument();
        expect(screen.getByText("9:00am - 10:00am")).toBeInTheDocument();
        expect(screen.getByText("Kraken Community Iceplex")).toBeInTheDocument();
    });
});
