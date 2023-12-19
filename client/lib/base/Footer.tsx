import React from "react";
import Link from "next/link";

const Footer = () => (
    <footer
        style={{
            flexDirection: "row",
            padding: 30,
            justifyContent: "space-between",
        }}
    >
        © 2022 Copyright: (MIT) Benjamin Kern
        <Link href="https://github.com/benjaminjkern/crowdventure/blob/master/CHANGELOG.md">
            Version: {process.env.npm_package_version}
        </Link>
    </footer>
);

export default Footer;
