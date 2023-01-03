import React, { useContext } from "react";
import { UnsafeModeContext } from "../unsafeMode";
import CrowdventureButton from "./CrowdventureButton";

const LikeDislikeController = ({ count, liked, like, disliked, dislike }) => {
    const { unsafeMode } = useContext(UnsafeModeContext);
    return (
        <>
            <CrowdventureButton
                buttonType="text"
                requireSignedIn={true}
                style={{
                    color: disliked ? "red" : unsafeMode ? "white" : "black",
                }}
                onClick={dislike}
            >
                Dislike
            </CrowdventureButton>
            {" " + count + " "}
            <CrowdventureButton
                buttonType="text"
                requireSignedIn={true}
                style={{
                    color: liked ? "green" : unsafeMode ? "white" : "black",
                }}
                onClick={like}
            >
                Like
            </CrowdventureButton>
        </>
    );
};

export default LikeDislikeController;
