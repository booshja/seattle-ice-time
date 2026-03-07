import { createStore } from "zustand/vanilla";

export type SelectedDayState = {
    selectedIndex: number;
};

export type SelectedDayActions = {
    setSelectedIndex: (index: number) => void;
    next: () => void;
    prev: () => void;
};

export type SelectedDayStore = SelectedDayState & SelectedDayActions;

export const initSelectedDayStore = (): SelectedDayState => {
    return { selectedIndex: 0 };
};

export const defaultSelectedDayInitState: SelectedDayState = {
    selectedIndex: 0,
};

export const createSelectedDayStore = (
    initState: SelectedDayState = defaultSelectedDayInitState,
) => {
    return createStore<SelectedDayStore>()((set) => ({
        ...initState,
        setSelectedIndex: (index) => set({ selectedIndex: index }),
        next: () =>
            set((state) => ({
                selectedIndex: Math.min(state.selectedIndex + 1, 6),
            })),
        prev: () =>
            set((state) => ({
                selectedIndex: Math.max(state.selectedIndex - 1, 0),
            })),
    }));
};
