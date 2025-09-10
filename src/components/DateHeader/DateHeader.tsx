"use client";

import { getDisplayDates } from "@/utils/helpers/dates";
import { useWeekDisplayStore } from "@/store/currentWeek/currentWeekStoreProvider";
import { DateChangeButtonStyled, DateHeaderStyled } from "./DateHeaderStyled";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const DateHeader = () => {
    const displayString = getDisplayDates();

    const [currentWeek, initialWeek, setInitialWeek] = useWeekDisplayStore(
        useShallow((state) => [
            state.currentWeek,
            state.initialWeek,
            state.setInitialWeek,
            state.setCurrentWeek,
        ]),
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.name;

        if (name === "previous") {
            console.log("Previous week");
        } else {
            console.log("Next week");
        }
    };

    useEffect(() => {
        setInitialWeek(displayString);
    }, [displayString, setInitialWeek]);

    return (
        <DateHeaderStyled>
            {displayString !== initialWeek && (
                <DateChangeButtonStyled
                    name="previous"
                    aria-label="Change calendar to previous week"
                    onClick={handleClick}
                >
                    &lt;
                </DateChangeButtonStyled>
            )}
            <span>{currentWeek}</span>
            <DateChangeButtonStyled
                name="next"
                aria-label="Change calendar to next week"
                onClick={handleClick}
            >
                &gt;
            </DateChangeButtonStyled>
        </DateHeaderStyled>
    );
};
