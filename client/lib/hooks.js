import { useEffect, useState } from "react";

// Might not be necessary
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
    const [size, setSize] = useState();
    useEffect(() => {
        const updateSize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
};
