import { createEventsStore, initEventsStore } from "../eventsStore";

describe("eventsStore branches", () => {
    test("setLynnwoodEvents and setOlympicviewEvents update current arrays", () => {
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
