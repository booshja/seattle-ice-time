import { render, screen } from "@/testing/utils";
import { useActionState } from "react";

import { IssueForm } from "../IssueForm";

jest.mock("next/navigation", () => {
    const actual: Record<string, unknown> = jest.requireActual("next/navigation");
    return {
        ...actual,
        useRouter: () => ({ push: jest.fn() }),
    };
});

jest.mock("react", () => {
    const actual: Record<string, unknown> = jest.requireActual("react");
    return { ...actual, useActionState: jest.fn() };
});

describe("IssueForm", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders success component when message is success", () => {
        (useActionState as unknown as jest.Mock).mockReturnValue([
            { message: "Issue created successfully" },
            jest.fn(),
            false,
        ]);

        render(<IssueForm />);
        expect(
            screen.getByText(/Your issue was successfully logged/i),
        ).toBeInTheDocument();
    });

    it("renders error component when message is failure", () => {
        (useActionState as unknown as jest.Mock).mockReturnValue([
            { message: "Issue creation failed" },
            jest.fn(),
            false,
        ]);

        render(<IssueForm />);
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
});
