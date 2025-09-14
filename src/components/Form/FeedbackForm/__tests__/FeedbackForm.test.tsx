import { Providers } from "@/components/Providers/Providers";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { useActionState } from "react";

import { FeedbackForm } from "../FeedbackForm";

jest.mock("react", () => {
    const actual: Record<string, unknown> = jest.requireActual("react");
    return { ...actual, useActionState: jest.fn() };
});

describe("FeedbackForm", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renders success branch", () => {
        (useActionState as unknown as jest.Mock).mockReturnValue([
            { status: "success", message: "Feedback sent" },
            jest.fn(),
            false,
        ]);

        render(
            <Providers>
                <FeedbackForm />
            </Providers>,
        );

        expect(screen.getByText(/Success!/i)).toBeInTheDocument();
    });

    test("renders error branch", () => {
        (useActionState as unknown as jest.Mock).mockReturnValue([
            { status: "error", message: "Failed to send feedback" },
            jest.fn(),
            false,
        ]);

        render(
            <Providers>
                <FeedbackForm />
            </Providers>,
        );

        expect(screen.getByText(/Failed to send feedback/i)).toBeInTheDocument();
    });
});
