import React from "react";
import Image from "next/image";

const ModalImage = ({ src, alt, style }) => {
    if (!src) return;
    return (
        <Image
            src={src}
            alt={alt}
            width={200}
            height={200}
            style={{
                borderRadius: "8px",
                ...style,
            }}
        />
    );
};

export default ModalImage;
