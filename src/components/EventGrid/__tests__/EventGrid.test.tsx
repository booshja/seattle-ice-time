import { Providers } from "@/components/Providers/Providers";
import { render, screen } from "@testing-library/react";

import { EventGrid } from "../EventGrid";

jest.mock("next/navigation", () => {
    const actual: Record<string, unknown> = jest.requireActual("next/navigation");
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
