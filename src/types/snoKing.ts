import type { BaseEventObject } from "./events";
import type { RINKS } from "@/utils/constants/rinks";

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
        description: string | null;
        end: string;
        end_gmt: string;
        event_start_time: string;
        event_type_id: number | string;
        has_gender_locker_rooms: number;
        home_score: number | null;
        hteam_id: number;
        includes_setup_time: boolean;
        includes_takedown_time: boolean;
        is_overtime: boolean;
        last_modified_user_type: string;
        last_resource_id: number | null;
        league_id: number | null;
        locker_room_type: string | null;
        mod_d: string;
        mod_u: string;
        notice: string | null;
        outcome: string;
        parent_event_id: number | null;
        publish: boolean;
        register_capacity: number;
        repeat_id: number;
        resource_area_id: number;
        resource_id: number;
        start: string;
        start_date: string;
        start_gmt: string;
        sub_type: string;
        visiting_score: number | null;
        vteam_id: number | null;
    };
    id: string;
    links: {
        self: string;
    };
    relationships: Record<string, unknown[]>;
    type: string;
}
