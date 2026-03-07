"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";

import {
    getCurrentWeekMonday,
    getLocalIsoDate,
    getMondayIsoFromBaseDate,
    parseLocalDateFromYmd,
} from "@/utils/helpers/dates";

export type WeekNavigationDirection = "next" | "previous";

export interface UseWeekNavigationReturn {
    base: Date;
    isCurrentWeek: boolean;
    isPending: boolean;
    navigateToWeek: (direction: WeekNavigationDirection) => void;
}

export function useWeekNavigation(): UseWeekNavigationReturn {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const weekStartParam = searchParams.get("weekStart");

    const [isPending, startTransition] = useTransition();

    const base = useMemo(() => {
        if (weekStartParam) {
            const normalized = getMondayIsoFromBaseDate(
                parseLocalDateFromYmd(weekStartParam),
            );
            return parseLocalDateFromYmd(normalized);
        }
        return getCurrentWeekMonday();
    }, [weekStartParam]);

    const isCurrentWeek = useMemo(() => {
        const currentMondayISO = getLocalIsoDate(getCurrentWeekMonday());
        const baseMondayISO = getMondayIsoFromBaseDate(new Date(base));
        return baseMondayISO === currentMondayISO;
    }, [base]);

    const navigateToWeek = (direction: WeekNavigationDirection) => {
        const currentMonday = getCurrentWeekMonday();
        const currentMondayISO = getLocalIsoDate(currentMonday);
        const nextBase = new Date(base);

        if (direction === "previous") {
            nextBase.setDate(nextBase.getDate() - 7);
        } else {
            nextBase.setDate(nextBase.getDate() + 7);
        }

        const nextMondayISO = getMondayIsoFromBaseDate(nextBase);

        if (direction === "previous" && nextMondayISO <= currentMondayISO) {
            startTransition(() => {
                router.push(pathname);
            });
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("weekStart", nextMondayISO);
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    return { base, isCurrentWeek, isPending, navigateToWeek };
}
