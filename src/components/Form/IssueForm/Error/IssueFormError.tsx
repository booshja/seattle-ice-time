"use client";

import SadTorontoGoalie from "@/images/sad-toronto-goalie.avif";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { TextStyled, TryAgainButtonStyled } from "../../FormStyled";

export const IssueFormError = () => {
    const router = useRouter();

    return (
        <>
            <Image
                src={SadTorontoGoalie}
                alt="James Reimer, a goalie for the Toronto Maple Leafs, in 2013 laying face-down on the ice in the blue paint of the goal crease with a puck and water bottle next to him after a goal scored by Patrice Bergeron of the Boston Bruins to win the game in overtime of game 7, knocking the Maple Leafs out of the playoffs."
                width={460}
                height={276}
                priority
                style={{ alignSelf: "center" }}
            />
            <TextStyled>
                Something went wrong and it wound up in our own net...
            </TextStyled>
            <TryAgainButtonStyled onClick={() => router.push("/")}>
                Please try again
            </TryAgainButtonStyled>
        </>
    );
};
