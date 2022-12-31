import React, { useContext } from "react";
import { UserContext } from "../../pages/_app";
import { palette } from "../colorPalette";

const CrowdventureButton = ({ children, style, requireSignedIn, ...props }) => {
    const { user } = useContext(UserContext);

    return (
        <button
            style={{
                border: `1px solid ${palette[2]}`,
                backgroundColor: palette[0],
                ...style,
            }}
            disabled={requireSignedIn && !user}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = palette[2];
                // Do overlay
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = palette[0];
            }}
            {...props}
        >
            {children}
        </button>
    );
};
export default CrowdventureButton;
