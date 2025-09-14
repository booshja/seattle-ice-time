import { KCI_EVENTS_URL } from "@/utils/constants/krakenCommunityIceplex";
import axios from "axios";

import { fetchKciEvents } from "../fetchKciEvents";

jest.mock("axios");

describe("fetchKciEvents", () => {
    test("calls axios with correct params", async function (this: void) {
        (axios.get as jest.Mock).mockResolvedValue({ data: [] });
        const start = "2025-09-08T00:00:00.000Z";
        const end = "2025-09-15T00:00:00.000Z";
        await fetchKciEvents({ start, end });
        const calls: Array<
            [string, { params: { end: string; start: string; variant: number } }]
        > = (axios.get as jest.Mock).mock.calls as Array<
            [string, { params: { end: string; start: string; variant: number } }]
        >;
        const [firstCall] = calls;
        const [urlArg, optionsArg] = firstCall;
        expect(urlArg).toBe(KCI_EVENTS_URL);
        expect(optionsArg).toEqual({ params: { start, end, variant: 2 } });
    });
});
