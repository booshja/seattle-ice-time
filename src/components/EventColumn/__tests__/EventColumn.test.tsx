import { render, screen } from "@/testing/utils";
import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import { RINKS } from "@/utils/constants/rinks";

import { EventColumn } from "../EventColumn";

describe("EventColumn", () => {
    describe("no events", () => {
        it("renders header day and date", () => {
            render(<EventColumn day="Monday" date={8} events={[]} />);
            expect(screen.getByText("Monday")).toBeInTheDocument();
            expect(screen.getByText("8")).toBeInTheDocument();
        });
    });

    describe("with events", () => {
        const event = (
            overrides?: Partial<Omit<KciEventObject, "location">>,
        ): KciEventObject => ({
            color: "#000",
            day: "Monday",
            end: { date: "2025-09-08", military: "10:00", time: "10:00am" },
            start: { date: "2025-09-08", military: "09:00", time: "9:00am" },
            title: "Open Skate",
            url: "https://example.com",
            location: RINKS.KCI.name,
            ...(overrides || {}),
        });

        it("renders EventCell items", () => {
            render(<EventColumn day="Monday" date={8} events={[event()]} />);
            expect(screen.getByText("Open Skate")).toBeInTheDocument();
            expect(screen.getByText("9:00am - 10:00am")).toBeInTheDocument();
            expect(screen.getByText("Kraken Community Iceplex")).toBeInTheDocument();
        });
    });
});
