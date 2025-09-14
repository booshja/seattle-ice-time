import { render, screen } from "@testing-library/react";

import Loading from "../loading";

describe("App loading page", () => {
    test("renders grid loading skeleton", () => {
        render(<Loading />);
        expect(screen.getByTestId("loading.eventGrid")).toBeInTheDocument();
    });
});
