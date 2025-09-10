import { Links } from "../Links/Links";
import { RinkList } from "../RinkList/RinkList";
import { LeftRailStyled } from "./LeftRailStyled";

export const LeftRail = () => {
    return (
        <LeftRailStyled>
            {/* <Calendar /> */}
            <RinkList />
            <Links />
        </LeftRailStyled>
    );
};
