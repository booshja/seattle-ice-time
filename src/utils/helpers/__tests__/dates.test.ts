import {
    getCurrentWeekMonday,
    getDisplayDatesFromBaseDate,
    getStartEndDatesFromBaseDate,
} from "../dates";

describe("dates helpers", () => {
    test("getCurrentWeekMonday returns a Monday", () => {
        const monday = getCurrentWeekMonday();
        const day = monday.getDay() || 7;
        expect(day).toBe(1);
    });

    test("getStartEndDatesFromBaseDate normalizes base to Monday and spans 7 days", () => {
        const base = new Date("2025-01-08T12:00:00.000Z"); // Wednesday
        const [start, end] = getStartEndDatesFromBaseDate(base);
        const startDate = new Date(start);
        const endDate = new Date(end);
        expect(
            startDate.getDay() === 1 ||
                (startDate.getDay() === 0 && (startDate.getDay() || 7) === 1),
        ).toBeTruthy();
        const diffMs = endDate.getTime() - startDate.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        expect(diffDays).toBe(7);
    });

    test("getDisplayDatesFromBaseDate returns human-readable range", () => {
        const base = new Date("2025-03-05T00:00:00.000Z");
        const display = getDisplayDatesFromBaseDate(base);
        expect(typeof display).toBe("string");
        expect(display.length).toBeGreaterThan(0);
    });
});
