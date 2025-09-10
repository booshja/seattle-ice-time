"use client";

import styled from "styled-components";
import { COLORS } from "@/utils/constants/colors";
import { spacing } from "@/utils/constants/spacing";

export const EventGridStyled = styled.div`
    background-color: ${COLORS.background.dark};
    border-radius: ${spacing.sm}px 0 0 0;
    min-height: calc(100vh - ${spacing.xxl}px);
    padding: ${spacing.xl}px ${spacing.xl}px 0 ${spacing.xl}px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;
