import { render, screen, fireEvent } from "@/testing/utils";

import { DateHeader } from "../DateHeader";

describe("DateHeader interactions", () => {
    it("renders next-week navigation control", () => {
        render(<DateHeader mondayDate={new Date("2025-09-08T00:00:00.000Z")} />);
        expect(
            screen.getByRole("button", { name: /Go to next week/i }),
        ).toBeInTheDocument();
    });

    it("renders previous-week navigation control when viewing a past week", () => {
        render(<DateHeader mondayDate={new Date("2025-08-25T00:00:00.000Z")} />);
        expect(
            screen.getByRole("button", { name: /Go to previous week/i }),
        ).toBeInTheDocument();
    });

    it("clicking next executes without crashing", () => {
        render(<DateHeader mondayDate={new Date("2025-09-08T00:00:00.000Z")} />);
        const btn = screen.getByRole("button", { name: /Go to next week/i });
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();
    });

    it("clicking previous executes without crashing", () => {
        render(<DateHeader mondayDate={new Date("2025-09-15T00:00:00.000Z")} />);
        const btn = screen.getByRole("button", { name: /Go to previous week/i });
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();
    });

    it("hides previous-week button when at current week", () => {
        render(<DateHeader mondayDate={new Date()} />);
        expect(
            screen.queryByRole("button", { name: /Go to previous week/i }),
        ).toBeNull();
    });
});
