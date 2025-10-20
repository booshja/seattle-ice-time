import {
    getCurrentWeekMonday,
    getDisplayDatesFromBaseDate,
    getStartEndDatesFromBaseDate,
    getWeekDates,
    getDailyDates,
    parseLocalDateFromYmd,
    getLocalIsoDate,
    getMondayIsoFromBaseDate,
    getMondayDateFromBaseDate,
} from "../dates";

describe("dates helpers", () => {
    describe("week calc", () => {
        it("getCurrentWeekMonday returns a Monday", () => {
            const monday = getCurrentWeekMonday();
            const day = monday.getDay() || 7;
            expect(day).toBe(1);
        });

        it("getStartEndDatesFromBaseDate normalizes base to Monday and spans 7 days", () => {
            const base = new Date("2025-01-08T12:00:00.000Z"); // Wednesday
            const [start, end] = getStartEndDatesFromBaseDate(base);
            const startDate = new Date(start);
            const endDate = new Date(end);
            expect(startDate.getDay() || 7).toBe(1);
            const diffMs = endDate.getTime() - startDate.getTime();
            const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
            expect(diffDays).toBe(7);
        });

        it("getWeekDates returns Monday..Sunday day numbers from arbitrary base", () => {
            const base = parseLocalDateFromYmd("2025-09-10"); // Wednesday
            const days = getWeekDates(base);
            expect(days).toEqual([8, 9, 10, 11, 12, 13, 14]);
        });

        it("getDailyDates returns ISO dates Monday..Sunday", () => {
            const base = parseLocalDateFromYmd("2025-09-10");
            const dates = getDailyDates(base);
            expect(dates[0]).toBe("2025-09-08");
            expect(dates[6]).toBe("2025-09-14");
        });

        it("getStartEndDatesFromBaseDate yields exclusive end (start+7d)", () => {
            const base = parseLocalDateFromYmd("2025-09-10");
            const [startIso, endIso] = getStartEndDatesFromBaseDate(base);
            expect(startIso.startsWith("2025-09-08")).toBe(true);
            expect(endIso.startsWith("2025-09-15")).toBe(true);
        });

        it("getCurrentWeekMonday returns local Monday iso shape", () => {
            const monday = getCurrentWeekMonday();
            const iso = getLocalIsoDate(monday);
            expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(monday.getDay() || 7).toBe(1);
        });
    });

    describe("display", () => {
        it("same-month shows Month d1-d2 YYYY", () => {
            const base = parseLocalDateFromYmd("2025-09-10");
            const s = getDisplayDatesFromBaseDate(base);
            expect(s).toMatch(/September\s+8-14\s+2025/);
        });

        it("cross-month, same-year shows M d - M d YYYY", () => {
            const base = parseLocalDateFromYmd("2025-03-31");
            const s = getDisplayDatesFromBaseDate(base);
            expect(s).toMatch(/March\s+31\s+-\s+April\s+6\s+2025/);
        });

        it("cross-year shows M d, YYYY - M d, YYYY", () => {
            const base = parseLocalDateFromYmd("2025-12-31");
            const s = getDisplayDatesFromBaseDate(base);
            expect(s).toMatch(/December\s+29,\s+2025\s+-\s+January\s+4,\s+2026/);
        });
    });

    describe("edge cases", () => {
        it("cross-month range displays correctly", () => {
            const base = parseLocalDateFromYmd("2025-08-31");
            const display = getDisplayDatesFromBaseDate(base);
            expect(display).toMatch(/August|September/);
        });

        it("monday normalization on Sunday goes to prior Monday", () => {
            const mondayIso = getMondayIsoFromBaseDate(
                parseLocalDateFromYmd("2025-09-14"),
            );
            expect(mondayIso).toBe("2025-09-08");
        });

        describe("DST behaviors", () => {
            beforeAll(() => {
                jest.useFakeTimers();
                jest.setSystemTime(new Date("2024-03-10T10:00:00.000Z")); // DST change period US
            });
            afterAll(() => {
                jest.useRealTimers();
            });

            it("DST week still displays Monday-Sunday correctly", () => {
                const base = parseLocalDateFromYmd("2024-03-13");
                const s = getDisplayDatesFromBaseDate(base);
                expect(s).toMatch(/March\s+11-17\s+2024/);
            });

            it("getDailyDates returns 7 ISO Y-M-D strings starting from Monday", () => {
                const monday = getMondayDateFromBaseDate(
                    parseLocalDateFromYmd("2025-12-31"),
                );
                const daily = getDailyDates(monday);
                expect(daily).toHaveLength(7);
                expect(daily[0]).toMatch(/\d{4}-\d{2}-\d{2}/);
                expect(daily[6]).toBe("2026-01-04");
            });

            it("getWeekDates returns 7 day numbers starting at Monday", () => {
                const monday = getMondayDateFromBaseDate(
                    parseLocalDateFromYmd("2025-09-10"),
                );
                const arr = getWeekDates(monday);
                expect(arr).toHaveLength(7);
                expect(arr[0]).toBe(8);
                expect(arr[6]).toBe(14);
            });
        });
    });
});
