import React from "react";
import Link from "next/link";
import packageJson from "../../package.json";

const Footer = () => (
    <footer>
        © 2022 Copyright: (MIT) Benjamin Kern
        <Link href="https://github.com/benjaminjkern/crowdventure/blob/master/CHANGELOG.md">
            Version: {packageJson.version}
        </Link>
    </footer>
);

export default Footer;
