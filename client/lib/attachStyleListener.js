const getEventListeners = (event) => {
    if (event === "hover") return ["onMouseEnter", "onMouseLeave"];
    if (event === "focus") return ["onFocus", "onBlur"];
    throw new Error(`Unknown event! ${event}`);
};

export const attachStyleListener = (event, style) => {
    const [onEventStart, onEventFinish] = getEventListeners(event);
    return {
        [onEventStart]: (e) => {
            e.target.previousStyle = {};
            for (const key of Object.keys(style)) {
                e.target.previousStyle[key] = e.target.style[key];
                e.target.style[key] = style[key];
            }
        },
        [onEventFinish]: (e) => {
            for (const key of Object.keys(style))
                e.target.style[key] = e.target.previousStyle[key];
        },
    };
};
