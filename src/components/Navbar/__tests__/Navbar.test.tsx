import { Navbar } from "../Navbar";

import { render, screen } from "@/testing/utils";

describe("Navbar", () => {
    describe("skeleton", () => {
        it("renders DateHeader skeleton while dynamic import loads on root path", () => {
            render(<Navbar />);
            expect(screen.getByText(/Seattle Area Ice Time/)).toBeInTheDocument();
            expect(screen.getByRole("status")).toBeInTheDocument();
        });
    });
});
