import { createSelectedDayStore, initSelectedDayStore } from "../selectedDayStore";

describe("selectedDayStore", () => {
    it("initializes with selectedIndex 0", () => {
        const api = createSelectedDayStore(initSelectedDayStore());
        expect(api.getState().selectedIndex).toBe(0);
    });

    it("setSelectedIndex updates the index", () => {
        const api = createSelectedDayStore(initSelectedDayStore());
        api.getState().setSelectedIndex(3);
        expect(api.getState().selectedIndex).toBe(3);
    });

    it("next increments the index up to 6", () => {
        const api = createSelectedDayStore(initSelectedDayStore());
        api.getState().setSelectedIndex(5);
        api.getState().next();
        expect(api.getState().selectedIndex).toBe(6);

        api.getState().next();
        expect(api.getState().selectedIndex).toBe(6);
    });

    it("prev decrements the index down to 0", () => {
        const api = createSelectedDayStore(initSelectedDayStore());
        api.getState().setSelectedIndex(1);
        api.getState().prev();
        expect(api.getState().selectedIndex).toBe(0);

        api.getState().prev();
        expect(api.getState().selectedIndex).toBe(0);
    });
});
