"use client";

import { spacing } from "@/utils/constants/spacing";

import { SkeletonBlock, SkeletonStatus } from "../Skeleton/SkeletonBase";

export const DateHeaderSkeleton = () => {
    return (
        <SkeletonStatus label="Loading date range…">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: `${spacing.md}px`,
                }}
            >
                <SkeletonBlock $inline width={24} height={24} radius={8} />
                <SkeletonBlock $inline width={220} height={24} radius={8} />
                <SkeletonBlock $inline width={24} height={24} radius={8} />
            </div>
        </SkeletonStatus>
    );
};
