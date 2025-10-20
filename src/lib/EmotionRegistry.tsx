"use client";

import createCache, { type EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { type PropsWithChildren, useState } from "react";

export function EmotionRegistry({ children }: PropsWithChildren) {
    const [cache] = useState<EmotionCache>(() => {
        const emotionCache = createCache({ key: "css", prepend: true });
        return emotionCache;
    });

    useServerInsertedHTML(() => {
        const names = Object.keys(cache.inserted);
        const css = names.map((name) => cache.inserted[name]).join("\n");
        return (
            <style
                data-emotion={`${cache.key} ${names.join(" ")}`}
                dangerouslySetInnerHTML={{ __html: css }}
            />
        );
    });

    return <CacheProvider value={cache}>{children}</CacheProvider>;
}
