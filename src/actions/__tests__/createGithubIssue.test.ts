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

    test("returns failure when token missing", async function (this: void) {
        process.env.GITHUB_ISSUE_TOKEN = "";
        const res = await createGithubIssue(
            {},
            makeFormData({ title: "t", description: "d" }),
        );
        expect(res.message).toMatch(/missing configuration/);
    });

    test("creates issue and sends email", async function (this: void) {
        (axios.post as jest.Mock).mockResolvedValue({
            status: 201,
            data: { html_url: "http://x" },
        });
        (renderMod.render as jest.Mock).mockResolvedValue("<html>issue</html>");
        (emailSender.sendEmail as jest.Mock).mockResolvedValue(undefined);
        const res = await createGithubIssue(
            {},
            makeFormData({ title: "Bug", description: "Desc", email: "r@example.com" }),
        );
        const calls = (axios.post as jest.Mock).mock.calls;
        expect(calls.length).toBeGreaterThan(0);
        expect(renderMod.render).toHaveBeenCalled();
        expect(emailSender.sendEmail).toHaveBeenCalled();
        expect(res.message).toMatch(/Issue created successfully/);
    });

    test("handles non-201 response", async function (this: void) {
        (axios.post as jest.Mock).mockResolvedValue({ status: 400, data: {} });
        const res = await createGithubIssue(
            {},
            makeFormData({ title: "Bug", description: "Desc" }),
        );
        expect(res.message).toMatch(/Issue creation failed/);
    });

    test("handles axios error and returns failure", async function (this: void) {
        (axios.post as jest.Mock).mockRejectedValue(new Error("boom"));
        const res = await createGithubIssue(
            {},
            makeFormData({ title: "Bug", description: "Desc" }),
        );
        expect(res.message).toMatch(/Issue creation failed/);
    });

    test("logs email send failure but still succeeds", async function (this: void) {
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
