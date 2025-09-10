import { getKciEvents } from "../krakenCommunityIceplex";
import * as fetchMod from "../../../actions/fetchKciEvents";
import {
    KCI_API_EVENT_IN_WINDOW,
    KCI_API_EVENT_OUTSIDE_WINDOW,
    KCI_API_EVENT_WRONG_SPORT,
} from "@/testing/__mocks__/fixtures";

jest.mock("../../../actions/fetchKciEvents");

describe("getKciEvents (helper)", () => {
    test("filters by sport, title, and date window then transforms", async () => {
        const start = "2025-09-08T00:00:00.000Z";
        const end = "2025-09-15T00:00:00.000Z";
        const mocked = fetchMod as jest.Mocked<typeof fetchMod>;
        mocked.fetchKciEvents.mockResolvedValueOnce([
            KCI_API_EVENT_IN_WINDOW,
            KCI_API_EVENT_OUTSIDE_WINDOW,
            KCI_API_EVENT_WRONG_SPORT,
        ] as any);

        const result = await getKciEvents({ start, end });
        expect(result).toHaveLength(1);
        expect(result[0].day).toBe("Monday");
        expect(result[0].title).toBe("Stick & Puck");
        expect(result[0].location).toBe("Kraken Community Iceplex");
    });
});
