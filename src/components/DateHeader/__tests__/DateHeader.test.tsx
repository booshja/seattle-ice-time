import { render, screen } from "@/testing/utils";

import { DateHeader } from "../DateHeader";

describe("DateHeader", () => {
    it("renders current week display", () => {
        render(<DateHeader mondayDate={new Date("2025-09-08T00:00:00.000Z")} />);
        expect(screen.getByText(/September/)).toBeInTheDocument();
    });
});
