import { getContrastTextColor, COLORS } from "../colors";

describe("getContrastTextColor", () => {
    it("returns dark text for light backgrounds", () => {
        expect(getContrastTextColor("#FFFFFF")).toBe("#000000");
        expect(getContrastTextColor(COLORS.rinks.SNOQUALMIE)).toBe("#000000");
        expect(getContrastTextColor(COLORS.rinks.LYNNWOOD)).toBe("#000000");
    });

    it("returns light text for dark backgrounds", () => {
        expect(getContrastTextColor("#000000")).toBe("#f0f0f0");
        expect(getContrastTextColor(COLORS.rinks.KIRKLAND)).toBe("#f0f0f0");
        expect(getContrastTextColor(COLORS.rinks.RENTON)).toBe("#f0f0f0");
    });

    it("returns dark text for medium-light backgrounds", () => {
        expect(getContrastTextColor(COLORS.rinks.KCI)).toBe("#000000");
        expect(getContrastTextColor(COLORS.rinks.OVA)).toBe("#000000");
    });
});
