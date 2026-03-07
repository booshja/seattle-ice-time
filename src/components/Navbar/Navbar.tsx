"use client";

import { usePathname } from "next/navigation";
import { lazy, Suspense } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useDrawerStore } from "@/store/drawer/drawerStoreProvider";

import { DateHeaderSkeleton } from "../DateHeader/DateHeaderSkeleton";

import {
    HamburgerButtonStyled,
    LinkStyled,
    NavbarStyled,
    LogoLinkStyled,
} from "./NavbarStyled";

const DateHeaderLazy = lazy(() =>
    import("../DateHeader/DateHeader").then((m) => ({ default: m.DateHeader })),
);

export const Navbar = () => {
    const pathname = usePathname();
    const tier = useMediaQuery();
    const toggleDrawer = useDrawerStore((state) => state.toggle);
    const showBackLink = pathname !== "/";
    const showDateHeader = pathname === "/" && tier !== null && tier !== "mobile";

    return (
        <NavbarStyled>
            <HamburgerButtonStyled
                onClick={toggleDrawer}
                aria-label="Open navigation menu"
            >
                ☰
            </HamburgerButtonStyled>
            <LogoLinkStyled href="/">Seattle Area Ice Time 🏒🥅</LogoLinkStyled>
            {showDateHeader ? (
                <Suspense fallback={<DateHeaderSkeleton />}>
                    <DateHeaderLazy />
                </Suspense>
            ) : (
                <span />
            )}
            {showBackLink ? (
                <LinkStyled href="/">&lt; Back to the calendar</LinkStyled>
            ) : (
                <span />
            )}
        </NavbarStyled>
    );
};
