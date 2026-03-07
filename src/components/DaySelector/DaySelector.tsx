"use client";

import { useSelectedDayStore } from "@/store/selectedDay/selectedDayStoreProvider";

import {
    DaySelectorContainerStyled,
    DayTabStyled,
    DayLabelStyled,
    DayNumberStyled,
} from "./DaySelectorStyled";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

interface DaySelectorProps {
    weekDates: number[];
}

export const DaySelector = ({ weekDates }: DaySelectorProps) => {
    const selectedIndex = useSelectedDayStore((s) => s.selectedIndex);
    const setSelectedIndex = useSelectedDayStore((s) => s.setSelectedIndex);

    return (
        <DaySelectorContainerStyled role="tablist" aria-label="Day of the week">
            {DAY_LABELS.map((label, i) => (
                <DayTabStyled
                    key={label}
                    role="tab"
                    aria-selected={selectedIndex === i}
                    $active={selectedIndex === i}
                    onClick={() => setSelectedIndex(i)}
                >
                    <DayLabelStyled>{label}</DayLabelStyled>
                    <DayNumberStyled>{weekDates[i] ?? ""}</DayNumberStyled>
                </DayTabStyled>
            ))}
        </DaySelectorContainerStyled>
    );
};
