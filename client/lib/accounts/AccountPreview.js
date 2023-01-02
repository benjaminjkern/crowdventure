import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { PaletteContext } from "../colorPalette";

const AccountPreview = ({ account, imgSide = "left" }) => {
    const { foregroundColor } = useContext(PaletteContext);
    return (
        <Link
            href={`/account/${account.screenName}`}
            style={{
                color: foregroundColor,
            }}
        >
            <a>
                {imgSide === "right" && `${account.screenName} `}
                <Image
                    src={
                        account.profilePicURL ||
                        require("../../public/defaultProfilePic.jpg")
                    }
                    alt={`${account.screenName} Profile Pic`}
                    // onError={(e) => {
                    //     e.target.src =
                    //     require("/defaultProfilePic.jpg")
                    // }}
                    width={20}
                    height={20}
                    style={{
                        border: "1px solid #bbb",
                        height: "2em",
                        width: "2em",
                        objectFit: "cover",
                        borderRadius: "50%",
                    }}
                />
                {imgSide === "left" && ` ${account.screenName}`}
            </a>
        </Link>
    );
};

export default AccountPreview;
