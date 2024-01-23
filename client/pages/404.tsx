import React from "react";

import ParagraphText from "+/lib/components/ParagraphText";

const NotFoundPage = () => (
    // TODO: Flesh this out
    <>
        <h1 style={{ marginBottom: 20 }}>Oh snap!</h1>
        <ParagraphText
            text="This page does not exist, or maybe our database is down. Who knows?
            Not you. Hahahaha"
        />
    </>
);

export default NotFoundPage;
