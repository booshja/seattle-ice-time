import { withPlausibleProxy } from "next-plausible";
import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // Suppress Next's plugin detection warning during builds; we run ESLint separately
        ignoreDuringBuilds: true,
    },
    compiler: {
        emotion: true,
    },
    images: {},
    async redirects() {
        return [];
    },
};

const withAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

export default withPlausibleProxy()(withAnalyzer(nextConfig));
