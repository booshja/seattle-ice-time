"use client";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

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
`;

export const EventGridStyled = styled.div`
    background-color: ${COLORS.background.dark};
    border-radius: ${spacing.sm}px 0 0 0;
    min-height: calc(100vh - ${spacing.xxl}px);
    padding: ${spacing.xl}px ${spacing.xl}px 0 ${spacing.xl}px;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
`;

export const EmptyStateStyled = styled.div`
    grid-column: 1 / -1;
    text-align: center;
    padding: ${spacing.xl}px 0;
`;
