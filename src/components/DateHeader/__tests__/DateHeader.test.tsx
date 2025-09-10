import { render, screen } from "@testing-library/react";
import { DateHeader } from "../DateHeader";
import { Providers } from "@/components/Providers/Providers";

jest.mock("next/navigation", () => {
    const actual = jest.requireActual("next/navigation");
    return {
        ...actual,
        usePathname: () => "/",
        useRouter: () => ({ push: jest.fn() }),
        useSearchParams: () => new URLSearchParams(),
    };
});

describe("DateHeader", () => {
    test("hides previous button when on current week", () => {
        render(
            <Providers>
                <DateHeader />
            </Providers>,
        );

        // When on current week, previous button should not be in the document
        const prev = screen.queryByLabelText(/Go to previous week/i);
        expect(prev).toBeNull();
        expect(screen.getByText(/\w+ \d+/)).toBeInTheDocument();
    });
});
