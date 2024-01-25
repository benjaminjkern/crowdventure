/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
/** @type {import("next").NextConfig} */

if (!process.env.BING_API_KEY) throw new Error("MISSING BING API KEY");
if (!process.env.API_URL) throw new Error("MISSING API URL");

const config = {
    reactStrictMode: false,

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
    env: {
        API_URL: process.env.API_URL,
        BING_API_KEY: process.env.BING_API_KEY,
        npm_package_version: process.env.npm_package_version,
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
