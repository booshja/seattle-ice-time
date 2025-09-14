import { Providers } from "@/components/Providers/Providers";
import { render, screen, fireEvent } from "@testing-library/react";

import { DateHeader } from "../DateHeader";

let pushMock: jest.Mock<void, [string]> = jest.fn<void, [string]>();
let mockSearch: URLSearchParams;

jest.mock("next/navigation", () => {
    const actual: Record<string, unknown> = jest.requireActual("next/navigation");
    return {
        ...actual,
        usePathname: () => "/",
        useRouter: () => ({ push: pushMock }),
        useSearchParams: () => mockSearch,
    };
});

describe("DateHeader interactions", () => {
    beforeEach(() => {
        pushMock = jest.fn<void, [string]>();
        mockSearch = new URLSearchParams();
        jest.useFakeTimers();
        // Freeze to Wed Sep 10, 2025 UTC (Mon of that week is 2025-09-08)
        jest.setSystemTime(new Date("2025-09-10T12:00:00.000Z"));
    });
    afterEach(() => {
        jest.useRealTimers();
    });

    test("clicking next advances to next Monday in URL param", () => {
        render(
            <Providers>
                <DateHeader />
            </Providers>,
        );

        const next = screen.getByLabelText(/Go to next week/i);
        fireEvent.click(next);
        expect(pushMock).toHaveBeenCalledWith("/?weekStart=2025-09-15");
    });

    test("clicking previous from next Monday clears weekStart param", () => {
        mockSearch = new URLSearchParams("weekStart=2025-09-15");

        render(
            <Providers>
                <DateHeader />
            </Providers>,
        );

        const prev = screen.getByLabelText(/Go to previous week/i);
        fireEvent.click(prev);
        expect(pushMock).toHaveBeenCalledWith("/");
    });

    // Note: next arrow visibility (empty week) is covered in EventGrid tests
});
