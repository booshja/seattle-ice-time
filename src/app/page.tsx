import { EventGrid } from "@/components/EventGrid/EventGrid";
import { LeftRail } from "@/components/LeftRail/LeftRail";
import { PageStyled } from "./_pageStyled";
import { getKciEvents } from "@/utils/helpers/krakenCommunityIceplex";
import { getLicEvents, getOvaEvents } from "@/utils/helpers/lynnwoodOva";

export default async function Home() {
    const kciEvents = await getKciEvents({});
    const licEvents = await getLicEvents({});
    const ovaEvents = await getOvaEvents({});

    return (
        <PageStyled>
            <LeftRail />
            <EventGrid
                kciEvents={kciEvents}
                licEvents={licEvents}
                ovaEvents={ovaEvents}
            />
        </PageStyled>
    );
}
