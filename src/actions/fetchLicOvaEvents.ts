"use server";

import type { LicOvaEvent } from "@/types/lynnwoodIceArenaAndOlympicViewArena";
import {
    LIC_OVA_EVENTS_URL,
    LIC_RINK_ID,
    OVA_RINK_ID,
} from "@/utils/constants/lynnwoodOva";
import { RINKS } from "@/utils/constants/rinks";
import axios from "axios";

interface GetLicOvaEventsProps {
    end: string;
    rink: typeof RINKS.OVA.key | typeof RINKS.LYNNWOOD.key;
    start: string;
}

export async function fetchLicOvaEvents({ start, end, rink }: GetLicOvaEventsProps) {
    const url = LIC_OVA_EVENTS_URL;
    let rinkId = LIC_RINK_ID;

    if (rink === RINKS.OVA.key) {
        rinkId = OVA_RINK_ID;
    }

    const { data } = await axios.get<LicOvaEvent[]>(url, {
        params: {
            rink: rinkId,
            multiview: 0,
            start,
            end,
        },
    });

    return data;
}
