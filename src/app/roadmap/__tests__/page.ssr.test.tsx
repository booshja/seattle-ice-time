import { render } from "@testing-library/react";

import RoadmapPage from "../page";
import roadmapItems from "../roadmapItems.json";

describe("/roadmap", () => {
    it("renders title and feedback link", () => {
        const { getByRole, getByText } = render(<RoadmapPage />);
        expect(getByRole("heading", { name: /roadmap/i })).toBeInTheDocument();
        const link = getByText(/feedback/i);
        expect(link).toHaveAttribute("href", "/feedback");
    });

    it("renders an ordered list of items from JSON", () => {
        const { container, getAllByRole } = render(<RoadmapPage />);
        expect(container.querySelector("ol")).not.toBeNull();
        const items = getAllByRole("listitem");
        expect(items.length).toBe(roadmapItems.length);
    });
});
