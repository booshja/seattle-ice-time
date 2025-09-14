import { fetchSnoKingEvents } from "@/actions/fetchSnoKingEvents";
import {
    getDailyDates,
    getDayString,
    getStartEndDates,
    getStartEndObjects,
} from "./dates";
import type {
    SnoKingEvent,
    SnoKingEventObject,
    SnoKingLocation,
    SnoKingSheet,
} from "@/types/snoKing";
import { COLORS } from "../constants/colors";
import { RINKS } from "../constants/rinks";
import { SNO_KING_BOOKING_URL, SNO_KING_RINKS } from "../constants/snoKing";
import type { Day } from "@/types/dates";

function transformSnoKingEvents(events: SnoKingEvent[]) {
    const transformedEvents = events.map<SnoKingEventObject>((event: SnoKingEvent) => {
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
        const startDay = startDate.getDay();
        const day: Day = getDayString(+startDay);

        const [start, end] = getStartEndObjects(startDate, endDate);

        return {
            color,
            day,
            end,
            location,
            sheet,
            start,
            title: event.attributes.desc,
            url: `${SNO_KING_BOOKING_URL}${start.date}`,
        };
    });

    return transformedEvents;
}

export async function getSnoKingEvents() {
    const [start] = getStartEndDates({});
    const dailyDates = getDailyDates(new Date(start));
    let events: SnoKingEvent[] = [];

    for (const date of dailyDates) {
        try {
            const dailyEvents = await fetchSnoKingEvents(date);
            console.log(date, dailyEvents);
            events = [...events, ...dailyEvents];
            console.log("events after concat", events);
        } catch (error) {
            console.error(`Error fetching ${date}`);
            console.error(error);
        }
    }
    console.log("events", events);
    const transformedEvents = transformSnoKingEvents(events);

    return transformedEvents;
}

// TODO: Figure out why I'm only getting the current day events and not the following ones

// Daysmart UI Request
("https://apps.daysmartrecreation.com/dash/jsonapi/api/v1/events?");
("cache[save]=false");
("&page[size]=50");
("&sort=end%2Cstart");
("&include=summary%2Ccomments%2Cresource.facility.address%2Cresource.address%2CeventType.product.locations%2ChomeTeam.facility.address%2ChomeTeam.league.season.priorities.memberships%2ChomeTeam.league.season.priorities.activatedBySeasons%2ChomeTeam.programType%2ChomeTeam.product%2ChomeTeam.product.locations%2ChomeTeam.sport&");
("filter[id__in]=275039%2C275739%2C276901%2C317804%2C276902%2C276898%2C275742%2C276903%2C276899%2C275743%2C317785%2C275738%2C276900");
("&filter[start_date__gte]=2024-12-28&");
("filter[start_date__lte]=2024-12-29");
("&filter[unconstrained]=1");
("&filterRelations[comments.comment_type]=public");
("&company=snoking");
