import React, { useContext } from "react";
import Link from "next/link";
import { PaletteContext } from "../colorPalette";

const Footer = () => {
    const { mutedTextColor } = useContext(PaletteContext);
    return (
        <footer
            style={{
                flexDirection: "row",
                padding: 30,
                justifyContent: "space-between",
            }}
        >
            <Link href="https://www.buymeacoffee.com/benkern">
                Buy me a coffee!
            </Link>
            <span style={{ color: mutedTextColor }}>
                © 2022 Copyright: (MIT) Crowdventure
            </span>
            <Link href="https://github.com/benjaminjkern/crowdventure/blob/master/CHANGELOG.md">
                Version: {process.env.npm_package_version}
            </Link>
        </footer>
    );
};

export default Footer;
