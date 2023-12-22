export const blurImageStyle = (blur: boolean, blurAmount = 20) => {
    if (!blur) return {};

    return {
        "-webkit-filter": `blur(${blurAmount}px)`,
        filter: `blur(${blurAmount}px)`,
    };
};
