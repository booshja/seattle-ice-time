"use client";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { mq } from "@/utils/constants/breakpoints";
import { COLORS } from "@/utils/constants/colors";
import { spacing } from "@/utils/constants/spacing";

export const EventGridWrapperStyled = styled.div`
    position: relative;
    flex: 1;
    min-width: 0;
`;

const shimmer = keyframes`
    0% { opacity: 0.45; }
    50% { opacity: 0.7; }
    100% { opacity: 0.45; }
`;

export const EventGridOverlayStyled = styled.div`
    position: absolute;
    inset: 0;
    background-color: ${COLORS.background.dark};
    opacity: 0.45;
    z-index: 1;
    border-radius: ${spacing.sm}px 0 0 0;
    pointer-events: none;
    animation: ${shimmer} 1.5s ease-in-out infinite;

    ${mq.mobile} {
        border-radius: 0;
    }
`;

export const EventGridStyled = styled.div`
    background-color: ${COLORS.background.dark};
    border-radius: ${spacing.sm}px 0 0 0;
    min-height: calc(100vh - ${spacing.xxl}px);
    padding: ${spacing.xl}px ${spacing.xl}px 0 ${spacing.xl}px;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));

    ${mq.tablet} {
        padding: ${spacing.md}px ${spacing.md}px 0 ${spacing.md}px;
    }

    ${mq.mobile} {
        grid-template-columns: 1fr;
        padding: ${spacing.sm}px ${spacing.sm}px 0 ${spacing.sm}px;
        border-radius: 0;
        min-height: calc(100vh - 160px);
    }
`;

export const MobileDateHeaderWrapperStyled = styled.div`
    display: flex;
    justify-content: center;
    padding: ${spacing.sm}px 0;
    background-color: ${COLORS.background.light};
`;

export const SkeletonMobileHideStyled = styled.div`
    display: contents;

    ${mq.mobile} {
        & > :not(:first-child) {
            display: none;
        }
    }
`;

export const EmptyStateStyled = styled.div`
    grid-column: 1 / -1;
    text-align: center;
    padding: ${spacing.xl}px 0;
`;
