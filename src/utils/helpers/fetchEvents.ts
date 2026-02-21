import { getKciEvents } from "./krakenCommunityIceplex";
import { getLicEvents, getOvaEvents } from "./lynnwoodOva";
import { getSnoKingEvents } from "./snoKing";

import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";
import type { SnoKingEventObject } from "@/types/snoKing";

interface FetchEventsProps {
    end: string;
    start: string;
}

export type FetchEventsResult = {
    kciEvents: KciEventObject[];
    licEvents: LicOvaEventObject[];
    ovaEvents: LicOvaEventObject[];
    snoKingEvents: SnoKingEventObject[];
    errors?: Partial<Record<"kci" | "lic" | "ova" | "snoKing", unknown>>;
};

export async function fetchEvents({
    start,
    end,
}: FetchEventsProps): Promise<FetchEventsResult> {
    const [kciRes, licRes, ovaRes, snoKingRes] = await Promise.allSettled([
        getKciEvents({ start, end }),
        getLicEvents({ start, end }),
        getOvaEvents({ start, end }),
        getSnoKingEvents({ start, end }),
    ]);

    const result: FetchEventsResult = {
        kciEvents: kciRes.status === "fulfilled" ? kciRes.value : [],
        licEvents: licRes.status === "fulfilled" ? licRes.value : [],
        ovaEvents: ovaRes.status === "fulfilled" ? ovaRes.value : [],
        snoKingEvents: snoKingRes.status === "fulfilled" ? snoKingRes.value : [],
    };

    const errors: Partial<Record<"kci" | "lic" | "ova" | "snoKing", unknown>> = {};
    if (kciRes.status === "rejected") errors.kci = kciRes.reason;
    if (licRes.status === "rejected") errors.lic = licRes.reason;
    if (ovaRes.status === "rejected") errors.ova = ovaRes.reason;
    if (snoKingRes.status === "rejected") errors.snoKing = snoKingRes.reason;

    if (Object.keys(errors).length > 0) {
        result.errors = errors;
    }

    return result;
}
