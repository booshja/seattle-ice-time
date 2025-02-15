import { Day } from "@/types";
import {
    EventColumnHeaderStyled,
    EventColumnStyled,
    EventDateContainerStyled,
    EventsContainerStyled,
} from "../EventColumnStyled";
import { EventCellSkeleton } from "@/components/EventCell";

interface EventColumnSkeletonProps {
    date: number;
    day: Day;
    events: Array<number>;
}

export const EventColumnSkeleton = ({
    events,
    day,
    date,
}: EventColumnSkeletonProps) => {
    return (
        <EventColumnStyled $day={day}>
            <EventColumnHeaderStyled>
                <EventDateContainerStyled $active={undefined}>
                    <p>{day}</p>
                    <p>{date}</p>
                </EventDateContainerStyled>
            </EventColumnHeaderStyled>
            <EventsContainerStyled>
                {events.map((_, index) => (
                    <EventCellSkeleton key={index} />
                ))}
            </EventsContainerStyled>
        </EventColumnStyled>
    );
};
