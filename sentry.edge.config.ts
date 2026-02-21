// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";

Sentry.init({
    dsn: "https://8e2add5a1c8740ef0505335e01c59ef0@o1304311.ingest.us.sentry.io/4510628215259136",

    environment: process.env.NODE_ENV,
    release: process.env.VERCEL_GIT_COMMIT_SHA ?? "development",

    tracesSampleRate: isDev ? 1 : 0.2,

    enableLogs: true,

    sendDefaultPii: true,
});
