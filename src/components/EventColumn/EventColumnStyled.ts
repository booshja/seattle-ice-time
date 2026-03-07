"use client";

import styled from "@emotion/styled";

import { mq } from "@/utils/constants/breakpoints";
import { COLORS } from "@/utils/constants/colors";
import { fontWeight } from "@/utils/constants/fontSizes";
import { spacing } from "@/utils/constants/spacing";

import type { Day } from "@/types/dates";

export const EventColumnStyled = styled.div<{ $day: Day }>`
    border-left: 1px solid ${COLORS.text.secondary};
    ${({ $day }) => {
        if ($day === "Sunday") {
            return `border-right: 1px solid ${COLORS.text.secondary}`;
        }
    }};

    ${mq.mobile} {
        border-left: none;
        border-right: none;
    }
`;

export const EventColumnHeaderStyled = styled.div`
    border-bottom: 1px solid ${COLORS.text.secondary};
    padding: ${spacing.sm}px;

    ${mq.mobile} {
        display: none;
    }
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

    ${mq.tablet} {
        & > p {
            font-size: ${spacing.md}px;
        }
    }
`;

export const EventsContainerStyled = styled.div`
    padding: ${spacing.sm}px;
    display: flex;
    flex-direction: column;
    gap: ${spacing.sm}px;

    ${mq.mobile} {
        padding: ${spacing.md}px;
    }
`;
