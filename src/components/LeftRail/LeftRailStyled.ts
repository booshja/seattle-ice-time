"use client";

import styled from "@emotion/styled";

import { mq } from "@/utils/constants/breakpoints";
import { COLORS } from "@/utils/constants/colors";
import { spacing } from "@/utils/constants/spacing";

export const LeftRailStyled = styled.aside<{ $collapsed?: boolean }>`
    width: 275px;
    flex-shrink: 0;
    padding: ${spacing.md}px ${spacing.md}px ${spacing.xxxl}px;
    display: grid;
    align-content: start;
    transition: width 0.2s ease;

    ${mq.mobile} {
        display: none;
    }

    ${mq.tablet} {
        width: ${({ $collapsed }) => ($collapsed ? "40px" : "220px")};
        padding: ${({ $collapsed }) =>
            $collapsed
                ? `${spacing.md}px 0`
                : `${spacing.md}px ${spacing.md}px ${spacing.xxxl}px`};
        overflow: hidden;
    }
`;

export const LeftRailContentStyled = styled.div<{ $collapsed?: boolean }>`
    display: ${({ $collapsed }) => ($collapsed ? "none" : "contents")};
`;

export const CollapseToggleStyled = styled.button`
    display: none;
    background: transparent;
    border: none;
    color: ${COLORS.text.primary};
    cursor: pointer;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    font-size: ${spacing.md}px;

    ${mq.tablet} {
        display: flex;
    }
`;
