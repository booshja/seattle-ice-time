"use client";

import styled from "@emotion/styled";

import { COLORS } from "@/utils/constants/colors";
import { fontWeight } from "@/utils/constants/fontSizes";
import { spacing } from "@/utils/constants/spacing";

export const RinkListHeaderStyled = styled.h3`
    font-size: 24px;
    font-weight: ${fontWeight.bold};
    color: ${COLORS.text.primary};
    margin: 0 0 ${spacing.xs}px;
`;

export const RinkListStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${spacing.sm}px;
`;
