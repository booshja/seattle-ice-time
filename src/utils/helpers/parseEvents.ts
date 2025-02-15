import type { KciEventObject, LicOvaEventObject } from "@/types";
import type { Events } from "@/types/events";

interface ParseEventsProps {
    kciEvents: KciEventObject[] | undefined;
    licEvents: LicOvaEventObject[] | undefined;
    ovaEvents: LicOvaEventObject[] | undefined;
}

export const parseEvents = ({
    kciEvents,
    licEvents,
    ovaEvents,
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

    if (kciEvents) {
        kciEvents.forEach((event) => {
            events[event.day].push(event);
        });
    }

    if (licEvents) {
        licEvents.forEach((event) => {
            events[event.day].push(event);
        });
    }

    if (ovaEvents) {
        ovaEvents.forEach((event) => {
            events[event.day].push(event);
        });
    }

    // console.log(snoKingEvents);
    // snoKingEvents.forEach((event) => {
    //     events[event.day].push(event);
    // });

    const days = Object.keys(events);
    days.forEach((day) => {
        events[day as keyof typeof events].sort((a, b) => {
            const timeA = a.start.military.split(":").join("");
            const timeB = b.start.military.split(":").join("");

            return parseInt(timeA) - parseInt(timeB);
        });
    });

    return events;
};
