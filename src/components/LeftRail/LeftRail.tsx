"use client";

import { useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Links } from "../Links/Links";
import { RinkList } from "../RinkList/RinkList";

import {
    CollapseToggleStyled,
    LeftRailContentStyled,
    LeftRailStyled,
} from "./LeftRailStyled";

export const LeftRail = () => {
    const tier = useMediaQuery();
    const [collapsed, setCollapsed] = useState(false);
    const isTablet = tier === "tablet";

    return (
        <LeftRailStyled $collapsed={isTablet && collapsed}>
            {isTablet && (
                <CollapseToggleStyled
                    onClick={() => setCollapsed((prev) => !prev)}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? "›" : "‹"}
                </CollapseToggleStyled>
            )}
            <LeftRailContentStyled $collapsed={isTablet && collapsed}>
                <RinkList />
                {!(isTablet && collapsed) && <Links />}
            </LeftRailContentStyled>
        </LeftRailStyled>
    );
};
