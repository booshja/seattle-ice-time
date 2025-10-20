import {
    KCI_API_EVENT_IN_WINDOW,
    KCI_API_EVENT_OUTSIDE_WINDOW,
    KCI_API_EVENT_WRONG_SPORT,
} from "@/testing/__mocks__/fixtures";

import * as fetchMod from "../../../actions/fetchKciEvents";
import { getKciEvents } from "../krakenCommunityIceplex";

jest.mock("../../../actions/fetchKciEvents");

describe("getKciEvents (helper)", () => {
    it("filters by sport, title, and date window then transforms", async () => {
        const start = "2025-09-08T00:00:00.000Z";
        const end = "2025-09-15T00:00:00.000Z";
        const mocked = fetchMod as jest.Mocked<typeof fetchMod>;
        mocked.fetchKciEvents.mockResolvedValueOnce([
            KCI_API_EVENT_IN_WINDOW,
            KCI_API_EVENT_OUTSIDE_WINDOW,
            KCI_API_EVENT_WRONG_SPORT,
        ]);

        const result = await getKciEvents({ start, end });
        expect(result).toHaveLength(1);
        expect(result[0].day).toBe("Monday");
        expect(result[0].title).toBe("Stick & Puck");
        expect(result[0].location).toBe("Kraken Community Iceplex");
        // startKey should be numeric minutes since midnight matching start.military
        const military = result[0].start.military.replace(":", "");
        const hours = Number(military.slice(0, 2));
        const minutes = Number(military.slice(2));
        const expectedStartKey = hours * 60 + minutes;
        expect(typeof result[0].startKey).toBe("number");
        expect(result[0].startKey).toBe(expectedStartKey);
    });
});
