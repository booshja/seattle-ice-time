import axios from "axios";
import { fetchKciEvents } from "../fetchKciEvents";
import { KCI_EVENTS_URL } from "@/utils/constants/krakenCommunityIceplex";

jest.mock("axios");

describe("fetchKciEvents", () => {
    test("calls axios with correct params", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: [] });
        const start = "2025-09-08T00:00:00.000Z";
        const end = "2025-09-15T00:00:00.000Z";
        await fetchKciEvents({ start, end });
        expect(axios.get).toHaveBeenCalledWith(KCI_EVENTS_URL, {
            params: { start, end, variant: 2 },
        });
    });
});
