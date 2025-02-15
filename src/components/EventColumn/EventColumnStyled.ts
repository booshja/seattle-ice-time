"use client";

import styled from "styled-components";
import { COLORS, fontWeight, spacing } from "@/utils/constants";
import type { Day } from "@/types";

export const EventColumnStyled = styled.div<{ $day: Day }>`
    border-left: 1px solid ${COLORS.text.secondary};
    ${({ $day }) => {
        if ($day === "Sunday") {
            return `border-right: 1px solid ${COLORS.text.secondary}`;
        }
    }};
`;

export const EventColumnHeaderStyled = styled.div`
    border-bottom: 1px solid ${COLORS.text.secondary};
    padding: ${spacing.sm}px;
`;

export const EventDateContainerStyled = styled.div<{ $active: "true" | undefined }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${spacing.sm}px;

    ${({ $active }) => {
        if ($active === "true") {
            return `
                background-color: ${COLORS.text.secondary};
                border-radius: ${spacing.md}px;
            `;
        }
    }}

    & > p {
        font-size: ${spacing.lg}px;
        font-weight: ${fontWeight.bold};
    }
`;

export const EventsContainerStyled = styled.div`
    padding: ${spacing.sm}px;
    display: flex;
    flex-direction: column;
    gap: ${spacing.sm}px;
`;
