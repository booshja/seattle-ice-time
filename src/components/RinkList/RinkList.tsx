"use client";

import { RINKS } from "@/utils/constants/rinks";

import { RinkToggle } from "../RinkToggle/RinkToggle";

import { RinkListStyled } from "./RinkListStyled";

export const RinkList = () => {
    const rinks = Object.values(RINKS);

    return (
        <RinkListStyled>
            {rinks.map((rink) => {
                if (rink.enabled) {
                    return <RinkToggle key={rink.id} rink={rink} />;
                }
            })}
        </RinkListStyled>
    );
};
