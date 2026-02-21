import { render, screen } from "@/testing/utils";

import { RinkList } from "../RinkList";

describe("RinkList", () => {
    describe("loading", () => {
        it("does not show left rail skeleton; renders toggles immediately", () => {
            render(<RinkList />);
            expect(screen.queryByRole("status")).not.toBeInTheDocument();
            expect(
                screen.getByLabelText(/Kraken Community Iceplex/i),
            ).toBeInTheDocument();
        });
    });
});
