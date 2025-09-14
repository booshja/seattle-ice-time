import type { RINKS } from "@/utils/constants/rinks";

import type { BaseEventObject } from "./events";

export type SnoKingLocation =
    | typeof RINKS.RENTON.name
    | typeof RINKS.KIRKLAND.name
    | typeof RINKS.SNOQUALMIE.name;

export type SnoKingSheet = "Large Ice" | "Small Ice" | undefined;

export interface SnoKingEventObject extends BaseEventObject {
    location: SnoKingLocation;
    sheet: SnoKingSheet;
}

export interface SnoKingResponse {
    data: SnoKingEvent[];
    links: {
        first: string;
        last: string;
    };
    meta: {
        page: {
            "current-page": number;
            from: number;
            "last-page": number;
            "per-page": number;
            to: number;
            total: number;
        };
    };
}

export interface SnoKingEvent {
    attributes: {
        best_description: string;
        booking_id: number;
        create_d: string;
        create_u: string;
        created_user_type: string;
        customer_id: number;
        desc: string;
        description: null;
        end: string;
        end_gmt: string;
        event_start_time: string;
        event_type: string;
        has_gender_locker_rooms: number;
        hscore: null;
        hteam_id: number;
        includes_setup_time: false;
        includes_takedown_time: false;
        is_overtime: false;
        last_modified_user_type: string;
        last_resource_id: null;
        league_id: null;
        locker_room_type: null;
        mod_d: string;
        mod_u: string;
        notice: null;
        outcome: string;
        parent_event_id: null;
        publish: true;
        register_capacity: number;
        repeat_id: number;
        resource_area_id: number;
        resource_id: number;
        start: string;
        start_date: string;
        start_gmt: string;
        sub_type: string;
        vscore: null;
        vteam_id: null;
    };
    id: string;
    links: {
        self: string;
        type: string;
    };
    relationships: {
        additionalResources: [];
        booking: [];
        comments: [];
        customer: [];
        employees: [];
        eventEmployees: [];
        eventSeries: [];
        eventType: [];
        fees: [];
        homeTeam: [];
        invoiceItems: [];
        invoices: [];
        lastResource: [];
        league: [];
        lockers: [];
        parentEvent: [];
        registrants: [];
        registrations: [];
        resource: [];
        resourceArea: [];
        rsvpStates: [];
        seriesInvoices: [];
        setupEvents: [];
        statEvents: [];
        subType: [];
        summary: [];
        takedownEvents: [];
        tasks: [];
        teamGroups: [];
        visitingTeam: [];
    };
}
