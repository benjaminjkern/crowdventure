import React from "react";
import Image from "next/image";
import Link from "next/link";
import AccountManager from "../accounts/AccountManager";

const Navbar = () => (
    <div>
        <Link href="/">
            <Image
                alt="Crowdventure Logo"
                height={50}
                src={require("../../public/logo.png")}
                style={{ width: "100%" }}
            />
        </Link>

        <AccountManager />

        {/* // <CrowdventureCollapse>
            Should collapse on smaller width screens
        // </CrowdventureCollapse> */}
    </div>
);
export default Navbar;
