import {
    CellSkeletonStyled,
    HeadlineSkeletonStyled,
    LinkSkeletonStyled,
    LocationSkeletonStyled,
    TimeSkeletonStyled,
} from "./EventCellSkeletonStyled";

export const EventCellSkeleton = () => {
    return (
        <CellSkeletonStyled>
            <HeadlineSkeletonStyled />
            <TimeSkeletonStyled />
            <LocationSkeletonStyled />
            <LinkSkeletonStyled />
        </CellSkeletonStyled>
    );
};
