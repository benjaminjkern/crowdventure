import { useState } from "react";

const getEventListeners = (event) => {
    if (event === "hover") return ["onMouseEnter", "onMouseLeave"];
    if (event === "focus") return ["onFocus", "onBlur"];
    if (event === "mousedown") return ["onMouseDown", "onMouseUp"];
    throw new Error(`Unknown event! ${event}`);
};

const EventListener = ({ event, events = [event], children }) => {
    const [values, setValues] = useState(events.map(() => false));

    return children(
        ...events.map((eventName, i) => {
            const [onEventStart, onEventFinish] = getEventListeners(eventName);

            return [
                values[i],
                {
                    [onEventStart]: (e) => {
                        e.stopPropagation();
                        values[i] = true;
                        setValues([...values]);
                    },
                    [onEventFinish]: (e) => {
                        e.stopPropagation();
                        values[i] = false;
                        setValues([...values]);
                    },
                },
            ];
        })
    );
};

export default EventListener;
