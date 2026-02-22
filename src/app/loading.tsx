import { EventGridLoadingSkeleton } from "@/components/EventGrid/LoadingSkeleton/EventGridLoadingSkeleton";
import { LeftRailSkeleton } from "@/components/LeftRail/LeftRailSkeleton";
import { getCurrentWeekMonday, getWeekDates } from "@/utils/helpers/dates";

import { ContentStyled, PageStyled } from "./_pageStyled";

export default function Loading() {
    const weekDates = getWeekDates(getCurrentWeekMonday());
    return (
        <PageStyled>
            <ContentStyled>
                <LeftRailSkeleton />
                <EventGridLoadingSkeleton weekDates={weekDates} />
            </ContentStyled>
        </PageStyled>
    );
}
