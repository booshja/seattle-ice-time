"use client";

import { testingIds } from "@/testing/testingIds";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { DateHeaderSkeleton } from "../DateHeader/DateHeaderSkeleton";

import { LinkStyled, NavbarStyled, LogoLinkStyled } from "./NavbarStyled";

const navbarIds = testingIds.components.Navbar;

export const Navbar = () => {
    const pathname = usePathname();
    const showBackLink = pathname !== "/";
    const showDateHeader = pathname === "/";

    const DateHeaderClient = dynamic(
        () =>
            import("../DateHeader/DateHeader").then((m) => ({ default: m.DateHeader })),
        {
            ssr: false,
            loading: () => <DateHeaderSkeleton />,
        },
    );

    return (
        <NavbarStyled>
            <LogoLinkStyled href="/" data-testid={navbarIds.logoLink}>
                Seattle Area Ice Time 🏒🥅
            </LogoLinkStyled>
            {showDateHeader ? <DateHeaderClient /> : <span />}
            {showBackLink ? (
                <LinkStyled href="/">&lt; Back to the calendar</LinkStyled>
            ) : (
                <span />
            )}
        </NavbarStyled>
    );
};
