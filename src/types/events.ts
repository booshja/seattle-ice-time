import type { Day } from "./dates";
import type { KciEventObject } from "./krakenCommunityIceplex";
import type { LicOvaEventObject } from "./lynnwoodIceArenaAndOlympicViewArena";
import type { SnoKingEventObject } from "./snoKing";

export interface BaseEventObject {
    color: string;
    day: Day;
    end: {
        date: string;
        military: string;
        time: string;
    };
    // Numeric minutes since midnight for start time; used for fast sorting
    start: {
        date: string;
        military: string;
        time: string;
    };
    title: string;
    url: string;
    startKey?: number;
}

export type EventObject = KciEventObject | LicOvaEventObject | SnoKingEventObject;

export interface Events {
    Friday: EventObject[];
    Monday: EventObject[];
    Saturday: EventObject[];
    Sunday: EventObject[];
    Thursday: EventObject[];
    Tuesday: EventObject[];
    Wednesday: EventObject[];
}
