vi.mock("axios", () => ({ default: { post: vi.fn() } }));
vi.mock("@react-email/render", () => ({ render: vi.fn() }));
vi.mock("../../lib/aws/emailSender", () => ({ sendEmail: vi.fn() }));
vi.mock("../../components/Email/IssueEmail", () => ({ IssueEmail: () => null }));
vi.mock("next/server", () => ({
    after: (cb: () => void) => cb(),
}));

import * as renderMod from "@react-email/render";
import axios from "axios";
import type { Mock } from "vitest";

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
        vi.resetModules();
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
            (axios.post as Mock).mockResolvedValue({
                status: 201,
                data: { html_url: "http://x" },
            });
            (renderMod.render as Mock).mockResolvedValue("<html>issue</html>");
            (emailSender.sendEmail as Mock).mockResolvedValue(undefined);
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
            (axios.post as Mock).mockResolvedValue({ status: 400, data: {} });
            const res = await createGithubIssue(
                {},
                makeFormData({ title: "Bug", description: "Desc" }),
            );
            expect(res.message).toMatch(/Issue creation failed/);
        });
    });

    describe("errors", () => {
        it("handles axios error and returns failure", async () => {
            (axios.post as Mock).mockRejectedValue(new Error("boom"));
            const res = await createGithubIssue(
                {},
                makeFormData({ title: "Bug", description: "Desc" }),
            );
            expect(res.message).toMatch(/Issue creation failed/);
        });

        it("logs email send failure but still succeeds", async () => {
            (axios.post as Mock).mockResolvedValue({
                status: 201,
                data: { html_url: "http://x" },
            });
            (renderMod.render as Mock).mockResolvedValue("<html>issue</html>");
            (emailSender.sendEmail as Mock).mockRejectedValue(new Error("smtp"));
            const res = await createGithubIssue(
                {},
                makeFormData({ title: "Bug", description: "Desc" }),
            );
            expect(res.message).toMatch(/Issue created successfully/);
        });
    });
});
