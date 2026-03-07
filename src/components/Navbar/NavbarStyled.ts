"use client";

import styled from "@emotion/styled";
import Link from "next/link";

import { mq } from "@/utils/constants/breakpoints";
import { COLORS } from "@/utils/constants/colors";
import { fontWeight, lineHeight } from "@/utils/constants/fontSizes";
import { spacing } from "@/utils/constants/spacing";

export const NavbarStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${spacing.sm}px ${spacing.lg}px;
    height: ${spacing.xxxl}px;

    ${mq.mobile} {
        padding: ${spacing.sm}px ${spacing.md}px;
    }
`;

export const LogoLinkStyled = styled(Link)`
    font-size: ${spacing.xl}px;
    line-height: ${lineHeight.xl}px;
    font-weight: ${fontWeight.bold};
    text-decoration: none;
    color: inherit;
    white-space: nowrap;

    ${mq.mobile} {
        font-size: ${spacing.lg}px;
        line-height: ${lineHeight.lg}px;
    }
`;

export const LinkStyled = styled(Link)`
    font-size: ${spacing.md}px;
    line-height: ${lineHeight.md}px;
    text-decoration: none;
    color: inherit;

    &:hover {
        text-decoration: underline;
    }

    ${mq.mobile} {
        display: none;
    }
`;

export const HamburgerButtonStyled = styled.button`
    display: none;
    background: transparent;
    border: none;
    color: ${COLORS.text.primary};
    cursor: pointer;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    font-size: ${spacing.lg}px;

    ${mq.mobile} {
        display: flex;
    }
`;
