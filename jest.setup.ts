import "@testing-library/jest-dom";
import "jest-styled-components";
import { randomUUID } from "crypto";
window.crypto.randomUUID = randomUUID;
import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from "util";

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
import React from "react";
jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
        React.createElement("img", props),
}));

// Ensure next/navigation exports useServerInsertedHTML in test env
// so components using StyledComponentsRegistry don't crash.
jest.mock("next/navigation", () => {
    const actual: Record<string, unknown> = jest.requireActual("next/navigation");
    return {
        ...actual,
        useServerInsertedHTML: () => undefined,
    };
});
