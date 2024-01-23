import React, { useContext } from "react";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";
import CrowdventureButton from "./CrowdventureButton";

const LikeDislikeController = ({
    count,
    liked,
    onClickLike,
    disliked,
    onClickDislike,
}: {
    readonly count: number;
    readonly liked: boolean;
    readonly onClickLike: () => void;
    readonly disliked: boolean;
    readonly onClickDislike: () => void;
}) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    const { user } = useContext(UserContext);
    return (
        <span style={{ gap: 5 }}>
            <CrowdventureButton
                buttonType="icon"
                icon={faThumbsDown}
                onClick={onClickDislike}
                requireSignedIn
                style={{
                    backgroundColor: "transparent",
                    color: user
                        ? disliked
                            ? "red"
                            : unsafeMode
                            ? "white"
                            : "black"
                        : "gray",
                }}
            >
                Dislike
            </CrowdventureButton>
            {` ${count} `}
            <CrowdventureButton
                buttonType="icon"
                icon={faThumbsUp}
                onClick={onClickLike}
                requireSignedIn
                style={{
                    backgroundColor: "transparent",
                    color: user
                        ? liked
                            ? "green"
                            : unsafeMode
                            ? "white"
                            : "black"
                        : "gray",
                }}
            >
                Like
            </CrowdventureButton>
        </span>
    );
};

export default LikeDislikeController;
