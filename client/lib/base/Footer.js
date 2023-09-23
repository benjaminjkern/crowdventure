import React from "react";
import Link from "next/link";
import packageJson from "../../package.json";

const Footer = () => {
    return (
        <>
            © 2022 Copyright: (MIT) Benjamin Kern
            <Link href="https://github.com/benjaminjkern/crowdventure/blob/master/CHANGELOG.md">
                <a>Version: {packageJson.version}</a>
            </Link>
        </>
    );
};

export default Footer;
