"use client";

import createCache, { type EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { type PropsWithChildren, useState } from "react";

export function EmotionRegistry({ children }: PropsWithChildren) {
    const [cache] = useState<EmotionCache>(() => {
        const emotionCache = createCache({ key: "css", prepend: true });
        // compat helps while both styled-components and emotion coexist briefly
        emotionCache.compat = true;

        const prevInsert = emotionCache.insert;
        const insertedNames: string[] = [];

        emotionCache.insert = (...args: unknown[]) => {
            const [, serialized] = args as [unknown, { name: string }];
            if (emotionCache.inserted[serialized.name] === undefined) {
                insertedNames.push(serialized.name);
            }
            // @ts-expect-error preserve original signature
            return prevInsert(...args);
        };

        return emotionCache;
    });

    useServerInsertedHTML(() => {
        const names = Object.keys(cache.inserted);
        const css = names.map((name) => cache.inserted[name]).join(" ");
        return (
            <style
                data-emotion={`${cache.key} ${names.join(" ")}`}
                dangerouslySetInnerHTML={{ __html: css }}
            />
        );
    });

    return <CacheProvider value={cache}>{children}</CacheProvider>;
}
