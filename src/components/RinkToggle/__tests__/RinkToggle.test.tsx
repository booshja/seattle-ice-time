import { render, screen, fireEvent } from "@testing-library/react";
import { RinkToggle } from "../RinkToggle";
import { Providers } from "@/components/Providers/Providers";
import { RINKS } from "@/utils/constants/rinks";

describe("RinkToggle", () => {
    test("renders and toggles", () => {
        render(
            <Providers>
                <RinkToggle rink={RINKS.KCI} />
            </Providers>,
        );

        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(checkbox).toBeInTheDocument();
    });
});
