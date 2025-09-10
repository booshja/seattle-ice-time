import { Day } from "@/types/dates";

interface GetStartEndDatesProps {
    getAsObjects?: boolean;
}

export function getStartEndDates({ getAsObjects }: GetStartEndDatesProps) {
    const monday = new Date();
    const day = monday.getDay() || 7;

    if (day !== 1) monday.setHours(-24 * (day - 1));

    const startDate = monday.toISOString();
    const startDateObject = new Date(startDate);

    const oneWeekDate = new Date(monday.setDate(monday.getDate() + 7));
    const endDate = oneWeekDate.toISOString();
    const endDateObject = new Date(endDate);

    if (getAsObjects) {
        return [startDateObject, endDateObject];
    }

    return [startDate, endDate];
}

export const getWeekDates = (startDate: Date) => {
    const day = startDate.getDay() || 7;

    if (day !== 1) startDate.setHours(-24 * (day - 1));

    const monday = startDate.getDate();
    const tuesday = new Date(startDate.setDate(startDate.getDate() + 1)).getDate();
    const wednesday = new Date(startDate.setDate(startDate.getDate() + 1)).getDate();
    const thursday = new Date(startDate.setDate(startDate.getDate() + 1)).getDate();
    const friday = new Date(startDate.setDate(startDate.getDate() + 1)).getDate();
    const saturday = new Date(startDate.setDate(startDate.getDate() + 1)).getDate();
    const sunday = new Date(startDate.setDate(startDate.getDate() + 1)).getDate();

    return [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
};

export const getDailyDates = (date: Date) => {
    const day = date.getDay() || 7;

    if (day !== 1) date.setHours(-24 * (day - 1));

    const monday = date.toISOString().split("T")[0];
    const tuesday = new Date(date.setDate(date.getDate() + 1))
        .toISOString()
        .split("T")[0];
    const wednesday = new Date(date.setDate(date.getDate() + 1))
        .toISOString()
        .split("T")[0];
    const thursday = new Date(date.setDate(date.getDate() + 1))
        .toISOString()
        .split("T")[0];
    const friday = new Date(date.setDate(date.getDate() + 1))
        .toISOString()
        .split("T")[0];
    const saturday = new Date(date.setDate(date.getDate() + 1))
        .toISOString()
        .split("T")[0];
    const sunday = new Date(date.setDate(date.getDate() + 1))
        .toISOString()
        .split("T")[0];

    return [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
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
    const endDate = end as Date;

    const startDayNumber = startDate.getDate();
    const endDayNumber = endDate.getDate();

    const startDateMonth = startDate.toLocaleString("default", { month: "long" });
    const endDateMonth = endDate.toLocaleString("default", { month: "long" });

    const startDateYear = startDate.getFullYear();
    const endDateYear = endDate.getFullYear();

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
