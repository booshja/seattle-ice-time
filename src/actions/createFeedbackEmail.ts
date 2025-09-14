"use server";

import { FeedbackEmail } from "@/components/Email/FeedbackEmail";
import { sendEmail } from "@/lib/aws/emailSender";
import { render } from "@react-email/render";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createFeedbackEmail(_: any, formData: FormData) {
    const emailRaw = (formData.get("email") as string) || "";
    const feedbackRaw = (formData.get("feedback") as string) || "";

    const email = emailRaw.trim() || "No email provided";
    const feedbackMessage = feedbackRaw.trim();

    if (!feedbackMessage) {
        return { status: "error" as const, message: "Feedback is required" };
    }

    try {
        const emailElement = React.createElement(FeedbackEmail, {
            email,
            feedbackMessage,
        });
        const html = await render(emailElement);

        await sendEmail({
            subject: "New Seattle Ice Time Feedback Message!",
            content: html,
        });

        return { status: "success" as const, message: "Feedback sent" };
    } catch (e) {
        console.error(e);
        return { status: "error" as const, message: "Failed to send feedback" };
    }
}
