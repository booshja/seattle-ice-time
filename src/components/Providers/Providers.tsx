import { StyledComponentsRegistry } from "@/lib";
import {
    EventsStoreProvider,
    RinkDisplayStoreProvider,
    WeekDisplayStoreProvider,
} from "@/store";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <StyledComponentsRegistry>
            <EventsStoreProvider>
                <RinkDisplayStoreProvider>
                    <WeekDisplayStoreProvider>{children}</WeekDisplayStoreProvider>
                </RinkDisplayStoreProvider>
            </EventsStoreProvider>
        </StyledComponentsRegistry>
    );
}
