import {
    getDisplayDatesFromBaseDate,
    parseLocalDateFromYmd,
    getDailyDates,
    getWeekDates,
    getMondayDateFromBaseDate,
} from "../dates";

describe("dates edgecases 2", () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2024-03-10T10:00:00.000Z")); // DST change period US
    });
    afterAll(() => {
        jest.useRealTimers();
    });

    test("DST week still displays Monday-Sunday correctly", () => {
        const base = parseLocalDateFromYmd("2024-03-13");
        const s = getDisplayDatesFromBaseDate(base);
        expect(s).toMatch(/March\s+11-17\s+2024/);
    });

    test("getDailyDates returns 7 ISO Y-M-D strings starting from Monday", () => {
        const monday = getMondayDateFromBaseDate(parseLocalDateFromYmd("2025-12-31"));
        const daily = getDailyDates(monday);
        expect(daily).toHaveLength(7);
        expect(daily[0]).toMatch(/\d{4}-\d{2}-\d{2}/);
        // End is exclusive in helpers using start+7, ensure last is Sunday
        expect(daily[6]).toBe("2026-01-04");
    });

    test("getWeekDates returns 7 day numbers starting at Monday", () => {
        const monday = getMondayDateFromBaseDate(parseLocalDateFromYmd("2025-09-10"));
        const arr = getWeekDates(monday);
        expect(arr).toHaveLength(7);
        expect(arr[0]).toBe(8);
        expect(arr[6]).toBe(14);
    });
});
