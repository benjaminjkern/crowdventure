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
    const dislikeColor = user
        ? disliked
            ? "red"
            : unsafeMode
            ? "white"
            : "black"
        : "gray";
    const likeColor = user
        ? liked
            ? "green"
            : unsafeMode
            ? "white"
            : "black"
        : "gray";
    return (
        <span style={{ gap: 5 }}>
            <CrowdventureButton
                buttonType="icon"
                icon={faThumbsDown}
                onClick={onClickDislike}
                requireSignedIn
                style={(hover) => ({
                    backgroundColor: "transparent",
                    color: dislikeColor,
                    borderRadius: 0,
                    borderColor: dislikeColor,
                    borderStyle: "solid",
                    borderWidth: 0,
                    borderBottomWidth: hover ? 1 : 0,
                })}
            />
            {` ${count} `}
            <CrowdventureButton
                buttonType="icon"
                icon={faThumbsUp}
                onClick={onClickLike}
                requireSignedIn
                style={(hover) => ({
                    backgroundColor: "transparent",
                    color: likeColor,
                    borderRadius: 0,
                    borderColor: likeColor,
                    borderStyle: "solid",
                    borderWidth: 0,
                    borderBottomWidth: hover ? 1 : 0,
                })}
            />
        </span>
    );
};

export default LikeDislikeController;
