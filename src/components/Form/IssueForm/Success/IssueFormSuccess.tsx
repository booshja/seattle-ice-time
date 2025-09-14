"use client";

import BruinsCelebration from "@/images/bruins-game-7-celebration.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { TextStyled, TryAgainButtonStyled } from "../../FormStyled";

export const IssueFormSuccess = () => {
    const router = useRouter();

    return (
        <>
            <Image
                src={BruinsCelebration}
                alt="Bruins celebrating after scoring in overtime of Game 7 against the Toronto Maple Leafs in the 2013 Stanley Cup Playoffs"
                width={500}
                priority
            />
            <TextStyled>Your issue was successfully logged, thank you!</TextStyled>
            <TryAgainButtonStyled onClick={() => router.push("/")}>
                Go back to the Calendar
            </TryAgainButtonStyled>
        </>
    );
};
