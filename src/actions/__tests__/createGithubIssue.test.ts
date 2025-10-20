jest.mock("axios", () => ({ post: jest.fn() }));
jest.mock("@react-email/render", () => ({ render: jest.fn() }));
jest.mock("../../lib/aws/emailSender", () => ({ sendEmail: jest.fn() }));
jest.mock("../../components/Email/IssueEmail", () => ({ IssueEmail: () => null }));

import * as renderMod from "@react-email/render";
import axios from "axios";

import * as emailSender from "../../lib/aws/emailSender";
import { createGithubIssue } from "../createGithubIssue";

function makeFormData(entries: Record<string, string>): FormData {
    const fd = new FormData();
    Object.entries(entries).forEach(([k, v]) => fd.append(k, v));
    return fd;
}

describe("createGithubIssue", () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules();
        process.env = {
            ...OLD_ENV,
            GITHUB_ISSUE_TOKEN: "token",
            EMAIL_FROM_ADDRESS: "from@example.com",
        };
    });
    afterAll(() => {
        process.env = OLD_ENV;
    });

    describe("env missing", () => {
        it("returns failure when token missing", async () => {
            process.env.GITHUB_ISSUE_TOKEN = "";
            const res = await createGithubIssue(
                {},
                makeFormData({ title: "t", description: "d" }),
            );
            expect(res.message).toMatch(/missing configuration/);
        });
    });

    describe("success", () => {
        it("creates issue and sends email", async () => {
            (axios.post as jest.Mock).mockResolvedValue({
                status: 201,
                data: { html_url: "http://x" },
            });
            (renderMod.render as jest.Mock).mockResolvedValue("<html>issue</html>");
            (emailSender.sendEmail as jest.Mock).mockResolvedValue(undefined);
            const res = await createGithubIssue(
                {},
                makeFormData({
                    title: "Bug",
                    description: "Desc",
                    email: "r@example.com",
                }),
            );
            expect(renderMod.render).toHaveBeenCalled();
            expect(emailSender.sendEmail).toHaveBeenCalled();
            expect(res.message).toMatch(/Issue created successfully/);
        });
    });

    describe("non-201 responses", () => {
        it("handles non-201 response", async () => {
            (axios.post as jest.Mock).mockResolvedValue({ status: 400, data: {} });
            const res = await createGithubIssue(
                {},
                makeFormData({ title: "Bug", description: "Desc" }),
            );
            expect(res.message).toMatch(/Issue creation failed/);
        });
    });

    describe("errors", () => {
        it("handles axios error and returns failure", async () => {
            (axios.post as jest.Mock).mockRejectedValue(new Error("boom"));
            const res = await createGithubIssue(
                {},
                makeFormData({ title: "Bug", description: "Desc" }),
            );
            expect(res.message).toMatch(/Issue creation failed/);
        });

        it("logs email send failure but still succeeds", async () => {
            (axios.post as jest.Mock).mockResolvedValue({
                status: 201,
                data: { html_url: "http://x" },
            });
            (renderMod.render as jest.Mock).mockResolvedValue("<html>issue</html>");
            (emailSender.sendEmail as jest.Mock).mockRejectedValue(new Error("smtp"));
            const res = await createGithubIssue(
                {},
                makeFormData({ title: "Bug", description: "Desc" }),
            );
            expect(res.message).toMatch(/Issue created successfully/);
        });
    });
});
