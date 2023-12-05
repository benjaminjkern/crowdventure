module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    redirects() {
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
            {
                protocol: "https",
                hostname: "**",
                pathname: "**/.*/**",
                // This is needed because of a nextjs bug
            },
        ],
    },
};
