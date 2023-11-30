import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { PaletteContext } from "../colorPalette";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";

const AccountPreview = ({
    account,
    imgSide = "left",
    scale = 1,
    isLink = true,
    onClickImage,
    style,
}) => {
    const imageSize = 30 * scale;
    const textSize = DEFAULT_TEXT_SIZE * scale;
    const { mutedTextColor } = useContext(PaletteContext);
    const wrapperStyle = {
        alignItems: "center",
        justifyContent: "flex-start",
        ...style,
    };

    const inside = (
        <>
            {imgSide === "right" && (
                <span style={{ marginRight: 5, fontSize: textSize }}>
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
                <span style={{ marginLeft: 5, fontSize: textSize }}>
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
