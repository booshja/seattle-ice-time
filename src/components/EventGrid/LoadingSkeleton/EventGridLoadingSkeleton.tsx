import { EventColumnSkeleton } from "@/components/EventColumn";
import { EventGridStyled } from "../EventGridStyled";

interface EventGridLoadingSkeletonProps {
    weekDates: number[];
}

export const EventGridLoadingSkeleton = ({
    weekDates,
}: EventGridLoadingSkeletonProps) => {
    return (
        <EventGridStyled>
            <EventColumnSkeleton day="Monday" date={weekDates[0]} events={[1, 2]} />
            <EventColumnSkeleton
                day="Tuesday"
                date={weekDates[1]}
                events={[1, 2, 3, 4]}
            />
            <EventColumnSkeleton day="Wednesday" date={weekDates[2]} events={[1, 2]} />
            <EventColumnSkeleton day="Thursday" date={weekDates[3]} events={[]} />
            <EventColumnSkeleton
                day="Friday"
                date={weekDates[4]}
                events={[1, 2, 3, 4, 5]}
            />
            <EventColumnSkeleton day="Saturday" date={weekDates[5]} events={[1]} />
            <EventColumnSkeleton day="Sunday" date={weekDates[6]} events={[1, 2]} />
        </EventGridStyled>
    );
};
