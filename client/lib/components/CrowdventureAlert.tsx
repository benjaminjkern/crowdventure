import React, { type ReactNode } from "react";

const CrowdventureAlert = ({
    title,
    children,
}: {
    readonly title: string;
    readonly children: ReactNode;
}) => (
    <div
        style={{
            alignItems: "center",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            padding: 20,
            borderRadius: 10,
            borderColor: "rgba(255,0,0,0.3)",
            borderWidth: 1,
            borderStyle: "solid",
        }}
    >
        <h3>{title}</h3>
        <span style={{ display: "inline" }}>{children}</span>
    </div>
);

export default CrowdventureAlert;
