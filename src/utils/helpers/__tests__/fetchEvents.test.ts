import { RINKS } from "@/utils/constants/rinks";

import { fetchEvents } from "../fetchEvents";
import * as kci from "../krakenCommunityIceplex";
import * as licova from "../lynnwoodOva";
import * as snoKing from "../snoKing";

import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";
import type { SnoKingEventObject } from "@/types/snoKing";
import type { Mocked } from "vitest";

vi.mock("../krakenCommunityIceplex");
vi.mock("../lynnwoodOva");
vi.mock("../snoKing");

describe("fetchEvents", () => {
    it("returns empty arrays and errors map when one source fails", async () => {
        const kciMock = kci as Mocked<typeof kci>;
        const licovaMock = licova as Mocked<typeof licova>;
        const snoKingMock = snoKing as Mocked<typeof snoKing>;

        const kciEvent: KciEventObject = {
            color: "#000",
            day: "Monday",
            end: { date: "2025-09-08", military: "1000", time: "10:00am" },
            id: "kci-1",
            start: { date: "2025-09-08", military: "0900", time: "9:00am" },
            startKey: 9 * 60,
            title: "Stick & Puck",
            url: "#",
            location: RINKS.KCI.name,
        };

        const ovaEvent: LicOvaEventObject = {
            color: "#111",
            day: "Tuesday",
            end: { date: "2025-09-09", military: "1200", time: "12:00pm" },
            id: "ova-1",
            start: { date: "2025-09-09", military: "1130", time: "11:30am" },
            startKey: 11 * 60 + 30,
            title: "Adult Drop In",
            url: "#",
            location: RINKS.OVA.name,
        };

        kciMock.getKciEvents.mockResolvedValueOnce([kciEvent]);
        licovaMock.getLicEvents.mockRejectedValueOnce(new Error("lic boom"));
        licovaMock.getOvaEvents.mockResolvedValueOnce([ovaEvent]);
        snoKingMock.getSnoKingEvents.mockResolvedValueOnce([]);

        const res = await fetchEvents({ start: "s", end: "e" });

        expect(res.kciEvents).toHaveLength(1);
        expect(res.licEvents).toHaveLength(0);
        expect(res.ovaEvents).toHaveLength(1);
        expect(res.snoKingEvents).toHaveLength(0);
        expect(res.errors?.lic).toBeTruthy();
    });

    it("captures snoKing errors without affecting other sources", async () => {
        const kciMock = kci as Mocked<typeof kci>;
        const licovaMock = licova as Mocked<typeof licova>;
        const snoKingMock = snoKing as Mocked<typeof snoKing>;

        kciMock.getKciEvents.mockResolvedValueOnce([]);
        licovaMock.getLicEvents.mockResolvedValueOnce([]);
        licovaMock.getOvaEvents.mockResolvedValueOnce([]);
        snoKingMock.getSnoKingEvents.mockRejectedValueOnce(new Error("snoking boom"));

        const res = await fetchEvents({ start: "s", end: "e" });

        expect(res.snoKingEvents).toHaveLength(0);
        expect(res.kciEvents).toHaveLength(0);
        expect(res.errors?.snoKing).toBeTruthy();
        expect(res.errors?.kci).toBeUndefined();
    });

    it("includes snoKing events when all sources succeed", async () => {
        const kciMock = kci as Mocked<typeof kci>;
        const licovaMock = licova as Mocked<typeof licova>;
        const snoKingMock = snoKing as Mocked<typeof snoKing>;

        const snoKingEvent: SnoKingEventObject = {
            color: "#222",
            day: "Wednesday",
            end: { date: "2026-02-25", military: "1900", time: "7:00pm" },
            id: "sk-1",
            start: { date: "2026-02-25", military: "1800", time: "6:00pm" },
            startKey: 18 * 60,
            title: "Stick N Puck",
            url: "#",
            location: RINKS.RENTON.name,
            sheet: "Large Ice",
        };

        kciMock.getKciEvents.mockResolvedValueOnce([]);
        licovaMock.getLicEvents.mockResolvedValueOnce([]);
        licovaMock.getOvaEvents.mockResolvedValueOnce([]);
        snoKingMock.getSnoKingEvents.mockResolvedValueOnce([snoKingEvent]);

        const res = await fetchEvents({ start: "s", end: "e" });

        expect(res.snoKingEvents).toHaveLength(1);
        expect(res.snoKingEvents[0].location).toBe(RINKS.RENTON.name);
        expect(res.errors).toBeUndefined();
    });
});
