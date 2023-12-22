import React, {
    type DetailedHTMLProps,
    type ImgHTMLAttributes,
    useEffect,
    useState,
    type CSSProperties,
} from "react";
import { blurImageStyle } from "../styles";

const UnsafeImage = ({
    style,
    unsafe,
    ...props
}: {
    readonly style: CSSProperties;
    readonly unsafe: boolean;
} & DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
>) => {
    const BLUR_MAX = 10;

    const [blurAmount, setBlurAmount] = useState(Number(unsafe) * BLUR_MAX);
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
                ...blurImageStyle(unsafe, blurAmount),
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
