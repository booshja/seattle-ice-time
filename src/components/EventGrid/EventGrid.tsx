"use client";

import { EventColumn } from "../EventColumn/EventColumn";
import { EventGridStyled } from "./EventGridStyled";
// import { EventGridLoadingSkeleton } from "./LoadingSkeleton";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
// import { getSnoKingEvents } from "@/utils/helpers/snoKing";
import type { Events } from "@/types/events";
import { useRinkDisplayStore } from "@/store/rinkDisplay/rinkDisplayStoreProvider";
import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";
import { useEventsStore } from "@/store/events/eventsStoreProvider";
import {
    getCurrentWeekMonday,
    getWeekDates,
    parseLocalDateFromYmd,
    getMondayDateFromBaseDate,
} from "@/utils/helpers/dates";
import { useSearchParams } from "next/navigation";
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
    const [events, setEvents] = useState<Events | null>(null);

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
        // setKciEvents,
        // setLynnwoodEvents,
        // setOlympicviewEvents,
    } = useEventsStore(
        useShallow((state) => ({
            kciEventData: state.currentKci,
            licEventData: state.currentLynnwood,
            ovaEventData: state.currentOlympicview,
            setInitialKciEvents: state.setInitialKciEvents,
            setInitialLynnwoodEvents: state.setInitialLynnwoodEvents,
            setInitialOlympicviewEvents: state.setInitialOlympicviewEvents,
            setIsCurrentWeekEmpty: state.setIsCurrentWeekEmpty,
            setKciEvents: state.setKciEvents,
            setLynnwoodEvents: state.setLynnwoodEvents,
            setOlympicviewEvents: state.setOlympicviewEvents,
        })),
    );

    const searchParams = useSearchParams();
    const clientWeekStart = searchParams.get("weekStart");
    let base = getCurrentWeekMonday();
    if (clientWeekStart) {
        base = getMondayDateFromBaseDate(parseLocalDateFromYmd(clientWeekStart));
    } else if (weekStartIso) {
        base = getMondayDateFromBaseDate(
            parseLocalDateFromYmd(weekStartIso.split("T")[0]),
        );
    }
    const weekDates = getWeekDates(base);

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

    useEffect(() => {
        const eventsResults = parseEvents({
            kciEvents: showKci ? kciEventData : undefined,
            licEvents: showLynnwood ? licEventData : undefined,
            ovaEvents: showOva ? ovaEventData : undefined,
        });

        setEvents(eventsResults);
        const empty =
            eventsResults.Monday.length === 0 &&
            eventsResults.Tuesday.length === 0 &&
            eventsResults.Wednesday.length === 0 &&
            eventsResults.Thursday.length === 0 &&
            eventsResults.Friday.length === 0 &&
            eventsResults.Saturday.length === 0 &&
            eventsResults.Sunday.length === 0;
        setIsCurrentWeekEmpty(empty);
    }, [
        showKci,
        showLynnwood,
        showOva,
        kciEventData,
        licEventData,
        ovaEventData,
        setIsCurrentWeekEmpty,
    ]);

    // if (loading) {
    //     return <EventGridLoadingSkeleton weekDates={weekDates} />;
    // }

    // if (error) {
    //     // TODO: Add error handling
    //     return <div>Error</div>;
    // }

    const isEmpty =
        !!events &&
        events.Monday.length === 0 &&
        events.Tuesday.length === 0 &&
        events.Wednesday.length === 0 &&
        events.Thursday.length === 0 &&
        events.Friday.length === 0 &&
        events.Saturday.length === 0 &&
        events.Sunday.length === 0;

    return (
        <EventGridStyled>
            {events && !isEmpty && (
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
            {events && isEmpty && (
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
