"use server";

import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";

import type SESTransport from "nodemailer/lib/ses-transport";

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

    const ses = new SESClient({
        apiVersion: "2010-12-01",
        region: process.env.SES_REGION,
        credentials: {
            accessKeyId: process.env.SES_ACCESS_KEY,
            secretAccessKey: process.env.SES_SECRET_KEY,
        },
    });
    const transporter = nodemailer.createTransport({
        SES: { ses, aws: { SendRawEmailCommand } },
    } as unknown as SESTransport.Options);

    await transporter.sendMail({
        from: process.env.EMAIL_FROM_ADDRESS,
        to: process.env.EMAIL_TO_ADDRESS,
        subject,
        html: content,
    });
};
