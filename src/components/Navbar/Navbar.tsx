"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { DateHeaderSkeleton } from "../DateHeader/DateHeaderSkeleton";

import { LinkStyled, NavbarStyled, LogoLinkStyled } from "./NavbarStyled";

const DateHeaderClient = dynamic(
    () => import("../DateHeader/DateHeader").then((m) => ({ default: m.DateHeader })),
    { ssr: false, loading: () => <DateHeaderSkeleton /> },
);

export const Navbar = () => {
    const pathname = usePathname();
    const showBackLink = pathname !== "/";
    const showDateHeader = pathname === "/";

    return (
        <NavbarStyled>
            <LogoLinkStyled href="/">Seattle Area Ice Time 🏒🥅</LogoLinkStyled>
            {showDateHeader ? <DateHeaderClient /> : <span />}
            {showBackLink ? (
                <LinkStyled href="/">&lt; Back to the calendar</LinkStyled>
            ) : (
                <span />
            )}
        </NavbarStyled>
    );
};
