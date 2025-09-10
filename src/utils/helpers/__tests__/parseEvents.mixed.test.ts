import { parseEvents } from "../parseEvents";

describe("parseEvents with mixed sources", () => {
    test("merges KCI and LIC events by day", () => {
        const events = parseEvents({
            kciEvents: [
                {
                    color: "#111",
                    day: "Tuesday",
                    end: { date: "2025-09-09", military: "1100", time: "11:00am" },
                    start: { date: "2025-09-09", military: "1000", time: "10:00am" },
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
                    start: { date: "2025-09-09", military: "1130", time: "11:30am" },
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
