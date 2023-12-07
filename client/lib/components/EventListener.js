import React, { Fragment, useRef, useState } from "react";


const getEventListeners = (event) => {
    if (event === "hover") return ["onMouseEnter", "onMouseLeave"];
    if (event === "focus") return ["onFocus", "onBlur"];
    if (event === "mousedown") return ["onMouseDown", "onMouseUp"];
    throw new Error(`Unknown event! ${event}`);
};

export const useStyleListener = (event, style, getTargetFunc) => {
    const ref = useRef();
    const [onEventStart, onEventFinish] = getEventListeners(event);

    const getTarget = getTargetFunc || (() => ref.current);
    return {
        ref,
        [onEventStart]: (e) => {
            const target = getTarget(e);
            target.previousStyle = {};
            for (const key of Object.keys(style)) {
                target.previousStyle[key] = target.style[key];
                target.style[key] = style[key];
            }
        },
        [onEventFinish]: (e) => {
            const target = getTarget(e);
            for (const key of Object.keys(style))
                target.style[key] = target.previousStyle?.[key];
        },
    };
};

export const attachLoadListener = () => ({
    onLoad: (e) => {
        console.log(e.target);
    },
});



const EventListener = ({ eventType, children }) => {
    const [value, setValue] = useState(false);

    const ref = useRef();

    const listeners = 

    return <Fragment {...listeners}>{children(value, ref)}</Fragment>;
};

export default EventListener;