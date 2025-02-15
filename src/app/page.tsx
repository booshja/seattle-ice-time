import { EventGrid, LeftRail } from "@/components";
import { PageStyled } from "./_pageStyled";
import { getKciEvents, getLicEvents, getOvaEvents } from "@/utils/helpers";

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
