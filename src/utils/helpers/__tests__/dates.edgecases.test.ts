import {
    getDisplayDatesFromBaseDate,
    parseLocalDateFromYmd,
    getMondayIsoFromBaseDate,
} from "../dates";

describe("dates helpers edge cases", () => {
    test("cross-month range displays correctly", () => {
        const base = parseLocalDateFromYmd("2025-08-31");
        const display = getDisplayDatesFromBaseDate(base);
        expect(display).toMatch(/August|September/);
    });

    test("monday normalization on Sunday goes to prior Monday", () => {
        const mondayIso = getMondayIsoFromBaseDate(parseLocalDateFromYmd("2025-09-14"));
        expect(mondayIso).toBe("2025-09-08");
    });
});
