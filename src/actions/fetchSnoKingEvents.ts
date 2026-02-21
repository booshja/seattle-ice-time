"use server";

import axios from "axios";

import {
    SNO_KING_EVENT_TYPE_IDS,
    SNO_KING_RESOURCE_IDS,
    SNO_KING_URL,
} from "@/utils/constants/snoKing";

import type { SnoKingResponse } from "@/types/snoKing";

export async function fetchSnoKingEvents(start: string, end: string) {
    const params = {
        "page[size]": 250,
        sort: "end,start",
        "filter[start_date__gte]": start,
        "filter[start_date__lte]": end,
        "filter[resource_id__in]": SNO_KING_RESOURCE_IDS,
        "filter[event_type_id__in]": SNO_KING_EVENT_TYPE_IDS,
        company: "snoking",
    };

    const { data } = await axios.get<SnoKingResponse>(SNO_KING_URL, {
        params,
        headers: {
            Accept: "*/*",
            Cookie: "api_company=snoking",
        },
    });

    return data.data;
}
