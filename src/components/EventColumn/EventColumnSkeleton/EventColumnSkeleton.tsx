import { EventCellSkeleton } from "@/components/EventCell/EventCellSkeleton/EventCellSkeleton";
import { testingIds } from "@/testing/testingIds";
import type { Day } from "@/types/dates";
import { spacing } from "@/utils/constants/spacing";

import { SkeletonBlock } from "../../Skeleton/SkeletonBase";
import {
    EventColumnHeaderStyled,
    EventColumnStyled,
    EventDateContainerStyled,
    EventsContainerStyled,
} from "../EventColumnStyled";

interface EventColumnSkeletonProps {
    date: number;
    day: Day;
    events: Array<number>;
}

export const EventColumnSkeleton = ({ events, day }: EventColumnSkeletonProps) => {
    return (
        <EventColumnStyled $day={day} data-testid={testingIds.loading.eventColumn(day)}>
            <EventColumnHeaderStyled>
                <EventDateContainerStyled $active={undefined}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: `${spacing.xs}px`,
                        }}
                    >
                        <SkeletonBlock width={80} height={18} />
                        <SkeletonBlock width={24} height={18} />
                    </div>
                </EventDateContainerStyled>
            </EventColumnHeaderStyled>
            <EventsContainerStyled>
                {events.map((val) => (
                    <EventCellSkeleton key={`skeleton-${val}`} />
                ))}
            </EventsContainerStyled>
        </EventColumnStyled>
    );
};
