import React, { useEffect, useState } from "react";

const UnsafeImage = ({ style, unsafe, ...props }) => {
    const BLUR_MAX = 10;

    const [blurAmount, setBlurAmount] = useState(unsafe * BLUR_MAX);
    const [blurDelta, setBlurDelta] = useState(0);

    useEffect(() => {
        // Prevent accidentally getting stuck do too async
        if (blurDelta === 0 && blurAmount !== 0 && blurAmount !== BLUR_MAX) {
            setBlurDelta(1);
            return;
        }

        setTimeout(() => {
            if (
                blurDelta === 0 ||
                blurAmount + blurDelta < 0 ||
                blurAmount + blurDelta > BLUR_MAX
            ) {
                setBlurDelta(0);
                return;
            }
            setBlurAmount(blurAmount + blurDelta);
        }, 20);
    }, [blurDelta, blurAmount]);

    return (
        <img
            style={{
                ...style,
                ...(unsafe
                    ? {
                          "-webkit-filter": `blur(${blurAmount}px)`,
                          filter: `blur(${blurAmount}px)`,
                      }
                    : undefined),
            }}
            {...props}
            onMouseEnter={() => {
                setBlurDelta(-1);
            }}
            onMouseLeave={() => {
                setBlurDelta(1);
            }}
        />
    );
};

export default UnsafeImage;
