import { render, screen } from "@/testing/utils";

import Loading from "../loading";

describe("App loading page", () => {
    it("renders grid loading skeleton", () => {
        render(<Loading />);
        // Assert loading status regions exposed by SkeletonStatus are present
        const statuses = screen.getAllByRole("status");
        expect(statuses.length).toBeGreaterThan(0);
    });
});
