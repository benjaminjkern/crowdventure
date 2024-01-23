import React, { type MouseEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "../hooks";
import AccountManager from "./AccountManager";

const NavbarCollapse = ({
    onClick,
}: {
    readonly onClick: (e: MouseEvent) => unknown;
}) => <button onClick={onClick}>Open</button>;

const Navbar = () => {
    const isMobile = useMediaQuery("(max-width: 800px)");

    const [open, setOpen] = useState(false);

    return (
        <>
            <nav
                style={{
                    height: 100,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <Link
                    href="/"
                    style={{
                        position: "relative",
                        height: "100%",
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
                    <AccountManager
                        vertical
                        wrapperStyle={{ marginRight: 50, marginTop: 5 }}
                    />
                )}
            </nav>
            {isMobile ? (
                <div
                    style={{
                        display: "grid",
                        marginBottom: 10,
                        transition: "grid-template-rows 0.3s",
                        gridTemplateRows: open ? "1fr" : "0fr",
                    }}
                >
                    <div
                        style={{
                            overflow: "hidden",
                        }}
                    >
                        <AccountManager />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Navbar;
