import { render, screen } from "@/testing/utils";

import IssuesPage from "../page";

describe("Issue page", () => {
    it("renders issue form heading", () => {
        render(<IssuesPage />);
        expect(screen.getByText(/Report an issue/i)).toBeInTheDocument();
    });
});
