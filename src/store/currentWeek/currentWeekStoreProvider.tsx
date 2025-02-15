"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
    type WeekDisplayStore,
    createWeekDisplayStore,
    initWeekDisplayStore,
} from "./currentWeekStore";

export type WeekDisplayStoreApi = ReturnType<typeof createWeekDisplayStore>;

export const WeekDisplayStoreContext = createContext<WeekDisplayStoreApi | undefined>(
    undefined
);

export interface WeekDisplayStoreProviderProps {
    children: ReactNode;
}

export const WeekDisplayStoreProvider = ({
    children,
}: WeekDisplayStoreProviderProps) => {
    const storeRef = useRef<WeekDisplayStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createWeekDisplayStore(initWeekDisplayStore());
    }

    return (
        <WeekDisplayStoreContext.Provider value={storeRef.current}>
            {children}
        </WeekDisplayStoreContext.Provider>
    );
};

export const useWeekDisplayStore = <T,>(
    selector: (store: WeekDisplayStore) => T
): T => {
    const weekDisplayStoreContext = useContext(WeekDisplayStoreContext);

    if (!weekDisplayStoreContext) {
        throw new Error(
            `useWeekDisplayStore must be used within WeekDisplayStoreProvider`
        );
    }

    return useStore(weekDisplayStoreContext, selector);
};
