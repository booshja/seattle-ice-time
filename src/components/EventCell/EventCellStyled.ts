"use client";

import { fontWeight } from "@/utils/constants/fontSizes";
import { lineHeight } from "@/utils/constants/fontSizes";
import { spacing } from "@/utils/constants/spacing";
import styled from "styled-components";

export const EventCellStyled = styled.div<{ color: string }>`
    border-radius: ${spacing.sm}px;
    background-color: ${({ color }) => color};
    padding: ${spacing.sm}px;
    color: #000000;

    & > p:not(:is(:first-of-type)) {
        font-size: 12px;
    }

    & > p:first-of-type {
        font-size: ${spacing.md}px;
        line-height: ${lineHeight.md}px;
        font-weight: ${fontWeight.bold};
    }
`;

export const RegistrationLinkStyled = styled.a`
    font-size: 12px;
    line-height: ${lineHeight.md}px;
    font-weight: ${fontWeight.bold};
    color: #000000;
    text-decoration: underline;
    margin-top: ${spacing.xs}px;
    display: block;
`;
