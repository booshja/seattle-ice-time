"use client";

import { RinkToggle } from "../RinkToggle/RinkToggle";

import { RinkListStyled } from "./RinkListStyled";

import { RINKS } from "@/utils/constants/rinks";

export const RinkList = () => {
    const rinks = Object.values(RINKS);

    return (
        <RinkListStyled>
            {rinks
                .filter((rink) => rink.enabled)
                .map((rink) => (
                    <RinkToggle key={rink.id} rink={rink} />
                ))}
        </RinkListStyled>
    );
};
