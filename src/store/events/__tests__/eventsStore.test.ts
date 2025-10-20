import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import { RINKS } from "@/utils/constants/rinks";

import { createEventsStore, initEventsStore } from "../eventsStore";

describe("eventsStore", () => {
    it("setters update current and initial arrays", () => {
        const api = createEventsStore(initEventsStore());
        const sample: KciEventObject[] = [
            {
                color: "#000",
                day: "Monday",
                end: { date: "2025-09-08", military: "10:00", time: "10:00am" },
                start: { date: "2025-09-08", military: "09:00", time: "9:00am" },
                title: "A",
                url: "https://example.com",
                location: RINKS.KCI.name,
            },
        ];
        api.getState().setInitialKciEvents(sample);
        expect(api.getState().initialKci).toHaveLength(1);
        expect(api.getState().currentKci).toHaveLength(1);

        api.getState().setKciEvents([]);
        expect(api.getState().currentKci).toHaveLength(0);
    });

    it("isCurrentWeekEmpty toggles", () => {
        const api = createEventsStore(initEventsStore());
        expect(api.getState().isCurrentWeekEmpty).toBe(false);
        api.getState().setIsCurrentWeekEmpty(true);
        expect(api.getState().isCurrentWeekEmpty).toBe(true);
    });

    it("setLynnwoodEvents and setOlympicviewEvents update current arrays", () => {
        const api = createEventsStore(initEventsStore());
        expect(api.getState().currentLynnwood).toHaveLength(0);
        expect(api.getState().currentOlympicview).toHaveLength(0);

        // @ts-expect-error minimal shape for test
        api.getState().setLynnwoodEvents([{ day: "Monday" }]);
        // @ts-expect-error minimal shape for test
        api.getState().setOlympicviewEvents([{ day: "Tuesday" }]);

        expect(api.getState().currentLynnwood).toHaveLength(1);
        expect(api.getState().currentOlympicview).toHaveLength(1);
    });
});
