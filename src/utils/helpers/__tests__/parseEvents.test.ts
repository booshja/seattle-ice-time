import { parseEvents } from "../parseEvents";

import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";

describe("parseEvents", () => {
    it("empty inputs produce empty days", () => {
        const result = parseEvents({
            kciEvents: undefined,
            licEvents: undefined,
            ovaEvents: undefined,
            snoKingEvents: undefined,
        });
        const allEmpty = Object.values(result).every((arr: unknown) =>
            Array.isArray(arr) ? arr.length === 0 : false,
        );
        expect(allEmpty).toBe(true);
    });

    describe("ordering", () => {
        it("events are sorted by start.military ascending", () => {
            const events = parseEvents({
                kciEvents: [
                    {
                        id: "kci-1",
                        color: "#111",
                        day: "Monday",
                        end: { date: "2025-09-08", military: "1000", time: "10:00am" },
                        start: {
                            date: "2025-09-08",
                            military: "1005",
                            time: "10:05am",
                        },
                        title: "B",
                        url: "#",
                        location: "Kraken Community Iceplex",
                    } satisfies KciEventObject,
                    {
                        id: "kci-2",
                        color: "#111",
                        day: "Monday",
                        end: { date: "2025-09-08", military: "0930", time: "9:30am" },
                        start: { date: "2025-09-08", military: "0900", time: "9:00am" },
                        title: "A",
                        url: "#",
                        location: "Kraken Community Iceplex",
                    } satisfies KciEventObject,
                ],
                licEvents: undefined,
                ovaEvents: undefined,
                snoKingEvents: undefined,
            });

            expect(events.Monday.map((e) => e.title)).toEqual(["A", "B"]);
        });

        it("sorting prefers startKey when present", () => {
            const events = parseEvents({
                kciEvents: [
                    {
                        id: "kci-3",
                        color: "#111",
                        day: "Monday",
                        end: { date: "2025-09-08", military: "0930", time: "9:30am" },
                        start: { date: "2025-09-08", military: "1500", time: "3:00pm" },
                        startKey: 9 * 60,
                        title: "A",
                        url: "#",
                        location: "Kraken Community Iceplex",
                    } satisfies KciEventObject,
                    {
                        id: "kci-4",
                        color: "#111",
                        day: "Monday",
                        end: { date: "2025-09-08", military: "1000", time: "10:00am" },
                        start: { date: "2025-09-08", military: "0930", time: "9:30am" },
                        startKey: 9 * 60 + 30,
                        title: "B",
                        url: "#",
                        location: "Kraken Community Iceplex",
                    } satisfies KciEventObject,
                ],
                licEvents: undefined,
                ovaEvents: undefined,
                snoKingEvents: undefined,
            });

            expect(events.Monday.map((e) => e.title)).toEqual(["A", "B"]);
        });
    });

    describe("mixed sources", () => {
        it("merges KCI and LIC events by day", () => {
            const events = parseEvents({
                kciEvents: [
                    {
                        id: "kci-5",
                        color: "#111",
                        day: "Tuesday",
                        end: { date: "2025-09-09", military: "1100", time: "11:00am" },
                        start: {
                            date: "2025-09-09",
                            military: "1000",
                            time: "10:00am",
                        },
                        startKey: 10 * 60,
                        title: "KCI A",
                        url: "#",
                        location: "Kraken Community Iceplex",
                    } satisfies KciEventObject,
                ],
                licEvents: [
                    {
                        id: "lic-1",
                        color: "#222",
                        day: "Tuesday",
                        end: { date: "2025-09-09", military: "1200", time: "12:00pm" },
                        start: {
                            date: "2025-09-09",
                            military: "1130",
                            time: "11:30am",
                        },
                        startKey: 11 * 60 + 30,
                        title: "LIC B",
                        url: "#",
                        location: "Lynnwood Ice Center",
                    } satisfies LicOvaEventObject,
                ],
                ovaEvents: undefined,
                snoKingEvents: undefined,
            });

            expect(events.Tuesday.map((e) => e.title)).toEqual(["KCI A", "LIC B"]);
        });
    });

    describe("empty and mixed inputs", () => {
        it("returns empty buckets when all inputs undefined", () => {
            const res = parseEvents({
                kciEvents: undefined,
                licEvents: undefined,
                ovaEvents: undefined,
                snoKingEvents: undefined,
            });
            const allEmpty = Object.values(res).every((arr: unknown) =>
                Array.isArray(arr) ? arr.length === 0 : false,
            );
            expect(allEmpty).toBe(true);
        });

        it("merges and sorts across sources", () => {
            const res = parseEvents({
                kciEvents: [
                    {
                        id: "kci-6",
                        color: "c1",
                        day: "Monday",
                        end: { date: "2025-01-01", military: "10:00", time: "10:00am" },
                        location: "Kraken Community Iceplex",
                        start: {
                            date: "2025-01-01",
                            military: "09:00",
                            time: "9:00am",
                        },
                        title: "A",
                        url: "",
                    } satisfies KciEventObject,
                ],
                licEvents: [
                    {
                        id: "lic-2",
                        color: "c2",
                        day: "Monday",
                        end: { date: "2025-01-01", military: "09:00", time: "9:00am" },
                        location: "Lynnwood Ice Center",
                        start: {
                            date: "2025-01-01",
                            military: "08:30",
                            time: "8:30am",
                        },
                        title: "B",
                        url: "",
                    } satisfies LicOvaEventObject,
                ],
                ovaEvents: [
                    {
                        id: "ova-1",
                        color: "c3",
                        day: "Monday",
                        end: { date: "2025-01-01", military: "12:30", time: "12:30pm" },
                        location: "Olympicview Arena",
                        start: {
                            date: "2025-01-01",
                            military: "12:00",
                            time: "12:00pm",
                        },
                        title: "C",
                        url: "",
                    } satisfies LicOvaEventObject,
                ],
                snoKingEvents: undefined,
            });

            const monday = res.Monday.map((e) => e.start.military);
            expect(monday).toEqual(["08:30", "09:00", "12:00"]);
        });
    });
});
