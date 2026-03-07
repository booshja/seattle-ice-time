"use client";

import { useState, useEffect } from "react";

import { breakpoints } from "@/utils/constants/breakpoints";

export type BreakpointTier = "mobile" | "tablet" | "desktop";

const MOBILE_QUERY = `(max-width: ${breakpoints.tabletSm - 1}px)`;
const TABLET_QUERY = `(min-width: ${breakpoints.tabletSm}px) and (max-width: ${breakpoints.desktopSm - 1}px)`;

function getTier(mobile: boolean, tablet: boolean): BreakpointTier {
    if (mobile) return "mobile";
    if (tablet) return "tablet";
    return "desktop";
}

export function useMediaQuery(): BreakpointTier | null {
    const [tier, setTier] = useState<BreakpointTier | null>(null);

    useEffect(() => {
        const mobileMatch = window.matchMedia(MOBILE_QUERY);
        const tabletMatch = window.matchMedia(TABLET_QUERY);

        const update = () => setTier(getTier(mobileMatch.matches, tabletMatch.matches));

        update();

        mobileMatch.addEventListener("change", update);
        tabletMatch.addEventListener("change", update);

        return () => {
            mobileMatch.removeEventListener("change", update);
            tabletMatch.removeEventListener("change", update);
        };
    }, []);

    return tier;
}
