import { render, screen } from "@testing-library/react";

jest.mock("../../utils/helpers/krakenCommunityIceplex", () => ({
    getKciEvents: jest.fn(async () => []),
}));
jest.mock("../../utils/helpers/lynnwoodOva", () => ({
    getLicEvents: jest.fn(async () => []),
    getOvaEvents: jest.fn(async () => []),
}));

jest.mock("next/navigation", () => {
    const actual = jest.requireActual("next/navigation");
    return {
        ...actual,
        useSearchParams: () => new URLSearchParams(),
    };
});

import { getKciEvents } from "../../utils/helpers/krakenCommunityIceplex";
import { getLicEvents, getOvaEvents } from "../../utils/helpers/lynnwoodOva";
import Home from "../page";
import { Providers } from "@/components/Providers/Providers";

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
        const jsx = await Home({ searchParams: Promise.resolve({}) });
        render(<Providers>{jsx}</Providers>);

        expect(getKciEvents).toHaveBeenCalledWith({
            start: expect.stringContaining("2025-09-08"),
            end: expect.stringContaining("2025-09-15"),
        });
        expect(getLicEvents).toHaveBeenCalled();
        expect(getOvaEvents).toHaveBeenCalled();

        expect(
            screen.getByText(/No events are scheduled for this week/i),
        ).toBeInTheDocument();
    });

    test("uses weekStart param to compute a 7-day window starting Monday", async () => {
        // Make EventGrid read same weekStart from client params
        (jest.requireMock("next/navigation") as any).useSearchParams = () =>
            new URLSearchParams("weekStart=2025-09-15");

        const jsx = await Home({
            searchParams: Promise.resolve({ weekStart: "2025-09-15" }),
        });
        render(<Providers>{jsx}</Providers>);

        expect(getKciEvents).toHaveBeenCalledTimes(1);
        const arg = (getKciEvents as jest.Mock).mock.calls[0][0];
        expect(typeof arg.start).toBe("string");
        expect(typeof arg.end).toBe("string");
        const ms = new Date(arg.end).getTime() - new Date(arg.start).getTime();
        expect(ms).toBe(7 * 24 * 60 * 60 * 1000);
    });
});
