import React from "react";
import Head from "next/head";

import "../styles/globals.css";

import Footer from "../lib/base/Footer";
import Navbar from "../lib/base/Navbar";

import PaletteProvider from "../lib/colorPalette";
import ModalProvider from "../lib/modal";
import UserProvider from "../lib/user";
import UnsafeModeProvider from "../lib/unsafeMode";

// Crowdventure! - Page not found! - for 404 page (NONEXISTENT RIGHT NOW)

const App = ({ Component, pageProps }) => {
    const { pageTitle, previewImage, ...otherPageProps } = pageProps;

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

                {/* This stuff shows up when you send someone the link via imessage */}
                <meta
                    property="og:title"
                    content={pageTitle || "Crowdventure"}
                />
                <meta
                    property="og:image"
                    href={
                        previewImage ||
                        "https://github.com/benjaminjkern/crowdventure/blob/master/NewLogo.png?raw=true"
                    }
                />

                <title>{pageTitle || "Crowdventure"}</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <UnsafeModeProvider>
                <PaletteProvider>
                    <UserProvider>
                        <ModalProvider>
                            <Navbar />
                            <Component {...otherPageProps} />
                            <Footer />
                        </ModalProvider>
                    </UserProvider>
                </PaletteProvider>
            </UnsafeModeProvider>
        </>
    );
};

export default App;
