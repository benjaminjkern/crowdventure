import React, {
    type CSSProperties,
    type MouseEventHandler,
    useContext,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { PaletteContext } from "../colorPalette";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import { type Account } from "+/types/models";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";

const AccountPreview = ({
    account,
    imgSide = "left",
    scale = 1,
    isLink = true,
    onClickImage,
    style,
}: {
    account: Account;
    imgSide?: "left" | "right";
    scale?: number;
    isLink?: boolean;
    onClickImage?: MouseEventHandler;
    style?: CSSProperties;
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
                alt={`${account.screenName}'s Profile Pic`}
                height={imageSize}
                onClick={onClickImage}
                src={
                    account.profilePicURL ??
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    (require("../../public/defaultProfilePic.jpg") as StaticImport)
                }
                style={{
                    objectFit: "cover",
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
