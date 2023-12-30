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
