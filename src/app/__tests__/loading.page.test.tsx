import Loading from "../loading";

import { render, screen } from "@/testing/utils";

describe("App loading page", () => {
    it("renders grid loading skeleton", () => {
        render(<Loading />);
        const statuses = screen.getAllByRole("status");
        expect(statuses.length).toBeGreaterThan(0);
    });
});
