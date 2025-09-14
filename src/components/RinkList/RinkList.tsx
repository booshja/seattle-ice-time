"use client";

import { RINKS } from "@/utils/constants/rinks";
import { RinkListStyled } from "./RinkListStyled";
import { RinkToggle } from "../RinkToggle/RinkToggle";

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
