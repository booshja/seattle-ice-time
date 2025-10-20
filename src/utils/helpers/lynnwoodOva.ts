import { fetchLicOvaEvents } from "@/actions/fetchLicOvaEvents";
import type { Day } from "@/types/dates";
import type {
    LicOvaEvent,
    LicOvaEventObject,
} from "@/types/lynnwoodIceArenaAndOlympicViewArena";

import { COLORS } from "../constants/colors";
import {
    LIC_BOOKING_LINK,
    LIC_OVA_SKATER_EVENTS,
    OVA_BOOKING_LINK,
    OVA_LUNCH_HOCKEY_BOOKING_LINK,
} from "../constants/lynnwoodOva";
import { RINKS } from "../constants/rinks";

import { filterWithinWindow, resolveWeekWindow } from "./common";
import { getDayString, getStartEndObjects } from "./dates";

function filterLicOvaEvents(
    events: LicOvaEvent[],
    start: string,
    end: string,
): LicOvaEvent[] {
    return filterWithinWindow(
        events,
        start,
        end,
        (e) => e.start,
        (e) => e.end,
        (e) =>
            e.title === LIC_OVA_SKATER_EVENTS.stickAndPuck ||
            e.title === LIC_OVA_SKATER_EVENTS.dropIn ||
            e.title === LIC_OVA_SKATER_EVENTS.lunchHockey,
    );
}

export function transformLicOvaEvents(
    events: LicOvaEvent[],
    rink: typeof RINKS.LYNNWOOD.key | typeof RINKS.OVA.key,
): LicOvaEventObject[] {
    const transformedEvents = events.map<LicOvaEventObject>((event: LicOvaEvent) => {
        const isOva = rink === RINKS.OVA.key;
        const location = isOva ? RINKS.OVA.name : RINKS.LYNNWOOD.name;
        const color = isOva ? COLORS.rinks.OVA : COLORS.rinks.LYNNWOOD;
        let url = LIC_BOOKING_LINK;

        if (isOva) {
            if (event.title === LIC_OVA_SKATER_EVENTS.lunchHockey) {
                url = OVA_LUNCH_HOCKEY_BOOKING_LINK;
            } else {
                url = OVA_BOOKING_LINK;
            }
        }

        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        const day: Day = getDayString(startDate.getDay());

        const [start, end] = getStartEndObjects(startDate, endDate);
        const startKey = startDate.getHours() * 60 + startDate.getMinutes();

        return {
            color,
            day,
            end,
            location,
            startKey,
            start,
            title: event.title,
            url,
        };
    });

    return transformedEvents;
}

export async function getLicEvents({
    start,
    end,
}: {
    end?: string;
    start?: string;
}): Promise<LicOvaEventObject[]> {
    const { start: startDate, end: endDate } = resolveWeekWindow(start, end);

    const licEvents = await fetchLicOvaEvents({
        start: startDate,
        end: endDate,
        rink: RINKS.LYNNWOOD.key,
    });
    const filteredLicEvents = filterLicOvaEvents(licEvents, startDate, endDate);
    const transformedLicEvents = transformLicOvaEvents(
        filteredLicEvents,
        RINKS.LYNNWOOD.key,
    );

    return transformedLicEvents;
}

export async function getOvaEvents({
    start,
    end,
}: {
    end?: string;
    start?: string;
}): Promise<LicOvaEventObject[]> {
    const { start: startDate, end: endDate } = resolveWeekWindow(start, end);

    const ovaEvents = await fetchLicOvaEvents({
        start: startDate,
        end: endDate,
        rink: RINKS.OVA.key,
    });
    const filteredOvaEvents = filterLicOvaEvents(ovaEvents, startDate, endDate);
    const transformedOvaEvents = transformLicOvaEvents(
        filteredOvaEvents,
        RINKS.OVA.key,
    );

    return transformedOvaEvents;
}
