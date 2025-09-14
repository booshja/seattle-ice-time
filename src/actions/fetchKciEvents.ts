"use server";

import type { KciEvent } from "@/types/krakenCommunityIceplex";
import { KCI_EVENTS_URL } from "@/utils/constants/krakenCommunityIceplex";
import axios from "axios";

interface FetchKciEvents {
    end: string;
    start: string;
}

export async function fetchKciEvents({ start, end }: FetchKciEvents) {
    const { data } = await axios.get<KciEvent[]>(KCI_EVENTS_URL, {
        params: {
            start,
            end,
            variant: 2,
        },
    });
    return data;
}
