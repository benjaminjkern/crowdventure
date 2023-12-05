import { useEffect, useRef, useState } from "react";

export const MAX_CONTENT_WIDTH = 1400;

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState();

    useEffect(() => {
        const handler = (e) => setMatches(e.matches);

        const mediaMatch = window.matchMedia(query);
        setMatches(mediaMatch.matches);
        mediaMatch.addEventListener("change", handler);
        return () => mediaMatch.removeEventListener("change", handler);
    }, [query]);

    return matches;
};

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

export const useDebounce = (func, delay = 500) => {
    const timerRef = useRef();

    return (...args) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => func(...args), delay);
    };
};

export const useDebouncedEffect = (func, dependencies) => {
    const debouncedFunc = useDebounce(func);
    useEffect(debouncedFunc, dependencies);
};
