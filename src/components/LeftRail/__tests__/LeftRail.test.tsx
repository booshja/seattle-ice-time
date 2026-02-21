import { render, screen } from "@/testing/utils";

import { LeftRailSkeleton } from "../LeftRailSkeleton";

describe("LeftRail", () => {
    describe("skeleton", () => {
        it("renders skeleton status container", () => {
            render(<LeftRailSkeleton />);
            expect(screen.getByRole("status")).toBeInTheDocument();
        });
    });
});
