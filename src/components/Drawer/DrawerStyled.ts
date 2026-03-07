"use client";

import styled from "@emotion/styled";

import { COLORS } from "@/utils/constants/colors";
import { spacing } from "@/utils/constants/spacing";

export const DrawerOverlayStyled = styled.div<{ $open: boolean }>`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: opacity 0.25s ease;
`;

export const DrawerPanelStyled = styled.aside<{ $open: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 275px;
    max-width: 80vw;
    background-color: ${COLORS.background.light};
    color: ${COLORS.text.primary};
    z-index: 101;
    transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.25s ease;
    display: flex;
    flex-direction: column;
    padding: ${spacing.md}px;
    overflow-y: auto;
`;

export const DrawerHeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${spacing.lg}px;
`;

export const DrawerTitleStyled = styled.span`
    font-size: ${spacing.md}px;
    font-weight: 700;
`;

export const DrawerCloseButtonStyled = styled.button`
    background: transparent;
    border: none;
    color: ${COLORS.text.primary};
    font-size: ${spacing.lg}px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
`;

export const DrawerContentStyled = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${spacing.lg}px;
`;

export const DrawerLinksStyled = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: ${spacing.sm}px;
    padding-bottom: ${spacing.lg}px;
`;
