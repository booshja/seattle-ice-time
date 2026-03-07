import PlausibleProvider from "next-plausible";

import { EmotionRegistry } from "@/lib/EmotionRegistry";
import { WeekDisplayStoreProvider } from "@/store/currentWeek/currentWeekStoreProvider";
import { DrawerStoreProvider } from "@/store/drawer/drawerStoreProvider";
import { EventsStoreProvider } from "@/store/events/eventsStoreProvider";
import { RinkDisplayStoreProvider } from "@/store/rinkDisplay/rinkDisplayStoreProvider";
import { SelectedDayStoreProvider } from "@/store/selectedDay/selectedDayStoreProvider";

import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <PlausibleProvider domain="seattleicetime.com" trackOutboundLinks>
            <EmotionRegistry>
                <DrawerStoreProvider>
                    <SelectedDayStoreProvider>
                        <EventsStoreProvider>
                            <RinkDisplayStoreProvider>
                                <WeekDisplayStoreProvider>
                                    {children}
                                </WeekDisplayStoreProvider>
                            </RinkDisplayStoreProvider>
                        </EventsStoreProvider>
                    </SelectedDayStoreProvider>
                </DrawerStoreProvider>
            </EmotionRegistry>
        </PlausibleProvider>
    );
}
