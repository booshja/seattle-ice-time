"use client";

import { testingIds } from "@/testing/testingIds";
import { spacing } from "@/utils/constants/spacing";

import { SkeletonBlock, SkeletonStatus } from "../Skeleton/SkeletonBase";

export const NavbarSkeleton = () => {
    const ids = testingIds.loading;
    return (
        <SkeletonStatus data-testid={ids.navbar} label="Loading navigation…">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: `${spacing.sm}px ${spacing.lg}px`,
                    height: `${spacing.xxxl}px`,
                }}
            >
                <SkeletonBlock $inline width={260} height={28} />
                <SkeletonBlock $inline width={260} height={24} />
                <SkeletonBlock $inline width={180} height={20} />
            </div>
        </SkeletonStatus>
    );
};
