import React from "react";
import Image from "next/image";
import Link from "next/link";
import AccountManager from "./AccountManager";

const Navbar = () => (
    <nav
        style={{
            height: 100,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
        }}
    >
        <Link href="/">
            <Image
                alt="Crowdventure Logo"
                height={75}
                src={require("../../public/logo.png")}
            />
        </Link>

        <AccountManager wrapperStyle={{ marginRight: 50, marginTop: 5 }} />

        {/* // <CrowdventureCollapse>
            Should collapse on smaller width screens
        // </CrowdventureCollapse> */}
    </nav>
);
export default Navbar;
