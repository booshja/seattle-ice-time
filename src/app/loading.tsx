import { PageStyled } from "./_pageStyled";

import { EventGridLoadingSkeleton } from "@/components/EventGrid/LoadingSkeleton/EventGridLoadingSkeleton";
import { LeftRailSkeleton } from "@/components/LeftRail/LeftRailSkeleton";
import { getCurrentWeekMonday, getWeekDates } from "@/utils/helpers/dates";

export default function Loading() {
    const weekDates = getWeekDates(getCurrentWeekMonday());
    return (
        <PageStyled>
            <LeftRailSkeleton />
            <EventGridLoadingSkeleton weekDates={weekDates} />
        </PageStyled>
    );
}
