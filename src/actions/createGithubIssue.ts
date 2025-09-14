"use server";

import { IssueEmail } from "@/components/Email/IssueEmail";
import { sendEmail } from "@/lib/aws/emailSender";
import { render } from "@react-email/render";
import axios from "axios";
import React from "react";

interface GithubIssueResponse {
    html_url: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createGithubIssue(_: any, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const reporterEmail =
        (formData.get("email") as string) || process.env.EMAIL_FROM_ADDRESS || "N/A";

    try {
        if (!process.env.GITHUB_ISSUE_TOKEN) {
            console.error("GITHUB_ISSUE_TOKEN not configured");
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

            const emailElement = React.createElement(IssueEmail, {
                title,
                description: `${description}\n\nReporter: ${reporterEmail}`,
                issueLink,
            });
            const html = await render(emailElement);

            try {
                await sendEmail({ subject: `New Issue: ${title}`, content: html });
            } catch (emailErr) {
                console.error("Email send failed", emailErr);
                // Do not fail the whole operation if email fails after issue creation
            }

            return { message: "Issue created successfully" };
        } else {
            return { message: "Issue creation failed" };
        }
    } catch (e) {
        console.error(e);
        return { message: "Issue creation failed" };
    }
}
