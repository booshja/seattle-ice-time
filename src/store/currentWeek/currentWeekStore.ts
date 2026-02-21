import { createStore } from "zustand/vanilla";

export type WeekDisplayState = {
    currentWeek: string;
    initialWeek: string;
    isNavigating: boolean;
};

export type WeekDisplayActions = {
    setCurrentWeek: (week: string) => void;
    setInitialWeek: (week: string) => void;
    setIsNavigating: (value: boolean) => void;
};

export type WeekDisplayStore = WeekDisplayState & WeekDisplayActions;

export const initWeekDisplayStore = (): WeekDisplayState => {
    return {
        initialWeek: "",
        currentWeek: "",
        isNavigating: false,
    };
};

export const defaultWeekDisplayInitState: WeekDisplayState = {
    initialWeek: "",
    currentWeek: "",
    isNavigating: false,
};

export const createWeekDisplayStore = (
    initState: WeekDisplayState = defaultWeekDisplayInitState,
) => {
    return createStore<WeekDisplayStore>()((set) => ({
        ...initState,
        setInitialWeek: (week) => set({ initialWeek: week, currentWeek: week }),
        setCurrentWeek: (week) => set({ currentWeek: week }),
        setIsNavigating: (value) => set({ isNavigating: value }),
    }));
};
