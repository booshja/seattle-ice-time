import { render, screen } from "@/testing/utils";

import { Navbar } from "../Navbar";

describe("Navbar", () => {
    describe("skeleton", () => {
        it("renders DateHeader skeleton while dynamic import loads on root path", () => {
            render(<Navbar />);
            expect(screen.getByText(/Seattle Area Ice Time/)).toBeInTheDocument();
            expect(screen.getByRole("status")).toBeInTheDocument();
        });
    });
});
