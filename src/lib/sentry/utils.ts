import * as Sentry from "@sentry/nextjs";

export function captureError(error: unknown, context?: Record<string, unknown>) {
    if (error instanceof Error) {
        Sentry.captureException(error, { extra: context });
    } else {
        Sentry.captureException(new Error(String(error)), {
            extra: { ...context, originalValue: error },
        });
    }
}

export function captureMessage(message: string, level: "error" | "warning" = "error") {
    Sentry.captureMessage(message, level);
}
