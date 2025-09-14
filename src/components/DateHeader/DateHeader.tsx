"use client";

import {
    getCurrentWeekMonday,
    getDisplayDatesFromBaseDate,
    getMondayIsoFromBaseDate,
    parseLocalDateFromYmd,
    getLocalIsoDate,
} from "@/utils/helpers/dates";
import { useWeekDisplayStore } from "@/store/currentWeek/currentWeekStoreProvider";
import { DateChangeButtonStyled, DateHeaderStyled } from "./DateHeaderStyled";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEventsStore } from "@/store/events/eventsStoreProvider";

export const DateHeader = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const weekStartParam = searchParams.get("weekStart");
    const base = useMemo(() => {
        if (weekStartParam) {
            // Parse as local date (Y-M-D) and normalize to Monday
            const normalized = getMondayIsoFromBaseDate(
                parseLocalDateFromYmd(weekStartParam),
            );
            return parseLocalDateFromYmd(normalized);
        }
        return getCurrentWeekMonday();
    }, [weekStartParam]);
    const displayString = useMemo(
        () => getDisplayDatesFromBaseDate(new Date(base)),
        [base],
    );

    const [currentWeek, initialWeek, setInitialWeek, setCurrentWeek] =
        useWeekDisplayStore(
            useShallow((state) => [
                state.currentWeek,
                state.initialWeek,
                state.setInitialWeek,
                state.setCurrentWeek,
            ]),
        );

    const isEmptyWeek = useEventsStore((state) => state.isCurrentWeekEmpty);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.name;
        const currentMonday = getCurrentWeekMonday();
        const currentMondayISO = getLocalIsoDate(currentMonday);
        const currentBase = new Date(base);
        const nextBase = new Date(currentBase);
        if (name === "previous") {
            nextBase.setDate(nextBase.getDate() - 7);
        } else {
            nextBase.setDate(nextBase.getDate() + 7);
        }
        const nextMondayISO = getMondayIsoFromBaseDate(new Date(nextBase));
        if (name === "previous" && nextMondayISO <= currentMondayISO) {
            router.push(`${pathname}`);
            return;
        }
        const params = new URLSearchParams(searchParams.toString());
        params.set("weekStart", nextMondayISO);
        router.push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        setInitialWeek(getDisplayDatesFromBaseDate(getCurrentWeekMonday()));
    }, [setInitialWeek]);

    useEffect(() => {
        setCurrentWeek(displayString);
    }, [displayString, setCurrentWeek]);

    return (
        <DateHeaderStyled>
            {displayString !== initialWeek && (
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
