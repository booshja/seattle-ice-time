"use client";

import { RINKS } from "@/utils/constants/rinks";

import { RinkToggle } from "../RinkToggle/RinkToggle";

import { RinkListHeaderStyled, RinkListStyled } from "./RinkListStyled";

export const RinkList = () => {
    const rinks = Object.values(RINKS);

    return (
        <div>
            <RinkListHeaderStyled>Rinks</RinkListHeaderStyled>
            <RinkListStyled>
                {rinks
                    .filter((rink) => rink.enabled)
                    .map((rink) => (
                        <RinkToggle key={rink.id} rink={rink} />
                    ))}
            </RinkListStyled>
        </div>
    );
};
