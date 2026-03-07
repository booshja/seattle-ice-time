import { createStore } from "zustand/vanilla";

export type DrawerState = {
    isOpen: boolean;
};

export type DrawerActions = {
    open: () => void;
    close: () => void;
    toggle: () => void;
};

export type DrawerStore = DrawerState & DrawerActions;

export const initDrawerStore = (): DrawerState => {
    return { isOpen: false };
};

export const defaultDrawerInitState: DrawerState = {
    isOpen: false,
};

export const createDrawerStore = (initState: DrawerState = defaultDrawerInitState) => {
    return createStore<DrawerStore>()((set) => ({
        ...initState,
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }));
};
