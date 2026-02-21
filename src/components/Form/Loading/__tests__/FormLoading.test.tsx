import { FormLoading } from "../FormLoading";

import { render, screen } from "@/testing/utils";

describe("FormLoading", () => {
    it("renders loading image and text", () => {
        render(<FormLoading />);
        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(
            screen.getByText(/Saucing your feedback straight to me/i),
        ).toBeInTheDocument();
    });
});
