"use client";

import { usePathname } from "next/navigation";
import { LinkStyled, NavbarStyled, LogoLinkStyled } from "./NavbarStyled";
import { testingIds } from "@/testing";
import { DateHeader } from "../DateHeader";

const navbarIds = testingIds.components.Navbar;

export const Navbar = () => {
    const pathname = usePathname();
    const showBackLink = pathname !== "/";
    const showDateHeader = pathname === "/";

    return (
        <NavbarStyled>
            <LogoLinkStyled href="/" data-testid={navbarIds.logoLink}>
                Seattle Area Ice Time 🏒🥅
            </LogoLinkStyled>
            {showDateHeader ? <DateHeader /> : <span />}
            {showBackLink ? (
                <LinkStyled href="/">&lt; Back to the calendar</LinkStyled>
            ) : (
                <span />
            )}
        </NavbarStyled>
    );
};
