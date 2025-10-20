import { Providers } from "@/components/Providers/Providers";
import { render, screen } from "@testing-library/react";
import React from "react";

import { fetchEvents } from "../../utils/helpers/fetchEvents";
import Home from "../page";

jest.mock("../../utils/helpers/fetchEvents", () => ({
    fetchEvents: jest
        .fn()
        .mockResolvedValue({ kciEvents: [], licEvents: [], ovaEvents: [] }),
}));

let currentSearchParams: URLSearchParams = new URLSearchParams();
jest.mock("next/navigation", () => {
    const actual: Record<string, unknown> = jest.requireActual("next/navigation");
    return {
        ...actual,
        useSearchParams: () => currentSearchParams,
    };
});

describe("SSR Home page", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it("computes start/end from current week when no param", async () => {
        jest.setSystemTime(new Date("2025-09-10T12:00:00.000Z")); // Wed; week Monday = 2025-09-08
        const jsx = (await Home({
            searchParams: Promise.resolve({}),
        })) as React.ReactElement;
        render(<Providers>{jsx}</Providers>);

        const calls = (fetchEvents as unknown as jest.Mock).mock.calls as Array<
            [{ end: string; start: string }]
        >;
        const [firstCall] = calls;
        const [args] = firstCall;
        expect(args.start).toEqual(expect.stringContaining("2025-09-08"));
        expect(args.end).toEqual(expect.stringContaining("2025-09-15"));

        expect(
            screen.getByText(/No events are scheduled for this week/i),
        ).toBeInTheDocument();
    });

    it("uses weekStart param to compute a 7-day window starting Monday", async () => {
        // Make EventGrid read same weekStart from client params
        currentSearchParams = new URLSearchParams("weekStart=2025-09-15");

        const jsx = (await Home({
            searchParams: Promise.resolve({ weekStart: "2025-09-15" }),
        })) as React.ReactElement;
        render(<Providers>{jsx}</Providers>);

        const calls = (fetchEvents as unknown as jest.Mock).mock.calls as Array<
            [{ end: string; start: string }]
        >;
        const [firstCall] = calls;
        const [args] = firstCall;
        expect(typeof args.start).toBe("string");
        expect(typeof args.end).toBe("string");
    });
    describe("errors", () => {
        it("shows non-blocking error banner when some sources fail", async () => {
            (fetchEvents as unknown as jest.Mock).mockResolvedValueOnce({
                kciEvents: [],
                licEvents: [],
                ovaEvents: [],
                errors: { lic: new Error("boom") },
            });

            const jsx = (await Home({
                searchParams: Promise.resolve({}),
            })) as React.ReactElement;
            render(<Providers>{jsx}</Providers>);

            const [banner] = screen.getAllByRole("status");
            expect(banner).toBeInTheDocument();
            expect(banner.textContent).toMatch(/Some sources failed to load/i);
            expect(banner.textContent).toMatch(/Lynnwood Ice Center/);
            expect(
                screen.getByText(/No events are scheduled for this week/i),
            ).toBeInTheDocument();
        });
    });
});
