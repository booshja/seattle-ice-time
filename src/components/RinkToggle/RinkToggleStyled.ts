"use client";

import styled from "@emotion/styled";

import { spacing } from "@/utils/constants/spacing";

export const RinkToggleContainerStyled = styled.div`
    display: flex;
    align-items: center;
    gap: ${spacing.sm}px;
`;

export const RinkCheckboxStyled = styled.input`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
`;

export const RinkCheckboxVisualStyled = styled.span<{
    $checked: boolean;
    $color: string;
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border-radius: ${spacing.xs}px;
    border: 2px solid ${({ $color }) => $color};
    background-color: ${({ $checked, $color }) => ($checked ? $color : "transparent")};
    transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    cursor: pointer;

    &::after {
        content: "";
        display: ${({ $checked }) => ($checked ? "block" : "none")};
        width: 5px;
        height: 10px;
        border: solid #1b1b1b;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg) translateY(-1px);
    }
`;

export const RinkLabelStyled = styled.label`
    color: inherit;
    cursor: pointer;
    user-select: none;
`;
