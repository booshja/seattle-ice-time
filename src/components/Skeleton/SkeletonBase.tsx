"use client";

import styled, { css, keyframes } from "styled-components";
import { COLORS } from "@/utils/constants/colors";

type SkeletonBlockProps = {
    width?: number | string;
    height?: number | string;
    radius?: number;
    $inline?: boolean;
    circle?: boolean;
    className?: string;
    "data-testid"?: string;
};

const base = COLORS.skeleton.text.dark;
const highlight = COLORS.skeleton.text.light;

const shimmer = keyframes`
    0% { background-color: ${base}; }
    100% { background-color: ${highlight}; }
`;

export const SkeletonBlock = styled.div<SkeletonBlockProps>`
    ${({
        width = "100%",
        height = 16,
        radius = 8,
        $inline = false,
        circle = false,
    }) => css`
        display: ${$inline ? "inline-block" : "block"};
        width: ${typeof width === "number" ? `${width}px` : width};
        height: ${typeof height === "number" ? `${height}px` : height};
        border-radius: ${circle ? "9999px" : `${radius}px`};
        animation: ${shimmer} 1s linear infinite alternate;

        @media (prefers-reduced-motion: reduce) {
            animation: none;
            background-color: ${base};
        }
    `}
`;

export const SkeletonGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export type SkeletonStatusProps = {
    children?: React.ReactNode;
    label?: string;
    className?: string;
    "data-testid"?: string;
};

export const SkeletonStatus = ({
    children,
    label = "Loading…",
    className,
    ...rest
}: SkeletonStatusProps) => {
    return (
        <div role="status" aria-live="polite" className={className} {...rest}>
            <span
                style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clip: "rect(1px, 1px, 1px, 1px)",
                }}
            >
                {label}
            </span>
            {children}
        </div>
    );
};
