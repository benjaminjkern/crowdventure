import React, { useContext } from "react";
import { UserContext } from "../../pages/_app";
import { PaletteContext } from "../colorPalette";
const CrowdventureButton = ({
    children,
    style,
    buttonType,
    requireSignedIn,
    onClick,
    ...props
}) => {
    const { user } = useContext(UserContext);
    const { rootColor } = useContext(PaletteContext);

    if (buttonType === "text") return <a onClick={onClick}>{children}</a>;

    return (
        <button
            style={{
                border: `1px solid ${rootColor[0]}`,
                backgroundColor: rootColor[1],
                ...style,
            }}
            disabled={requireSignedIn && !user}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = rootColor[0];
                // Do overlay
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = rootColor[1];
            }}
            {...props}
        >
            {children}
        </button>
    );
};
export default CrowdventureButton;
