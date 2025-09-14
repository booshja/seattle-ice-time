import { Providers } from "@/components/Providers/Providers";
import { render, screen } from "@testing-library/react";

import { FormLoading } from "../FormLoading";

describe("FormLoading", () => {
    test("renders loading image and text", () => {
        render(
            <Providers>
                <FormLoading />
            </Providers>,
        );
        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(
            screen.getByText(/Saucing your feedback straight to me/i),
        ).toBeInTheDocument();
    });
});
