import { EventCell } from "../EventCell/EventCell";

import {
    EventColumnHeaderStyled,
    EventColumnStyled,
    EventDateContainerStyled,
    EventsContainerStyled,
} from "./EventColumnStyled";

import type { Day } from "@/types/dates";
import type { EventObject } from "@/types/events";

interface EventColumnProps {
    date: number;
    day: Day;
    events: EventObject[];
    isToday?: boolean;
}

export const EventColumn = ({ date, day, events, isToday }: EventColumnProps) => {
    const active = isToday ? "true" : undefined;

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
                        key={event.id}
                        color={event.color}
                        title={event.title}
                        startTime={event.start.time}
                        endTime={event.end.time}
                        location={
                            event.sheet
                                ? `${event.location} (${event.sheet})`
                                : event.location
                        }
                        url={event?.url}
                    />
                ))}
            </EventsContainerStyled>
        </EventColumnStyled>
    );
};
