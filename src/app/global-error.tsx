"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <NextError statusCode={0} />
                <div style={{ textAlign: "center", padding: "16px" }}>
                    <button onClick={() => reset()} type="button">
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
