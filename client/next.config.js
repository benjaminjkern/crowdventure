module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: "/node",
                destination: "/",
                permanent: false,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },

            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
};
