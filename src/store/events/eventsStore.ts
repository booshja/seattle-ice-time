import { createStore } from "zustand/vanilla";

import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";
import type { SnoKingEventObject } from "@/types/snoKing";

export type EventsState = {
    currentKci: Array<KciEventObject>;
    currentLynnwood: Array<LicOvaEventObject>;
    currentOlympicview: Array<LicOvaEventObject>;
    currentSnoKing: Array<SnoKingEventObject>;
    initialKci: Array<KciEventObject>;
    initialLynnwood: Array<LicOvaEventObject>;
    initialOlympicview: Array<LicOvaEventObject>;
    initialSnoKing: Array<SnoKingEventObject>;
    isCurrentWeekEmpty: boolean;
};

export type EventsActions = {
    setInitialKciEvents: (events: Array<KciEventObject>) => void;
    setInitialLynnwoodEvents: (events: Array<LicOvaEventObject>) => void;
    setInitialOlympicviewEvents: (events: Array<LicOvaEventObject>) => void;
    setInitialSnoKingEvents: (events: Array<SnoKingEventObject>) => void;
    setIsCurrentWeekEmpty: (isEmpty: boolean) => void;
    setKciEvents: (events: Array<KciEventObject>) => void;
    setLynnwoodEvents: (events: Array<LicOvaEventObject>) => void;
    setOlympicviewEvents: (events: Array<LicOvaEventObject>) => void;
    setSnoKingEvents: (events: Array<SnoKingEventObject>) => void;
};

export type EventsStore = EventsState & EventsActions;

export const initEventsStore = (): EventsState => {
    return {
        currentKci: [],
        currentLynnwood: [],
        currentOlympicview: [],
        currentSnoKing: [],
        initialKci: [],
        initialLynnwood: [],
        initialOlympicview: [],
        initialSnoKing: [],
        isCurrentWeekEmpty: false,
    };
};

export const defaultEventsInitState: EventsState = {
    currentKci: [],
    currentLynnwood: [],
    currentOlympicview: [],
    currentSnoKing: [],
    initialKci: [],
    initialLynnwood: [],
    initialOlympicview: [],
    initialSnoKing: [],
    isCurrentWeekEmpty: false,
};

export const createEventsStore = (initState: EventsState = defaultEventsInitState) => {
    return createStore<EventsStore>()((set) => ({
        ...initState,
        setInitialKciEvents: (events) =>
            set({ initialKci: events, currentKci: events }),
        setInitialLynnwoodEvents: (events) =>
            set({ initialLynnwood: events, currentLynnwood: events }),
        setInitialOlympicviewEvents: (events) =>
            set({ initialOlympicview: events, currentOlympicview: events }),
        setInitialSnoKingEvents: (events) =>
            set({ initialSnoKing: events, currentSnoKing: events }),
        setKciEvents: (events) => set({ currentKci: events }),
        setLynnwoodEvents: (events) => set({ currentLynnwood: events }),
        setOlympicviewEvents: (events) => set({ currentOlympicview: events }),
        setSnoKingEvents: (events) => set({ currentSnoKing: events }),
        setIsCurrentWeekEmpty: (isEmpty) => set({ isCurrentWeekEmpty: isEmpty }),
    }));
};
