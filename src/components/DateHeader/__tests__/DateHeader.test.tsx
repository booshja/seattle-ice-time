import { DateHeader } from "../DateHeader";

import { render, screen } from "@/testing/utils";

describe("DateHeader", () => {
    it("renders current week display", () => {
        render(<DateHeader mondayDate={new Date("2025-09-08T00:00:00.000Z")} />);
        expect(screen.getByText(/September/)).toBeInTheDocument();
    });
});
