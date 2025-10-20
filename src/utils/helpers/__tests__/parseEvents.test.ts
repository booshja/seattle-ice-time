import { parseEvents } from "../parseEvents";

describe("parseEvents", () => {
    it("empty inputs produce empty days", () => {
        const result = parseEvents({
            kciEvents: undefined,
            licEvents: undefined,
            ovaEvents: undefined,
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
                    } as never,
                    {
                        color: "#111",
                        day: "Monday",
                        end: { date: "2025-09-08", military: "0930", time: "9:30am" },
                        start: { date: "2025-09-08", military: "0900", time: "9:00am" },
                        title: "A",
                        url: "#",
                        location: "Kraken Community Iceplex",
                    } as never,
                ],
                licEvents: undefined,
                ovaEvents: undefined,
            });

            expect(events.Monday.map((e) => e.title)).toEqual(["A", "B"]);
        });

        it("sorting prefers startKey when present", () => {
            const events = parseEvents({
                kciEvents: [
                    {
                        color: "#111",
                        day: "Monday",
                        end: { date: "2025-09-08", military: "0930", time: "9:30am" },
                        start: { date: "2025-09-08", military: "1500", time: "3:00pm" },
                        startKey: 9 * 60, // 09:00
                        title: "A",
                        url: "#",
                        location: "Kraken Community Iceplex",
                    } as never,
                    {
                        color: "#111",
                        day: "Monday",
                        end: { date: "2025-09-08", military: "1000", time: "10:00am" },
                        start: { date: "2025-09-08", military: "0930", time: "9:30am" },
                        startKey: 9 * 60 + 30,
                        title: "B",
                        url: "#",
                        location: "Kraken Community Iceplex",
                    } as never,
                ],
                licEvents: undefined,
                ovaEvents: undefined,
            });

            expect(events.Monday.map((e) => e.title)).toEqual(["A", "B"]);
        });
    });

    describe("mixed sources", () => {
        it("merges KCI and LIC events by day", () => {
            const events = parseEvents({
                kciEvents: [
                    {
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
                    },
                ],
                licEvents: [
                    {
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
                    },
                ],
                ovaEvents: undefined,
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
            });
            const allEmpty = Object.values(res).every((arr: unknown) =>
                Array.isArray(arr) ? arr.length === 0 : false,
            );
            expect(allEmpty).toBe(true);
        });

        it("merges and sorts across sources", () => {
            const res = parseEvents({
                kciEvents: [
                    // 9:00
                    {
                        color: "c1",
                        day: "Monday",
                        end: { date: "2025-01-01", military: "10:00", time: "10:00am" },
                        location: "L1",
                        sheet: undefined,
                        start: {
                            date: "2025-01-01",
                            military: "09:00",
                            time: "9:00am",
                        },
                        title: "A",
                        url: "",
                    } as never,
                ],
                licEvents: [
                    // 8:30
                    {
                        color: "c2",
                        day: "Monday",
                        end: { date: "2025-01-01", military: "09:00", time: "9:00am" },
                        location: "L2",
                        sheet: undefined,
                        start: {
                            date: "2025-01-01",
                            military: "08:30",
                            time: "8:30am",
                        },
                        title: "B",
                        url: "",
                    } as never,
                ],
                ovaEvents: [
                    // 12:00
                    {
                        color: "c3",
                        day: "Monday",
                        end: { date: "2025-01-01", military: "12:30", time: "12:30pm" },
                        location: "L3",
                        sheet: undefined,
                        start: {
                            date: "2025-01-01",
                            military: "12:00",
                            time: "12:00pm",
                        },
                        title: "C",
                        url: "",
                    } as never,
                ],
            });

            const monday = res.Monday.map((e) => e.start.military);
            expect(monday).toEqual(["08:30", "09:00", "12:00"]);
        });
    });
});
