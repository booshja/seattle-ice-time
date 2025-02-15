import { withPlausibleProxy } from 'next-plausible';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    compiler: {
        styledComponents: true,
    },
    images: {},
    async redirects() {
        return [];
    },
};

export default withPlausibleProxy()(nextConfig);
