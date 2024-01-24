import React, {
    type DependencyList,
    type EffectCallback,
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
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
                effectiveContentWidth:
                    document.body.scrollWidth > 800
                        ? Math.min(
                              MAX_CONTENT_WIDTH,
                              0.8 * document.body.scrollWidth
                          ) - 10
                        : document.body.scrollWidth - 60,
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

export const useDebounce = <T extends Array<any>>(
    func: (...args: T) => unknown,
    delay = 500
) => {
    const timerRef = useRef() as { current: ReturnType<typeof setTimeout> };

    return (...args: T) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => func(...args), delay);
    };
};

export const useDebouncedEffect = (
    func: EffectCallback,
    dependencies?: DependencyList
) => {
    const debouncedFunc = useDebounce(func);
    useEffect(debouncedFunc, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

type FormType = Record<string, string | boolean>;

export type FormElement<T = string | boolean> = {
    defaultValue: T;
    setValue: (value: T) => unknown;
};
export type FormWithValues<T extends FormType> = {
    getValues: () => T;
    getError: () => ReactNode;
    setError: Dispatch<SetStateAction<string>>;
} & Record<keyof T, FormElement>;

export const useInputForm = <T extends FormType>(
    initialForm: T,
    inputTriggers: (keyof T)[] = []
): FormWithValues<T> => {
    const ref = useRef() as { current: T };
    const [error, setError] = useState("");
    const [rerender, setRerender] = useState({}); // eslint-disable-line @typescript-eslint/no-unused-vars
    const form = {
        getValues: () => ref.current ?? initialForm,
        getError: () =>
            error ? <span style={{ color: "red" }}>{error}</span> : null,
        setError,
    } as FormWithValues<T>;

    useEffect(() => {
        ref.current = initialForm;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    for (const key of Object.keys(initialForm)) {
        const defaultValue = initialForm[key];
        if (defaultValue === undefined) continue;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        form[key] = {
            defaultValue,
            setValue: (value: string | boolean) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ref.current[key] = value;
                if (inputTriggers.includes(key)) setRerender({});
            },
        };
    }

    return form;
};
