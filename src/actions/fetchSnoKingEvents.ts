"use server";

import type { SnoKingResponse } from "@/types/snoKing";
import { SNO_KING_PARAMS, SNO_KING_URL } from "@/utils/constants/snoKing";
import axios from "axios";

export async function fetchSnoKingEvents(date: string) {
    SNO_KING_PARAMS["filter[start_date__gte]"] = date;
    SNO_KING_PARAMS["filter[start_date__lte]"] = date;

    const { data } = await axios.get<SnoKingResponse>(SNO_KING_URL, {
        params: SNO_KING_PARAMS,
        headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            Cookie: "api_company=snoking",
        },
    });

    return data.data;
}
