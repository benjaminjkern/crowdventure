import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { PaletteContext } from "../colorPalette";

const AccountPreview = ({
    account,
    imgSide = "left",
    overlay,
    isLink = true,
    onClickImage,
}) => {
    const { textColor } = useContext(PaletteContext);
    const wrapperStyle = {
        justifyContent: "center",
        alignItems: "center",
        color: textColor,
    };

    const screenNameText = (
        <span style={{ marginRight: 5 }}>{account.screenName}</span>
    );

    const inside = (
        <>
            {imgSide === "right" && screenNameText}
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
            {imgSide === "left" && screenNameText}
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
