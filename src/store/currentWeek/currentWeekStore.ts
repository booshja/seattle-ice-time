import { createStore } from "zustand/vanilla";

export type WeekDisplayState = {
    initialWeek: string;
    currentWeek: string;
};

export type WeekDisplayActions = {
    setInitialWeek: (week: string) => void;
    setCurrentWeek: (week: string) => void;
};

export type WeekDisplayStore = WeekDisplayState & WeekDisplayActions;

export const initWeekDisplayStore = (): WeekDisplayState => {
    return {
        initialWeek: "",
        currentWeek: "",
    };
};

export const defaultWeekDisplayInitState: WeekDisplayState = {
    initialWeek: "",
    currentWeek: "",
};

export const createWeekDisplayStore = (
    initState: WeekDisplayState = defaultWeekDisplayInitState
) => {
    return createStore<WeekDisplayStore>()((set) => ({
        ...initState,
        setInitialWeek: (week) => set({ initialWeek: week, currentWeek: week }),
        setCurrentWeek: (week) => set({ currentWeek: week }),
    }));
};
