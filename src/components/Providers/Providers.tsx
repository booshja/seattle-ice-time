import { StyledComponentsRegistry } from "@/lib/StyledComponentsRegistry";
import { WeekDisplayStoreProvider } from "@/store/currentWeek/currentWeekStoreProvider";
import { EventsStoreProvider } from "@/store/events/eventsStoreProvider";
import { RinkDisplayStoreProvider } from "@/store/rinkDisplay/rinkDisplayStoreProvider";
import PlausibleProvider from "next-plausible";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <PlausibleProvider domain="seattleicetime.com" trackOutboundLinks>
            <StyledComponentsRegistry>
                <EventsStoreProvider>
                    <RinkDisplayStoreProvider>
                        <WeekDisplayStoreProvider>{children}</WeekDisplayStoreProvider>
                    </RinkDisplayStoreProvider>
                </EventsStoreProvider>
            </StyledComponentsRegistry>
        </PlausibleProvider>
    );
}
