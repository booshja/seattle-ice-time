import { LIC_OVA_EVENTS_URL, LIC_RINK_ID } from "@/utils/constants/lynnwoodOva";
import { RINKS } from "@/utils/constants/rinks";
import axios from "axios";

import { fetchLicOvaEvents } from "../fetchLicOvaEvents";

jest.mock("axios");

type AxiosGetCall = [
    string,
    {
        params: {
            end: string;
            multiview: number;
            rink: string;
            start: string;
        };
    },
];

describe("fetchLicOvaEvents", () => {
    it("calls axios with correct params for Lynnwood", async function (this: void) {
        (axios.get as jest.Mock).mockResolvedValue({ data: [] });
        const start = "2025-09-08T00:00:00.000Z";
        const end = "2025-09-15T00:00:00.000Z";
        await fetchLicOvaEvents({ start, end, rink: RINKS.LYNNWOOD.key });
        const calls: Array<
            [
                string,
                {
                    params: {
                        end: string;
                        multiview: number;
                        rink: string;
                        start: string;
                    };
                },
            ]
        > = (axios.get as jest.Mock).mock.calls as Array<
            [
                string,
                {
                    params: {
                        end: string;
                        multiview: number;
                        rink: string;
                        start: string;
                    };
                },
            ]
        >;
        const [firstCall] = calls;
        const [urlArg, optionsArg] = firstCall;
        expect(urlArg).toBe(LIC_OVA_EVENTS_URL);
        expect(optionsArg).toEqual({
            params: { rink: LIC_RINK_ID, multiview: 0, start, end },
        });
    });

    it("uses OVA rink id when rink=OVA", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: [] });
        const start = "2025-09-08T00:00:00.000Z";
        const end = "2025-09-15T00:00:00.000Z";
        await fetchLicOvaEvents({ start, end, rink: RINKS.OVA.key });

        const calls = (axios.get as jest.Mock).mock.calls as AxiosGetCall[];
        const [, optionsArg] = calls[calls.length - 1];
        expect(optionsArg.params.rink).not.toBe(LIC_RINK_ID);
    });
});
