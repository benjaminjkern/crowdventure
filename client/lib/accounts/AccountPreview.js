import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { PaletteContext } from "../colorPalette";

const AccountPreview = ({
    account,
    imgSide = "left",
    scale = 1,
    isLink = true,
    onClickImage,
}) => {
    const imageSize = 30 * scale;
    const { textColor, mutedTextColor } = useContext(PaletteContext);
    const wrapperStyle = {
        // justifyContent: "center",
        alignItems: "center",
        color: textColor,
    };

    const inside = (
        <>
            {imgSide === "right" && (
                <span style={{ marginRight: 5, fontSize: `${scale}em` }}>
                    {account.screenName}
                </span>
            )}
            <Image
                alt={`${account.screenName} Profile Pic`}
                height={imageSize}
                onClick={onClickImage}
                src={
                    account.profilePicURL ||
                    require("../../public/defaultProfilePic.jpg")
                }
                style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: mutedTextColor,
                    borderRadius: "50%",
                    cursor: isLink || onClickImage ? "pointer" : "auto",
                }}
                width={imageSize}
            />
            {imgSide === "left" && (
                <span style={{ marginLeft: 5, fontSize: `${scale}em` }}>
                    {account.screenName}
                </span>
            )}
        </>
    );

    if (onClickImage || !isLink)
        return <span style={wrapperStyle}>{inside}</span>;

    return (
        <Link href={`/account/${account.screenName}`} style={wrapperStyle}>
            {inside}
        </Link>
    );
};

export default AccountPreview;
