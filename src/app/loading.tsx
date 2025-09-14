import { EventGridLoadingSkeleton } from "@/components/EventGrid/LoadingSkeleton/EventGridLoadingSkeleton";
import { LeftRailSkeleton } from "@/components/LeftRail/LeftRailSkeleton";
import { spacing } from "@/utils/constants/spacing";
import { getCurrentWeekMonday, getWeekDates } from "@/utils/helpers/dates";

import { PageStyled } from "./_pageStyled";

export default function Loading() {
    const weekDates = getWeekDates(getCurrentWeekMonday());
    return (
        <PageStyled>
            <div
                style={{
                    width: 330,
                    padding: `${spacing.md}px ${spacing.md}px ${spacing.xxxl}px`,
                    display: "grid",
                }}
            >
                <LeftRailSkeleton />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <EventGridLoadingSkeleton weekDates={weekDates} />
            </div>
        </PageStyled>
    );
}
