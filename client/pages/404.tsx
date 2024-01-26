import React from "react";

import { useRouter } from "next/router";
import ParagraphText from "+/lib/components/ParagraphText";
import CrowdventureButton from "+/lib/components/CrowdventureButton";

const NotFoundPage = () => {
    const router = useRouter();

    return (
        // TODO: Flesh this out
        <>
            <CrowdventureButton
                onClick={() => {
                    router.back();
                }}
                style={{
                    width: "fit-content",
                    marginBottom: 5,
                }}
            >
                Go back!
            </CrowdventureButton>
            <h1 style={{ marginBottom: 20 }}>Oh snap!</h1>
            <ParagraphText
                text="This page does not exist, or maybe our database is down. Who knows?
            Not you. Hahahaha"
            />
        </>
    );
};

export default NotFoundPage;
