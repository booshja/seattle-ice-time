import {
    createRinkDisplayStore,
    defaultRinkDisplayInitState,
    initRinkDisplayStore,
} from "../rinkDisplayStore";

describe("rinkDisplayStore", () => {
    it("initialization defaults", () => {
        const api = createRinkDisplayStore(initRinkDisplayStore());
        const s = api.getState();
        expect(s.KCI).toBe(true);
        expect(s.LYNNWOOD).toBe(true);
        expect(s.OVA).toBe(true);
        expect(s.RENTON).toBe(true);
    });

    it("toggle and setRink update state", () => {
        const api = createRinkDisplayStore(initRinkDisplayStore());
        api.getState().toggleRink("KCI");
        expect(api.getState().KCI).toBe(false);

        api.getState().setRink("RENTON", true);
        expect(api.getState().RENTON).toBe(true);
    });

    describe("branches", () => {
        it("toggle each rink flips the boolean", () => {
            const store = createRinkDisplayStore({ ...defaultRinkDisplayInitState });
            const get = store.getState();

            get.toggleRink("KCI");
            expect(store.getState().KCI).toBe(!defaultRinkDisplayInitState.KCI);
            get.toggleRink("LYNNWOOD");
            expect(store.getState().LYNNWOOD).toBe(
                !defaultRinkDisplayInitState.LYNNWOOD,
            );
            get.toggleRink("OVA");
            expect(store.getState().OVA).toBe(!defaultRinkDisplayInitState.OVA);
            get.toggleRink("KENT");
            expect(store.getState().KENT).toBe(!defaultRinkDisplayInitState.KENT);
            get.toggleRink("KIRKLAND");
            expect(store.getState().KIRKLAND).toBe(
                !defaultRinkDisplayInitState.KIRKLAND,
            );
            get.toggleRink("RENTON");
            expect(store.getState().RENTON).toBe(!defaultRinkDisplayInitState.RENTON);
            get.toggleRink("SNOQUALMIE");
            expect(store.getState().SNOQUALMIE).toBe(
                !defaultRinkDisplayInitState.SNOQUALMIE,
            );
        });
    });
});
