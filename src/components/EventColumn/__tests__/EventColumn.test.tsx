import { render, screen } from "@testing-library/react";
import { EventColumn } from "../EventColumn";

describe("EventColumn", () => {
    test("renders header day and date", () => {
        render(<EventColumn day="Monday" date={8} events={[]} />);

        expect(screen.getByText("Monday")).toBeInTheDocument();
        expect(screen.getByText("8")).toBeInTheDocument();
    });
});
