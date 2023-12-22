import React, { type ReactNode } from "react";

const CrowdventureAlert = ({
    title,
    children,
}: {
    readonly title: string;
    readonly children: ReactNode;
}) => (
    // TODO: Flesh this out
    <div>
        {title}
        {children}
    </div>
);

export default CrowdventureAlert;
