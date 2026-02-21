import path from "path";

import { defineConfig } from "vitest/config";

export default defineConfig({
    assetsInclude: ["**/*.avif"],
    resolve: {
        alias: {
            "@/images": path.resolve(__dirname, "./public/images"),
            "@/icons": path.resolve(__dirname, "./public/icons"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"],
        globals: true,
        clearMocks: true,
        coverage: {
            provider: "v8",
            reporter: ["text", "lcov"],
            reportsDirectory: "coverage",
            thresholds: {
                branches: 70,
                functions: 90,
                lines: 85,
                statements: 85,
            },
            include: ["src/**/*.{js,jsx,ts,tsx}"],
            exclude: [
                "**/*.test.{js,jsx,ts,tsx}",
                "**/__tests__/**",
                "**/src/testing/**",
                "**/src/components/Email/**",
                "**/src/fonts/**",
                "**/*Styled.ts",
                "**/*Styled.tsx",
                "**/src/utils/constants/strings.ts",
                "**/lib/**",
                "**/types/**",
                "**/src/**/{layout,error,global-error}.tsx",
            ],
        },
    },
});
