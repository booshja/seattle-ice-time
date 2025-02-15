"use client";

import { EventColumn } from "../EventColumn";
import { EventGridStyled } from "./EventGridStyled";
// import { EventGridLoadingSkeleton } from "./LoadingSkeleton";
import { getWeekDates, parseEvents } from "@/utils/helpers";
import { useEventsStore, useRinkDisplayStore } from "@/store";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
// import { getSnoKingEvents } from "@/utils/helpers/snoKing";
import type { Events } from "@/types/events";
import { KciEventObject, LicOvaEventObject } from "@/types";

interface EventGridProps {
    kciEvents: Array<KciEventObject>;
    licEvents: Array<LicOvaEventObject>;
    ovaEvents: Array<LicOvaEventObject>;
}

export const EventGrid = ({ kciEvents, licEvents, ovaEvents }: EventGridProps) => {
    const [events, setEvents] = useState<Events | null>(null);

    const [showKci, showLynnwood, showOva] = useRinkDisplayStore(
        useShallow((state) => [state.KCI, state.LYNNWOOD, state.OVA])
    );
    const {
        kciEventData,
        licEventData,
        ovaEventData,
        setInitialKciEvents,
        setInitialLynnwoodEvents,
        setInitialOlympicviewEvents,
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
            setKciEvents: state.setKciEvents,
            setLynnwoodEvents: state.setLynnwoodEvents,
            setOlympicviewEvents: state.setOlympicviewEvents,
        }))
    );

    const monday = new Date();
    const day = monday.getDay() || 7;
    if (day !== 1) monday.setHours(-24 * (day - 1));
    const weekDates = getWeekDates(monday);

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
    }, [showKci, showLynnwood, showOva, kciEventData, licEventData, ovaEventData]);

    // if (loading) {
    //     return <EventGridLoadingSkeleton weekDates={weekDates} />;
    // }

    // if (error) {
    //     // TODO: Add error handling
    //     return <div>Error</div>;
    // }

    return (
        <EventGridStyled>
            {events && (
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
        </EventGridStyled>
    );
};
