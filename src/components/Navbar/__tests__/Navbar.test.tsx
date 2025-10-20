import { render, screen } from "@/testing/utils";

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
    describe("skeleton", () => {
        it("renders DateHeader skeleton while dynamic import loads on root path", () => {
            render(<Navbar />);
            expect(screen.getByText(/Seattle Area Ice Time/)).toBeInTheDocument();
            expect(screen.getByRole("status")).toBeInTheDocument();
        });
    });
});
