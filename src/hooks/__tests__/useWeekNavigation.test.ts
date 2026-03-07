import { renderHook, act } from "@testing-library/react";

import { useWeekNavigation } from "../useWeekNavigation";

const mockPush = vi.fn();

vi.mock("next/navigation", async () => {
    const actual = await vi.importActual<Record<string, unknown>>("next/navigation");
    return {
        ...actual,
        usePathname: () => "/",
        useRouter: () => ({ push: mockPush }),
        useSearchParams: () => new URLSearchParams(),
    };
});

describe("useWeekNavigation", () => {
    beforeEach(() => {
        mockPush.mockClear();
    });

    describe("isCurrentWeek", () => {
        it("returns true when no weekStart param is present", () => {
            const { result } = renderHook(() => useWeekNavigation());
            expect(result.current.isCurrentWeek).toBe(true);
        });
    });

    describe("navigateToWeek", () => {
        it("navigates to the next week by setting weekStart param", () => {
            const { result } = renderHook(() => useWeekNavigation());
            act(() => {
                result.current.navigateToWeek("next");
            });
            expect(mockPush).toHaveBeenCalledWith(
                expect.stringContaining("weekStart="),
            );
        });

        it("navigates to pathname root when going previous from current week", () => {
            const { result } = renderHook(() => useWeekNavigation());
            act(() => {
                result.current.navigateToWeek("previous");
            });
            expect(mockPush).toHaveBeenCalledWith("/");
        });
    });

    describe("base date", () => {
        it("returns the current week Monday when no weekStart param", () => {
            const { result } = renderHook(() => useWeekNavigation());
            const base = result.current.base;
            expect(base).toBeInstanceOf(Date);
            expect(base.getDay()).toBe(1);
        });
    });
});
