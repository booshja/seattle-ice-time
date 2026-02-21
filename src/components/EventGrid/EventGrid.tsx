"use client";

import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/shallow";

import { useWeekDisplayStore } from "@/store/currentWeek/currentWeekStoreProvider";
import { useEventsStore } from "@/store/events/eventsStoreProvider";
import { useRinkDisplayStore } from "@/store/rinkDisplay/rinkDisplayStoreProvider";
import { RINKS } from "@/utils/constants/rinks";
import {
    getCurrentWeekMonday,
    getWeekDates,
    parseLocalDateFromYmd,
    getMondayDateFromBaseDate,
} from "@/utils/helpers/dates";
import { parseEvents } from "@/utils/helpers/parseEvents";

import { EventColumn } from "../EventColumn/EventColumn";

import {
    EmptyStateStyled,
    EventGridOverlayStyled,
    EventGridStyled,
    EventGridWrapperStyled,
} from "./EventGridStyled";

import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";
import type { SnoKingEventObject } from "@/types/snoKing";

const PACIFIC_TZ = "America/Los_Angeles";

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
    const isNavigating = useWeekDisplayStore((state) => state.isNavigating);

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

    return (
        <EventGridWrapperStyled>
            {isNavigating && <EventGridOverlayStyled />}
            <EventGridStyled>
                {!isEmpty && (
                    <>
                        <EventColumn
                            day="Monday"
                            date={weekDates[0]}
                            events={events.Monday}
                            isToday={todayColumnIndex === 0}
                        />
                        <EventColumn
                            day="Tuesday"
                            date={weekDates[1]}
                            events={events.Tuesday}
                            isToday={todayColumnIndex === 1}
                        />
                        <EventColumn
                            day="Wednesday"
                            date={weekDates[2]}
                            events={events.Wednesday}
                            isToday={todayColumnIndex === 2}
                        />
                        <EventColumn
                            day="Thursday"
                            date={weekDates[3]}
                            events={events.Thursday}
                            isToday={todayColumnIndex === 3}
                        />
                        <EventColumn
                            day="Friday"
                            date={weekDates[4]}
                            events={events.Friday}
                            isToday={todayColumnIndex === 4}
                        />
                        <EventColumn
                            day="Saturday"
                            date={weekDates[5]}
                            events={events.Saturday}
                            isToday={todayColumnIndex === 5}
                        />
                        <EventColumn
                            day="Sunday"
                            date={weekDates[6]}
                            events={events.Sunday}
                            isToday={todayColumnIndex === 6}
                        />
                    </>
                )}
                {isEmpty && (
                    <EmptyStateStyled role="status" aria-live="polite">
                        No events are scheduled for this week. Go back a week or refresh
                        the page.
                    </EmptyStateStyled>
                )}
            </EventGridStyled>
        </EventGridWrapperStyled>
    );
};
