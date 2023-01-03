import React from "react";
import Image from "next/image";
import Link from "next/link";
import AccountManager from "../accounts/AccountManager";

const Navbar = () => {
    return (
        <div>
            <Link href="/">
                <Image
                    height={50}
                    src={require("../../public/logo.png")}
                    alt="Crowdventure Logo"
                    style={{ width: "100%" }}
                />
            </Link>

            <AccountManager />

            {/* // <CrowdventureCollapse>
            Should collapse on smaller width screens
        // </CrowdventureCollapse> */}
        </div>
    );
};
export default Navbar;
