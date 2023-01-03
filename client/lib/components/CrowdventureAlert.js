import React from "react";

const CrowdventureAlert = ({ title, children }) => {
    return (
        <div>
            {title}
            {children}
        </div>
    );
};

export default CrowdventureAlert;
