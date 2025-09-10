import axios from "axios";
import { fetchLicOvaEvents } from "../fetchLicOvaEvents";
import { LIC_OVA_EVENTS_URL, LIC_RINK_ID } from "@/utils/constants/lynnwoodOva";
import { RINKS } from "@/utils/constants/rinks";

jest.mock("axios");

describe("fetchLicOvaEvents", () => {
    test("calls axios with correct params for Lynnwood", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: [] });
        const start = "2025-09-08T00:00:00.000Z";
        const end = "2025-09-15T00:00:00.000Z";
        await fetchLicOvaEvents({ start, end, rink: RINKS.LYNNWOOD.key });
        expect(axios.get).toHaveBeenCalledWith(LIC_OVA_EVENTS_URL, {
            params: { rink: LIC_RINK_ID, multiview: 0, start, end },
        });
    });
});
