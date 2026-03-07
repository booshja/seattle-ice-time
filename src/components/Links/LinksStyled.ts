"use client";

import styled from "@emotion/styled";
import Link from "next/link";

import { mq } from "@/utils/constants/breakpoints";
import { fontWeight } from "@/utils/constants/fontSizes";
import { spacing } from "@/utils/constants/spacing";

export const LinkStyled = styled(Link)`
    color: inherit;
    text-decoration: none;

    &:hover {
        font-weight: ${fontWeight.bold};
    }
`;

export const LinksContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing.sm}px;
    position: fixed;
    bottom: ${spacing.xxl}px;
    left: ${spacing.md}px;

    ${mq.mobile} {
        display: none;
    }
`;

export const LinksStaticContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing.sm}px;
`;
