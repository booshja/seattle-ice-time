import { EventCell } from "../EventCell/EventCell";

import {
    EventColumnHeaderStyled,
    EventColumnStyled,
    EventDateContainerStyled,
    EventsContainerStyled,
} from "./EventColumnStyled";

import type { Day } from "@/types/dates";
import type { EventObject } from "@/types/events";

function getTodayInfo() {
    const formatted = new Date().toLocaleDateString("us-PT", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const parts = formatted.split(" ");
    return {
        day: parts[0].split(",")[0],
        dayNumber: +parts[2].split(",")[0],
    };
}

const today = getTodayInfo();

interface EventColumnProps {
    date: number;
    day: Day;
    events: EventObject[];
}

export const EventColumn = ({ date, day, events }: EventColumnProps) => {
    const active = date === today.dayNumber && day === today.day ? "true" : undefined;

    return (
        <EventColumnStyled $day={day}>
            <EventColumnHeaderStyled>
                <EventDateContainerStyled $active={active}>
                    <p>{day}</p>
                    <p>{date}</p>
                </EventDateContainerStyled>
            </EventColumnHeaderStyled>
            <EventsContainerStyled>
                {events.map((event) => (
                    <EventCell
                        key={`${event.title}-${event.start.military}-${event.end.military}-${event.location}`}
                        color={event.color}
                        title={event.title}
                        startTime={event.start.time}
                        endTime={event.end.time}
                        location={event.location}
                        url={event?.url}
                    />
                ))}
            </EventsContainerStyled>
        </EventColumnStyled>
    );
};
