import { render, screen } from "@testing-library/react";
import { Providers } from "@/components/Providers/Providers";
import { EventGrid } from "../EventGrid";
import { testingIds } from "@/testing/testingIds";

jest.mock("next/navigation", () => {
    const actual = jest.requireActual("next/navigation");
    return {
        ...actual,
        useSearchParams: () => new URLSearchParams(),
    };
});

describe("EventGrid loading behavior", () => {
    test("renders empty state when there are no events", async () => {
        render(
            <Providers>
                <EventGrid kciEvents={[]} licEvents={[]} ovaEvents={[]} />
            </Providers>,
        );

        expect(
            await screen.findByText(/No events are scheduled for this week/i),
        ).toBeInTheDocument();
        expect(
            screen.queryByTestId(testingIds.loading.eventGrid),
        ).not.toBeInTheDocument();
    });
});
