import React, { type ComponentProps, useState, useRef, useEffect } from "react";

import Image from "next/image";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";

const FallbackImage = ({
    style,
    fallbackSrc,
    src,
    ...props
}: Omit<ComponentProps<typeof Image>, "src"> & {
    readonly fallbackSrc?: string | StaticImport;
    readonly src: string | StaticImport | null | undefined;
}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [src]);

    if ((src === null || src === undefined) && !fallbackSrc) return null;

    return (
        <>
            {fallbackSrc && !loaded ? (
                <Image style={style} {...props} src={fallbackSrc} />
            ) : null}

            <div
                style={{
                    overflow: "hidden",
                    height: loaded ? undefined : 1, // If its zero then next optimizes it out
                    width: loaded ? undefined : 1,
                }}
            >
                {src !== null && src !== undefined && (
                    <Image
                        onLoadingComplete={() => setLoaded(true)}
                        src={src}
                        style={{
                            opacity: loaded ? 1 : 0,
                            ...style,
                        }}
                        {...props}
                    />
                )}
            </div>
        </>
    );
};

export default FallbackImage;
