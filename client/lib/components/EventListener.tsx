import {
    useState,
    type MouseEventHandler,
    type ReactNode,
    type MouseEvent,
} from "react";

// NOTE: This isn't an explicit React function, but it should be treated as one.

export type EventListenerPair = [boolean, Record<string, MouseEventHandler>];

const getEventListeners = (event: string) => {
    // TODO: Type-define specific events (I hate typescript)
    if (event === "hover") return ["onMouseEnter", "onMouseLeave"];
    if (event === "focus") return ["onFocus", "onBlur"];
    if (event === "mousedown") return ["onMouseDown", "onMouseUp"];
    throw new Error(`Unknown event! ${event}`);
};

const EventListener = ({
    event,
    events = event ? [event] : [],
    children,
}: {
    event?: string;
    events?: string[];
    children: (...args: EventListenerPair[]) => ReactNode;
}) => {
    const [values, setValues] = useState(events.map(() => false));

    return children(
        ...events.map((eventName, i) => {
            const [onEventStart, onEventFinish] = getEventListeners(eventName);
            return [
                Boolean(values[i]),
                {
                    [String(onEventStart)]: (e: MouseEvent) => {
                        e.stopPropagation();
                        values[i] = true;
                        setValues([...values]);
                    },
                    [String(onEventFinish)]: (e: MouseEvent) => {
                        e.stopPropagation();
                        values[i] = false;
                        setValues([...values]);
                    },
                },
            ] as EventListenerPair;
        })
    );
};

export default EventListener;
