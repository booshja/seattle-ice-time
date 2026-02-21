import axios from "axios";

import { SNO_KING_URL } from "@/utils/constants/snoKing";

import { fetchSnoKingEvents } from "../fetchSnoKingEvents";

import type { Mock } from "vitest";

vi.mock("axios");

describe("fetchSnoKingEvents", () => {
    it("calls axios with cookie header and date range params", async () => {
        (axios.get as Mock).mockResolvedValue({ data: { data: [] } });
        await fetchSnoKingEvents("2026-02-23", "2026-03-01");

        const call = (axios.get as Mock).mock.calls[0] as [
            string,
            { headers: Record<string, string>; params: Record<string, string> },
        ];
        expect(call[0]).toBe(SNO_KING_URL);
        expect(call[1].headers.Cookie).toBe("api_company=snoking");
        expect(call[1].params["filter[start_date__gte]"]).toBe("2026-02-23");
        expect(call[1].params["filter[start_date__lte]"]).toBe("2026-03-01");
        expect(call[1].params["filter[resource_id__in]"]).toBeDefined();
        expect(call[1].params["filter[event_type_id__in]"]).toBeDefined();
    });

    it("returns the data array from the response", async () => {
        const mockEvents = [{ id: "1", attributes: { desc: "Stick N Puck" } }];
        (axios.get as Mock).mockResolvedValue({ data: { data: mockEvents } });
        const result = await fetchSnoKingEvents("2026-02-23", "2026-03-01");
        expect(result).toEqual(mockEvents);
    });
});
