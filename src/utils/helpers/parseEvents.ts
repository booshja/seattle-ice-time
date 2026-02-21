import type { Events } from "@/types/events";
import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";
import type { SnoKingEventObject } from "@/types/snoKing";

interface ParseEventsProps {
    kciEvents: KciEventObject[] | undefined;
    licEvents: LicOvaEventObject[] | undefined;
    ovaEvents: LicOvaEventObject[] | undefined;
    snoKingEvents: SnoKingEventObject[] | undefined;
}

export const parseEvents = ({
    kciEvents,
    licEvents,
    ovaEvents,
    snoKingEvents,
}: ParseEventsProps): Events => {
    const events: Events = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    };

    const allEvents = [
        ...(kciEvents ?? []),
        ...(licEvents ?? []),
        ...(ovaEvents ?? []),
        ...(snoKingEvents ?? []),
    ];

    for (const event of allEvents) {
        events[event.day].push(event);
    }

    const days = Object.keys(events);
    days.forEach((day) => {
        events[day as keyof typeof events].sort((a, b) => {
            const keyA =
                typeof a.startKey === "number"
                    ? a.startKey
                    : parseInt(a.start.military.split(":").join(""), 10);
            const keyB =
                typeof b.startKey === "number"
                    ? b.startKey
                    : parseInt(b.start.military.split(":").join(""), 10);
            return keyA - keyB;
        });
    });

    return events;
};
