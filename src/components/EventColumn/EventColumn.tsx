import type { Day } from "@/types/dates";
import type { EventObject } from "@/types/events";

import { EventCell } from "../EventCell/EventCell";

import {
    EventColumnHeaderStyled,
    EventColumnStyled,
    EventDateContainerStyled,
    EventsContainerStyled,
} from "./EventColumnStyled";

interface EventColumnProps {
    date: number;
    day: Day;
    events: EventObject[];
}

export const EventColumn = ({ date, day, events }: EventColumnProps) => {
    const currentDate = new Date(Date.now()).toLocaleDateString("us-PT", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const splitDate = currentDate.split(" ");
    const currentDay = splitDate[0].split(",")[0];
    const currentDayNumber = +splitDate[2].split(",")[0];

    const active = date === currentDayNumber && day === currentDay ? "true" : undefined;

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
