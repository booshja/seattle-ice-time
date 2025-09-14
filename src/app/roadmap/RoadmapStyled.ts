"use client";

import styled from "styled-components";
import { COLORS } from "@/utils/constants/colors";
import { spacing } from "@/utils/constants/spacing";
import { fontWeight } from "@/utils/constants/fontSizes";

export const RoadmapContainer = styled.main`
    max-width: 960px;
    margin: 0 auto;
    padding: ${spacing.lg}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${spacing.sm}px;

    a {
        color: inherit;
        font-weight: ${fontWeight.bold};
    }
`;

export const RoadmapHeading = styled.h1`
    font-size: ${spacing.xl}px;
    color: ${COLORS.text.primary};
    margin-bottom: ${spacing.md}px;
    text-align: center;
`;

export const RoadmapIntro = styled.p`
    margin-bottom: ${spacing.lg}px;
    color: ${COLORS.text.primary};
    text-align: center;
`;

export const RoadmapList = styled.ol`
    padding-left: ${spacing.lg}px;
    display: grid;
    gap: ${spacing.sm}px;
    margin: 0 auto;
    text-align: left;
`;
