import { render, screen } from "@testing-library/react";
import React from "react";

import { Providers } from "@/components/Providers/Providers";

import { fetchEvents } from "../../utils/helpers/fetchEvents";
import Home from "../page";

import type { Mock } from "vitest";

vi.mock("next/cache", () => ({
    unstable_cache: (fn: (...args: unknown[]) => unknown) => fn,
}));

vi.mock("../../utils/helpers/fetchEvents", () => ({
    fetchEvents: vi.fn().mockResolvedValue({
        kciEvents: [],
        licEvents: [],
        ovaEvents: [],
        snoKingEvents: [],
    }),
}));

let currentSearchParams: URLSearchParams = new URLSearchParams();
vi.mock("next/navigation", async () => {
    const actual: Record<string, unknown> = await vi.importActual("next/navigation");
    return {
        ...actual,
        usePathname: () => "/",
        useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
        useSearchParams: () => currentSearchParams,
    };
});

describe("SSR Home page", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });

    it("computes start/end from current week when no param", async () => {
        vi.setSystemTime(new Date("2025-09-10T12:00:00.000Z")); // Wed; week Monday = 2025-09-08
        const jsx = (await Home({
            searchParams: Promise.resolve({}),
        })) as React.ReactElement;
        render(<Providers>{jsx}</Providers>);

        const calls = (fetchEvents as unknown as Mock).mock.calls as Array<
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
        currentSearchParams = new URLSearchParams("weekStart=2025-09-15");

        const jsx = (await Home({
            searchParams: Promise.resolve({ weekStart: "2025-09-15" }),
        })) as React.ReactElement;
        render(<Providers>{jsx}</Providers>);

        const calls = (fetchEvents as unknown as Mock).mock.calls as Array<
            [{ end: string; start: string }]
        >;
        const [firstCall] = calls;
        const [args] = firstCall;
        expect(typeof args.start).toBe("string");
        expect(typeof args.end).toBe("string");
    });
    describe("errors", () => {
        it("shows non-blocking error banner when some rinks fail", async () => {
            const errorResult = {
                kciEvents: [],
                licEvents: [],
                ovaEvents: [],
                snoKingEvents: [],
                errors: { lic: new Error("boom") },
            };
            (fetchEvents as unknown as Mock)
                .mockResolvedValueOnce(errorResult)
                .mockResolvedValueOnce(errorResult);

            const jsx = (await Home({
                searchParams: Promise.resolve({}),
            })) as React.ReactElement;
            render(<Providers>{jsx}</Providers>);

            const [banner] = screen.getAllByRole("status");
            expect(banner).toBeInTheDocument();
            expect(banner.textContent).toMatch(/Some rinks failed to load/i);
            expect(banner.textContent).toMatch(/Lynnwood Ice Center/);
            expect(
                screen.getByText(/No events are scheduled for this week/i),
            ).toBeInTheDocument();
        });
    });
});
