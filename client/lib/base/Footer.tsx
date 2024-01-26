import React, { useContext } from "react";
import Link from "next/link";
import { PaletteContext } from "../colorPalette";
import { useMediaQuery } from "../hooks";

const Footer = () => {
    const { mutedTextColor } = useContext(PaletteContext);
    const isMobile = useMediaQuery("(max-width: 800px)");
    return (
        <footer
            style={{
                flexDirection: "row",
                paddingBlock: 30,
                justifyContent: "space-between",
                gap: 10,
                maxHeight: isMobile ? undefined : 78,
            }}
        >
            <Link
                href="https://www.buymeacoffee.com/benkern"
                style={{ flex: 1, textAlign: "center" }}
            >
                Buy me a coffee!
            </Link>
            <span
                style={{ flex: 1, color: mutedTextColor, textAlign: "center" }}
            >
                © 2022 Copyright: (MIT) Crowdventure
            </span>
            <Link
                href="https://github.com/benjaminjkern/crowdventure/blob/master/CHANGELOG.md"
                style={{ flex: 1, textAlign: "center" }}
            >
                Version: {process.env.npm_package_version}
            </Link>
        </footer>
    );
};

export default Footer;
