/**
 * Returns "#ffffff" or "#000000" depending on which has better contrast
 * against the given hex background color (WCAG relative luminance).
 */
export function getContrastTextColor(hex: string): "#f0f0f0" | "#000000" {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const toLinear = (c: number) =>
        c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

    const luminance =
        0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

    return luminance > 0.179 ? "#000000" : "#f0f0f0";
}

export const COLORS = {
    rinks: {
        KCI: "#32B579",
        LYNNWOOD: "#46D6DB",
        OVA: "#039BE5",
        KENT: "#7886CB",
        KIRKLAND: "#8E24AA",
        SNOQUALMIE: "#F5BF25",
        RENTON: "#d40001",
    },
    background: {
        dark: "#131314",
        light: "#1B1B1B",
    },
    text: {
        primary: "#E3E3E3",
        secondary: "#323537",
    },
    skeleton: {
        background: {
            dark: "#474747",
            light: "#7a7979",
        },
        text: {
            dark: "#292929",
            light: "#616161",
        },
    },
} as const;

// tangerine: "#F4511E",
// blueberry: "#3F50B5",
// grape: "#8E24AA",
// graphite: "#616161",
