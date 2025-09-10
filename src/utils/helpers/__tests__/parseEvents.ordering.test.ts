import { parseEvents } from "../parseEvents";
import {
    KCI_TRANSFORMED_EVENT_A,
    KCI_TRANSFORMED_EVENT_B,
} from "@/testing/__mocks__/fixtures";

describe("parseEvents ordering", () => {
    test("events are sorted by start.military ascending", () => {
        const events = parseEvents({
            kciEvents: [
                {
                    ...KCI_TRANSFORMED_EVENT_B,
                    end: { date: "2025-09-08", military: "1000", time: "10:00am" },
                } as any,
                KCI_TRANSFORMED_EVENT_A as any,
            ],
            licEvents: undefined,
            ovaEvents: undefined,
        });

        expect(events.Monday.map((e) => e.title)).toEqual(["A", "B"]);
    });
});
