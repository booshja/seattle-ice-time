import { useActionState } from "react";
import type { Mock } from "vitest";

import { IssueForm } from "../IssueForm";

import { render, screen } from "@/testing/utils";

vi.mock("next/navigation", async () => {
    const actual: Record<string, unknown> = await vi.importActual("next/navigation");
    return {
        ...actual,
        useRouter: () => ({ push: vi.fn() }),
    };
});

vi.mock("react", async () => {
    const actual: Record<string, unknown> = await vi.importActual("react");
    return { ...actual, useActionState: vi.fn() };
});

describe("IssueForm", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders success component when message is success", () => {
        (useActionState as unknown as Mock).mockReturnValue([
            { message: "Issue created successfully" },
            vi.fn(),
            false,
        ]);

        render(<IssueForm />);
        expect(
            screen.getByText(/Your issue was successfully logged/i),
        ).toBeInTheDocument();
    });

    it("renders error component when message is failure", () => {
        (useActionState as unknown as Mock).mockReturnValue([
            { message: "Issue creation failed" },
            vi.fn(),
            false,
        ]);

        render(<IssueForm />);
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
});
