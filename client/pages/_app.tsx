import React from "react";
import Head from "next/head";
import { type AppType } from "next/app";

import { createUseStyles } from "react-jss";
import Script from "next/script";
import Footer from "+/lib/base/Footer";
import Navbar from "+/lib/base/Navbar";

import PaletteProvider from "+/lib/colorPalette";
import ModalProvider from "+/lib/modal";
import UserProvider from "+/lib/user";
import UnsafeModeProvider from "+/lib/unsafeMode";
import { MAX_CONTENT_WIDTH } from "+/lib/hooks";

// Crowdventure! - Page not found! - for 404 page (NONEXISTENT RIGHT NOW)

export type DefaultPageProps = {
    pageTitle?: string;
    previewImage?: string | null;
};

const useStyles = createUseStyles({
    insideDiv: {
        minHeight: "100vh",
        "@media (min-width: 801px)": {
            width: `calc(min(80vw, ${MAX_CONTENT_WIDTH}px) - 20px)`,
        },
        "@media (max-width: 800px)": {
            width: "calc(100vw - 60px)",
        },
    },
});

const App: AppType<DefaultPageProps> = ({ Component, pageProps }) => {
    const { pageTitle, previewImage, ...otherPageProps } = pageProps;
    const { insideDiv } = useStyles();

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                    name="viewport"
                />
                <meta content="Crowdventure your mom" name="description" />
                <meta content="Ben Kern" name="author" />

                {/* This stuff shows up when you send someone the link via imessage */}
                <meta
                    content={pageTitle ?? "Crowdventure"}
                    property="og:title"
                />
                <meta
                    content={
                        previewImage ??
                        "https://github.com/benjaminjkern/crowdventure/blob/master/NewLogo.png?raw=true"
                    }
                    property="og:image"
                />
                <Script
                    async
                    crossOrigin="anonymous"
                    id="Adsense-id"
                    onError={(e) => {
                        console.error("Script failed to load", e);
                    }}
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3556492457867678"
                    strategy="afterInteractive"
                />

                <title>{pageTitle ?? "Crowdventure"}</title>
                <link href="/favicon.png" rel="icon" />
            </Head>
            <UserProvider>
                <UnsafeModeProvider>
                    <PaletteProvider>
                        <ModalProvider>
                            <div style={{ alignItems: "center" }}>
                                <div className={insideDiv}>
                                    <Navbar />
                                    <div style={{ flex: 1 }}>
                                        <Component {...otherPageProps} />
                                    </div>
                                    <Footer />
                                </div>
                            </div>
                        </ModalProvider>
                    </PaletteProvider>
                </UnsafeModeProvider>
            </UserProvider>
        </>
    );
};

export default App;
