import {
    LIC_OVA_API_STICK_AND_PUCK_IN_WINDOW,
    OVA_API_ADULT_DROP_IN_IN_WINDOW,
} from "@/testing/__mocks__/fixtures";
import { RINKS } from "@/utils/constants/rinks";

import * as fetchMod from "../../../actions/fetchLicOvaEvents";
import { getLicEvents, getOvaEvents } from "../lynnwoodOva";

jest.mock("../../../actions/fetchLicOvaEvents");

describe("lynnwood/ova helpers", () => {
    it("getLicEvents filters titles within window and transforms", async () => {
        const start = "2025-09-08T00:00:00.000Z";
        const end = "2025-09-15T00:00:00.000Z";
        const mocked = fetchMod as jest.Mocked<typeof fetchMod>;
        mocked.fetchLicOvaEvents.mockResolvedValueOnce([
            LIC_OVA_API_STICK_AND_PUCK_IN_WINDOW,
        ]);

        const result = await getLicEvents({ start, end });
        expect(result).toHaveLength(1);
        expect(result[0].location).toBe(RINKS.LYNNWOOD.name);
        expect(typeof result[0].startKey).toBe("number");
    });

    it("getOvaEvents transforms OVA events", async () => {
        const start = "2025-09-08T00:00:00.000Z";
        const end = "2025-09-15T00:00:00.000Z";
        const mocked = fetchMod as jest.Mocked<typeof fetchMod>;
        mocked.fetchLicOvaEvents.mockResolvedValueOnce([
            OVA_API_ADULT_DROP_IN_IN_WINDOW,
        ]);

        const result = await getOvaEvents({ start, end });
        expect(result).toHaveLength(1);
        expect(result[0].location).toBe(RINKS.OVA.name);
        expect(typeof result[0].startKey).toBe("number");
    });
});
