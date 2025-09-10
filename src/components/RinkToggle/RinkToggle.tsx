"use client";

import { RINKS } from "@/utils/constants/rinks";
import { RinkCheckboxStyled, RinkLabelStyled } from "./RinkToggleStyled";
import { useRinkDisplayStore } from "@/store/rinkDisplay/rinkDisplayStoreProvider";
import { COLORS } from "@/utils/constants/colors";

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
        <div>
            <RinkCheckboxStyled
                type="checkbox"
                id={rink.id}
                name={rink.key}
                color={color}
                checked={checked}
                onChange={handleChange}
            />
            <RinkLabelStyled htmlFor={rink.id}>{rink.name}</RinkLabelStyled>
        </div>
    );
};
