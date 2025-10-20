import { buildEventTimes, filterWithinWindow, resolveWeekWindow } from "../common";

describe("common helpers", () => {
    it("buildEventTimes returns start, end, startKey", () => {
        const start = new Date("2025-09-08T09:00:00.000Z");
        const end = new Date("2025-09-08T09:30:00.000Z");
        const result = buildEventTimes(start, end);
        expect(result.start).toBeTruthy();
        expect(result.end).toBeTruthy();
        expect(result.startKey).toBeGreaterThanOrEqual(0);
    });

    it("filterWithinWindow filters by bounds and predicate", () => {
        const events = [
            {
                id: 1,
                start: "2025-09-08T09:00:00.000Z",
                end: "2025-09-08T10:00:00.000Z",
            },
            {
                id: 2,
                start: "2025-09-16T09:00:00.000Z",
                end: "2025-09-16T10:00:00.000Z",
            },
        ];
        const filtered = filterWithinWindow(
            events,
            "2025-09-08T00:00:00.000Z",
            "2025-09-15T00:00:00.000Z",
            (e) => e.start,
            (e) => e.end,
            (e) => e.id === 1,
        );
        expect(filtered.map((e) => e.id)).toEqual([1]);
    });

    it("resolveWeekWindow returns provided or computes defaults", () => {
        const provided = resolveWeekWindow(
            "2025-09-08T00:00:00.000Z",
            "2025-09-15T00:00:00.000Z",
        );
        expect(provided).toEqual({
            start: "2025-09-08T00:00:00.000Z",
            end: "2025-09-15T00:00:00.000Z",
        });

        const computed = resolveWeekWindow();
        expect(computed.start).toBeTruthy();
        expect(computed.end).toBeTruthy();
    });
});
