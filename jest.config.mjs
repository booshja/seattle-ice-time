import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "jest-environment-jsdom",
    preset: "ts-jest",
    coverageDirectory: "coverage",
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 90,
            lines: 85,
            statements: 85,
        },
    },
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "**/src/**/*.{js,jsx,ts,tsx}",
        "!**/*.test.{js,jsx,ts,tsx}",
        "!**/__tests__/**",
        "!**/src/testing/**",
        "!**/src/components/Email/**",
        "!**/src/fonts/**",
        "!**/*Styled.ts",
        "!**/*Styled.tsx",
        "!**/src/utils/constants/strings.ts",
        "!**/node_modules/**",
        "!**/.next/**",
        "!**/.vscode/**",
        "!**/lib/**",
        "!**/types/**",
        "!**/src/**/{(layout),(error),(global-error)}.tsx",
    ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
