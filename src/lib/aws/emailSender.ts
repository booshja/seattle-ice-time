"use server";

import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";

interface EmailSenderProps {
    subject: string;
    content: string;
}

export const sendEmail = async ({ subject, content }: EmailSenderProps) => {
    if (
        !process.env.AWS_ACCESS_KEY ||
        !process.env.AWS_SECRET_KEY ||
        !process.env.AWS_REGION
    ) {
        throw new Error("AWS credentials not found");
    }

    const ses = new SESClient({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        },
    });
    const transporter = nodemailer.createTransport({
        SES: { ses, aws: { SendRawEmailCommand } },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM_ADDRESS,
            to: process.env.EMAIL_TO_ADDRESS,
            subject,
            html: content,
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};
