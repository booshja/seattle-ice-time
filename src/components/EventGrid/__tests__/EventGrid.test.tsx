import { render, screen } from "@/testing/utils";
import { COLORS } from "@/utils/constants/colors";
import { RINKS } from "@/utils/constants/rinks";

import { EventGrid } from "../EventGrid";

import type { KciEventObject as KciEventObjectType } from "@/types/krakenCommunityIceplex";
import type { SnoKingEventObject } from "@/types/snoKing";

describe("EventGrid", () => {
    describe("empty state", () => {
        it("renders message when no events", () => {
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );
            expect(
                screen.getByText(/No events are scheduled for this week/i),
            ).toBeInTheDocument();
        });
    });

    describe("loading", () => {
        it("does not show loading skeleton once empty state is shown", async () => {
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );
            expect(
                await screen.findByText(/No events are scheduled for this week/i),
            ).toBeInTheDocument();
        });
    });

    describe("with events", () => {
        const sampleKciEvent = (
            overrides?: Partial<Omit<KciEventObjectType, "location">>,
        ): KciEventObjectType => ({
            color: "#123",
            day: "Monday",
            end: { date: "2025-09-08", military: "10:00", time: "10:00am" },
            id: "test-event-1",
            start: { date: "2025-09-08", military: "09:00", time: "9:00am" },
            title: "Stick & Puck",
            url: "https://example.com",
            location: RINKS.KCI.name,
            ...(overrides || {}),
        });

        it("renders EventColumn and EventCell when events present", () => {
            render(
                <EventGrid
                    kciEvents={[sampleKciEvent()]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );

            expect(screen.getByText("Monday")).toBeInTheDocument();
            expect(screen.getByText("Stick & Puck")).toBeInTheDocument();
            expect(
                screen.queryByText(/No events are scheduled for this week/i),
            ).not.toBeInTheDocument();
        });
    });

    describe("with SnoKing events", () => {
        const sampleSnoKingEvent = (
            overrides?: Partial<SnoKingEventObject>,
        ): SnoKingEventObject => ({
            color: COLORS.rinks.KIRKLAND,
            day: "Tuesday",
            end: { date: "2025-09-09", military: "14:00", time: "2:00pm" },
            id: "sk-kirkland-1",
            start: { date: "2025-09-09", military: "12:45", time: "12:45pm" },
            title: "Stick N Puck",
            url: "https://example.com/snoking",
            location: RINKS.KIRKLAND.name,
            sheet: undefined,
            ...overrides,
        });

        it("renders SnoKing events on the grid", () => {
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[sampleSnoKingEvent()]}
                />,
            );

            expect(screen.getByText("Stick N Puck")).toBeInTheDocument();
            expect(screen.getByText("Sno-King Kirkland")).toBeInTheDocument();
        });

        it("renders Renton events with sheet name in location", () => {
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[
                        sampleSnoKingEvent({
                            id: "sk-renton-1",
                            color: COLORS.rinks.RENTON,
                            location: RINKS.RENTON.name,
                            sheet: "Small Ice",
                        }),
                    ]}
                />,
            );

            expect(screen.getByText("Sno-King Renton (Small Ice)")).toBeInTheDocument();
        });

        it("renders events from multiple SnoKing rinks", () => {
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[
                        sampleSnoKingEvent(),
                        sampleSnoKingEvent({
                            id: "sk-snoqualmie-1",
                            color: COLORS.rinks.SNOQUALMIE,
                            location: RINKS.SNOQUALMIE.name,
                            day: "Tuesday",
                            start: {
                                date: "2025-09-09",
                                military: "06:00",
                                time: "6:00am",
                            },
                            end: {
                                date: "2025-09-09",
                                military: "07:45",
                                time: "7:45am",
                            },
                        }),
                    ]}
                />,
            );

            expect(screen.getByText("Sno-King Kirkland")).toBeInTheDocument();
            expect(screen.getByText("Sno-King Snoqualmie")).toBeInTheDocument();
        });
    });
});
