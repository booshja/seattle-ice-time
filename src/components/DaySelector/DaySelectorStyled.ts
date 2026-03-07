"use client";

import styled from "@emotion/styled";

import { COLORS } from "@/utils/constants/colors";
import { fontWeight } from "@/utils/constants/fontSizes";
import { spacing } from "@/utils/constants/spacing";

export const DaySelectorContainerStyled = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: ${spacing.sm}px ${spacing.md}px;
    gap: ${spacing.xs}px;
    background-color: ${COLORS.background.light};
`;

export const DayTabStyled = styled.button<{ $active: boolean }>`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: ${spacing.sm}px ${spacing.xs}px;
    border: none;
    border-radius: ${spacing.sm}px;
    background-color: ${({ $active }) =>
        $active ? COLORS.text.secondary : "transparent"};
    color: ${COLORS.text.primary};
    cursor: pointer;
    min-width: 0;
    min-height: 44px;
    transition: background-color 0.15s ease;

    @media (hover: hover) {
        &:hover {
            background-color: ${COLORS.text.secondary};
        }
    }
`;

export const DayLabelStyled = styled.span`
    font-size: 11px;
    font-weight: ${fontWeight.regular};
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

export const DayNumberStyled = styled.span`
    font-size: 16px;
    font-weight: ${fontWeight.bold};
`;
