import { Providers } from "@/components/Providers/Providers";
import { render, screen } from "@testing-library/react";
import React from "react";

import { getKciEvents } from "../../utils/helpers/krakenCommunityIceplex";
import { getLicEvents, getOvaEvents } from "../../utils/helpers/lynnwoodOva";
import Home from "../page";

jest.mock("../../utils/helpers/krakenCommunityIceplex", () => ({
    getKciEvents: jest.fn().mockResolvedValue([]),
}));
jest.mock("../../utils/helpers/lynnwoodOva", () => ({
    getLicEvents: jest.fn().mockResolvedValue([]),
    getOvaEvents: jest.fn().mockResolvedValue([]),
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

    test("computes start/end from current week when no param", async () => {
        jest.setSystemTime(new Date("2025-09-10T12:00:00.000Z")); // Wed; week Monday = 2025-09-08
        const jsx = (await Home({
            searchParams: Promise.resolve({}),
        })) as React.ReactElement;
        render(<Providers>{jsx}</Providers>);

        const initialCalls = (getKciEvents as unknown as jest.Mock).mock.calls as Array<
            [{ end: string; start: string }]
        >;
        const [firstInitialCall] = initialCalls;
        const [initialArgs] = firstInitialCall;
        expect(initialArgs.start).toEqual(expect.stringContaining("2025-09-08"));
        expect(initialArgs.end).toEqual(expect.stringContaining("2025-09-15"));
        expect(getLicEvents).toHaveBeenCalled();
        expect(getOvaEvents).toHaveBeenCalled();

        expect(
            screen.getByText(/No events are scheduled for this week/i),
        ).toBeInTheDocument();
    });

    test("uses weekStart param to compute a 7-day window starting Monday", async () => {
        // Make EventGrid read same weekStart from client params
        currentSearchParams = new URLSearchParams("weekStart=2025-09-15");

        const jsx = (await Home({
            searchParams: Promise.resolve({ weekStart: "2025-09-15" }),
        })) as React.ReactElement;
        render(<Providers>{jsx}</Providers>);

        const calls = (getKciEvents as unknown as jest.Mock).mock.calls as Array<
            [{ end: string; start: string }]
        >;
        const [firstCall] = calls;
        const [args] = firstCall;
        expect(typeof args.start).toBe("string");
        expect(typeof args.end).toBe("string");
    });
});
