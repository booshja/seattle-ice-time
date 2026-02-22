import { createStore } from "zustand/vanilla";

import type { Rink } from "@/types/Rink";

export type RinkDisplayState = {
    KCI: boolean;
    KENT: boolean;
    KIRKLAND: boolean;
    LYNNWOOD: boolean;
    OVA: boolean;
    RENTON: boolean;
    SNOQUALMIE: boolean;
};

export type RinkDisplayActions = {
    setRink: (rink: Rink, value: boolean) => void;
    toggleRink: (rink: Rink) => void;
};

export type RinkDisplayStore = RinkDisplayState & RinkDisplayActions;

export const initRinkDisplayStore = (): RinkDisplayState => {
    return {
        KCI: true,
        LYNNWOOD: true,
        OVA: true,
        KENT: false,
        KIRKLAND: true,
        RENTON: true,
        SNOQUALMIE: true,
    };
};

export const defaultRinkDisplayInitState: RinkDisplayState = {
    KCI: true,
    LYNNWOOD: true,
    OVA: true,
    KENT: false,
    KIRKLAND: true,
    RENTON: true,
    SNOQUALMIE: true,
};

export const createRinkDisplayStore = (
    initState: RinkDisplayState = defaultRinkDisplayInitState,
) => {
    return createStore<RinkDisplayStore>()((set) => ({
        ...initState,
        setRink: (rink, value) =>
            set((state) => ({
                ...state,
                [rink]: value,
            })),
        toggleRink: (rink) => set((state) => ({ ...state, [rink]: !state[rink] })),
    }));
};
