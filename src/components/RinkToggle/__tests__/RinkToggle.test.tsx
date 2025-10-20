import { render, screen, fireEvent } from "@/testing/utils";
import { RINKS } from "@/utils/constants/rinks";

import { RinkToggle } from "../RinkToggle";

describe("RinkToggle", () => {
    it("renders and toggles", () => {
        render(<RinkToggle rink={RINKS.KCI} />);

        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(checkbox).toBeInTheDocument();
    });
});
