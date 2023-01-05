import React from "react";

const CrowdventureCheckboxInput = ({ label, ...props }) => {
    return (
        <input type="checkbox" {...props}>
            {label}
        </input>
    );
};

export default CrowdventureCheckboxInput;
