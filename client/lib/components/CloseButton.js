import React from "react";

const CloseButton = ({ onClick, style }) => (
    <span
        aria-hidden
        onClick={onClick}
        onMouseEnter={(e) => (e.target.style.color = "#555")}
        onMouseLeave={(e) => (e.target.style.color = "#888")}
        style={{
            position: "absolute",
            top: 20,
            right: 20,
            color: "#888",
            cursor: "pointer",
            textShadow:
                "-1px 0 2px white, 0 1px 2px white, 1px 0 2px white, 0 -1px 2px white",
            ...style,
        }}
    >
        X
    </span>
);

export default CloseButton;
