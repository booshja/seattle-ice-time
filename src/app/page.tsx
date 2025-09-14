import { EventGrid } from "@/components/EventGrid/EventGrid";
import { LeftRail } from "@/components/LeftRail/LeftRail";
import { getStartEndDatesFromBaseDate } from "@/utils/helpers/dates";
import { getKciEvents } from "@/utils/helpers/krakenCommunityIceplex";
import { getLicEvents, getOvaEvents } from "@/utils/helpers/lynnwoodOva";

import { PageStyled } from "./_pageStyled";

interface HomeProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const sp = await searchParams;
    const weekStartParam = typeof sp?.weekStart === "string" ? sp.weekStart : undefined;
    // Normalize to Monday to align UI dates with URL param
    const baseDate = weekStartParam ? new Date(weekStartParam) : new Date();
    const [start, end] = getStartEndDatesFromBaseDate(baseDate);

    const kciEvents = await getKciEvents({ start, end });
    const licEvents = await getLicEvents({ start, end });
    const ovaEvents = await getOvaEvents({ start, end });

    return (
        <PageStyled>
            <LeftRail />
            <EventGrid
                kciEvents={kciEvents}
                licEvents={licEvents}
                ovaEvents={ovaEvents}
                weekStartIso={start}
            />
        </PageStyled>
    );
}
