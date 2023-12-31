import React, { useContext } from "react";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { UnsafeModeContext } from "../unsafeMode";
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
    return (
        <span style={{ gap: 5 }}>
            <CrowdventureButton
                buttonType="icon"
                icon={faThumbsUp}
                onClick={onClickLike}
                requireSignedIn
                style={{
                    color: disliked ? "red" : unsafeMode ? "white" : "black",
                }}
            >
                Dislike
            </CrowdventureButton>
            {` ${count} `}
            <CrowdventureButton
                buttonType="icon"
                icon={faThumbsDown}
                onClick={onClickDislike}
                requireSignedIn
                style={{
                    color: liked ? "green" : unsafeMode ? "white" : "black",
                }}
            >
                Like
            </CrowdventureButton>
        </span>
    );
};

export default LikeDislikeController;
