"use client";

import createCache, { type EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { type PropsWithChildren, useState } from "react";

export function EmotionRegistry({ children }: PropsWithChildren) {
    const [cache] = useState<EmotionCache>(() => {
        const emotionCache = createCache({ key: "css" });
        emotionCache.compat = true;
        return emotionCache;
    });

    useServerInsertedHTML(() => {
        const entries = Object.entries(cache.inserted);
        if (entries.length === 0) return null;

        const names: string[] = [];
        let styles = "";

        for (const [name, value] of entries) {
            if (typeof value === "string") {
                names.push(name);
                styles += value;
                delete cache.inserted[name];
            }
        }

        if (styles === "") return null;

        return (
            <style
                data-emotion={`${cache.key} ${names.join(" ")}`}
                dangerouslySetInnerHTML={{ __html: styles }}
            />
        );
    });

    return <CacheProvider value={cache}>{children}</CacheProvider>;
}
