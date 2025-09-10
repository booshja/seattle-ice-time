import { LoadingImageStyled, TextStyled } from "../FormStyled";
import GoalieStick from "@/images/goalie-stick.svg";

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
