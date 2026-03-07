import { fireEvent, render, screen } from "@/testing/utils";

import { Drawer } from "../Drawer";

let mockIsOpen = false;
const mockClose = vi.fn();

vi.mock("@/store/drawer/drawerStoreProvider", async (importOriginal) => {
    const actual = await importOriginal<Record<string, unknown>>();
    return {
        ...actual,
        useDrawerStore: (
            selector: (s: { isOpen: boolean; close: () => void }) => unknown,
        ) => selector({ isOpen: mockIsOpen, close: mockClose }),
    };
});

describe("Drawer", () => {
    beforeEach(() => {
        mockIsOpen = false;
        mockClose.mockClear();
    });

    it("renders as hidden when closed", () => {
        render(<Drawer />);
        const panel = screen.getByRole("dialog", { hidden: true });
        expect(panel).toBeInTheDocument();
    });

    it("renders as visible when open", () => {
        mockIsOpen = true;
        render(<Drawer />);
        const panel = screen.getByRole("dialog");
        expect(panel).toBeInTheDocument();
        expect(panel).toHaveAttribute("aria-modal", "true");
    });

    it("contains rink filter content", () => {
        mockIsOpen = true;
        render(<Drawer />);
        expect(screen.getByText("Filters")).toBeInTheDocument();
    });

    it("contains links", () => {
        mockIsOpen = true;
        render(<Drawer />);
        expect(screen.getByText(/Report an issue/)).toBeInTheDocument();
        expect(screen.getByText(/Give feedback/)).toBeInTheDocument();
        expect(screen.getByText(/Feature Roadmap/)).toBeInTheDocument();
    });

    it("calls close when close button is clicked", () => {
        mockIsOpen = true;
        render(<Drawer />);
        const closeButton = screen.getByLabelText("Close menu");
        fireEvent.click(closeButton);
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it("calls close when Escape key is pressed", () => {
        mockIsOpen = true;
        render(<Drawer />);
        fireEvent.keyDown(document, { key: "Escape" });
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it("locks body scroll when open", () => {
        mockIsOpen = true;
        render(<Drawer />);
        expect(document.body.style.overflow).toBe("hidden");
    });
});
