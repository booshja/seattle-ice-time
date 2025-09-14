import type { Rink } from "@/types/Rink";
import { createStore } from "zustand/vanilla";

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
        KIRKLAND: false,
        RENTON: false,
        SNOQUALMIE: false,
    };
};

export const defaultRinkDisplayInitState: RinkDisplayState = {
    KCI: true,
    LYNNWOOD: true,
    OVA: true,
    KENT: false,
    KIRKLAND: false,
    RENTON: false,
    SNOQUALMIE: false,
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
        toggleRink: (rink) =>
            set((state) => {
                switch (rink) {
                    case "KCI":
                        return { ...state, KCI: !state.KCI };
                    case "LYNNWOOD":
                        return { ...state, LYNNWOOD: !state.LYNNWOOD };
                    case "OVA":
                        return { ...state, OVA: !state.OVA };
                    case "KENT":
                        return { ...state, KENT: !state.KENT };
                    case "KIRKLAND":
                        return { ...state, KIRKLAND: !state.KIRKLAND };
                    case "RENTON":
                        return { ...state, RENTON: !state.RENTON };
                    case "SNOQUALMIE":
                        return { ...state, SNOQUALMIE: !state.SNOQUALMIE };
                    default:
                        return state;
                }
            }),
    }));
};
