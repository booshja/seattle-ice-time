"use client";

import { fontWeight } from "@/utils/constants/fontSizes";
import { spacing } from "@/utils/constants/spacing";
import styled from "styled-components";

export const DateHeaderStyled = styled.div`
    font-size: ${spacing.lg}px;
    font-weight: ${fontWeight.bold};
    display: flex;
    align-items: center;
`;

export const DateChangeButtonStyled = styled.button`
    background-color: transparent;
    color: inherit;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
    }
`;
