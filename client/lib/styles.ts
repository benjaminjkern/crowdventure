import { type CSSProperties } from "react";

export const blurImageStyle = (
    blur: boolean,
    blurAmount = 20
): CSSProperties => {
    if (!blur) return {};

    return {
        WebkitFilter: `blur(${blurAmount}px)`,
        filter: `blur(${blurAmount}px)`,
    };
};

export const nonSelectableTextStyle: CSSProperties = {
    WebkitTouchCallout: "none" /* iOS Safari */,
    WebkitUserSelect: "none" /* Safari */,
    KhtmlUserSelect: "none" /* Konqueror HTML */,
    MozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
    userSelect: "none" /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */,
};
