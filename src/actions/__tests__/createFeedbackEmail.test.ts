jest.mock("@react-email/render", () => ({ render: jest.fn() }));
jest.mock("../../lib/aws/emailSender", () => ({ sendEmail: jest.fn() }));
jest.mock("../../components/Email/FeedbackEmail", () => ({
    FeedbackEmail: () => null,
}));

import * as renderMod from "@react-email/render";

import * as emailSender from "../../lib/aws/emailSender";
import { createFeedbackEmail } from "../createFeedbackEmail";

function makeFormData(entries: Record<string, string>): FormData {
    const fd = new FormData();
    Object.entries(entries).forEach(([k, v]) => fd.append(k, v));
    return fd;
}

describe("createFeedbackEmail", () => {
    test("returns error when feedback missing", async () => {
        const fd = makeFormData({ email: "user@example.com", feedback: "" });
        const res = await createFeedbackEmail({}, fd);
        expect(res).toEqual({ status: "error", message: "Feedback is required" });
    });

    test("sends email on success", async () => {
        (renderMod.render as jest.Mock).mockResolvedValue("<html>email</html>");
        (emailSender.sendEmail as jest.Mock).mockResolvedValue(undefined);
        const fd = makeFormData({ email: "user@example.com", feedback: "Hello" });
        const res = await createFeedbackEmail({}, fd);
        expect(renderMod.render).toHaveBeenCalled();
        expect(emailSender.sendEmail).toHaveBeenCalled();
        expect(res).toEqual({ status: "success", message: "Feedback sent" });
    });

    test("handles sendEmail failure", async () => {
        (renderMod.render as jest.Mock).mockResolvedValue("<html>email</html>");
        (emailSender.sendEmail as jest.Mock).mockRejectedValue(new Error("fail"));
        const fd = makeFormData({ email: "user@example.com", feedback: "Hello" });
        const res = await createFeedbackEmail({}, fd);
        expect(res).toEqual({ status: "error", message: "Failed to send feedback" });
    });
});
