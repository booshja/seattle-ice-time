"use server";

import axios from "axios";
import { render } from "@react-email/render";
import React from "react";
import { IssueEmail } from "@/components/Email/IssueEmail";
import { sendEmail } from "@/lib/aws/emailSender";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createGithubIssue(_: any, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const reporterEmail =
        (formData.get("email") as string) || "unknown@seattle-ice-time";

    try {
        const res = await axios.post(
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
            const issueLink = res.data.html_url as string;

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
