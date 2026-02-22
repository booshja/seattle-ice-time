import { render, screen } from "@/testing/utils";

import FeedbackPage from "../page";

describe("Feedback page", () => {
    it("renders feedback form heading", () => {
        render(<FeedbackPage />);
        expect(screen.getByText(/Give feedback/i)).toBeInTheDocument();
    });
});
