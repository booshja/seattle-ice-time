import { Links } from "../Links";
import { RinkList } from "../RinkList";
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
