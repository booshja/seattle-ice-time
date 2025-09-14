import type { RINKS } from "@/utils/constants/rinks";

import type { BaseEventObject } from "./events";

export interface KciEvent {
    color: string;
    end: string;
    sportId: number;
    start: string;
    title: string;
    url: string;
}

export interface KciEventObject extends BaseEventObject {
    location: typeof RINKS.KCI.name;
}
