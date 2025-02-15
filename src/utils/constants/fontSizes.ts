import { spacing } from "./spacing";

export const lineHeight = {
    xs: spacing.xs * 1.2,
    sm: spacing.sm * 1.2,
    md: spacing.md * 1.2,
    lg: spacing.lg * 1.2,
    xl: spacing.xl * 1.2,
    xxl: spacing.xxl * 1.2,
    xxxl: spacing.xxxl * 1.2,
    "4xl": spacing["4xl"] * 1.2,
    "5xl": spacing["5xl"] * 1.2,
    "6xl": spacing["6xl"] * 1.2,
    "7xl": spacing["7xl"] * 1.2,
} as const;

export const fontWeight = {
    light: 300,
    regular: 400,
    bold: 700,
} as const;
