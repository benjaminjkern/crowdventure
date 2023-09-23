import React from "react";
import Image from "next/image";

const ModalImage = ({ src, alt, style }) => {
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
