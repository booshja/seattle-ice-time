export const SNO_KING_RENTON_ADDRESS = "12620 164th Ave SE, Renton, WA 98059";

export const SNO_KING_KIRKLAND_ADDRESS = "14326 124th Ave NE, Kirkland, WA 98034";

export const SNO_KING_SNOQUALMIE_ADDRESS = "35323 SE Douglas St, Snoqualmie, WA 98065";

export const SNO_KING_URL =
    "https://apps.daysmartrecreation.com/dash/jsonapi/api/v1/events";

export const SNO_KING_BOOKING_URL =
    "https://apps.daysmartrecreation.com/dash/x/#/online/snoking/event-registration?program_types=4&date=";

export const SNO_KING_RESOURCE_IDS = "1,11,12,13";

export const SNO_KING_EVENT_TYPE_IDS = "13";

export const SNO_KING_SKATER_EVENTS = {
    stickNPuck: "Stick N Puck",
} as const;

export const SNO_KING_RINKS = {
    RENTON: {
        LARGE_ICE: {
            name: "Renton",
            address: SNO_KING_RENTON_ADDRESS,
            resourceId: 11,
            sheet: "Large Ice",
        },
        SMALL_ICE: {
            name: "Renton",
            address: SNO_KING_RENTON_ADDRESS,
            resourceId: 12,
            sheet: "Small Ice",
        },
    },
    KIRKLAND: {
        name: "Kirkland",
        address: SNO_KING_KIRKLAND_ADDRESS,
        resourceId: 1,
    },
    SNOQUALMIE: {
        name: "Snoqualmie",
        address: SNO_KING_SNOQUALMIE_ADDRESS,
        resourceId: 13,
    },
} as const;
