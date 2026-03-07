"use client";

import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/shallow";

import { useWeekNavigation } from "@/hooks/useWeekNavigation";
import { useWeekDisplayStore } from "@/store/currentWeek/currentWeekStoreProvider";
import { useEventsStore } from "@/store/events/eventsStoreProvider";
import {
    getCurrentWeekMonday,
    getDisplayDatesFromBaseDate,
    getLocalIsoDate,
    getMondayIsoFromBaseDate,
    parseLocalDateFromYmd,
} from "@/utils/helpers/dates";

import { DateChangeButtonStyled, DateHeaderStyled } from "./DateHeaderStyled";

interface DateHeaderProps {
    mondayDate?: Date;
}

export const DateHeader = ({ mondayDate }: DateHeaderProps) => {
    const {
        base: hookBase,
        isPending,
        isCurrentWeek: hookIsCurrentWeek,
        navigateToWeek,
    } = useWeekNavigation();

    const base = useMemo(() => {
        if (mondayDate) {
            const normalized = getMondayIsoFromBaseDate(mondayDate);
            return parseLocalDateFromYmd(normalized);
        }
        return hookBase;
    }, [mondayDate, hookBase]);

    const isCurrentWeek = useMemo(() => {
        if (!mondayDate) return hookIsCurrentWeek;
        const currentMondayISO = getLocalIsoDate(getCurrentWeekMonday());
        const baseMondayISO = getMondayIsoFromBaseDate(new Date(base));
        return baseMondayISO === currentMondayISO;
    }, [mondayDate, hookIsCurrentWeek, base]);

    const displayString = useMemo(
        () => getDisplayDatesFromBaseDate(new Date(base)),
        [base],
    );

    const [currentWeek, setCurrentWeek, setIsNavigating] = useWeekDisplayStore(
        useShallow((state) => [
            state.currentWeek,
            state.setCurrentWeek,
            state.setIsNavigating,
        ]),
    );

    const isEmptyWeek = useEventsStore((state) => state.isCurrentWeekEmpty);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.name;
        navigateToWeek(name as "next" | "previous");
    };

    useEffect(() => {
        setIsNavigating(isPending);
    }, [isPending, setIsNavigating]);

    useEffect(() => {
        setCurrentWeek(displayString);
    }, [displayString, setCurrentWeek]);

    return (
        <DateHeaderStyled style={{ opacity: isPending ? 0.5 : 1 }}>
            {!isCurrentWeek && (
                <DateChangeButtonStyled
                    name="previous"
                    aria-label="Go to previous week"
                    onClick={handleClick}
                >
                    &lt;
                </DateChangeButtonStyled>
            )}
            <span>{currentWeek}</span>
            {!isEmptyWeek && (
                <DateChangeButtonStyled
                    name="next"
                    aria-label="Go to next week"
                    onClick={handleClick}
                >
                    &gt;
                </DateChangeButtonStyled>
            )}
        </DateHeaderStyled>
    );
};
