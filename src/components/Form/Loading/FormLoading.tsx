const GoalieStick = "/images/goalie-stick.svg" as const;

import { LoadingImageStyled, TextStyled } from "../FormStyled";

export const FormLoading = () => {
    return (
        <>
            <LoadingImageStyled
                src={GoalieStick}
                alt="A line drawing of a hockey goalie stick"
                width={500}
                height={500}
                priority
            />
            <TextStyled>Saucing your feedback straight to me...</TextStyled>
        </>
    );
};
