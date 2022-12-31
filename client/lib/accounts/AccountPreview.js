import React, { useContext } from "react";
import Link from "next/link";

const AccountPreview = ({ account }) => {
    const { foregroundColor } = useContext(PaletteContext);
    return (
        <Link
            href={`/account/${account.screenName}`}
            style={{
                color: foregroundColor,
            }}
        >
            <img
                src={account.profilePicURL || require("/defaultProfilePic.jpg")}
                alt={`${account.screenName} Profile Pic`}
                // onError={(e) => {
                //     e.target.src =
                //     require("/defaultProfilePic.jpg")
                // }}
                style={{
                    border: "1px solid #bbb",
                    height: "2em",
                    width: "2em",
                    objectFit: "cover",
                    borderRadius: "50%",
                }}
            />{" "}
            {account.screenName}
        </Link>
    );
};

export default AccountPreview;
