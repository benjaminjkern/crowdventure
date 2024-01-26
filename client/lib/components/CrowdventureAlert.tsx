import React, { type ReactNode } from "react";
import { useRouter } from "next/router";
import CrowdventureButton from "./CrowdventureButton";

const CrowdventureAlert = ({
    title,
    children,
    goBackButton = false,
}: {
    readonly title: string;
    readonly children: ReactNode;
    readonly goBackButton?: boolean;
}) => {
    const router = useRouter();

    return (
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
            {goBackButton ? (
                <CrowdventureButton
                    onClick={() => {
                        router.back();
                    }}
                    style={{
                        width: "fit-content",
                        marginTop: 5,
                    }}
                >
                    Go back!
                </CrowdventureButton>
            ) : null}
        </div>
    );
};

export default CrowdventureAlert;
