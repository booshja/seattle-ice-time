"use client";

import { COLORS, RINKS } from "@/utils/constants";
import { RinkCheckboxStyled, RinkLabelStyled } from "./RinkToggleStyled";
import { useRinkDisplayStore } from "@/store";

interface RinkItemProps {
    rink: (typeof RINKS)[keyof typeof RINKS];
}

export const RinkToggle = ({ rink }: RinkItemProps) => {
    const toggleRink = useRinkDisplayStore((state) => state.toggleRink);
    const checked = useRinkDisplayStore((state) => state[rink.key]);
    const color = COLORS.rinks[rink.key];

    const handleToggle = () => {
        toggleRink(rink.key);
    };

    return (
        <div>
            <RinkCheckboxStyled
                type="checkbox"
                id={rink.id}
                name={rink.key}
                color={color}
                checked={checked}
                onChange={handleToggle}
                onClick={handleToggle}
            />
            <RinkLabelStyled htmlFor={rink.id} onClick={handleToggle}>
                {rink.name}
            </RinkLabelStyled>
        </div>
    );
};
