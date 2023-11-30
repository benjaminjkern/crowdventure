const getEventListeners = (event) => {
    if (event === "hover") return ["onMouseEnter", "onMouseLeave"];
    if (event === "focus") return ["onFocus", "onBlur"];
    throw new Error(`Unknown event! ${event}`);
};

export const attachStyleListener = (
    event,
    style,
    getTarget = (e) => e.target
) => {
    const [onEventStart, onEventFinish] = getEventListeners(event);
    return {
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
