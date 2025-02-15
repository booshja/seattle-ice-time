"use server";

import axios from "axios";
import { KCI_EVENTS_URL } from "@/utils/constants";
import type { KciEvent } from "../types";

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
