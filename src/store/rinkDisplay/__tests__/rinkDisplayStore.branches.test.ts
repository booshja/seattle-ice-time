import {
    createRinkDisplayStore,
    defaultRinkDisplayInitState,
} from "../rinkDisplayStore";

describe("rinkDisplayStore branches", () => {
    test("toggle each rink flips the boolean", () => {
        const store = createRinkDisplayStore({ ...defaultRinkDisplayInitState });
        const get = store.getState();

        get.toggleRink("KCI");
        expect(store.getState().KCI).toBe(!defaultRinkDisplayInitState.KCI);
        get.toggleRink("LYNNWOOD");
        expect(store.getState().LYNNWOOD).toBe(!defaultRinkDisplayInitState.LYNNWOOD);
        get.toggleRink("OVA");
        expect(store.getState().OVA).toBe(!defaultRinkDisplayInitState.OVA);
        get.toggleRink("KENT");
        expect(store.getState().KENT).toBe(!defaultRinkDisplayInitState.KENT);
        get.toggleRink("KIRKLAND");
        expect(store.getState().KIRKLAND).toBe(!defaultRinkDisplayInitState.KIRKLAND);
        get.toggleRink("RENTON");
        expect(store.getState().RENTON).toBe(!defaultRinkDisplayInitState.RENTON);
        get.toggleRink("SNOQUALMIE");
        expect(store.getState().SNOQUALMIE).toBe(
            !defaultRinkDisplayInitState.SNOQUALMIE,
        );
    });

    test("default branch returns state unchanged", () => {
        const store = createRinkDisplayStore({ ...defaultRinkDisplayInitState });
        const before = store.getState();
        // @ts-expect-error testing default branch behavior with invalid rink key
        before.toggleRink("UNKNOWN");
        const after = store.getState();
        expect(after).toEqual(before);
    });
});
