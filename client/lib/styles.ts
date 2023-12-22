export const blurImageStyle = (blur, blurAmount = 20) => {
    if (!blur) return {};

    return {
        "-webkit-filter": `blur(${blurAmount}px)`, // TODO: Pull blur out to a common style
        filter: `blur(${blurAmount}px)`,
    };
};
