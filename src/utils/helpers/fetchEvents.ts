import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";

import { getKciEvents } from "./krakenCommunityIceplex";
import { getLicEvents } from "./lynnwoodOva";
import { getOvaEvents } from "./lynnwoodOva";

interface FetchEventsProps {
    end: string;
    start: string;
}

export type FetchEventsResult = {
    kciEvents: KciEventObject[];
    licEvents: LicOvaEventObject[];
    ovaEvents: LicOvaEventObject[];
    errors?: Partial<Record<"kci" | "lic" | "ova", unknown>>;
};

export async function fetchEvents({
    start,
    end,
}: FetchEventsProps): Promise<FetchEventsResult> {
    const [kciRes, licRes, ovaRes] = await Promise.allSettled([
        getKciEvents({ start, end }),
        getLicEvents({ start, end }),
        getOvaEvents({ start, end }),
    ]);

    const result: FetchEventsResult = {
        kciEvents: kciRes.status === "fulfilled" ? kciRes.value : [],
        licEvents: licRes.status === "fulfilled" ? licRes.value : [],
        ovaEvents: ovaRes.status === "fulfilled" ? ovaRes.value : [],
    };

    const errors: Partial<Record<"kci" | "lic" | "ova", unknown>> = {};
    if (kciRes.status === "rejected") errors.kci = kciRes.reason;
    if (licRes.status === "rejected") errors.lic = licRes.reason;
    if (ovaRes.status === "rejected") errors.ova = ovaRes.reason;

    if (Object.keys(errors).length > 0) {
        result.errors = errors;
    }

    return result;
}
