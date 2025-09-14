import { parseEvents } from "../parseEvents";

describe("parseEvents", () => {
    test("empty inputs produce empty days", () => {
        const result = parseEvents({
            kciEvents: undefined,
            licEvents: undefined,
            ovaEvents: undefined,
        });
        const allEmpty = Object.values(result).every((arr: unknown) =>
            Array.isArray(arr) ? arr.length === 0 : false,
        );
        expect(allEmpty).toBe(true);
    });
});
