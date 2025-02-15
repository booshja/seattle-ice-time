"use client";

import { fontWeight, lineHeight, spacing } from "@/utils/constants";
import Link from "next/link";
import styled from "styled-components";

export const NavbarStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${spacing.sm}px ${spacing.lg}px;
    height: ${spacing.xxxl}px;
`;

export const LogoLinkStyled = styled(Link)`
    font-size: ${spacing.xl}px;
    line-height: ${lineHeight.xl}px;
    font-weight: ${fontWeight.bold};
    text-decoration: none;
    color: inherit;
`;

export const LinkStyled = styled(Link)`
    font-size: ${spacing.md}px;
    line-height: ${lineHeight.md}px;
    text-decoration: none;
    color: inherit;

    &:hover {
        text-decoration: underline;
    }
`;
