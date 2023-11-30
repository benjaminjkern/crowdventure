import { useEffect, useState } from "react";

export const MAX_CONTENT_WIDTH = 1400;

export const useWindowSize = () => {
    const [size, setSize] = useState({});
    useEffect(() => {
        const updateSize = () => {
            setSize({
                width: document.body.scrollWidth,
                height: document.body.scrollHeight,
                effectiveContentWidth: Math.min(
                    MAX_CONTENT_WIDTH,
                    document.body.scrollWidth * 0.8 - 40
                ),
            });
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
};

export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.scrollY);
        };
        updatePosition();
        window.addEventListener("scroll", updatePosition);
        return () => window.removeEventListener("scroll", updatePosition);
    }, []);

    return scrollPosition;
};
