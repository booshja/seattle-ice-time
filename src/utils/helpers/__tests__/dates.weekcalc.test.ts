import {
    getWeekDates,
    getDailyDates,
    getStartEndDatesFromBaseDate,
    parseLocalDateFromYmd,
    getLocalIsoDate,
    getCurrentWeekMonday,
} from "../dates";

describe("dates week calculations", () => {
    test("getWeekDates returns Monday..Sunday day numbers from arbitrary base", () => {
        const base = parseLocalDateFromYmd("2025-09-10"); // Wednesday
        const days = getWeekDates(base);
        expect(days).toEqual([8, 9, 10, 11, 12, 13, 14]);
    });

    test("getDailyDates returns ISO dates Monday..Sunday", () => {
        const base = parseLocalDateFromYmd("2025-09-10");
        const dates = getDailyDates(base);
        expect(dates[0]).toBe("2025-09-08");
        expect(dates[6]).toBe("2025-09-14");
    });

    test("getStartEndDatesFromBaseDate yields exclusive end (start+7d)", () => {
        const base = parseLocalDateFromYmd("2025-09-10");
        const [startIso, endIso] = getStartEndDatesFromBaseDate(base);
        expect(startIso.startsWith("2025-09-08")).toBe(true);
        expect(endIso.startsWith("2025-09-15")).toBe(true);
    });

    test("getCurrentWeekMonday returns local Monday", () => {
        const monday = getCurrentWeekMonday();
        const iso = getLocalIsoDate(monday);
        // Just assert it returns a YYYY-MM-DD string and is a Monday
        expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(monday.getDay() || 7).toBe(1);
    });
});
