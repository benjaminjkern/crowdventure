import React from "react";
import Head from "next/head";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import nextSession from "next-session";

import "../styles/globals.css";

import Footer from "../lib/base/Footer";
import Navbar from "../lib/base/Navbar";

import PaletteProvider from "../lib/colorPalette";
import ModalProvider from "../lib/modal";
import UserProvider from "../lib/user";
import UnsafeModeProvider from "../lib/unsafeMode";

export const getSession = nextSession();

// THESE NEED TO BE HIDDEN BETTER
const backendURL =
    "https://3yfp7ejc0m.execute-api.us-east-1.amazonaws.com/dev/graphql";

// const BING_API_KEY = "8300cebe5f0d452a9ccb4bca67af4659";

export const graphqlClient = new ApolloClient({
    uri: backendURL,
    cache: new InMemoryCache(),
});

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
            <ApolloProvider client={graphqlClient}>
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
            </ApolloProvider>
        </>
    );
};

export default App;
