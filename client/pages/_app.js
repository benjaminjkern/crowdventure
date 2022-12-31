import Head from "next/head";

import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
    const { pageTitle, ...otherPageProps } = pageProps;

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="description" content="Crowdventure your mom" />
                <meta name="author" content="Ben Kern" />

                <meta
                    property="og:image"
                    href="https://github.com/benjaminjkern/crowdventure/blob/master/NewLogo.png?raw=true"
                />

                {/* This stuff shows up when you send someone the link via imessage */}
                <meta property="og:title" content="Bazar" />
                <meta property="og:image" content="/favicon.png" />

                <title>{pageTitle || "Crowdventure"}</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Component {...otherPageProps} />
        </>
    );
};

export default App;
