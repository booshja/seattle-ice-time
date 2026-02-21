import { createWeekDisplayStore, initWeekDisplayStore } from "../currentWeekStore";

describe("currentWeekStore", () => {
    it("setInitialWeek sets both initial and current", () => {
        const api = createWeekDisplayStore(initWeekDisplayStore());
        api.getState().setInitialWeek("X");
        expect(api.getState().initialWeek).toBe("X");
        expect(api.getState().currentWeek).toBe("X");
    });

    it("setCurrentWeek only updates current", () => {
        const api = createWeekDisplayStore(initWeekDisplayStore());
        api.getState().setInitialWeek("A");
        api.getState().setCurrentWeek("B");
        expect(api.getState().initialWeek).toBe("A");
        expect(api.getState().currentWeek).toBe("B");
    });

    it("isNavigating defaults to false and can be toggled", () => {
        const api = createWeekDisplayStore(initWeekDisplayStore());
        expect(api.getState().isNavigating).toBe(false);

        api.getState().setIsNavigating(true);
        expect(api.getState().isNavigating).toBe(true);

        api.getState().setIsNavigating(false);
        expect(api.getState().isNavigating).toBe(false);
    });
});
