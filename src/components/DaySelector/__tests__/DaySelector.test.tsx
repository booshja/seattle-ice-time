import { fireEvent, render, screen } from "@/testing/utils";

import { DaySelector } from "../DaySelector";

const mockSetSelectedIndex = vi.fn();
let mockSelectedIndex = 0;

vi.mock("@/store/selectedDay/selectedDayStoreProvider", async (importOriginal) => {
    const actual = await importOriginal<Record<string, unknown>>();
    return {
        ...actual,
        useSelectedDayStore: (
            selector: (s: {
                selectedIndex: number;
                setSelectedIndex: (i: number) => void;
            }) => unknown,
        ) =>
            selector({
                selectedIndex: mockSelectedIndex,
                setSelectedIndex: mockSetSelectedIndex,
            }),
    };
});

const weekDates = [8, 9, 10, 11, 12, 13, 14];

describe("DaySelector", () => {
    beforeEach(() => {
        mockSelectedIndex = 0;
        mockSetSelectedIndex.mockClear();
    });

    it("renders 7 day tabs", () => {
        render(<DaySelector weekDates={weekDates} />);
        const tabs = screen.getAllByRole("tab");
        expect(tabs).toHaveLength(7);
    });

    it("shows abbreviated day labels", () => {
        render(<DaySelector weekDates={weekDates} />);
        expect(screen.getByText("Mon")).toBeInTheDocument();
        expect(screen.getByText("Tue")).toBeInTheDocument();
        expect(screen.getByText("Wed")).toBeInTheDocument();
        expect(screen.getByText("Thu")).toBeInTheDocument();
        expect(screen.getByText("Fri")).toBeInTheDocument();
        expect(screen.getByText("Sat")).toBeInTheDocument();
        expect(screen.getByText("Sun")).toBeInTheDocument();
    });

    it("shows date numbers", () => {
        render(<DaySelector weekDates={weekDates} />);
        expect(screen.getByText("8")).toBeInTheDocument();
        expect(screen.getByText("14")).toBeInTheDocument();
    });

    it("marks the active day with aria-selected", () => {
        mockSelectedIndex = 2;
        render(<DaySelector weekDates={weekDates} />);
        const tabs = screen.getAllByRole("tab");
        expect(tabs[2]).toHaveAttribute("aria-selected", "true");
        expect(tabs[0]).toHaveAttribute("aria-selected", "false");
    });

    it("calls setSelectedIndex when a tab is clicked", () => {
        render(<DaySelector weekDates={weekDates} />);
        const tabs = screen.getAllByRole("tab");
        fireEvent.click(tabs[4]);
        expect(mockSetSelectedIndex).toHaveBeenCalledWith(4);
    });
});
