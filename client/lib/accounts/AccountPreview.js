import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { PaletteContext } from "../colorPalette";

const AccountPreview = ({
    account,
    imgSide = "left",
    overlay,
    onClickImage,
}) => {
    const { foregroundColor } = useContext(PaletteContext);

    const inside = (
        <>
            {imgSide === "right" && `${account.screenName} `}
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
                    cursor: onClickImage ? "pointer" : "auto",
                }}
                width={20}
            />
            {imgSide === "left" && ` ${account.screenName}`}
        </>
    );

    if (onClickImage) return inside;

    return (
        <Link
            href={`/account/${account.screenName}`}
            style={{
                color: foregroundColor,
            }}
        >
            <a>{inside}</a>
        </Link>
    );
};

export default AccountPreview;
