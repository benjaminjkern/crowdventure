import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { PaletteContext } from "../colorPalette";

const wrapperStyle = { justifyContent: "center", alignItems: "center" };

const AccountPreview = ({
    account,
    imgSide = "left",
    overlay,
    isLink = true,
    onClickImage,
}) => {
    const { foregroundColor } = useContext(PaletteContext);

    const inside = (
        <>
            {imgSide === "right" && (
                <span style={{ marginRight: 5 }}>{account.screenName}</span>
            )}
            <Image
                alt={`${account.screenName} Profile Pic`}
                height={20}
                onClick={onClickImage}
                src={
                    account.profilePicURL ||
                    require("../../public/defaultProfilePic.jpg")
                }
                style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#bbb",
                    borderRadius: "50%",
                    cursor: isLink || onClickImage ? "pointer" : "auto",
                }}
                width={20}
            />
            {imgSide === "left" && (
                <span style={{ marginLeft: 5 }}>{account.screenName}</span>
            )}
        </>
    );

    if (onClickImage || !isLink)
        return <span style={wrapperStyle}>inside</span>;

    return (
        <Link href={`/account/${account.screenName}`} style={wrapperStyle}>
            {inside}
        </Link>
    );
};

export default AccountPreview;
