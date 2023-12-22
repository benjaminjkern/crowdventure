/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,

    // swcMinify: true, // TODO: Idk if this makes a difference

    /**
     * If you are using `appDir` then you must comment the below `i18n` config out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },

    // eslint-disable-next-line require-await
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
            {
                protocol: "https",
                hostname: "**",
                pathname: "**/.*/**",
                // This is needed because of a nextjs bug
            },
        ],
    },
};

export default config;
