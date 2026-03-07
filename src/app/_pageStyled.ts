"use client";

import styled from "@emotion/styled";

import { mq } from "@/utils/constants/breakpoints";

export const PageStyled = styled.main`
    display: flex;
    flex-direction: column;
`;

export const ContentStyled = styled.div`
    display: flex;
    flex-direction: row;

    ${mq.mobile} {
        flex-direction: column;
    }
`;

export const ErrorBannerStyled = styled.div`
    background: #fff3cd;
    color: #664d03;
    border: 1px solid #ffecb5;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 12px;
`;
