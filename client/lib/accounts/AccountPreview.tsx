import React, {
    type CSSProperties,
    type MouseEventHandler,
    useContext,
} from "react";
import Link from "next/link";
import { PaletteContext } from "../colorPalette";
import { DEFAULT_TEXT_SIZE } from "../dynamicGlobalStyles";
import FallbackImage from "../components/FallbackImage";
import { type Account } from "@/types/models";

const AccountPreview = ({
    account,
    imgSide = "left",
    scale = 1,
    isLink = true,
    onClickImage,
    style,
    badgeNumber = 0,
}: {
    readonly account: Account | null;
    readonly imgSide?: "left" | "right";
    readonly scale?: number;
    readonly isLink?: boolean;
    readonly onClickImage?: MouseEventHandler;
    readonly style?: CSSProperties;
    readonly badgeNumber?: number;
}) => {
    const imageSize = 30 * scale;
    const textSize = DEFAULT_TEXT_SIZE * scale;
    const { mutedTextColor, lightBackgroundColor } = useContext(PaletteContext);
    const wrapperStyle = {
        alignItems: "center",
        justifyContent: "flex-start",
        ...style,
    };

    const screenName = account?.screenName ?? "(Account deleted)";

    // TODO: Overlay notification badge
    const inside = (
        <>
            {imgSide === "right" && (
                <span
                    style={{
                        marginRight: 5,
                        fontSize: textSize,
                        color: account ? undefined : mutedTextColor,
                    }}
                >
                    {screenName}
                </span>
            )}

            {/* overlay={
                    unseenNotifications > 0 && (
                        <div
                            style={{
                                position: "absolute",
                                right: "1.5em",
                                top: "-0.5em",
                                borderRadius: "1em",
                                backgroundColor: "red",
                                width: "2em",
                                height: "2em",
                                lineHeight: "2em",
                                color: "white",
                            }}
                        >
                            {unseenNotifications}
                        </div>
                    )
                } */}
            <FallbackImage
                alt={`${screenName}'s Profile Pic`}
                fallbackSrc={require("../../public/defaultProfilePic.jpg")}
                height={imageSize}
                onClick={onClickImage}
                src={account?.profilePicURL}
                style={{
                    objectFit: "cover",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: lightBackgroundColor,
                    borderRadius: "50%",
                    cursor: isLink || onClickImage ? "pointer" : "auto",
                }}
                width={imageSize}
            />
            {imgSide === "left" && (
                <span style={{ marginLeft: 5, fontSize: textSize }}>
                    {screenName}
                </span>
            )}
        </>
    );

    if (!account || (onClickImage ?? !isLink))
        return <span style={wrapperStyle}>{inside}</span>;

    return (
        <Link href={`/account/${account.screenName}`} style={wrapperStyle}>
            {inside}
        </Link>
    );
};

export default AccountPreview;
