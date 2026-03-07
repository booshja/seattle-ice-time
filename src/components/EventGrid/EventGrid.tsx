"use client";

import { useEffect, useMemo, useRef, useCallback, Suspense, lazy } from "react";
import { useShallow } from "zustand/shallow";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useWeekNavigation } from "@/hooks/useWeekNavigation";
import { useWeekDisplayStore } from "@/store/currentWeek/currentWeekStoreProvider";
import { useEventsStore } from "@/store/events/eventsStoreProvider";
import { useRinkDisplayStore } from "@/store/rinkDisplay/rinkDisplayStoreProvider";
import { useSelectedDayStore } from "@/store/selectedDay/selectedDayStoreProvider";
import { RINKS } from "@/utils/constants/rinks";
import {
    getCurrentWeekMonday,
    getWeekDates,
    parseLocalDateFromYmd,
    getMondayDateFromBaseDate,
} from "@/utils/helpers/dates";
import { parseEvents } from "@/utils/helpers/parseEvents";

import { DateHeaderSkeleton } from "../DateHeader/DateHeaderSkeleton";
import { DaySelector } from "../DaySelector/DaySelector";
import { EventColumn } from "../EventColumn/EventColumn";

import {
    EmptyStateStyled,
    EventGridOverlayStyled,
    EventGridStyled,
    EventGridWrapperStyled,
    MobileDateHeaderWrapperStyled,
} from "./EventGridStyled";

import type { Day } from "@/types/dates";
import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";
import type { SnoKingEventObject } from "@/types/snoKing";

const DateHeaderLazy = lazy(() =>
    import("../DateHeader/DateHeader").then((m) => ({ default: m.DateHeader })),
);

const PACIFIC_TZ = "America/Los_Angeles";
const DAYS: Day[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
const SWIPE_THRESHOLD = 50;
const EDGE_MARGIN = 20;

function getTodayColumnIndex(weekBase: Date): number {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: PACIFIC_TZ,
        year: "numeric",
        month: "numeric",
        day: "numeric",
    }).formatToParts(new Date());
    const todayYear = +parts.find((p) => p.type === "year")!.value;
    const todayMonth = +parts.find((p) => p.type === "month")!.value;
    const todayDay = +parts.find((p) => p.type === "day")!.value;

    for (let i = 0; i < 7; i++) {
        const colDate = new Date(weekBase);
        colDate.setDate(weekBase.getDate() + i);
        if (
            colDate.getFullYear() === todayYear &&
            colDate.getMonth() + 1 === todayMonth &&
            colDate.getDate() === todayDay
        ) {
            return i;
        }
    }
    return -1;
}

interface EventGridProps {
    kciEvents: Array<KciEventObject>;
    licEvents: Array<LicOvaEventObject>;
    ovaEvents: Array<LicOvaEventObject>;
    snoKingEvents: Array<SnoKingEventObject>;
    weekStartIso?: string;
}

export const EventGrid = ({
    kciEvents,
    licEvents,
    ovaEvents,
    snoKingEvents,
    weekStartIso,
}: EventGridProps) => {
    const tier = useMediaQuery();
    const isMobile = tier === "mobile";
    const isNavigating = useWeekDisplayStore((state) => state.isNavigating);
    const setIsNavigating = useWeekDisplayStore((state) => state.setIsNavigating);
    const selectedIndex = useSelectedDayStore((state) => state.selectedIndex);
    const setSelectedIndex = useSelectedDayStore((state) => state.setSelectedIndex);
    const nextDay = useSelectedDayStore((state) => state.next);
    const prevDay = useSelectedDayStore((state) => state.prev);

    const { navigateToWeek, isCurrentWeek, isPending } = useWeekNavigation();

    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const swipeNavigatedRef = useRef(false);

    const [showKci, showLynnwood, showOva, showRenton, showKirkland, showSnoqualmie] =
        useRinkDisplayStore(
            useShallow((state) => [
                state.KCI,
                state.LYNNWOOD,
                state.OVA,
                state.RENTON,
                state.KIRKLAND,
                state.SNOQUALMIE,
            ]),
        );
    const {
        kciEventData,
        licEventData,
        ovaEventData,
        snoKingEventData,
        setInitialKciEvents,
        setInitialLynnwoodEvents,
        setInitialOlympicviewEvents,
        setInitialSnoKingEvents,
        setIsCurrentWeekEmpty,
        isCurrentWeekEmpty,
    } = useEventsStore(
        useShallow((state) => ({
            kciEventData: state.currentKci,
            licEventData: state.currentLynnwood,
            ovaEventData: state.currentOlympicview,
            snoKingEventData: state.currentSnoKing,
            setInitialKciEvents: state.setInitialKciEvents,
            setInitialLynnwoodEvents: state.setInitialLynnwoodEvents,
            setInitialOlympicviewEvents: state.setInitialOlympicviewEvents,
            setInitialSnoKingEvents: state.setInitialSnoKingEvents,
            setIsCurrentWeekEmpty: state.setIsCurrentWeekEmpty,
            isCurrentWeekEmpty: state.isCurrentWeekEmpty,
        })),
    );

    const base = useMemo(() => {
        if (weekStartIso) {
            return getMondayDateFromBaseDate(
                parseLocalDateFromYmd(weekStartIso.split("T")[0]),
            );
        }
        return getCurrentWeekMonday();
    }, [weekStartIso]);

    const weekDates = useMemo(() => getWeekDates(base), [base]);
    const todayColumnIndex = useMemo(() => getTodayColumnIndex(base), [base]);

    useEffect(() => {
        if (swipeNavigatedRef.current) {
            swipeNavigatedRef.current = false;
            return;
        }
        if (isMobile && todayColumnIndex >= 0) {
            setSelectedIndex(todayColumnIndex);
        }
    }, [isMobile, todayColumnIndex, setSelectedIndex]);

    useEffect(() => {
        setInitialKciEvents(kciEvents);
        setInitialLynnwoodEvents(licEvents);
        setInitialOlympicviewEvents(ovaEvents);
        setInitialSnoKingEvents(snoKingEvents);
    }, [
        kciEvents,
        licEvents,
        ovaEvents,
        snoKingEvents,
        setInitialKciEvents,
        setInitialLynnwoodEvents,
        setInitialOlympicviewEvents,
        setInitialSnoKingEvents,
    ]);

    const effectiveKci = kciEventData.length > 0 ? kciEventData : kciEvents;
    const effectiveLic = licEventData.length > 0 ? licEventData : licEvents;
    const effectiveOva = ovaEventData.length > 0 ? ovaEventData : ovaEvents;
    const effectiveSnoKing =
        snoKingEventData.length > 0 ? snoKingEventData : snoKingEvents;

    const filteredSnoKing = useMemo(() => {
        if (!showRenton && !showKirkland && !showSnoqualmie) return undefined;
        return effectiveSnoKing.filter((event) => {
            if (event.location === RINKS.RENTON.name) return showRenton;
            if (event.location === RINKS.KIRKLAND.name) return showKirkland;
            if (event.location === RINKS.SNOQUALMIE.name) return showSnoqualmie;
            return false;
        });
    }, [effectiveSnoKing, showRenton, showKirkland, showSnoqualmie]);

    const events = useMemo(
        () =>
            parseEvents({
                kciEvents: showKci ? effectiveKci : undefined,
                licEvents: showLynnwood ? effectiveLic : undefined,
                ovaEvents: showOva ? effectiveOva : undefined,
                snoKingEvents: filteredSnoKing,
            }),
        [
            showKci,
            showLynnwood,
            showOva,
            effectiveKci,
            effectiveLic,
            effectiveOva,
            filteredSnoKing,
        ],
    );

    const isEmpty =
        events.Monday.length === 0 &&
        events.Tuesday.length === 0 &&
        events.Wednesday.length === 0 &&
        events.Thursday.length === 0 &&
        events.Friday.length === 0 &&
        events.Saturday.length === 0 &&
        events.Sunday.length === 0;

    useEffect(() => {
        setIsCurrentWeekEmpty(isEmpty);
    }, [isEmpty, setIsCurrentWeekEmpty]);

    useEffect(() => {
        setIsNavigating(isPending);
    }, [isPending, setIsNavigating]);

    const handleTouchStart = useCallback(
        (e: React.TouchEvent) => {
            if (!isMobile) return;
            const touch = e.touches[0];
            if (
                touch.clientX < EDGE_MARGIN ||
                touch.clientX > window.innerWidth - EDGE_MARGIN
            ) {
                return;
            }
            touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        },
        [isMobile],
    );

    const handleTouchEnd = useCallback(
        (e: React.TouchEvent) => {
            if (!isMobile || !touchStartRef.current) return;
            const touch = e.changedTouches[0];
            const dx = touch.clientX - touchStartRef.current.x;
            const dy = touch.clientY - touchStartRef.current.y;
            touchStartRef.current = null;
            if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return;
            if (dx < 0) {
                if (selectedIndex === 6 && !isCurrentWeekEmpty) {
                    swipeNavigatedRef.current = true;
                    navigateToWeek("next");
                    setSelectedIndex(0);
                } else {
                    nextDay();
                }
            } else {
                if (selectedIndex === 0 && !isCurrentWeek) {
                    swipeNavigatedRef.current = true;
                    navigateToWeek("previous");
                    setSelectedIndex(6);
                } else {
                    prevDay();
                }
            }
        },
        [
            isMobile,
            nextDay,
            prevDay,
            selectedIndex,
            isCurrentWeekEmpty,
            isCurrentWeek,
            navigateToWeek,
            setSelectedIndex,
        ],
    );

    const renderColumns = () => {
        if (isEmpty) {
            return (
                <EmptyStateStyled role="status" aria-live="polite">
                    No events are scheduled for this week. Go back a week or refresh the
                    page.
                </EmptyStateStyled>
            );
        }

        if (isMobile) {
            const day = DAYS[selectedIndex];
            return (
                <EventColumn
                    day={day}
                    date={weekDates[selectedIndex]}
                    events={events[day]}
                    isToday={todayColumnIndex === selectedIndex}
                />
            );
        }

        return DAYS.map((day, index) => (
            <EventColumn
                key={day}
                day={day}
                date={weekDates[index]}
                events={events[day]}
                isToday={todayColumnIndex === index}
            />
        ));
    };

    return (
        <EventGridWrapperStyled
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {isMobile && (
                <>
                    <MobileDateHeaderWrapperStyled>
                        <Suspense fallback={<DateHeaderSkeleton />}>
                            <DateHeaderLazy />
                        </Suspense>
                    </MobileDateHeaderWrapperStyled>
                    <DaySelector weekDates={weekDates} />
                </>
            )}
            {isNavigating && <EventGridOverlayStyled />}
            <EventGridStyled>{renderColumns()}</EventGridStyled>
        </EventGridWrapperStyled>
    );
};
