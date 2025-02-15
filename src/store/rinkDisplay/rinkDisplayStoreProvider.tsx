"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
    type RinkDisplayStore,
    createRinkDisplayStore,
    initRinkDisplayStore,
} from "./rinkDisplayStore";

export type RinkDisplayStoreApi = ReturnType<typeof createRinkDisplayStore>;

export const RinkDisplayStoreContext = createContext<RinkDisplayStoreApi | undefined>(
    undefined
);

export interface RinkDisplayStoreProviderProps {
    children: ReactNode;
}

export const RinkDisplayStoreProvider = ({
    children,
}: RinkDisplayStoreProviderProps) => {
    const storeRef = useRef<RinkDisplayStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createRinkDisplayStore(initRinkDisplayStore());
    }

    return (
        <RinkDisplayStoreContext.Provider value={storeRef.current}>
            {children}
        </RinkDisplayStoreContext.Provider>
    );
};

export const useRinkDisplayStore = <T,>(
    selector: (store: RinkDisplayStore) => T
): T => {
    const rinkDisplayStoreContext = useContext(RinkDisplayStoreContext);

    if (!rinkDisplayStoreContext) {
        throw new Error(
            `useRinkDisplayStore must be used within RinkDisplayStoreProvider`
        );
    }

    return useStore(rinkDisplayStoreContext, selector);
};
