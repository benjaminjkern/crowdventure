import React, { createContext, useEffect, useState } from "react";
import Head from "next/head";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "../styles/globals.css";
import Footer from "../lib/base/Footer";
import Navbar from "../lib/base/Navbar";
import { palette } from "../lib/colorPalette";

export const UserContext = createContext();

// THESE NEED TO BE HIDDEN BETTER
const backendURL =
    "https://3yfp7ejc0m.execute-api.us-east-1.amazonaws.com/dev/graphql";

// const BING_API_KEY = "8300cebe5f0d452a9ccb4bca67af4659";

const client = new ApolloClient({
    uri: backendURL,
    cache: new InMemoryCache(),
});

// Crowdventure! - Page not found! - for 404 page (NONEXISTENT RIGHT NOW)

const App = ({ Component, pageProps }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            localStorage.setItem("unsafeMode", false);
            return;
        }

        // Should do some sort of verification here
        setUser(JSON.parse(loggedInUser));

        if (localStorage.getItem("unsafeMode")) {
            document.body.style.backgroundImage = `linear-gradient(
                to right,
                rgb(158, 232, 255),
                ${palette[3]} 10%,
                ${palette[3]} 90%,
                rgb(158, 232, 255)
            )`;
            document.body.style.color = "rgb(225, 240, 255)";
        } else {
            document.body.style.backgroundImage = `linear-gradient(
                to right,
                rgb(158, 232, 255),
                rgb(245,250,255) 10%,
                rgb(245,250,255) 90%,
                rgb(158, 232, 255)
            )`;
            document.body.style.color = "";
        }
    }, []);

    const { pageTitle, ...otherPageProps } = pageProps;

    // const [showingModal, showModal] = useState(undefined);
    // const [redirect, setRedirect] = useState(undefined);

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
            <ApolloProvider client={client}>
                <UserContext.Provider value={{ user }}>
                    <Navbar />
                    <Component {...otherPageProps} />
                    <Footer />
                    {/* Modal stuff */}
                </UserContext.Provider>
            </ApolloProvider>
        </>
    );
};

export default App;
