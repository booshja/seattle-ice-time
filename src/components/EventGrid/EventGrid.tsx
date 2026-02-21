"use client";

import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/shallow";

import { EventColumn } from "../EventColumn/EventColumn";

import { EventGridStyled } from "./EventGridStyled";

import { useEventsStore } from "@/store/events/eventsStoreProvider";
import { useRinkDisplayStore } from "@/store/rinkDisplay/rinkDisplayStoreProvider";
import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";
import {
    getCurrentWeekMonday,
    getWeekDates,
    parseLocalDateFromYmd,
    getMondayDateFromBaseDate,
} from "@/utils/helpers/dates";
import { parseEvents } from "@/utils/helpers/parseEvents";

interface EventGridProps {
    kciEvents: Array<KciEventObject>;
    licEvents: Array<LicOvaEventObject>;
    ovaEvents: Array<LicOvaEventObject>;
    weekStartIso?: string;
}

export const EventGrid = ({
    kciEvents,
    licEvents,
    ovaEvents,
    weekStartIso,
}: EventGridProps) => {
    const [showKci, showLynnwood, showOva] = useRinkDisplayStore(
        useShallow((state) => [state.KCI, state.LYNNWOOD, state.OVA]),
    );
    const {
        kciEventData,
        licEventData,
        ovaEventData,
        setInitialKciEvents,
        setInitialLynnwoodEvents,
        setInitialOlympicviewEvents,
        setIsCurrentWeekEmpty,
    } = useEventsStore(
        useShallow((state) => ({
            kciEventData: state.currentKci,
            licEventData: state.currentLynnwood,
            ovaEventData: state.currentOlympicview,
            setInitialKciEvents: state.setInitialKciEvents,
            setInitialLynnwoodEvents: state.setInitialLynnwoodEvents,
            setInitialOlympicviewEvents: state.setInitialOlympicviewEvents,
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

    useEffect(() => {
        setInitialKciEvents(kciEvents);
        setInitialLynnwoodEvents(licEvents);
        setInitialOlympicviewEvents(ovaEvents);
    }, [
        kciEvents,
        licEvents,
        ovaEvents,
        setInitialKciEvents,
        setInitialLynnwoodEvents,
        setInitialOlympicviewEvents,
    ]);

    const events = useMemo(
        () =>
            parseEvents({
                kciEvents: showKci ? kciEventData : undefined,
                licEvents: showLynnwood ? licEventData : undefined,
                ovaEvents: showOva ? ovaEventData : undefined,
            }),
        [showKci, showLynnwood, showOva, kciEventData, licEventData, ovaEventData],
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
        <EventGridStyled>
            {!isEmpty && (
                <>
                    <EventColumn
                        day="Monday"
                        date={weekDates[0]}
                        events={events.Monday}
                    />
                    <EventColumn
                        day="Tuesday"
                        date={weekDates[1]}
                        events={events.Tuesday}
                    />
                    <EventColumn
                        day="Wednesday"
                        date={weekDates[2]}
                        events={events.Wednesday}
                    />
                    <EventColumn
                        day="Thursday"
                        date={weekDates[3]}
                        events={events.Thursday}
                    />
                    <EventColumn
                        day="Friday"
                        date={weekDates[4]}
                        events={events.Friday}
                    />
                    <EventColumn
                        day="Saturday"
                        date={weekDates[5]}
                        events={events.Saturday}
                    />
                    <EventColumn
                        day="Sunday"
                        date={weekDates[6]}
                        events={events.Sunday}
                    />
                </>
            )}
            {isEmpty && (
                <div
                    role="status"
                    aria-live="polite"
                    style={{ textAlign: "center", width: "100%", padding: "24px 0" }}
                >
                    No events are scheduled for this week. Go back a week or refresh the
                    page.
                </div>
            )}
        </EventGridStyled>
    );
};
