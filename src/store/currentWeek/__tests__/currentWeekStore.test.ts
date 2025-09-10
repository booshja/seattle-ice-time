import { createWeekDisplayStore, initWeekDisplayStore } from "../currentWeekStore";

describe("currentWeekStore", () => {
    test("setInitialWeek sets both initial and current", () => {
        const api = createWeekDisplayStore(initWeekDisplayStore());
        api.getState().setInitialWeek("X");
        expect(api.getState().initialWeek).toBe("X");
        expect(api.getState().currentWeek).toBe("X");
    });

    test("setCurrentWeek only updates current", () => {
        const api = createWeekDisplayStore(initWeekDisplayStore());
        api.getState().setInitialWeek("A");
        api.getState().setCurrentWeek("B");
        expect(api.getState().initialWeek).toBe("A");
        expect(api.getState().currentWeek).toBe("B");
    });
});
