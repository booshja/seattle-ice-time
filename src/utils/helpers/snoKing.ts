import { fetchSnoKingEvents } from "@/actions/fetchSnoKingEvents";

import { COLORS } from "../constants/colors";
import { RINKS } from "../constants/rinks";
import { SNO_KING_BOOKING_URL, SNO_KING_RINKS } from "../constants/snoKing";

import {
    getDayString,
    getPacificDayOfWeek,
    getPacificStartKey,
    getStartEndObjects,
} from "./dates";

import type { Day } from "@/types/dates";
import type {
    SnoKingEvent,
    SnoKingEventObject,
    SnoKingLocation,
    SnoKingSheet,
} from "@/types/snoKing";

function transformSnoKingEvents(events: SnoKingEvent[]) {
    return events.map<SnoKingEventObject>((event: SnoKingEvent) => {
        let color: string = COLORS.rinks.RENTON;
        let location: SnoKingLocation = RINKS.RENTON.name;
        let sheet: SnoKingSheet = undefined;

        switch (event.attributes.resource_id) {
            case SNO_KING_RINKS.RENTON.LARGE_ICE.resourceId:
                sheet = SNO_KING_RINKS.RENTON.LARGE_ICE.sheet;
                break;
            case SNO_KING_RINKS.RENTON.SMALL_ICE.resourceId:
                sheet = SNO_KING_RINKS.RENTON.SMALL_ICE.sheet;
                break;
            case SNO_KING_RINKS.KIRKLAND.resourceId:
                color = COLORS.rinks.KIRKLAND;
                location = RINKS.KIRKLAND.name;
                break;
            case SNO_KING_RINKS.SNOQUALMIE.resourceId:
                color = COLORS.rinks.SNOQUALMIE;
                location = RINKS.SNOQUALMIE.name;
                break;
            default:
                break;
        }

        const startDate = new Date(event.attributes.start);
        const endDate = new Date(event.attributes.end);
        const day: Day = getDayString(getPacificDayOfWeek(startDate));

        const [start, end] = getStartEndObjects(startDate, endDate);
        const startKey = getPacificStartKey(startDate);

        return {
            color,
            day,
            end,
            id: event.id,
            location,
            sheet,
            startKey,
            start,
            title: event.attributes.desc,
            url: `${SNO_KING_BOOKING_URL}${start.date}`,
        };
    });
}

interface GetSnoKingEventsProps {
    end: string;
    start: string;
}

export async function getSnoKingEvents({ start, end }: GetSnoKingEventsProps) {
    const startDate = start.split("T")[0];

    // end is the next Monday (exclusive upper bound), but the API's
    // start_date__lte filter is inclusive, so subtract one day to cap at Sunday.
    const endParsed = new Date(end);
    endParsed.setDate(endParsed.getDate() - 1);
    const endDate = endParsed.toISOString().split("T")[0];

    const events = await fetchSnoKingEvents(startDate, endDate);
    return transformSnoKingEvents(events);
}
