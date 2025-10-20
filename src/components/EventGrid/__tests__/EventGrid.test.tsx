import { render, screen } from "@/testing/utils";
import type { KciEventObject as KciEventObjectType } from "@/types/krakenCommunityIceplex";
import { RINKS } from "@/utils/constants/rinks";

import { EventGrid } from "../EventGrid";

jest.mock("next/navigation", () => {
    const actual: Record<string, unknown> = jest.requireActual("next/navigation");
    return {
        ...actual,
        useSearchParams: () => new URLSearchParams(),
    };
});

describe("EventGrid", () => {
    describe("empty state", () => {
        it("renders message when no events", () => {
            render(<EventGrid kciEvents={[]} licEvents={[]} ovaEvents={[]} />);
            expect(
                screen.getByText(/No events are scheduled for this week/i),
            ).toBeInTheDocument();
        });
    });

    describe("loading", () => {
        it("does not show loading skeleton once empty state is shown", async () => {
            render(<EventGrid kciEvents={[]} licEvents={[]} ovaEvents={[]} />);
            expect(
                await screen.findByText(/No events are scheduled for this week/i),
            ).toBeInTheDocument();
        });
    });

    describe("with events", () => {
        const sampleEvent = (
            overrides?: Partial<Omit<KciEventObjectType, "location">>,
        ): KciEventObjectType => ({
            color: "#123",
            day: "Monday",
            end: { date: "2025-09-08", military: "10:00", time: "10:00am" },
            start: { date: "2025-09-08", military: "09:00", time: "9:00am" },
            title: "Stick & Puck",
            url: "https://example.com",
            location: RINKS.KCI.name,
            ...(overrides || {}),
        });

        it("renders EventColumn and EventCell when events present", () => {
            render(
                <EventGrid kciEvents={[sampleEvent()]} licEvents={[]} ovaEvents={[]} />,
            );

            expect(screen.getByText("Monday")).toBeInTheDocument();
            expect(screen.getByText("Stick & Puck")).toBeInTheDocument();
            expect(
                screen.queryByText(/No events are scheduled for this week/i),
            ).not.toBeInTheDocument();
        });
    });
});
