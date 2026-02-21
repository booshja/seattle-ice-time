import { LeftRailSkeleton } from "../LeftRailSkeleton";

import { render, screen } from "@/testing/utils";

describe("LeftRail", () => {
    describe("skeleton", () => {
        it("renders skeleton status container", () => {
            render(<LeftRailSkeleton />);
            expect(screen.getByRole("status")).toBeInTheDocument();
        });
    });
});
