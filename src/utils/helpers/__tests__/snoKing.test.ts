import { COLORS } from "@/utils/constants/colors";
import { RINKS } from "@/utils/constants/rinks";
import { SNO_KING_RINKS } from "@/utils/constants/snoKing";

import * as fetchMod from "../../../actions/fetchSnoKingEvents";
import { getSnoKingEvents } from "../snoKing";

import type { SnoKingEvent } from "@/types/snoKing";
import type { Mocked } from "vitest";

vi.mock("../../../actions/fetchSnoKingEvents");

function makeSnoKingEvent(
    overrides: Partial<SnoKingEvent["attributes"]> = {},
): SnoKingEvent {
    return {
        type: "events",
        id: "1",
        attributes: {
            repeat_id: 0,
            resource_id: SNO_KING_RINKS.RENTON.LARGE_ICE.resourceId,
            resource_area_id: 0,
            desc: "Stick N Puck",
            event_type_id: 13,
            sub_type: "regular",
            start: "2026-02-23T18:00:00.000Z",
            start_gmt: "",
            end: "2026-02-23T19:00:00.000Z",
            end_gmt: "",
            customer_id: 0,
            hteam_id: 0,
            vteam_id: null,
            league_id: null,
            home_score: null,
            visiting_score: null,
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
            start_date: "2026-02-23",
            event_start_time: "18:00",
            best_description: "",
            ...overrides,
        },
        relationships: {},
        links: { self: "" },
    };
}

describe("snoKing", () => {
    describe("parsing", () => {
        it("transforms events with correct location and color", async () => {
            const mocked = fetchMod as Mocked<typeof fetchMod>;
            mocked.fetchSnoKingEvents.mockResolvedValueOnce([makeSnoKingEvent()]);

            const result = await getSnoKingEvents({
                start: "2026-02-23T00:00:00.000Z",
                end: "2026-03-02T00:00:00.000Z",
            });

            expect(result).toHaveLength(1);
            expect(result[0].location).toBe(RINKS.RENTON.name);
            expect(result[0].color).toBe(COLORS.rinks.RENTON);
            expect(result[0].sheet).toBe("Large Ice");
            expect(result[0].title).toBe("Stick N Puck");
            expect(result[0].day).toBeDefined();
        });

        it("maps Renton Small Ice resource with correct sheet", async () => {
            const mocked = fetchMod as Mocked<typeof fetchMod>;
            mocked.fetchSnoKingEvents.mockResolvedValueOnce([
                makeSnoKingEvent({
                    resource_id: SNO_KING_RINKS.RENTON.SMALL_ICE.resourceId,
                }),
            ]);

            const result = await getSnoKingEvents({
                start: "2026-02-23T00:00:00.000Z",
                end: "2026-03-02T00:00:00.000Z",
            });

            expect(result[0].location).toBe(RINKS.RENTON.name);
            expect(result[0].color).toBe(COLORS.rinks.RENTON);
            expect(result[0].sheet).toBe("Small Ice");
        });

        it("maps Kirkland resource to Kirkland rink", async () => {
            const mocked = fetchMod as Mocked<typeof fetchMod>;
            mocked.fetchSnoKingEvents.mockResolvedValueOnce([
                makeSnoKingEvent({
                    resource_id: SNO_KING_RINKS.KIRKLAND.resourceId,
                }),
            ]);

            const result = await getSnoKingEvents({
                start: "2026-02-23T00:00:00.000Z",
                end: "2026-03-02T00:00:00.000Z",
            });

            expect(result[0].location).toBe(RINKS.KIRKLAND.name);
            expect(result[0].color).toBe(COLORS.rinks.KIRKLAND);
            expect(result[0].sheet).toBeUndefined();
        });

        it("maps Snoqualmie resource to Snoqualmie rink", async () => {
            const mocked = fetchMod as Mocked<typeof fetchMod>;
            mocked.fetchSnoKingEvents.mockResolvedValueOnce([
                makeSnoKingEvent({
                    resource_id: SNO_KING_RINKS.SNOQUALMIE.resourceId,
                }),
            ]);

            const result = await getSnoKingEvents({
                start: "2026-02-23T00:00:00.000Z",
                end: "2026-03-02T00:00:00.000Z",
            });

            expect(result[0].location).toBe(RINKS.SNOQUALMIE.name);
            expect(result[0].color).toBe(COLORS.rinks.SNOQUALMIE);
        });

        it("strips ISO timestamp to date-only for fetch params", async () => {
            const mocked = fetchMod as Mocked<typeof fetchMod>;
            mocked.fetchSnoKingEvents.mockResolvedValueOnce([]);

            await getSnoKingEvents({
                start: "2026-02-23T00:00:00.000Z",
                end: "2026-03-02T00:00:00.000Z",
            });

            expect(mocked.fetchSnoKingEvents).toHaveBeenCalledWith(
                "2026-02-23",
                "2026-03-01",
            );
        });
    });

    describe("errors", () => {
        it("propagates fetch errors to the caller", async () => {
            const mocked = fetchMod as Mocked<typeof fetchMod>;
            mocked.fetchSnoKingEvents.mockRejectedValueOnce(new Error("network"));

            await expect(
                getSnoKingEvents({
                    start: "2026-02-23T00:00:00.000Z",
                    end: "2026-03-02T00:00:00.000Z",
                }),
            ).rejects.toThrow("network");
        });
    });
});
