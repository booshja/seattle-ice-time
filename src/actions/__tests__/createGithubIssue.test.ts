jest.mock("axios", () => ({ post: jest.fn() }));
jest.mock("@react-email/render", () => ({ render: jest.fn() }));
jest.mock("../../lib/aws/emailSender", () => ({ sendEmail: jest.fn() }));
jest.mock("../../components/Email/IssueEmail", () => ({ IssueEmail: () => null }));

// Require after mocks to avoid loading heavy modules
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const renderMod = require("@react-email/render");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const emailSender = require("../../lib/aws/emailSender");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createGithubIssue } = require("../createGithubIssue");

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

    test("returns failure when token missing", async () => {
        process.env.GITHUB_ISSUE_TOKEN = "";
        const res = await createGithubIssue(
            {},
            makeFormData({ title: "t", description: "d" }),
        );
        expect(res.message).toMatch(/missing configuration/);
    });

    test("creates issue and sends email", async () => {
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
        expect(axios.post).toHaveBeenCalled();
        expect(renderMod.render).toHaveBeenCalled();
        expect(emailSender.sendEmail).toHaveBeenCalled();
        expect(res.message).toMatch(/Issue created successfully/);
    });

    test("handles non-201 response", async () => {
        (axios.post as jest.Mock).mockResolvedValue({ status: 400, data: {} });
        const res = await createGithubIssue(
            {},
            makeFormData({ title: "Bug", description: "Desc" }),
        );
        expect(res.message).toMatch(/Issue creation failed/);
    });

    test("handles axios error and returns failure", async () => {
        (axios.post as jest.Mock).mockRejectedValue(new Error("boom"));
        const res = await createGithubIssue(
            {},
            makeFormData({ title: "Bug", description: "Desc" }),
        );
        expect(res.message).toMatch(/Issue creation failed/);
    });

    test("logs email send failure but still succeeds", async () => {
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
