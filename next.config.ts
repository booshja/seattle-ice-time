import { withPlausibleProxy } from "next-plausible";
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

export default withPlausibleProxy()(nextConfig);
