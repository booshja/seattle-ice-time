"use server";

import { render } from "@react-email/render";
import axios from "axios";
import { after } from "next/server";
import React from "react";

import { IssueEmail } from "@/components/Email/IssueEmail";
import { sendEmail } from "@/lib/aws/emailSender";
import { captureError, captureMessage } from "@/lib/sentry/utils";

interface GithubIssueResponse {
    html_url: string;
}

export interface GithubIssueState {
    message: string;
}

export async function createGithubIssue(_: GithubIssueState, formData: FormData) {
    const title = (formData.get("title") as string | null)?.trim();
    const description = (formData.get("description") as string) ?? "";
    const reporterEmail =
        (formData.get("email") as string) || process.env.EMAIL_FROM_ADDRESS || "N/A";

    if (!title) {
        return { message: "Issue creation failed: title is required" };
    }

    try {
        if (!process.env.GITHUB_ISSUE_TOKEN) {
            captureMessage("GITHUB_ISSUE_TOKEN not configured");
            return { message: "Issue creation failed: missing configuration" };
        }
        const res = await axios.post<unknown>(
            "https://api.github.com/repos/booshja/seattle-ice-time/issues",
            {
                title,
                body: description,
                assignees: ["booshja"],
            },
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${process.env.GITHUB_ISSUE_TOKEN}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            },
        );

        if (res.status === 201) {
            const issueData = res.data as GithubIssueResponse;
            const issueLink = issueData.html_url;

            after(async () => {
                try {
                    const emailElement = React.createElement(IssueEmail, {
                        title,
                        description: `${description}\n\nReporter: ${reporterEmail}`,
                        issueLink,
                    });
                    const html = await render(emailElement);
                    await sendEmail({ subject: `New Issue: ${title}`, content: html });
                } catch (emailErr) {
                    captureError(emailErr, { context: "email_after_issue_creation" });
                }
            });

            return { message: "Issue created successfully" };
        } else {
            captureMessage(
                `GitHub issue creation returned unexpected status ${res.status}`,
                "warning",
            );
            return { message: "Issue creation failed" };
        }
    } catch (e) {
        captureError(e);
        return { message: "Issue creation failed" };
    }
}
