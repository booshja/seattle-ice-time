import { Providers } from "@/components/Providers/Providers";
import { render, screen } from "@testing-library/react";

import { Navbar } from "../Navbar";

jest.mock("next/navigation", () => {
    const actual: Record<string, unknown> = jest.requireActual("next/navigation");
    return {
        ...actual,
        usePathname: () => "/",
        useRouter: () => ({ push: jest.fn() }),
        useSearchParams: () => new URLSearchParams(),
    };
});

describe("Navbar", () => {
    test("renders DateHeader skeleton while dynamic import loads on root path", () => {
        render(
            <Providers>
                <Navbar />
            </Providers>,
        );

        expect(screen.getByText(/Seattle Area Ice Time/)).toBeInTheDocument();
        expect(screen.getByTestId("loading.dateHeader")).toBeInTheDocument();
    });
});
