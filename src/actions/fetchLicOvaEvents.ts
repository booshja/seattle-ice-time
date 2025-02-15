"use server";

import axios from "axios";
import { LIC_OVA_EVENTS_URL, LIC_RINK_ID, OVA_RINK_ID, RINKS } from "@/utils/constants";
import type { LicOvaEvent } from "../types";

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
