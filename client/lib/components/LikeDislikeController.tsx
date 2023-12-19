import React, { useContext } from "react";
import { UnsafeModeContext } from "../unsafeMode";
import CrowdventureButton from "./CrowdventureButton";

const LikeDislikeController = ({ count, liked, like, disliked, dislike }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    return (
        <span style={{ gap: 5 }}>
            <CrowdventureButton
                buttonType="text"
                onClick={dislike}
                requireSignedIn
                style={{
                    color: disliked ? "red" : unsafeMode ? "white" : "black",
                }}
            >
                Dislike
            </CrowdventureButton>
            {` ${count} `}
            <CrowdventureButton
                buttonType="text"
                onClick={like}
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
