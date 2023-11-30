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
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
                <meta content="Crowdventure your mom" name="description" />
                <meta content="Ben Kern" name="author" />

                {/* This stuff shows up when you send someone the link via imessage */}
                <meta
                    content={pageTitle || "Crowdventure"}
                    property="og:title"
                />
                <meta
                    href={
                        previewImage ||
                        "https://github.com/benjaminjkern/crowdventure/blob/master/NewLogo.png?raw=true"
                    }
                    property="og:image"
                />

                <title>{pageTitle || "Crowdventure"}</title>
                <link href="/favicon.png" rel="icon" />
            </Head>
            <UserProvider>
                <UnsafeModeProvider>
                    <PaletteProvider>
                        <ModalProvider>
                            <div
                                style={{
                                    minHeight: "100vh",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Navbar />
                                {/* <Component {...otherPageProps} /> */}
                                <Footer />
                            </div>
                        </ModalProvider>
                    </PaletteProvider>
                </UnsafeModeProvider>
            </UserProvider>
        </>
    );
};

export default App;
