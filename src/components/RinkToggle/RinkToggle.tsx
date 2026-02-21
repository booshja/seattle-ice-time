"use client";

import { useRinkDisplayStore } from "@/store/rinkDisplay/rinkDisplayStoreProvider";
import { COLORS } from "@/utils/constants/colors";

import {
    RinkCheckboxStyled,
    RinkCheckboxVisualStyled,
    RinkLabelStyled,
    RinkToggleContainerStyled,
} from "./RinkToggleStyled";

import type { RINKS } from "@/utils/constants/rinks";

interface RinkItemProps {
    rink: (typeof RINKS)[keyof typeof RINKS];
}

export const RinkToggle = ({ rink }: RinkItemProps) => {
    const setRink = useRinkDisplayStore((state) => state.setRink);
    const checked = useRinkDisplayStore((state) => state[rink.key]);
    const color = COLORS.rinks[rink.key];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRink(rink.key, e.target.checked);
    };

    return (
        <RinkToggleContainerStyled>
            <RinkCheckboxStyled
                type="checkbox"
                id={rink.id}
                name={rink.key}
                checked={checked}
                onChange={handleChange}
            />
            <RinkCheckboxVisualStyled
                $checked={checked}
                $color={color}
                onClick={() => setRink(rink.key, !checked)}
                aria-hidden="true"
            />
            <RinkLabelStyled htmlFor={rink.id}>{rink.name}</RinkLabelStyled>
        </RinkToggleContainerStyled>
    );
};
