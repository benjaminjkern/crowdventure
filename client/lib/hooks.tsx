import {
    type DependencyList,
    type EffectCallback,
    useEffect,
    useRef,
    useState,
    Dispatch,
    ReactNode,
    SetStateAction,
} from "react";

export const MAX_CONTENT_WIDTH = 1400;

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

        const mediaMatch = window.matchMedia(query);
        setMatches(mediaMatch.matches);
        mediaMatch.addEventListener("change", handler);
        return () => mediaMatch.removeEventListener("change", handler);
    }, [query]);

    return matches;
};

export const useWindowSize = () => {
    const [size, setSize] = useState<{
        width: number;
        height: number;
        effectiveContentWidth: number;
    }>({ width: 0, height: 0, effectiveContentWidth: 0 }); // TODO: This is probably a bad way of doing this
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

export const useDebounce = (
    func: (...args: unknown[]) => void,
    delay = 500
) => {
    const timerRef = useRef() as { current: NodeJS.Timeout };

    return (...args: unknown[]) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => func(...args), delay);
    };
};

export const useDebouncedEffect = (
    func: EffectCallback,
    dependencies?: DependencyList
) => {
    const debouncedFunc = useDebounce(func);
    useEffect(debouncedFunc, dependencies);
};

type FormType = Record<string, string | boolean>;

export type FormElement<T = string | boolean> = {
    defaultValue: T;
    setValue: (value: T) => unknown;
};
type FormWithValues = {
    getValues: () => FormType;
    getError: () => ReactNode;
    setError: Dispatch<SetStateAction<string>>;
} & Record<string, FormElement>;

export const useInputForm = (initialForm: FormType) => {
    const ref = useRef() as { current: FormType };
    const [error, setError] = useState("");
    const form = {
        getValues: () => ref.current,
        getError: () =>
            error ? <span style={{ color: "red" }}>{error}</span> : null,
        setError,
    } as FormWithValues;

    useEffect(() => {
        ref.current = initialForm;
    }, []);

    for (const key of Object.keys(initialForm)) {
        const defaultValue = initialForm[key];
        if (defaultValue === undefined) continue;
        form[key] = {
            defaultValue,
            setValue: (value: string | boolean) => (ref.current[key] = value),
        };
    }

    return form;
};
