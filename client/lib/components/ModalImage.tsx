import React, { type CSSProperties } from "react";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import FallbackImage from "./FallbackImage";

const ModalImage = ({
    src,
    alt,
    style,
    fallbackImage,
}: {
    readonly src: string | null;
    readonly alt: string;
    readonly style?: CSSProperties;
    readonly fallbackImage?: string | StaticImport;
}) => {
    if (!src) return;

    return (
        <div
            style={{
                position: "relative",
                height: "min(100vw, 50dvh)",
                width: "100%",
            }}
        >
            <FallbackImage
                alt={alt}
                fallbackSrc={fallbackImage}
                fill
                src={src}
                style={{
                    objectFit: "cover",
                    borderRadius: 8,
                    ...style,
                }}
            />
        </div>
    );
};

export default ModalImage;
