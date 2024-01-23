import React, { type CSSProperties } from "react";
import Image from "next/image";

const ModalImage = ({
    src,
    alt,
    style,
}: {
    readonly src: string | null;
    readonly alt: string;
    readonly style: CSSProperties;
}) => {
    if (!src) return;
    return (
        <div
            style={{
                position: "relative",
                height: "min(100vw, 50vh)",
                width: "100%",
            }}
        >
            <Image
                alt={alt}
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
