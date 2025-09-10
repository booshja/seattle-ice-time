import type { KciEvent, KciEventObject } from "@/types/krakenCommunityIceplex";
import { getDayString, getStartEndDates, getStartEndObjects } from "./dates";
import { KCI_SKATER_EVENTS } from "../constants/krakenCommunityIceplex";
import type { Day } from "@/types/dates";
import { COLORS } from "../constants/colors";
import { RINKS } from "../constants/rinks";
import { fetchKciEvents } from "@/actions/fetchKciEvents";

function filterKciEvents(events: KciEvent[], start: string, end: string): KciEvent[] {
    const hockeyEvents = events.filter((event: KciEvent) => {
        const isDesiredEvent =
            event.title === KCI_SKATER_EVENTS.stickAndPuck ||
            event.title === KCI_SKATER_EVENTS.dropInSkater ||
            event.title === KCI_SKATER_EVENTS.noviceDropInSkater;
        const isHockeyEvent = event.sportId === 20;
        const isWithinDateBounds = event.start >= start && event.end <= end;
        return isHockeyEvent && isDesiredEvent && isWithinDateBounds;
    });

    return hockeyEvents;
}

function transformKciEvents(events: KciEvent[]): KciEventObject[] {
    const transformedEvents = events.map<KciEventObject>((event: KciEvent) => {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        const startDay = startDate.getDay();
        const day: Day = getDayString(+startDay);

        const [start, end] = getStartEndObjects(startDate, endDate);

        return {
            color: COLORS.rinks.KCI,
            day,
            end,
            location: RINKS.KCI.name,
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
    start?: string;
    end?: string;
}): Promise<KciEventObject[]> {
    let startDate = undefined;
    let endDate = undefined;

    if (!start || !end) {
        const [start, end] = getStartEndDates({});
        startDate = start as string;
        endDate = end as string;
    } else {
        startDate = start;
        endDate = end;
    }

    const events = await fetchKciEvents({
        start: startDate,
        end: endDate,
    });
    const filteredEvents = filterKciEvents(events, startDate, endDate);
    const transformedEvents = transformKciEvents(filteredEvents);

    return transformedEvents;
}
