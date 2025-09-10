import { getDisplayDatesFromBaseDate, parseLocalDateFromYmd } from "../dates";

describe("dates display formatting", () => {
    test("same-month shows Month d1-d2 YYYY", () => {
        const base = parseLocalDateFromYmd("2025-09-10");
        const s = getDisplayDatesFromBaseDate(base);
        expect(s).toMatch(/September\s+8-14\s+2025/);
    });

    test("cross-month, same-year shows M d - M d YYYY", () => {
        const base = parseLocalDateFromYmd("2025-03-31");
        const s = getDisplayDatesFromBaseDate(base);
        expect(s).toMatch(/March\s+31\s+-\s+April\s+6\s+2025/);
    });

    test("cross-year shows M d, YYYY - M d, YYYY", () => {
        const base = parseLocalDateFromYmd("2025-12-31");
        const s = getDisplayDatesFromBaseDate(base);
        expect(s).toMatch(/December\s+29,\s+2025\s+-\s+January\s+4,\s+2026/);
    });
});
