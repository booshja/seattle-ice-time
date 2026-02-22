import { unstable_cache } from "next/cache";

import { EventGrid } from "@/components/EventGrid/EventGrid";
import { LeftRail } from "@/components/LeftRail/LeftRail";
import { getStartEndDatesFromBaseDate } from "@/utils/helpers/dates";
import { fetchEvents } from "@/utils/helpers/fetchEvents";

import { ContentStyled, ErrorBannerStyled, PageStyled } from "./_pageStyled";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface HomeProps {
    searchParams: SearchParams;
}

const getCachedEvents = unstable_cache(
    async (start: string, end: string) => fetchEvents({ start, end }),
    ["events"],
    { revalidate: 300, tags: ["events"] },
);

export default async function Home({ searchParams }: HomeProps) {
    const sp = await searchParams;
    const weekStartParam = typeof sp?.weekStart === "string" ? sp.weekStart : undefined;
    const baseDate = weekStartParam ? new Date(weekStartParam) : new Date();
    const [start, end] = getStartEndDatesFromBaseDate(baseDate);

    const { kciEvents, licEvents, ovaEvents, snoKingEvents, errors } =
        await getCachedEvents(start, end);
    const hasKciError = Boolean(errors?.kci);
    const hasLicError = Boolean(errors?.lic);
    const hasOvaError = Boolean(errors?.ova);
    const hasSnoKingError = Boolean(errors?.snoKing);

    return (
        <PageStyled>
            {(hasKciError || hasLicError || hasOvaError || hasSnoKingError) && (
                <ErrorBannerStyled role="status" aria-live="polite">
                    Some sources failed to load:
                    {hasKciError ? <span> Kraken Community Iceplex</span> : null}
                    {hasLicError ? <span> Lynnwood Ice Center</span> : null}
                    {hasOvaError ? <span> Olympic View Arena</span> : null}
                    {hasSnoKingError ? <span> Sno-King Ice Arenas</span> : null}
                </ErrorBannerStyled>
            )}
            <ContentStyled>
                <LeftRail />
                <EventGrid
                    kciEvents={kciEvents}
                    licEvents={licEvents}
                    ovaEvents={ovaEvents}
                    snoKingEvents={snoKingEvents}
                    weekStartIso={start}
                />
            </ContentStyled>
        </PageStyled>
    );
}
