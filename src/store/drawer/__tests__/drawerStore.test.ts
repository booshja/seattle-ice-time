import { createDrawerStore, initDrawerStore } from "../drawerStore";

describe("drawerStore", () => {
    it("initializes with isOpen false", () => {
        const api = createDrawerStore(initDrawerStore());
        expect(api.getState().isOpen).toBe(false);
    });

    it("open sets isOpen to true", () => {
        const api = createDrawerStore(initDrawerStore());
        api.getState().open();
        expect(api.getState().isOpen).toBe(true);
    });

    it("close sets isOpen to false", () => {
        const api = createDrawerStore(initDrawerStore());
        api.getState().open();
        api.getState().close();
        expect(api.getState().isOpen).toBe(false);
    });

    it("toggle flips isOpen", () => {
        const api = createDrawerStore(initDrawerStore());
        expect(api.getState().isOpen).toBe(false);

        api.getState().toggle();
        expect(api.getState().isOpen).toBe(true);

        api.getState().toggle();
        expect(api.getState().isOpen).toBe(false);
    });
});
