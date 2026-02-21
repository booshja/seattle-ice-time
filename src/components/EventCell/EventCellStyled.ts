"use client";

import styled from "@emotion/styled";

import { fontWeight } from "@/utils/constants/fontSizes";
import { lineHeight } from "@/utils/constants/fontSizes";
import { spacing } from "@/utils/constants/spacing";

export const EventCellStyled = styled.div<{ $bgColor: string; $textColor: string }>`
    border-radius: ${spacing.sm}px;
    background-color: ${({ $bgColor }) => $bgColor};
    padding: ${spacing.sm}px;
    color: ${({ $textColor }) => $textColor};

    & > p:not(:is(:first-of-type)) {
        font-size: 12px;
    }

    & > p:first-of-type {
        font-size: ${spacing.md}px;
        line-height: ${lineHeight.md}px;
        font-weight: ${fontWeight.bold};
    }
`;

export const RegistrationLinkStyled = styled.a<{ $textColor: string }>`
    font-size: 12px;
    line-height: ${lineHeight.md}px;
    font-weight: ${fontWeight.bold};
    color: ${({ $textColor }) => $textColor};
    text-decoration: underline;
    margin-top: ${spacing.xs}px;
    display: block;
`;
