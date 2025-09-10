import { parseEvents } from "../parseEvents";

describe("parseEvents", () => {
    test("empty inputs produce empty days", () => {
        const result = parseEvents({
            kciEvents: undefined,
            licEvents: undefined,
            ovaEvents: undefined,
        });
        expect(Object.values(result).every((arr) => arr.length === 0)).toBe(true);
    });
});
