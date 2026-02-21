import { render, screen } from "@/testing/utils";

import { FormLoading } from "../FormLoading";

describe("FormLoading", () => {
    it("renders loading image and text", () => {
        render(<FormLoading />);
        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(
            screen.getByText(/Saucing your feedback straight to me/i),
        ).toBeInTheDocument();
    });
});
