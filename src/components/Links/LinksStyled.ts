"use client";

import Link from "next/link";
import styled from "styled-components";
import { fontWeight, spacing } from "@/utils/constants";

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
