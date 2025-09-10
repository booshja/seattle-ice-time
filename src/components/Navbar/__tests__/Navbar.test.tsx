import { render, screen } from "@testing-library/react";
import { Navbar } from "../Navbar";
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

describe("Navbar", () => {
    test("renders DateHeader on root path", () => {
        render(
            <Providers>
                <Navbar />
            </Providers>,
        );

        expect(screen.getByText(/Seattle Area Ice Time/)).toBeInTheDocument();
        // DateHeader renders a span with a date string
        expect(screen.getByText(/\w+ \d+/)).toBeInTheDocument();
    });
});
