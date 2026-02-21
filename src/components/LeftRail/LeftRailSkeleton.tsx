"use client";

import { spacing } from "@/utils/constants/spacing";

import { SkeletonBlock, SkeletonGroup, SkeletonStatus } from "../Skeleton/SkeletonBase";

import { LeftRailStyled } from "./LeftRailStyled";

export const LeftRailSkeleton = () => {
    return (
        <LeftRailStyled>
            <SkeletonStatus label="Loading rink options…">
                <div style={{ display: "grid", gap: `${spacing.lg}px` }}>
                    <SkeletonGroup>
                        <SkeletonBlock width={220} height={18} />
                    </SkeletonGroup>
                    <SkeletonGroup>
                        <SkeletonBlock width={220} height={36} radius={10} />
                        <div style={{ height: `${spacing.xs}px` }} />
                        <SkeletonBlock width={220} height={36} radius={10} />
                        <div style={{ height: `${spacing.xs}px` }} />
                        <SkeletonBlock width={220} height={36} radius={10} />
                    </SkeletonGroup>
                    <SkeletonGroup>
                        <SkeletonBlock width={180} height={16} />
                        <div style={{ height: `${spacing.xs}px` }} />
                        <SkeletonBlock width={140} height={16} />
                    </SkeletonGroup>
                </div>
            </SkeletonStatus>
        </LeftRailStyled>
    );
};
