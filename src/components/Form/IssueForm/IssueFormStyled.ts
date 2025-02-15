"use client";

import { COLORS } from "@/utils/constants";
import styled from "styled-components";

export const IssuePageStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 32px;
`;

export const IssueFormStyled = styled.div`
    color: ${COLORS.text.primary};
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const HeaderStyled = styled.h1`
    font-weight: 700;
    font-size: 42px;
    line-height: calc(36px * 1.5);
    align-self: center;
`;

export const TextStyled = styled.p`
    font-size: 18px;
    line-height: calc(24px * 1.25);
    align-self: center;
    text-align: center;
`;

export const FormStyled = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const LabelStyled = styled.label`
    font-weight: 700;
    display: flex;
    flex-direction: column;
    font-size: 18px;
`;

export const LabelDetailsStyled = styled.span`
    font-weight: initial;
    padding-left: 8px;
    font-size: 16px;
`;

export const TextAreaStyled = styled.textarea`
    color: inherit;
    background-color: ${COLORS.background.dark};
    border: 2px solid ${COLORS.text.primary};
    border-radius: 8px;
    resize: none;
    height: 300px;
`;

export const ButtonStyled = styled.button`
    font-weight: 700;
    color: ${COLORS.background.dark};
    background-color: ${COLORS.text.primary};
    border: 1px solid ${COLORS.text.primary};
    border-radius: 6px;
    width: fit-content;
    padding: 4px 16px;
    align-self: flex-end;

    &:hover {
        background-color: ${COLORS.background.dark};
        color: ${COLORS.text.primary};
        cursor: pointer;
    }
`;
