"use client";

import { COLORS } from "@/utils/constants/colors";
import { spacing } from "@/utils/constants/spacing";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const background = COLORS.skeleton.background;
const text = COLORS.skeleton.text;

const skeletonLoadingCell = keyframes`
    0% {
        background-color: ${background.dark};
    }
    100% {
        background-color: ${background.light};
    }
`;

const skeletonLoadingText = keyframes`
    0% {
        background-color: ${text.dark};
    }
    100% {
        background-color: ${text.light};
    }
`;

const commonSkeletonTextStyles = css`
    height: 16px;
    border-radius: ${spacing.sm}px;
`;

export const CellSkeletonStyled = styled.div`
    animation: ${skeletonLoadingCell} 1s linear infinite alternate;
    border-radius: ${spacing.sm}px;
    padding: ${spacing.sm}px;
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

export const HeadlineSkeletonStyled = styled.div`
    animation: ${skeletonLoadingText} 1s linear infinite alternate;
    ${commonSkeletonTextStyles}
    height: 19px;
    width: 115px;
`;

export const TimeSkeletonStyled = styled.div`
    animation: ${skeletonLoadingText} 1s linear infinite alternate;
    ${commonSkeletonTextStyles}
    width: 75px;
`;

export const LocationSkeletonStyled = styled.div`
    animation: ${skeletonLoadingText} 1s linear infinite alternate;
    ${commonSkeletonTextStyles}
    width: 125px;
`;

export const LinkSkeletonStyled = styled.div`
    animation: ${skeletonLoadingText} 1s linear infinite alternate;
    ${commonSkeletonTextStyles}
    width: 100px;
`;
