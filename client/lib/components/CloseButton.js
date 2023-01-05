import React from "react";

const CloseButton = ({ onClick }) => {
    return (
        <span
            style={{
                position: "absolute",
                top: "1.5em",
                right: "1.5em",
                color: "#888",
                cursor: "pointer",
                textShadow:
                    "-1px 0 2px white, 0 1px 2px white, 1px 0 2px white, 0 -1px 2px white",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#555")}
            onMouseLeave={(e) => (e.target.style.color = "#888")}
            onClick={onClick}
        >
            X
        </span>
    );
};

export default CloseButton;
