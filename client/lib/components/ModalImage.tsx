import React, { type CSSProperties } from "react";
import Image from "next/image";

const ModalImage = ({
    src,
    alt,
    style,
}: {
    readonly src: string;
    readonly alt: string;
    readonly style: CSSProperties;
}) => {
    if (!src) return;
    return (
        <Image
            alt={alt}
            height={200}
            src={src}
            style={{
                borderRadius: "8px",
                ...style,
            }}
            width={200}
        />
    );
};

export default ModalImage;
