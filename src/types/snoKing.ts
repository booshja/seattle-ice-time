import { RINKS } from "@/utils/constants/rinks";
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
    meta: {
        page: {
            "current-page": number;
            "per-page": number;
            from: number;
            to: number;
            total: number;
            "last-page": number;
        };
    };
    links: {
        first: string;
        last: string;
    };
    data: SnoKingEvent[];
}

export interface SnoKingEvent {
    type: string;
    id: string;
    attributes: {
        repeat_id: number;
        resource_id: number;
        resource_area_id: number;
        desc: string;
        event_type: string;
        sub_type: string;
        start: string;
        start_gmt: string;
        end: string;
        end_gmt: string;
        customer_id: number;
        hteam_id: number;
        vteam_id: null;
        league_id: null;
        hscore: null;
        vscore: null;
        publish: true;
        outcome: string;
        register_capacity: number;
        create_u: string;
        created_user_type: string;
        create_d: string;
        mod_u: string;
        last_modified_user_type: string;
        mod_d: string;
        is_overtime: false;
        booking_id: number;
        description: null;
        notice: null;
        last_resource_id: null;
        parent_event_id: null;
        has_gender_locker_rooms: number;
        locker_room_type: null;
        includes_setup_time: false;
        includes_takedown_time: false;
        start_date: string;
        event_start_time: string;
        best_description: string;
    };
    relationships: {
        customer: [];
        registrants: [];
        registrations: [];
        eventType: [];
        subType: [];
        homeTeam: [];
        visitingTeam: [];
        summary: [];
        league: [];
        booking: [];
        parentEvent: [];
        lockers: [];
        lastResource: [];
        resource: [];
        resourceArea: [];
        tasks: [];
        teamGroups: [];
        eventSeries: [];
        statEvents: [];
        fees: [];
        invoices: [];
        seriesInvoices: [];
        invoiceItems: [];
        employees: [];
        eventEmployees: [];
        additionalResources: [];
        setupEvents: [];
        takedownEvents: [];
        comments: [];
        rsvpStates: [];
    };
    links: {
        self: string;
    };
}
