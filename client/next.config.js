module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    // async redirects() {
    //     return [
    //         {
    //             source: "/from",
    //             destination: "/to",
    //             permanent: false,
    //         },
    //     ];
    // },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};
