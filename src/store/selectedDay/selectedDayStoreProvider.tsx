"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
    type SelectedDayStore,
    createSelectedDayStore,
    initSelectedDayStore,
} from "./selectedDayStore";

export type SelectedDayStoreApi = ReturnType<typeof createSelectedDayStore>;

export const SelectedDayStoreContext = createContext<SelectedDayStoreApi | undefined>(
    undefined,
);

export interface SelectedDayStoreProviderProps {
    children: ReactNode;
}

export const SelectedDayStoreProvider = ({
    children,
}: SelectedDayStoreProviderProps) => {
    const storeRef = useRef<SelectedDayStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createSelectedDayStore(initSelectedDayStore());
    }

    return (
        <SelectedDayStoreContext.Provider value={storeRef.current}>
            {children}
        </SelectedDayStoreContext.Provider>
    );
};

export const useSelectedDayStore = <T,>(
    selector: (store: SelectedDayStore) => T,
): T => {
    const selectedDayStoreContext = useContext(SelectedDayStoreContext);

    if (!selectedDayStoreContext) {
        throw new Error(
            `useSelectedDayStore must be used within SelectedDayStoreProvider`,
        );
    }

    return useStore(selectedDayStoreContext, selector);
};
