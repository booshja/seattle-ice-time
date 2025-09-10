import { Day } from "@/types/dates";

interface GetStartEndDatesProps {
    getAsObjects?: boolean;
}

export function getStartEndDates({ getAsObjects }: GetStartEndDatesProps) {
    const today = new Date();
    const monday = new Date(today);
    const day = monday.getDay() || 7;
    if (day !== 1) {
        monday.setDate(monday.getDate() - (day - 1));
    }
    monday.setHours(0, 0, 0, 0);

    const startDate = monday.toISOString();
    const startDateObject = new Date(startDate);

    const endMonday = new Date(monday);
    endMonday.setDate(endMonday.getDate() + 7);
    const endDate = endMonday.toISOString();
    const endDateObject = new Date(endDate);

    if (getAsObjects) {
        return [startDateObject, endDateObject];
    }

    return [startDate, endDate];
}

// New helpers for base-date driven week computations
export function getStartEndDatesFromBaseDate(base: Date) {
    const start = new Date(base);
    const day = start.getDay() || 7;
    if (day !== 1) {
        start.setDate(start.getDate() - (day - 1));
    }
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    const startIso = start.toISOString();
    const endIso = end.toISOString();

    return [startIso, endIso] as const;
}

export function getMondayIsoFromBaseDate(base: Date) {
    const monday = getMondayDateFromBaseDate(base);
    return getLocalIsoDate(monday);
}

export function getMondayDateFromBaseDate(base: Date) {
    const start = new Date(base);
    const day = start.getDay() || 7;
    if (day !== 1) {
        start.setDate(start.getDate() - (day - 1));
    }
    start.setHours(0, 0, 0, 0);
    return start;
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
    const today = new Date();
    const monday = new Date(today);
    const day = monday.getDay() || 7;
    if (day !== 1) {
        monday.setDate(monday.getDate() - (day - 1));
    }
    monday.setHours(0, 0, 0, 0);
    return monday;
}

export const getWeekDates = (startDate: Date) => {
    const base = new Date(startDate);
    const day = base.getDay() || 7;
    if (day !== 1) {
        base.setDate(base.getDate() - (day - 1));
    }
    base.setHours(0, 0, 0, 0);

    const dates: number[] = [];
    const d = new Date(base);
    for (let i = 0; i < 7; i++) {
        const current = new Date(d);
        current.setDate(base.getDate() + i);
        dates.push(current.getDate());
    }
    return dates as [number, number, number, number, number, number, number];
};

export const getDailyDates = (date: Date) => {
    const base = new Date(date);
    const day = base.getDay() || 7;
    if (day !== 1) {
        base.setDate(base.getDate() - (day - 1));
    }
    base.setHours(0, 0, 0, 0);

    const dates: string[] = [];
    const d = new Date(base);
    for (let i = 0; i < 7; i++) {
        const current = new Date(d);
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
        startHourMilitary > 12 ? startHourMilitary - 12 : startHourMilitary;
    const endHourMilitary = +endDate
        .toLocaleTimeString("en-US", {
            hour12: false,
            timeZone: "America/Los_Angeles",
        })
        .split(":")[0];
    const endHour = endHourMilitary > 12 ? endHourMilitary - 12 : endHourMilitary;

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
    const [start, end] = getStartEndDates({ getAsObjects: true });

    const startDate = start as Date;
    const endExclusive = end as Date;
    const endInclusive = new Date(endExclusive);
    endInclusive.setDate(endInclusive.getDate() - 1);

    const startDayNumber = startDate.getDate();
    const endDayNumber = endInclusive.getDate();

    const startDateMonth = startDate.toLocaleString("default", { month: "long" });
    const endDateMonth = endInclusive.toLocaleString("default", { month: "long" });

    const startDateYear = startDate.getFullYear();
    const endDateYear = endInclusive.getFullYear();

    let displayString = "";

    if (startDateMonth === endDateMonth) {
        displayString = `${startDateMonth} ${startDayNumber}-${endDayNumber} ${startDateYear}`;
    } else {
        if (startDateYear === endDateYear) {
            displayString = `${startDateMonth} ${startDayNumber} - ${endDateMonth} ${endDayNumber} ${startDateYear}`;
        } else {
            displayString = `${startDateMonth} ${startDayNumber}, ${startDateYear} - ${endDateMonth} ${endDayNumber}, ${endDateYear}`;
        }
    }

    return displayString;
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

    let displayString = "";

    if (startDateMonth === endDateMonth) {
        displayString = `${startDateMonth} ${startDayNumber}-${endDayNumber} ${startDateYear}`;
    } else {
        if (startDateYear === endDateYear) {
            displayString = `${startDateMonth} ${startDayNumber} - ${endDateMonth} ${endDayNumber} ${startDateYear}`;
        } else {
            displayString = `${startDateMonth} ${startDayNumber}, ${startDateYear} - ${endDateMonth} ${endDayNumber}, ${endDateYear}`;
        }
    }

    return displayString;
};
