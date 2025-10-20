import { fetchKciEvents } from "@/actions/fetchKciEvents";
import type { Day } from "@/types/dates";
import type { KciEvent, KciEventObject } from "@/types/krakenCommunityIceplex";

import { COLORS } from "../constants/colors";
import { KCI_SKATER_EVENTS } from "../constants/krakenCommunityIceplex";
import { RINKS } from "../constants/rinks";

import { filterWithinWindow, resolveWeekWindow } from "./common";
import { getDayString, getStartEndObjects } from "./dates";

function filterKciEvents(events: KciEvent[], start: string, end: string): KciEvent[] {
    return filterWithinWindow(
        events,
        start,
        end,
        (e) => e.start,
        (e) => e.end,
        (e) =>
            e.sportId === 20 &&
            (e.title === KCI_SKATER_EVENTS.stickAndPuck ||
                e.title === KCI_SKATER_EVENTS.dropInSkater ||
                e.title === KCI_SKATER_EVENTS.noviceDropInSkater),
    );
}

function transformKciEvents(events: KciEvent[]): KciEventObject[] {
    const transformedEvents = events.map<KciEventObject>((event: KciEvent) => {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        const startDay = startDate.getDay();
        const day: Day = getDayString(+startDay);

        const [start, end] = getStartEndObjects(startDate, endDate);
        const startKey = startDate.getHours() * 60 + startDate.getMinutes();

        return {
            color: COLORS.rinks.KCI,
            day,
            end,
            location: RINKS.KCI.name,
            startKey,
            start,
            title: event.title,
            url: event.url,
        };
    });

    return transformedEvents;
}

export async function getKciEvents({
    start,
    end,
}: {
    end?: string;
    start?: string;
}): Promise<KciEventObject[]> {
    const { start: startDate, end: endDate } = resolveWeekWindow(start, end);

    const events = await fetchKciEvents({
        start: startDate,
        end: endDate,
    });
    const filteredEvents = filterKciEvents(events, startDate, endDate);
    const transformedEvents = transformKciEvents(filteredEvents);

    return transformedEvents;
}
