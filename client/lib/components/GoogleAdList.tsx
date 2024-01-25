import React, {
    type ReactNode,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const GoogleAd = ({ onError }: { readonly onError: () => unknown }) => {
    const ref = useRef<HTMLModElement>();

    useEffect(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (rect.height === 0) onError();
    });

    return (
        <>
            <ins
                className="adsbygoogle"
                data-ad-client="ca-pub-3556492457867678"
                data-ad-format="fluid"
                data-ad-layout-key="-73+ez-1k-38+c0"
                data-ad-slot="8616021842"
                // @ts-ignore
                ref={ref}
                style={{ display: "block" }}
            />
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({}
                );
            </script>
        </>
    );
};

const GoogleAdList = <T,>({
    data,
    render,
    columnsCountBreakPoints,
    style,
}: {
    readonly data: T[];
    readonly render: (item: T, i: number) => ReactNode;
    readonly columnsCountBreakPoints: Record<number, number>;
    readonly style?: CSSProperties;
}) => {
    const [showAd, setShowAd] = useState(true);
    const newData = [
        ...data.slice(0, Math.floor(data.length / 2)),
        ...(data.length >= 2 && showAd ? [null] : []),
        ...data.slice(Math.floor(data.length / 2)),
    ];

    return (
        <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
            <Masonry style={style}>
                {newData.map((item, i) =>
                    item ? (
                        render(item, i)
                    ) : (
                        <GoogleAd key={i} onError={() => setShowAd(false)} />
                    )
                )}
            </Masonry>
        </ResponsiveMasonry>
    );
};

export default GoogleAdList;
