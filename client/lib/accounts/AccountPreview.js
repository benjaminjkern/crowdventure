import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { PaletteContext } from "../colorPalette";

const AccountPreview = ({ account, imgSide = "left", overlay }) => {
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
                    width={20}
                    height={20}
                    style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#bbb",
                        borderRadius: "50%",
                    }}
                />
                {imgSide === "left" && ` ${account.screenName}`}
            </a>
        </Link>
    );
};

export default AccountPreview;
