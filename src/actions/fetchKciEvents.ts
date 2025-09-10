"use server";

import axios from "axios";
import { KCI_EVENTS_URL } from "@/utils/constants/krakenCommunityIceplex";
import type { KciEvent } from "@/types/krakenCommunityIceplex";

interface FetchKciEvents {
    start: string;
    end: string;
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
