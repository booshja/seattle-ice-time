import { createRinkDisplayStore, initRinkDisplayStore } from "../rinkDisplayStore";

describe("rinkDisplayStore", () => {
    test("initialization defaults", () => {
        const api = createRinkDisplayStore(initRinkDisplayStore());
        const s = api.getState();
        expect(s.KCI).toBe(true);
        expect(s.LYNNWOOD).toBe(true);
        expect(s.OVA).toBe(true);
        expect(s.RENTON).toBe(false);
    });

    test("toggle and setRink update state", () => {
        const api = createRinkDisplayStore(initRinkDisplayStore());
        api.getState().toggleRink("KCI");
        expect(api.getState().KCI).toBe(false);

        api.getState().setRink("RENTON", true);
        expect(api.getState().RENTON).toBe(true);
    });
});
