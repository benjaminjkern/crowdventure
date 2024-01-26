import React, { type MouseEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "../hooks";
import AccountManager from "./AccountManager";

const NavbarCollapse = ({
    onClick,
}: {
    readonly onClick: (e: MouseEvent) => unknown;
}) => (
    <FontAwesomeIcon
        icon={faBars}
        onClick={onClick}
        style={{ cursor: "pointer", width: 30, height: 30, marginRight: 20 }}
    />
);

const Navbar = () => {
    const isMobile = useMediaQuery("(max-width: 800px)");

    const [open, setOpen] = useState(false);

    return (
        <>
            <nav
                style={{
                    maxHeight: 100,
                    minHeight: 70,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <Link
                    href="/"
                    style={{
                        position: "relative",
                        height: 70,
                        width: "100%",
                        maxWidth: 348,
                    }}
                >
                    <Image
                        alt="Crowdventure Logo"
                        fill
                        src={require("../../public/logo.png")}
                        style={{ objectFit: "contain" }}
                    />
                </Link>

                {isMobile ? (
                    <NavbarCollapse onClick={() => setOpen(!open)} />
                ) : (
                    <AccountManager vertical wrapperStyle={{ margin: 20 }} />
                )}
            </nav>
            {isMobile ? (
                <div
                    style={{
                        display: "grid",
                        transition: "grid-template-rows 0.3s",
                        gridTemplateRows: open ? "1fr" : "0fr",
                    }}
                >
                    <div
                        style={{
                            overflow: "hidden",
                        }}
                    >
                        <AccountManager wrapperStyle={{ paddingBottom: 10 }} />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Navbar;
