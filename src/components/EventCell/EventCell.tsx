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
    return (
        <EventCellStyled color={color}>
            <p>{title}</p>
            <p>
                {startTime} - {endTime}
            </p>
            <p>{location}</p>
            <RegistrationLinkStyled href={url} target="_blank">
                Registration link
            </RegistrationLinkStyled>
        </EventCellStyled>
    );
};
