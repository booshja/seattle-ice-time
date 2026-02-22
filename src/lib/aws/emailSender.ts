"use server";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import nodemailer from "nodemailer";

interface EmailSenderProps {
    content: string;
    subject: string;
}

export const sendEmail = async ({ subject, content }: EmailSenderProps) => {
    if (
        !process.env.SES_ACCESS_KEY ||
        !process.env.SES_SECRET_KEY ||
        !process.env.SES_REGION
    ) {
        throw new Error("AWS credentials not found");
    }

    if (!process.env.EMAIL_FROM_ADDRESS || !process.env.EMAIL_TO_ADDRESS) {
        throw new Error("Email configuration not found");
    }

    const ses = new SESv2Client({
        region: process.env.SES_REGION,
        credentials: {
            accessKeyId: process.env.SES_ACCESS_KEY,
            secretAccessKey: process.env.SES_SECRET_KEY,
        },
    });
    const transporter = nodemailer.createTransport({
        SES: { sesClient: ses, SendEmailCommand },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM_ADDRESS,
        to: process.env.EMAIL_TO_ADDRESS,
        subject,
        html: content,
    });
};
