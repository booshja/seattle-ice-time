import { render } from "@react-email/render";

import * as emailSender from "../../lib/aws/emailSender";
import { createFeedbackEmail } from "../createFeedbackEmail";

jest.mock("@react-email/render");
jest.mock("../../lib/aws/emailSender", () => ({ sendEmail: jest.fn() }));

describe("createFeedbackEmail", () => {
    describe("success", () => {
        it("returns success on render and send", async () => {
            (render as jest.Mock).mockResolvedValue("<html>ok</html>");
            (emailSender.sendEmail as jest.Mock).mockResolvedValue(undefined);
            const form = new FormData();
            form.append("email", "e@example.com");
            form.append("feedback", "m");
            const res = await createFeedbackEmail({}, form);
            expect(res.status).toBe("success");
        });
    });

    describe("errors", () => {
        it("returns error when render throws", async () => {
            (render as jest.Mock).mockRejectedValue(new Error("fail"));
            const form = new FormData();
            form.append("email", "e@example.com");
            form.append("feedback", "m");
            const res = await createFeedbackEmail({}, form);
            expect(res.status).toBe("error");
        });
    });

    describe("validation", () => {
        it("returns error when feedback is missing", async () => {
            (render as jest.Mock).mockResolvedValue("<html>ok</html>");
            const form = new FormData();
            form.append("email", "e@example.com");
            // no feedback
            const res = await createFeedbackEmail({}, form);
            expect(res.status).toBe("error");
        });
    });
});
