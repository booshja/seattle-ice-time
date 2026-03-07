import "@testing-library/jest-dom/vitest";
import { randomUUID } from "crypto";
import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from "util";

import { createSerializer } from "@emotion/jest";
import React from "react";

expect.addSnapshotSerializer(createSerializer());
window.crypto.randomUUID = randomUUID;

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

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

vi.mock("next/image", () => ({
    __esModule: true,
    default: (
        props: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean },
    ) => {
        const { priority: _priority, ...rest } = props;
        return React.createElement("img", rest);
    },
}));

vi.mock("next/navigation", async () => {
    const actual = await vi.importActual<Record<string, unknown>>("next/navigation");
    return {
        ...actual,
        useServerInsertedHTML: () => undefined,
        usePathname: () => "/",
        useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
        useSearchParams: () => new URLSearchParams(),
    };
});
