import type { Day } from "@/types/dates";

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

export const getStartEndObjects = (startDate: Date, endDate: Date) => {
    const startHourMilitary = +startDate
        .toLocaleTimeString("en-US", {
            hour12: false,
            timeZone: "America/Los_Angeles",
        })
        .split(":")[0];
    const startHour =
        startHourMilitary === 0
            ? 12
            : startHourMilitary > 12
              ? startHourMilitary - 12
              : startHourMilitary;
    const endHourMilitary = +endDate
        .toLocaleTimeString("en-US", {
            hour12: false,
            timeZone: "America/Los_Angeles",
        })
        .split(":")[0];
    const endHour =
        endHourMilitary === 0
            ? 12
            : endHourMilitary > 12
              ? endHourMilitary - 12
              : endHourMilitary;

    const startMinutes =
        startDate.getMinutes() < 10
            ? `0${startDate.getMinutes()}`
            : startDate.getMinutes();
    const endMinutes =
        endDate.getMinutes() < 10 ? `0${endDate.getMinutes()}` : endDate.getMinutes();

    let startString = `${startDate.getFullYear()}-${
        startDate.getMonth() + 1
    }-${startDate.getDate()} ${startHour}:${startMinutes}`;

    if (startHourMilitary < 12) {
        startString += "am";
    } else {
        startString += "pm";
    }

    let endString = `${endDate.getFullYear()}-${
        endDate.getMonth() + 1
    }-${endDate.getDate()} ${endHour}:${endMinutes}`;

    if (endHourMilitary < 12) {
        endString += "am";
    } else {
        endString += "pm";
    }

    const start = {
        date: startString.split(" ")[0],
        military: `${startHourMilitary}:${startMinutes}`,
        time: startString.split(" ")[1],
    };
    const end = {
        date: endString.split(" ")[0],
        military: `${endHourMilitary}:${endMinutes}`,
        time: endString.split(" ")[1],
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
