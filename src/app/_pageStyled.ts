"use client";

import styled from "@emotion/styled";

import { spacing } from "@/utils/constants/spacing";

export const PageStyled = styled.main`
    display: flex;
    flex-direction: row;
`;

export const ErrorBannerStyled = styled.div`
    background: #fff3cd;
    color: #664d03;
    border: 1px solid #ffecb5;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 12px;
`;

export const LeftRailSkeletonWrapperStyled = styled.div`
    width: 330px;
    flex-shrink: 0;
    padding: ${spacing.md}px ${spacing.md}px ${spacing.xxxl}px;
    display: grid;
`;

export const EventGridSkeletonWrapperStyled = styled.div`
    flex: 1;
    min-width: 0;
`;
