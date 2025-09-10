import { getSnoKingEvents } from "../snoKing";
import * as fetchMod from "../../../actions/fetchSnoKingEvents";

jest.mock("../../../actions/fetchSnoKingEvents");

describe("snoKing helper error handling", () => {
    const originalError = console.error;
    beforeEach(() => {
        (console.error as any) = jest.fn();
    });
    afterEach(() => {
        console.error = originalError;
    });

    test("continues when a day fetch throws", async () => {
        const mocked = fetchMod as jest.Mocked<typeof fetchMod>;
        mocked.fetchSnoKingEvents
            .mockResolvedValueOnce([] as any)
            .mockRejectedValueOnce(new Error("network"))
            .mockResolvedValue([] as any);

        const res = await getSnoKingEvents();
        expect(Array.isArray(res)).toBe(true);
        // error logged at least once
        expect((console.error as any).mock.calls.length).toBeGreaterThan(0);
    });
});
