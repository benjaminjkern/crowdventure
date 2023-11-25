import React from "react";
import Image from "next/image";
import Link from "next/link";
import AccountManager from "../accounts/AccountManager";

const Navbar = () => (
    <nav
        style={{
            display: "flex",
            height: 50,
            justifyContent: "space-between",
            alignItems: "center",
        }}
    >
        <Link href="/">
            <Image
                alt="Crowdventure Logo"
                height={50}
                src={require("../../public/logo.png")}
            />
        </Link>

        <AccountManager />

        {/* // <CrowdventureCollapse>
            Should collapse on smaller width screens
        // </CrowdventureCollapse> */}
    </nav>
);
export default Navbar;
