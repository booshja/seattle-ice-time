import "@testing-library/jest-dom";
import { randomUUID } from "crypto";
import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from "util";

import { createSerializer } from "@emotion/jest";
import React from "react";
expect.addSnapshotSerializer(createSerializer());
window.crypto.randomUUID = randomUUID;

// Polyfill TextEncoder/TextDecoder for libs used in tests
const globalObject = globalThis as unknown as {
    TextDecoder?: typeof NodeTextDecoder;
    TextEncoder?: typeof NodeTextEncoder;
};
if (!globalObject.TextEncoder) {
    globalObject.TextEncoder = NodeTextEncoder;
}
if (!globalObject.TextDecoder) {
    globalObject.TextDecoder = NodeTextDecoder;
}

// Mock next/image to a simple img to avoid width/height requirements in tests
jest.mock("next/image", () => ({
    __esModule: true,
    default: (
        props: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean },
    ) => {
        const { priority: _priority, ...rest } = props;
        return React.createElement("img", rest);
    },
}));

// Mock next/dynamic to render the provided loading component only to avoid act warnings
jest.mock("next/dynamic", () => {
    return (
        importer: unknown,
        options?: { loading?: React.ComponentType<Record<string, unknown>> },
    ) => {
        const Loading = options?.loading;
        const DynamicMock = (props: Record<string, unknown>) =>
            Loading ? React.createElement(Loading, props) : null;
        return DynamicMock;
    };
});

// Ensure next/navigation exports useServerInsertedHTML in test env
// so components using StyledComponentsRegistry don't crash.
jest.mock("next/navigation", () => {
    const actual: Record<string, unknown> = jest.requireActual("next/navigation");
    return {
        ...actual,
        useServerInsertedHTML: () => undefined,
        usePathname: () => "/",
        useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
        useSearchParams: () => new URLSearchParams(),
    };
});
