"use client";

import { usePathname } from "next/navigation";
import { lazy, Suspense } from "react";

import { DateHeaderSkeleton } from "../DateHeader/DateHeaderSkeleton";

import { LinkStyled, NavbarStyled, LogoLinkStyled } from "./NavbarStyled";

const DateHeaderLazy = lazy(() =>
    import("../DateHeader/DateHeader").then((m) => ({ default: m.DateHeader })),
);

export const Navbar = () => {
    const pathname = usePathname();
    const showBackLink = pathname !== "/";
    const showDateHeader = pathname === "/";

    return (
        <NavbarStyled>
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
