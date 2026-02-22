import {
    getCurrentWeekMonday,
    getDayString,
    getDisplayDates,
    getDisplayDatesFromBaseDate,
    getStartEndDatesFromBaseDate,
    getStartEndObjects,
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

        it("base date that is already a Monday stays on that Monday", () => {
            const base = parseLocalDateFromYmd("2025-09-08");
            const s = getDisplayDatesFromBaseDate(base);
            expect(s).toMatch(/September\s+8-14\s+2025/);
        });

        it("leap year boundary Feb 24 - Mar 2", () => {
            const base = parseLocalDateFromYmd("2028-02-28");
            const s = getDisplayDatesFromBaseDate(base);
            expect(s).toMatch(/February\s+28\s+-\s+March\s+5\s+2028/);
        });

        it("non-leap year Feb crosses into March", () => {
            const base = parseLocalDateFromYmd("2025-02-27");
            const s = getDisplayDatesFromBaseDate(base);
            expect(s).toMatch(/February\s+24\s+-\s+March\s+2\s+2025/);
        });

        it("week entirely within short month (February same-month)", () => {
            const base = parseLocalDateFromYmd("2025-02-12");
            const s = getDisplayDatesFromBaseDate(base);
            expect(s).toMatch(/February\s+10-16\s+2025/);
        });

        describe("DST behaviors", () => {
            beforeAll(() => {
                vi.useFakeTimers();
                vi.setSystemTime(new Date("2024-03-10T10:00:00.000Z"));
            });
            afterAll(() => {
                vi.useRealTimers();
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

    describe("getDisplayDates (parameterless)", () => {
        afterEach(() => {
            vi.useRealTimers();
        });

        it("same-month week for a mid-month date", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2025-09-10T12:00:00.000Z"));
            const s = getDisplayDates();
            expect(s).toMatch(/September\s+8-14\s+2025/);
        });

        it("cross-month week", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2025-03-31T12:00:00.000Z"));
            const s = getDisplayDates();
            expect(s).toMatch(/March\s+31\s+-\s+April\s+6\s+2025/);
        });

        it("cross-year week", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2025-12-31T12:00:00.000Z"));
            const s = getDisplayDates();
            expect(s).toMatch(/December\s+29,\s+2025\s+-\s+January\s+4,\s+2026/);
        });
    });

    describe("getStartEndObjects", () => {
        it("displays midnight as 12:00am instead of 0:00am", () => {
            const start = new Date("2025-09-08T07:00:00.000Z"); // midnight PT
            const end = new Date("2025-09-08T08:00:00.000Z"); // 1:00am PT
            const [startObj, endObj] = getStartEndObjects(start, end);
            expect(startObj.time).toBe("12:00am");
            expect(endObj.time).toBe("1:00am");
        });

        it("displays noon as 12:00pm", () => {
            const start = new Date("2025-09-08T19:00:00.000Z"); // noon PT
            const end = new Date("2025-09-08T20:00:00.000Z"); // 1:00pm PT
            const [startObj, endObj] = getStartEndObjects(start, end);
            expect(startObj.time).toBe("12:00pm");
            expect(endObj.time).toBe("1:00pm");
        });
    });

    describe("getDayString", () => {
        it("returns Sunday for 0 (default case)", () => {
            expect(getDayString(0)).toBe("Sunday");
        });

        it("returns Monday through Saturday for 1-6", () => {
            expect(getDayString(1)).toBe("Monday");
            expect(getDayString(2)).toBe("Tuesday");
            expect(getDayString(3)).toBe("Wednesday");
            expect(getDayString(4)).toBe("Thursday");
            expect(getDayString(5)).toBe("Friday");
            expect(getDayString(6)).toBe("Saturday");
        });
    });
});
