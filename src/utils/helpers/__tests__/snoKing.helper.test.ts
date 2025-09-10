import { getSnoKingEvents } from "../snoKing";
import * as fetchMod from "../../../actions/fetchSnoKingEvents";
import { SNO_KING_RINKS } from "@/utils/constants/snoKing";

jest.mock("../../../actions/fetchSnoKingEvents");

describe("snoKing helper", () => {
    test("transforms events across multiple days and sheets", async () => {
        const mocked = fetchMod as jest.Mocked<typeof fetchMod>;
        // Return data for each date call: we expect it to call for 7 days but we can just return values
        mocked.fetchSnoKingEvents.mockResolvedValueOnce([
            {
                type: "event",
                id: "1",
                attributes: {
                    repeat_id: 0,
                    resource_id: SNO_KING_RINKS.RENTON.LARGE_ICE.resourceId,
                    resource_area_id: 0,
                    desc: "Stick & Puck",
                    event_type: "",
                    sub_type: "",
                    start: "2025-09-08T18:00:00.000Z",
                    start_gmt: "",
                    end: "2025-09-08T19:00:00.000Z",
                    end_gmt: "",
                    customer_id: 0,
                    hteam_id: 0,
                    vteam_id: null,
                    league_id: null,
                    hscore: null,
                    vscore: null,
                    publish: true,
                    outcome: "",
                    register_capacity: 0,
                    create_u: "",
                    created_user_type: "",
                    create_d: "",
                    mod_u: "",
                    last_modified_user_type: "",
                    mod_d: "",
                    is_overtime: false,
                    booking_id: 0,
                    description: null,
                    notice: null,
                    last_resource_id: null,
                    parent_event_id: null,
                    has_gender_locker_rooms: 0,
                    locker_room_type: null,
                    includes_setup_time: false,
                    includes_takedown_time: false,
                    start_date: "2025-09-08",
                    event_start_time: "18:00",
                    best_description: "",
                },
                relationships: {
                    customer: [],
                    registrants: [],
                    registrations: [],
                    eventType: [],
                    subType: [],
                    homeTeam: [],
                    visitingTeam: [],
                    summary: [],
                    league: [],
                    booking: [],
                    parentEvent: [],
                    lockers: [],
                    lastResource: [],
                    resource: [],
                    resourceArea: [],
                    tasks: [],
                    teamGroups: [],
                    eventSeries: [],
                    statEvents: [],
                    fees: [],
                    invoices: [],
                    seriesInvoices: [],
                    invoiceItems: [],
                    employees: [],
                    eventEmployees: [],
                    additionalResources: [],
                    setupEvents: [],
                    takedownEvents: [],
                    comments: [],
                    rsvpStates: [],
                },
                links: { self: "" },
            },
        ] as any);
        // Fill remaining 6 calls with empty arrays
        for (let i = 0; i < 6; i++) {
            mocked.fetchSnoKingEvents.mockResolvedValueOnce([] as any);
        }

        const result = await getSnoKingEvents();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0].day).toBeDefined();
        expect(result[0].location).toBeDefined();
    });
});
