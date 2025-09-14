import { render, screen } from "@testing-library/react";

import IssuesPage from "../page";

describe("Issue page", () => {
    test("renders issue form heading", () => {
        render(<IssuesPage />);
        expect(screen.getByText(/Report an issue/i)).toBeInTheDocument();
    });
});
