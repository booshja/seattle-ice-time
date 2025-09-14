const GoalieStick = "/images/goalie-stick.svg" as const;

import { LoadingImageStyled, TextStyled } from "../FormStyled";

export const FormLoading = () => {
    return (
        <>
            <LoadingImageStyled
                src={GoalieStick}
                alt="A line drawing of a hockey goalie stick"
                priority
            />
            <TextStyled>Saucing your feedback straight to me...</TextStyled>
        </>
    );
};
