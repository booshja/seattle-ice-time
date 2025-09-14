import { testingIds } from "@/testing/testingIds";

import {
    CellSkeletonStyled,
    HeadlineSkeletonStyled,
    LinkSkeletonStyled,
    LocationSkeletonStyled,
    TimeSkeletonStyled,
} from "./EventCellSkeletonStyled";

export const EventCellSkeleton = () => {
    return (
        <CellSkeletonStyled data-testid={testingIds.loading.eventCell}>
            <HeadlineSkeletonStyled />
            <TimeSkeletonStyled />
            <LocationSkeletonStyled />
            <LinkSkeletonStyled />
        </CellSkeletonStyled>
    );
};
