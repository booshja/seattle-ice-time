import { getStartEndDates, getStartEndObjects } from "./dates";

export type EventTime = {
    date: string;
    military: string;
    time: string;
};

export type BuiltEventTimes = {
    end: EventTime;
    start: EventTime;
    startKey: number;
};

/**
 * Build display times and a numeric startKey (minutes since midnight) using
 * the same formatting as getStartEndObjects (America/Los_Angeles display).
 */
export function buildEventTimes(startDate: Date, endDate: Date): BuiltEventTimes {
    const [start, end] = getStartEndObjects(startDate, endDate);

    const normalized = start.military.includes(":")
        ? start.military.replace(":", "")
        : start.military;
    const hours = parseInt(normalized.slice(0, 2), 10);
    const minutes = parseInt(normalized.slice(2, 4), 10);
    const startKey = hours * 60 + minutes;

    return { start, end, startKey };
}

/**
 * Filter events that fall fully within the [windowStartIso, windowEndIso] bounds
 * and optionally satisfy a predicate.
 */
export function filterWithinWindow<T>(
    events: T[],
    windowStartIso: string,
    windowEndIso: string,
    getStartIso: (event: T) => string,
    getEndIso: (event: T) => string,
    predicate?: (event: T) => boolean,
): T[] {
    const startBound = new Date(windowStartIso);
    const endBound = new Date(windowEndIso);

    return events.filter((event) => {
        const eventStart = new Date(getStartIso(event));
        const eventEnd = new Date(getEndIso(event));
        const inWindow = eventStart >= startBound && eventEnd <= endBound;
        const ok = predicate ? predicate(event) : true;
        return inWindow && ok;
    });
}

/**
 * Resolve a weekly window. If start/end are provided, return as-is; otherwise
 * compute Monday → following Monday using getStartEndDates().
 */
export function resolveWeekWindow(
    start?: string,
    end?: string,
): { end: string; start: string } {
    if (start && end) {
        return { start, end };
    }
    const [resolvedStart, resolvedEnd] = getStartEndDates({});
    return { start: resolvedStart as string, end: resolvedEnd as string };
}
