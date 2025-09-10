import { render, screen } from "@testing-library/react";
import { EventGrid } from "../EventGrid";
import { Providers } from "@/components/Providers/Providers";

jest.mock("next/navigation", () => {
    const actual = jest.requireActual("next/navigation");
    return {
        ...actual,
        useSearchParams: () => new URLSearchParams(),
    };
});

describe("EventGrid", () => {
    test("renders empty state when no events", () => {
        render(
            <Providers>
                <EventGrid kciEvents={[]} licEvents={[]} ovaEvents={[]} />
            </Providers>,
        );

        expect(
            screen.getByText(/No events are scheduled for this week/i),
        ).toBeInTheDocument();
    });
});
