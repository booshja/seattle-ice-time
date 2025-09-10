import { parseEvents } from "../parseEvents";

describe("parseEvents empty and mixed inputs", () => {
    test("returns empty buckets when all inputs undefined", () => {
        const res = parseEvents({
            kciEvents: undefined,
            licEvents: undefined,
            ovaEvents: undefined,
        });
        expect(Object.values(res).every((arr) => arr.length === 0)).toBe(true);
    });

    test("merges and sorts across sources", () => {
        const res = parseEvents({
            kciEvents: [
                // 9:00
                {
                    color: "c1",
                    day: "Monday",
                    end: { date: "2025-01-01", military: "10:00", time: "10:00am" },
                    location: "L1",
                    sheet: undefined as any,
                    start: { date: "2025-01-01", military: "09:00", time: "9:00am" },
                    title: "A",
                    url: "",
                } as any,
            ],
            licEvents: [
                // 8:30
                {
                    color: "c2",
                    day: "Monday",
                    end: { date: "2025-01-01", military: "09:00", time: "9:00am" },
                    location: "L2",
                    sheet: undefined as any,
                    start: { date: "2025-01-01", military: "08:30", time: "8:30am" },
                    title: "B",
                    url: "",
                } as any,
            ],
            ovaEvents: [
                // 12:00
                {
                    color: "c3",
                    day: "Monday",
                    end: { date: "2025-01-01", military: "12:30", time: "12:30pm" },
                    location: "L3",
                    sheet: undefined as any,
                    start: { date: "2025-01-01", military: "12:00", time: "12:00pm" },
                    title: "C",
                    url: "",
                } as any,
            ],
        });

        const monday = res.Monday.map((e) => e.start.military);
        expect(monday).toEqual(["08:30", "09:00", "12:00"]);
    });
});
