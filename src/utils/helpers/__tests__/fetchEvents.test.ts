import type { KciEventObject } from "@/types/krakenCommunityIceplex";
import type { LicOvaEventObject } from "@/types/lynnwoodIceArenaAndOlympicViewArena";
import { RINKS } from "@/utils/constants/rinks";

import { fetchEvents } from "../fetchEvents";
import * as kci from "../krakenCommunityIceplex";
import * as licova from "../lynnwoodOva";

jest.mock("../krakenCommunityIceplex");
jest.mock("../lynnwoodOva");

describe("fetchEvents", () => {
    it("returns empty arrays and errors map when one source fails", async () => {
        const kciMock = kci as jest.Mocked<typeof kci>;
        const licovaMock = licova as jest.Mocked<typeof licova>;

        const kciEvent: KciEventObject = {
            color: "#000",
            day: "Monday",
            end: { date: "2025-09-08", military: "1000", time: "10:00am" },
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
            start: { date: "2025-09-09", military: "1130", time: "11:30am" },
            startKey: 11 * 60 + 30,
            title: "Adult Drop In",
            url: "#",
            location: RINKS.OVA.name,
        };

        kciMock.getKciEvents.mockResolvedValueOnce([kciEvent]);
        licovaMock.getLicEvents.mockRejectedValueOnce(new Error("lic boom"));
        licovaMock.getOvaEvents.mockResolvedValueOnce([ovaEvent]);

        const res = await fetchEvents({ start: "s", end: "e" });

        expect(res.kciEvents).toHaveLength(1);
        expect(res.licEvents).toHaveLength(0);
        expect(res.ovaEvents).toHaveLength(1);
        expect(res.errors?.lic).toBeTruthy();
    });
});
