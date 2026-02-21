import * as React from "react";
import { useActionState } from "react";

import { render, screen } from "@/testing/utils";

import { FeedbackForm } from "../FeedbackForm";

import type { Mock } from "vitest";

vi.mock("react", async () => {
    const actual: Record<string, unknown> = await vi.importActual("react");
    return { ...actual, useActionState: vi.fn() };
});

describe("FeedbackForm", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders success branch", () => {
        (useActionState as unknown as Mock).mockReturnValue([
            { status: "success", message: "Feedback sent" },
            vi.fn(),
            false,
        ]);

        render(<FeedbackForm />);

        expect(screen.getByText(/Success!/i)).toBeInTheDocument();
    });

    it("renders error branch", () => {
        (useActionState as unknown as Mock).mockReturnValue([
            { status: "error", message: "Failed to send feedback" },
            vi.fn(),
            false,
        ]);

        render(<FeedbackForm />);

        expect(screen.getByText(/Failed to send feedback/i)).toBeInTheDocument();
    });
});
