import { getContrastTextColor } from "@/utils/constants/colors";

import { EventCellStyled, RegistrationLinkStyled } from "./EventCellStyled";

interface EventCellProps {
    color: string;
    endTime: string;
    location: string;
    startTime: string;
    title: string;
    url: string;
}

export const EventCell = ({
    color,
    endTime,
    title,
    startTime,
    location,
    url,
}: EventCellProps) => {
    const textColor = getContrastTextColor(color);

    return (
        <EventCellStyled $bgColor={color} $textColor={textColor}>
            <p>{title}</p>
            <p>
                {startTime} - {endTime}
            </p>
            <p>{location}</p>
            <RegistrationLinkStyled $textColor={textColor} href={url} target="_blank">
                Registration link
            </RegistrationLinkStyled>
        </EventCellStyled>
    );
};
