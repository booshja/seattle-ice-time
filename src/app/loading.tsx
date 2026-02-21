import {
    EventGridSkeletonWrapperStyled,
    LeftRailSkeletonWrapperStyled,
    PageStyled,
} from "./_pageStyled";

import { EventGridLoadingSkeleton } from "@/components/EventGrid/LoadingSkeleton/EventGridLoadingSkeleton";
import { LeftRailSkeleton } from "@/components/LeftRail/LeftRailSkeleton";
import { getCurrentWeekMonday, getWeekDates } from "@/utils/helpers/dates";

export default function Loading() {
    const weekDates = getWeekDates(getCurrentWeekMonday());
    return (
        <PageStyled>
            <LeftRailSkeletonWrapperStyled>
                <LeftRailSkeleton />
            </LeftRailSkeletonWrapperStyled>
            <EventGridSkeletonWrapperStyled>
                <EventGridLoadingSkeleton weekDates={weekDates} />
            </EventGridSkeletonWrapperStyled>
        </PageStyled>
    );
}
