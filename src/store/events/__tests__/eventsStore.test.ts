import type { KciEventObject } from "@/types/krakenCommunityIceplex";

import { createEventsStore, initEventsStore } from "../eventsStore";

describe("eventsStore", () => {
    test("setters update current and initial arrays", () => {
        const api = createEventsStore(initEventsStore());
        const sample: KciEventObject[] = [
            {
                color: "#000",
                day: "Monday",
                end: { date: "2025-09-08", military: "10:00", time: "10:00am" },
                start: { date: "2025-09-08", military: "09:00", time: "9:00am" },
                title: "A",
                url: "https://example.com",
                location: "Kraken Community Iceplex",
            },
        ];
        api.getState().setInitialKciEvents(sample);
        expect(api.getState().initialKci).toHaveLength(1);
        expect(api.getState().currentKci).toHaveLength(1);

        api.getState().setKciEvents([]);
        expect(api.getState().currentKci).toHaveLength(0);
    });

    test("isCurrentWeekEmpty toggles", () => {
        const api = createEventsStore(initEventsStore());
        expect(api.getState().isCurrentWeekEmpty).toBe(false);
        api.getState().setIsCurrentWeekEmpty(true);
        expect(api.getState().isCurrentWeekEmpty).toBe(true);
    });
});
