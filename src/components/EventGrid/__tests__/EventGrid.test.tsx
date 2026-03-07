import { render, screen, fireEvent } from "@/testing/utils";
import { COLORS } from "@/utils/constants/colors";
import { RINKS } from "@/utils/constants/rinks";

import { EventGrid } from "../EventGrid";

import type { KciEventObject as KciEventObjectType } from "@/types/krakenCommunityIceplex";
import type { SnoKingEventObject } from "@/types/snoKing";

const mockNextDay = vi.fn();
const mockPrevDay = vi.fn();
const mockSetSelectedIndex = vi.fn();
const mockNavigateToWeek = vi.fn();
let mockSelectedIndex = 0;
let mockIsCurrentWeek = true;
let mockIsCurrentWeekEmpty = false;

let mockMediaQueryTier: "mobile" | "tablet" | "desktop" | null = "desktop";

vi.mock("@/hooks/useMediaQuery", () => ({
    useMediaQuery: () => mockMediaQueryTier,
}));

vi.mock("@/store/selectedDay/selectedDayStoreProvider", async (importOriginal) => {
    const actual = await importOriginal<Record<string, unknown>>();
    return {
        ...actual,
        useSelectedDayStore: (selector: (s: unknown) => unknown) =>
            selector({
                selectedIndex: mockSelectedIndex,
                setSelectedIndex: mockSetSelectedIndex,
                next: mockNextDay,
                prev: mockPrevDay,
            }),
    };
});

vi.mock("@/hooks/useWeekNavigation", () => ({
    useWeekNavigation: () => ({
        base: new Date("2025-09-08"),
        isCurrentWeek: mockIsCurrentWeek,
        isPending: false,
        navigateToWeek: mockNavigateToWeek,
    }),
}));

vi.mock("@/store/events/eventsStoreProvider", async (importOriginal) => {
    const actual = await importOriginal<Record<string, unknown>>();
    return {
        ...actual,
        useEventsStore: (selector: (s: unknown) => unknown) =>
            selector({
                currentKci: [],
                currentLynnwood: [],
                currentOlympicview: [],
                currentSnoKing: [],
                setInitialKciEvents: vi.fn(),
                setInitialLynnwoodEvents: vi.fn(),
                setInitialOlympicviewEvents: vi.fn(),
                setInitialSnoKingEvents: vi.fn(),
                setIsCurrentWeekEmpty: vi.fn(),
                isCurrentWeekEmpty: mockIsCurrentWeekEmpty,
            }),
    };
});

function swipeLeft(element: HTMLElement, startX = 200, endX = 100) {
    fireEvent.touchStart(element, {
        touches: [{ clientX: startX, clientY: 200 }],
    });
    fireEvent.touchEnd(element, {
        changedTouches: [{ clientX: endX, clientY: 200 }],
    });
}

function swipeRight(element: HTMLElement, startX = 100, endX = 200) {
    fireEvent.touchStart(element, {
        touches: [{ clientX: startX, clientY: 200 }],
    });
    fireEvent.touchEnd(element, {
        changedTouches: [{ clientX: endX, clientY: 200 }],
    });
}

describe("EventGrid", () => {
    describe("empty state", () => {
        it("renders message when no events", () => {
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );
            expect(
                screen.getByText(/No events are scheduled for this week/i),
            ).toBeInTheDocument();
        });
    });

    describe("loading", () => {
        it("does not show loading skeleton once empty state is shown", async () => {
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );
            expect(
                await screen.findByText(/No events are scheduled for this week/i),
            ).toBeInTheDocument();
        });
    });

    describe("with events", () => {
        const sampleKciEvent = (
            overrides?: Partial<Omit<KciEventObjectType, "location">>,
        ): KciEventObjectType => ({
            color: "#123",
            day: "Monday",
            end: { date: "2025-09-08", military: "10:00", time: "10:00am" },
            id: "test-event-1",
            start: { date: "2025-09-08", military: "09:00", time: "9:00am" },
            title: "Stick & Puck",
            url: "https://example.com",
            location: RINKS.KCI.name,
            ...(overrides || {}),
        });

        it("renders EventColumn and EventCell when events present", () => {
            render(
                <EventGrid
                    kciEvents={[sampleKciEvent()]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );

            expect(screen.getByText("Monday")).toBeInTheDocument();
            expect(screen.getByText("Stick & Puck")).toBeInTheDocument();
            expect(
                screen.queryByText(/No events are scheduled for this week/i),
            ).not.toBeInTheDocument();
        });
    });

    describe("with SnoKing events", () => {
        const sampleSnoKingEvent = (
            overrides?: Partial<SnoKingEventObject>,
        ): SnoKingEventObject => ({
            color: COLORS.rinks.KIRKLAND,
            day: "Tuesday",
            end: { date: "2025-09-09", military: "14:00", time: "2:00pm" },
            id: "sk-kirkland-1",
            start: { date: "2025-09-09", military: "12:45", time: "12:45pm" },
            title: "Stick N Puck",
            url: "https://example.com/snoking",
            location: RINKS.KIRKLAND.name,
            sheet: undefined,
            ...overrides,
        });

        it("renders SnoKing events on the grid", () => {
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[sampleSnoKingEvent()]}
                />,
            );

            expect(screen.getByText("Stick N Puck")).toBeInTheDocument();
            expect(screen.getByText("Sno-King Kirkland")).toBeInTheDocument();
        });

        it("renders Renton events with sheet name in location", () => {
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[
                        sampleSnoKingEvent({
                            id: "sk-renton-1",
                            color: COLORS.rinks.RENTON,
                            location: RINKS.RENTON.name,
                            sheet: "Small Ice",
                        }),
                    ]}
                />,
            );

            expect(screen.getByText("Sno-King Renton (Small Ice)")).toBeInTheDocument();
        });

        it("renders events from multiple SnoKing rinks", () => {
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[
                        sampleSnoKingEvent(),
                        sampleSnoKingEvent({
                            id: "sk-snoqualmie-1",
                            color: COLORS.rinks.SNOQUALMIE,
                            location: RINKS.SNOQUALMIE.name,
                            day: "Tuesday",
                            start: {
                                date: "2025-09-09",
                                military: "06:00",
                                time: "6:00am",
                            },
                            end: {
                                date: "2025-09-09",
                                military: "07:45",
                                time: "7:45am",
                            },
                        }),
                    ]}
                />,
            );

            expect(screen.getByText("Sno-King Kirkland")).toBeInTheDocument();
            expect(screen.getByText("Sno-King Snoqualmie")).toBeInTheDocument();
        });
    });

    describe("swipe boundary navigation", () => {
        beforeEach(() => {
            mockMediaQueryTier = "mobile";
            mockNextDay.mockClear();
            mockPrevDay.mockClear();
            mockSetSelectedIndex.mockClear();
            mockNavigateToWeek.mockClear();
            mockSelectedIndex = 0;
            mockIsCurrentWeek = true;
            mockIsCurrentWeekEmpty = false;
            Object.defineProperty(window, "innerWidth", { value: 390, writable: true });
        });

        afterEach(() => {
            mockMediaQueryTier = "desktop";
        });

        it("swipe left on a mid-week day calls nextDay", () => {
            mockSelectedIndex = 3;
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );
            const wrapper = screen.getByText(/No events are scheduled/i).closest("div")!
                .parentElement!.parentElement!;
            swipeLeft(wrapper);
            expect(mockNextDay).toHaveBeenCalled();
            expect(mockNavigateToWeek).not.toHaveBeenCalled();
        });

        it("swipe right on a mid-week day calls prevDay", () => {
            mockSelectedIndex = 3;
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );
            const wrapper = screen.getByText(/No events are scheduled/i).closest("div")!
                .parentElement!.parentElement!;
            swipeRight(wrapper);
            expect(mockPrevDay).toHaveBeenCalled();
            expect(mockNavigateToWeek).not.toHaveBeenCalled();
        });

        it("swipe left on Sunday (index 6) navigates to next week and selects Monday", () => {
            mockSelectedIndex = 6;
            mockIsCurrentWeekEmpty = false;
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );
            const wrapper = screen.getByText(/No events are scheduled/i).closest("div")!
                .parentElement!.parentElement!;
            swipeLeft(wrapper);
            expect(mockNavigateToWeek).toHaveBeenCalledWith("next");
            expect(mockSetSelectedIndex).toHaveBeenCalledWith(0);
            expect(mockNextDay).not.toHaveBeenCalled();
        });

        it("swipe left on Sunday does not navigate when current week is empty", () => {
            mockSelectedIndex = 6;
            mockIsCurrentWeekEmpty = true;
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );
            const wrapper = screen.getByText(/No events are scheduled/i).closest("div")!
                .parentElement!.parentElement!;
            swipeLeft(wrapper);
            expect(mockNavigateToWeek).not.toHaveBeenCalled();
            expect(mockNextDay).toHaveBeenCalled();
        });

        it("swipe right on Monday (index 0) navigates to previous week and selects Sunday when not current week", () => {
            mockSelectedIndex = 0;
            mockIsCurrentWeek = false;
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );
            const wrapper = screen.getByText(/No events are scheduled/i).closest("div")!
                .parentElement!.parentElement!;
            swipeRight(wrapper);
            expect(mockNavigateToWeek).toHaveBeenCalledWith("previous");
            expect(mockSetSelectedIndex).toHaveBeenCalledWith(6);
            expect(mockPrevDay).not.toHaveBeenCalled();
        });

        it("swipe right on Monday does not navigate when already on current week", () => {
            mockSelectedIndex = 0;
            mockIsCurrentWeek = true;
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                />,
            );
            const wrapper = screen.getByText(/No events are scheduled/i).closest("div")!
                .parentElement!.parentElement!;
            swipeRight(wrapper);
            expect(mockNavigateToWeek).not.toHaveBeenCalled();
            expect(mockPrevDay).toHaveBeenCalled();
        });

        it("swipe right on Monday navigating to a week containing today does not override selectedIndex with today's column", () => {
            mockSelectedIndex = 0;
            mockIsCurrentWeek = false;
            // Simulate that today is Saturday (index 5) within the base week
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2025-09-13T12:00:00")); // Saturday of 2025-09-08 week
            render(
                <EventGrid
                    kciEvents={[]}
                    licEvents={[]}
                    ovaEvents={[]}
                    snoKingEvents={[]}
                    weekStartIso="2025-09-15T00:00:00.000Z"
                />,
            );
            const wrapper = screen.getByText(/No events are scheduled/i).closest("div")!
                .parentElement!.parentElement!;
            swipeRight(wrapper);
            // Should call setSelectedIndex(6) for Sunday, not have it overridden to 5 (Saturday)
            expect(mockNavigateToWeek).toHaveBeenCalledWith("previous");
            expect(mockSetSelectedIndex).toHaveBeenCalledTimes(1);
            expect(mockSetSelectedIndex).toHaveBeenCalledWith(6);
            vi.useRealTimers();
        });
    });
});
