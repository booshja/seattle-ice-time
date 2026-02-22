import { render } from "@react-email/render";

import * as emailSender from "../../lib/aws/emailSender";
import { createFeedbackEmail } from "../createFeedbackEmail";

import type { FeedbackEmailState } from "../createFeedbackEmail";
import type { Mock } from "vitest";

const initialState: FeedbackEmailState = { message: "", status: "idle" };

vi.mock("@react-email/render");
vi.mock("../../lib/aws/emailSender", () => ({ sendEmail: vi.fn() }));

describe("createFeedbackEmail", () => {
    describe("success", () => {
        it("returns success on render and send", async () => {
            (render as Mock).mockResolvedValue("<html>ok</html>");
            (emailSender.sendEmail as Mock).mockResolvedValue(undefined);
            const form = new FormData();
            form.append("email", "e@example.com");
            form.append("feedback", "m");
            const res = await createFeedbackEmail(initialState, form);
            expect(res.status).toBe("success");
        });
    });

    describe("errors", () => {
        it("returns error when render throws", async () => {
            (render as Mock).mockRejectedValue(new Error("fail"));
            const form = new FormData();
            form.append("email", "e@example.com");
            form.append("feedback", "m");
            const res = await createFeedbackEmail(initialState, form);
            expect(res.status).toBe("error");
        });
    });

    describe("validation", () => {
        it("returns error when feedback is missing", async () => {
            (render as Mock).mockResolvedValue("<html>ok</html>");
            const form = new FormData();
            form.append("email", "e@example.com");
            // no feedback
            const res = await createFeedbackEmail(initialState, form);
            expect(res.status).toBe("error");
        });
    });
});
