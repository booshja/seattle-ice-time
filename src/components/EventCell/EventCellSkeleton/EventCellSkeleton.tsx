import {
    CellSkeletonStyled,
    HeadlineSkeletonStyled,
    LinkSkeletonStyled,
    LocationSkeletonStyled,
    TimeSkeletonStyled,
} from "./EventCellSkeletonStyled";
import { testingIds } from "@/testing/testingIds";

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
