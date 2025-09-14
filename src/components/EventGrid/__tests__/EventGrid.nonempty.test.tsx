import { Providers } from "@/components/Providers/Providers";
import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import { render, screen } from "@testing-library/react";

import { EventGrid } from "../EventGrid";

jest.mock("next/navigation", () => {
    const actual: Record<string, unknown> = jest.requireActual("next/navigation");
    return {
        ...actual,
        useSearchParams: () => new URLSearchParams(),
    };
});

function sampleEvent(overrides?: Partial<KciEventObject>): KciEventObject {
    return {
        color: "#123",
        day: "Monday",
        end: { date: "2025-09-08", military: "10:00", time: "10:00am" },
        start: { date: "2025-09-08", military: "09:00", time: "9:00am" },
        title: "Stick & Puck",
        url: "https://example.com",
        location: "Kraken Community Iceplex",
        ...(overrides || {}),
    } as KciEventObject;
}

describe("EventGrid non-empty", () => {
    test("renders EventColumn and EventCell when events present", () => {
        render(
            <Providers>
                <EventGrid kciEvents={[sampleEvent()]} licEvents={[]} ovaEvents={[]} />
            </Providers>,
        );

        // Non-empty branch should render Monday column and event content
        expect(screen.getByText("Monday")).toBeInTheDocument();
        expect(screen.getByText("Stick & Puck")).toBeInTheDocument();
        expect(
            screen.queryByText(/No events are scheduled for this week/i),
        ).not.toBeInTheDocument();
    });
});
