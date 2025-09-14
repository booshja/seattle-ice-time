import { SNO_KING_URL } from "@/utils/constants/snoKing";
import axios from "axios";

import { fetchSnoKingEvents } from "../fetchSnoKingEvents";

jest.mock("axios");

describe("fetchSnoKingEvents", () => {
    test("calls axios with cookie header", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { data: [] } });
        const date = "2025-09-08";
        await fetchSnoKingEvents(date);
        const calls = (axios.get as jest.Mock).mock.calls;
        expect(calls[0][0]).toBe(SNO_KING_URL);
        expect(calls[0][1].headers.Cookie).toBe("api_company=snoking");
    });
});
