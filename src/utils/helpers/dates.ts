import type { Day } from "@/types/dates";

const PACIFIC_TZ = "America/Los_Angeles";

interface PacificParts {
    day: number;
    dayOfWeek: number;
    hour: number;
    minute: number;
    month: number;
    year: number;
}

function getPacificParts(date: Date): PacificParts {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: PACIFIC_TZ,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
        weekday: "short",
    }).formatToParts(date);

    const get = (type: string) =>
        Number(parts.find((p) => p.type === type)?.value ?? 0);

    const weekdayStr = parts.find((p) => p.type === "weekday")?.value ?? "";
    const weekdayMap: Record<string, number> = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
    };

    return {
        year: get("year"),
        month: get("month"),
        day: get("day"),
        hour: get("hour"),
        minute: get("minute"),
        dayOfWeek: weekdayMap[weekdayStr] ?? 0,
    };
}

export function getPacificStartKey(date: Date): number {
    const { hour, minute } = getPacificParts(date);
    return hour * 60 + minute;
}

export function getPacificDayOfWeek(date: Date): number {
    return getPacificParts(date).dayOfWeek;
}

function normalizeToMonday(date: Date): Date {
    const d = new Date(date);
    const dow = d.getDay() || 7;
    if (dow !== 1) {
        d.setDate(d.getDate() - (dow - 1));
    }
    d.setHours(0, 0, 0, 0);
    return d;
}

interface GetStartEndDatesProps {
    getAsObjects?: boolean;
}

export function getStartEndDates({ getAsObjects }: GetStartEndDatesProps) {
    const monday = normalizeToMonday(new Date());

    const endMonday = new Date(monday);
    endMonday.setDate(endMonday.getDate() + 7);

    if (getAsObjects) {
        return [new Date(monday), new Date(endMonday)];
    }

    return [monday.toISOString(), endMonday.toISOString()];
}

export function getStartEndDatesFromBaseDate(base: Date) {
    const start = normalizeToMonday(base);

    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    return [start.toISOString(), end.toISOString()] as const;
}

export function getMondayIsoFromBaseDate(base: Date) {
    return getLocalIsoDate(normalizeToMonday(base));
}

export function getMondayDateFromBaseDate(base: Date) {
    return normalizeToMonday(base);
}

export function getLocalIsoDate(date: Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export function parseLocalDateFromYmd(ymd: string) {
    const [y, m, d] = ymd.split("-").map((v) => parseInt(v, 10));
    const date = new Date(y, m - 1, d);
    date.setHours(0, 0, 0, 0);
    return date;
}

export function getCurrentWeekMonday() {
    return normalizeToMonday(new Date());
}

export const getWeekDates = (startDate: Date) => {
    const base = normalizeToMonday(startDate);

    const dates: number[] = [];
    for (let i = 0; i < 7; i++) {
        const current = new Date(base);
        current.setDate(base.getDate() + i);
        dates.push(current.getDate());
    }
    return dates as [number, number, number, number, number, number, number];
};

export const getDailyDates = (date: Date) => {
    const base = normalizeToMonday(date);

    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
        const current = new Date(base);
        current.setDate(base.getDate() + i);
        dates.push(current.toISOString().split("T")[0]);
    }
    return dates as [string, string, string, string, string, string, string];
};

export const getDayString = (dateNum: number): Day => {
    let day: Day;

    switch (dateNum) {
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            day = "Sunday";
            break;
    }

    return day;
};

function formatHour(militaryHour: number): number {
    if (militaryHour === 0) return 12;
    return militaryHour > 12 ? militaryHour - 12 : militaryHour;
}

function padMinutes(minutes: number): string {
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
}

export const getStartEndObjects = (startDate: Date, endDate: Date) => {
    const sp = getPacificParts(startDate);
    const ep = getPacificParts(endDate);

    const startMinStr = padMinutes(sp.minute);
    const endMinStr = padMinutes(ep.minute);

    const startDisplayHour = formatHour(sp.hour);
    const endDisplayHour = formatHour(ep.hour);

    const startAmPm = sp.hour < 12 ? "am" : "pm";
    const endAmPm = ep.hour < 12 ? "am" : "pm";

    const start = {
        date: `${sp.year}-${sp.month}-${sp.day}`,
        military: `${sp.hour}:${startMinStr}`,
        time: `${startDisplayHour}:${startMinStr}${startAmPm}`,
    };
    const end = {
        date: `${ep.year}-${ep.month}-${ep.day}`,
        military: `${ep.hour}:${endMinStr}`,
        time: `${endDisplayHour}:${endMinStr}${endAmPm}`,
    };

    return [start, end];
};

export const getDisplayDates = () => {
    return getDisplayDatesFromBaseDate(new Date());
};

export const getDisplayDatesFromBaseDate = (base: Date) => {
    const [startIso, endIso] = getStartEndDatesFromBaseDate(base);
    const startDate = new Date(startIso);
    const endExclusive = new Date(endIso);
    const endInclusive = new Date(endExclusive);
    endInclusive.setDate(endInclusive.getDate() - 1);

    const startDayNumber = startDate.getDate();
    const endDayNumber = endInclusive.getDate();

    const startDateMonth = startDate.toLocaleString("default", { month: "long" });
    const endDateMonth = endInclusive.toLocaleString("default", { month: "long" });

    const startDateYear = startDate.getFullYear();
    const endDateYear = endInclusive.getFullYear();

    if (startDateMonth === endDateMonth) {
        return `${startDateMonth} ${startDayNumber}-${endDayNumber} ${startDateYear}`;
    }
    if (startDateYear === endDateYear) {
        return `${startDateMonth} ${startDayNumber} - ${endDateMonth} ${endDayNumber} ${startDateYear}`;
    }
    return `${startDateMonth} ${startDayNumber}, ${startDateYear} - ${endDateMonth} ${endDayNumber}, ${endDateYear}`;
};
