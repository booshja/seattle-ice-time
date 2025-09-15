"use client";

import { fontWeight } from "@/utils/constants/fontSizes";
import { spacing } from "@/utils/constants/spacing";
import styled from "@emotion/styled";
import Link from "next/link";

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
`;
