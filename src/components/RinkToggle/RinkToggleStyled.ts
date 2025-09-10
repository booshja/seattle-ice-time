"use client";

import { fontWeight } from "@/utils/constants/fontSizes";
import { spacing } from "@/utils/constants/spacing";
import styled from "styled-components";

export const RinkLabelStyled = styled.label`
    color: inherit;

    &:hover {
        cursor: pointer;
    }
`;

export const RinkCheckboxStyled = styled.input<{ color: string }>`
    margin-right: ${spacing.sm}px;

    &:checked {
        color: ${({ color }) => color};
        font-weight: ${fontWeight.bold};
    }

    &:hover {
        cursor: pointer;
    }
`;
